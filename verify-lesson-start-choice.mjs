// Simulated workbook navigation with a realistic localStorage lifecycle.
// This checks the previously confusing forced prerequisite confirmation.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const workbook=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const styles=readFileSync(new URL('./clean-interface.css',import.meta.url),'utf8');
const functionSource=(name,nextName)=>{
 const start=workbook.indexOf(`function ${name}(`),end=workbook.indexOf(`function ${nextName}(`,start);
 assert.ok(start>=0&&end>start,`Cannot read the real ${name} navigation function`);
 return workbook.slice(start,end);
};

const pieces=[
 functionSource('read','save'),
 functionSource('save','say'),
 functionSource('activeCourseLevel','refreshLessonStart'),
 functionSource('refreshLessonStart','open'),
 workbook.slice(workbook.indexOf('function open('),workbook.indexOf('\nlet stepButton=')),
 functionSource('completedScore','reviewAdvice'),
 functionSource('reviewAdvice','confirmLessonChange'),
 workbook.slice(workbook.indexOf('function confirmLessonChange('),workbook.indexOf("$('integratedLessonSelect').addEventListener('change'"))
];
const values=new Map();
const course={A1:Array.from({length:30},(_,i)=>({title:`Lesson ${i+1}`})),A2:Array.from({length:3},(_,i)=>({title:`A2 lesson ${i+1}`}))};
const state={level:'A1',rendered:[],notes:[]};
const picker={value:'0',children:[],replaceChildren(){this.children=[]},append(node){this.children.push(node)}};
const advice={hidden:true,children:[],replaceChildren(){this.children=[]},append(...nodes){this.children.push(...nodes)}};
const context={
 courses:course,KEY:'magyarorosz.lesson-route.v1',
 localStorage:{getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)},
 document:{querySelector:()=>({dataset:{level:state.level}})},
 root:{classList:{remove(){},add(){}}},
 hub:{hidden:false},view:{hidden:true,scrollIntoView(){}},back:{hidden:true},
 $:name=>name==='lessonStartSelect'?picker:name==='integratedAdvanceAdvice'?advice:null,
 el:(tag,text)=>({tag,textContent:text,value:'',hidden:false}),
 render:()=>{state.rendered.push([context.getLevel(),context.getIndex(),context.getStep()]);advice.hidden=true},
 note:text=>state.notes.push(text)
};
runInNewContext(`let level='A1',lessonIndex=0,step=0;\n${pieces.join('\n')}\n
this.getLevel=()=>level;this.getIndex=()=>lessonIndex;this.getStep=()=>step;
this.selectFromMenu=index=>open('words',index);
this.resume=()=>open('resume');
this.choose=index=>confirmLessonChange(index);
this.refresh=()=>refreshLessonStart();`,context);

context.refresh();
assert.equal(picker.children.length,30,'All A1 lessons must be available before lesson one starts');
assert.equal(picker.value,'0');
context.selectFromMenu(1);
assert.equal(context.getIndex(),1,'A new learner can start at the second A1 lesson');
assert.equal(context.getStep(),0,'A chosen lesson starts with its own first stage');
assert.equal(JSON.parse(values.get(context.KEY)).A1.lessonIndex,1,'The chosen lesson is persisted');
assert.equal(JSON.parse(values.get(context.KEY)).migratedFirstUnit20261121,true,'Historic progress migration cannot shift this new selection');
context.resume();
assert.equal(context.getIndex(),1,'Opening the workbook again must resume lesson two');
context.choose(7);
assert.equal(context.getIndex(),7,'Choosing a later lesson must not require completing the preceding lesson');
assert.equal(advice.hidden,false,'A previous-lesson hint may remain visible, without gating entry');
assert.match(advice.children[0].textContent,/Необязательное повторение/);
context.choose(2);
assert.equal(context.getIndex(),2,'Moving back to another lesson must also work');
context.resume();
assert.equal(context.getIndex(),2,'Direct menu changes must persist through reopening');
context.refresh();
assert.equal(picker.value,'2','Start menu must show the last chosen lesson, not always lesson one');

assert.match(html,/id="lessonStartSelect"/);
assert.match(html,/id="lessonStartSelected"/);
assert.match(html,/id="integratedLessonSelect"/);
assert.match(styles,/\.lesson-start-controls/);
assert.match(workbook,/\$\('lessonStartSelected'\)\?\.addEventListener\('click',\(\)=>open\('words',Number\(\$\('lessonStartSelect'\)\.value\)\)\)/);
assert.doesNotMatch(workbook,/e\.target\.value=String\(lessonIndex\);confirmLessonChange/,
 'The dropdown must not snap back to the previous lesson');
assert.equal(course.A2.length,3,'A2 route is untouched');

console.log('PASS: beginner can start at A1 lesson 2 (or later) without completing lesson 1.');
console.log('PASS: direct lesson changes and reopening retain the chosen lesson; suggestions do not block.');
console.log('NOTE: these are deterministic state/UI-source checks; device browser testing remains required.');
