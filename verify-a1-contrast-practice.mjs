import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=name=>readFileSync(new URL('./'+name,import.meta.url),'utf8');
const lessonSource=read('lesson-book.js');
const renderSource=lessonSource.match(/function renderGrammarExamples\(\)\{[\s\S]*?\n\}/)?.[0];
const highlightSource=lessonSource.match(/function highlightAnswerButtons\(box,selected,correctText\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(renderSource&&highlightSource,'the real grammar renderer and feedback helper must exist');
const modules={window:{}};
runInNewContext(read('a1-guided-lessons-13-16.js'),modules);
const [relatives,professions,description,possession]=modules.window.TanmuhelyA1Units13to16.lessons;
assert.equal(description.contrastPractice.length,3);
assert.equal(possession.contrastPractice.length,3);
for(const lesson of [description,possession])for(const item of lesson.contrastPractice){
 assert.equal(item.answers.length,3,'every small exercise has three choices');
 assert.equal(new Set(item.answers).size,3,'every choice must be distinct');
 assert.ok(item.answers[item.correct]&&item.explanation.length>25,
  'every exercise must have one correct answer and an explanatory hint');
}
assert.equal(description.contrastPractice[0].answers[0],'A tanár kedves.');
assert.equal(description.contrastPractice[1].answers[0],'A tanár nem magas.');
assert.equal(description.contrastPractice[2].answers[0],'Fiatal vagyok.');
assert.equal(possession.contrastPractice[0].answers[0],'Van egy könyvem.');
assert.equal(possession.contrastPractice[1].answers[0],'Nincs autóm.');
assert.equal(possession.contrastPractice[2].answers[0],'Van könyved?');

class Node {
 constructor(tag,text='',cl=''){
  this.tag=tag;this.textContent=text;this.className=cl;this.children=[];this.disabled=false;
  this.classes=new Set(cl.split(' ').filter(Boolean));
  this.classList={toggle:(name,on)=>on?this.classes.add(name):this.classes.delete(name)};
 }
 append(...items){this.children.push(...items)}
 replaceChildren(...items){this.children=[];this.append(...items)}
 setAttribute(name,value){(this.attributes??={})[name]=value}
 querySelectorAll(tag){
  const found=[];
  for(const child of this.children){if(child.tag===tag)found.push(child);found.push(...child.querySelectorAll(tag))}
  return found;
 }
}
const target=new Node('div'),el=(...args)=>new Node(...args);
let current=description;
const state={level:'A1',lesson:()=>current,$:id=>id==='integratedGrammarExamples'?target:null,
 el,randomOrder:items=>[...items].reverse()};
const render=runInNewContext(`${highlightSource}\n${renderSource}\nrenderGrammarExamples`,state);
const practiceCards=()=>target.children[2]?.children.slice(2)||[];
render();
assert.equal(practiceCards().length,3,'A1/15 gets three optional interactive examples');
assert.match(target.children[2].children[1].textContent,/не влияет/,'exercise must clearly be non-scoring');
const first=practiceCards()[0];
assert.equal(first.children[1].textContent,'Учитель приветливый.');
const options=first.children[2];
assert.equal(options.children.length,3);
const right=options.children.find(button=>button.textContent==='A tanár kedves.');
const wrong=options.children.find(button=>button.textContent==='A tanár kedves van.');
wrong.onclick();
assert.ok(wrong.classes.has('wrong'),'wrong choice receives visible correction');
assert.ok(right.classes.has('right'),'correct answer is highlighted immediately');
assert.equal(first.children[3].attributes['aria-live'],'polite');
assert.match(first.children[3].textContent,/Правильный ответ: A tanár kedves\./);
assert.equal(options.children.filter(button=>button.disabled).length,0,'a wrong attempt allows retry');
right.onclick();
assert.match(first.children[3].textContent,/✓ Верно/);
assert.equal(options.children.filter(button=>button.disabled).length,3,'a correct answer completes only its own exercise');
assert.equal(practiceCards()[1].children[2].children.filter(button=>button.disabled).length,0,
 'optional questions do not lock each other');

current=possession;render();
assert.equal(practiceCards().length,3,'A1/16 gets three new contrast items');
assert.match(practiceCards()[1].children[1].textContent,/нет машины/);
const noCar=practiceCards()[1],noCarOptions=noCar.children[2].children;
noCarOptions.find(button=>button.textContent==='Nem van autóm.').onclick();
assert.match(noCar.children[3].textContent,/Nincs autóm\./,'a bad negative receives the taught pattern');
assert.match(noCar.children[3].textContent,/nem van/,'the hint explains why the negative is wrong');
assert.match(read('clean-interface.css'),/\.lesson-contrast-card \.integrated-answer/,
 'the new answer controls have touch-friendly visual styling');

current=relatives;render();
assert.equal(target.children.length,2,'other A1 lessons keep the previous grammar rendering');
current=professions;render();
assert.equal(target.children.length,2,'other A1 lessons remain untouched');
current=description;state.level='A2';render();
assert.equal(target.children.length,2,'A2 gets no optional contrast practice');
assert.doesNotMatch(renderSource,/localStorage|saveCheckpoint|compositionChecked|stepButton/,
 'optional practice must not mutate old progress, completion or quiz state');
console.log('PASS: six A1/15–16 contrasts are rendered from the lesson data with one model answer each.');
console.log('PASS: wrong and correct choices produce instant explanatory Russian feedback and independent retry.');
console.log('PASS: other lessons, A2 and existing saved progress/completion gates remain unchanged.');
