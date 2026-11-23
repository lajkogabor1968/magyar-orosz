import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=name=>readFileSync(new URL('./'+name,import.meta.url),'utf8');
const workbook=read('lesson-book.js'),html=read('index.html'),css=read('clean-interface.css');
const courses=JSON.parse(workbook.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1]||'null');
assert.ok(courses?.A1,'A1 course data must be available');
const window={};
for(const file of [
 'a1-guided-lessons-next.js','a1-guided-lessons-13-16.js','a1-guided-lessons-17-20.js',
 'a1-guided-lessons-21-24.js','a1-guided-lessons-25-28.js',
 'a1-guided-lessons-29-30.js'
])runInNewContext(read(file),{window});
for(const name of [
 'TanmuhelyA1Continuation','TanmuhelyA1Units13to16','TanmuhelyA1Units17to20',
 'TanmuhelyA1Units21to24','TanmuhelyA1Units25to28','TanmuhelyA1Units29to30'
])courses.A1.push(...window[name].lessons);
assert.equal(courses.A1.length,30);

let notes=0;
for(const [index,lesson] of courses.A1.entries()){
 assert.ok(Array.isArray(lesson.preparation)&&lesson.preparation.length>=3,
  `A1 lesson ${index+1}: need teacher-written Russian pre-dialogue explanations`);
 for(const row of lesson.preparation){
  assert.equal(row.length,3);
  assert.ok(row.every(value=>typeof value==='string'&&value.trim().length>1),
   `A1 lesson ${index+1}: missing Hungarian, Russian or explanatory note`);
  notes++;
 }
}
const render=workbook.match(/function renderDialoguePreparation\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(render,'A1 dialogue must expose previously prepared grammar and vocabulary before speaking');

function makeElement(tag,text,cl){
 return {tag,textContent:text||'',className:cl||'',children:[],hidden:false,open:false,
  replaceChildren(){this.children=[]},append(...nodes){this.children.push(...nodes)}};
}
for(const level of ['A1','A2']){
 let panel=null;
 const dialogue={before:node=>{panel=node}};
 const context={
  level,lesson:()=>courses.A1[0],
  $:id=>id==='integratedDialogue'?dialogue:id==='lessonDialoguePreparation'?panel:null,
  el:makeElement
 };
 runInNewContext(render+'\nrenderDialoguePreparation()',context);
 assert.ok(panel,'The preparation panel must appear immediately before the dialogue');
 if(level==='A1'){
  assert.equal(panel.hidden,false);
  assert.equal(panel.open,true,'Absolute beginners see Russian explanations without extra clicks');
  const list=panel.children.find(child=>child.tag==='ul');
  assert.equal(list.children.length,courses.A1[0].preparation.length);
  assert.equal(list.children[0].children[0].textContent,'Mi ez?');
  assert.equal(list.children[0].children[1].textContent,'Что это?');
 }else assert.equal(panel.hidden,true,'A2 UI is unchanged');
}
assert.match(workbook,/if\(step===2\)renderDialoguePreparation\(\)/,
 'The Russian explanation must render when the learner reaches the speaking stage');
assert.match(css,/\.lesson-dialogue-preparation summary/);
assert.match(html,/clean-interface\.css\?v=20261123-a1-contrast-audio1/);
console.log(`PASS: ${courses.A1.length} A1 lessons have ${notes} teacher-written Hungarian–Russian explanatory pairs.`);
console.log('PASS: the explanations are visible before speaking, collapsible, and do not change the A2 route.');
console.log('NOTE: an independent Russian-language teaching and translation review is still required.');
