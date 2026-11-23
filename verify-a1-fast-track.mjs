// Optional A1 placement: four exact Hungarian spellings instead of ten card flips.
// This is a simulated UI/state check, not a measurement of learner competence.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=name=>readFileSync(new URL('./'+name,import.meta.url),'utf8');
const book=read('lesson-book.js');
const source=(start,end)=>{
 const first=book.indexOf(start),last=book.indexOf(end,first);
 assert.ok(first>=0&&last>first,`Missing workbook implementation: ${start}`);
 return book.slice(first,last);
};
const base={window:{}};
runInNewContext(read('writing-feedback.js'),base);
const spelling=base.window.TanmuhelyWritingFeedback;

const words=['metró','telefon','rádió','banán','taxi','park','internet','bank','film','pizza']
 .map((hu,i)=>({hu,ru:'значение '+(i+1)}));
const nodes=[];
class Element{
 constructor(tag,text,cl){this.tag=tag;this.textContent=text??'';this.className=cl??'';this.hidden=false;this.id='';this.value='';this.children=[];nodes.push(this)}
 append(...children){this.children.push(...children)}
 setAttribute(name,value){(this.attrs??={})[name]=value}
 focus(){this.focused=true}
}
const flash={previousElementSibling:{before(node){node.insertedBeforeCardHint=true}}};
const lookup=id=>id==='integratedFlashcard'?flash:nodes.find(node=>node.id===id);
let checkpointSaved=0,routeSaved=0,renderedStep=-1,announced='';
const state={
 level:'A1',step:0,lessonIndex:0,flippedWords:new Set(),checkedBatches:new Set(),
 a1FastTrackPassed:false,fastTrackWords:[],fastTrackPosition:0,grammarReviewed:false,
 rows:()=>words,el:(...args)=>new Element(...args),$:lookup,
 writingFeedback:spelling,randomOrder:list=>[...list],
 saveCheckpoint:()=>{checkpointSaved++},save:()=>{routeSaved++},
 stageView:()=>{renderedStep=state.step},note:message=>{announced=message}
};
const functions=[
 source('function requiredCardCount(){','function initialTestOrder(){'),
 source('function fastTrackTargets(){','function updateCardProgress(){'),
 source('function canAdvance(){','function moveNext(){')
].join('\n');
const methods=runInNewContext(`${functions}\n({render:renderFastTrack,check:checkFastTrack,seen:requiredCardsSeen,canAdvance,targets:fastTrackTargets})`,state);
assert.deepEqual(Array.from(methods.targets()),[0,1,5,6],
 'The placement samples two different items from each five-word group');

methods.render();
const start=lookup('a1FastTrackStart'),task=lookup('a1FastTrackTask'),input=lookup('a1FastTrackInput');
const submit=task.children.find(node=>node.tag==='button');
assert.ok(start&&task&&input&&submit,'Accessible start, label, input and check controls exist');
const accents=lookup('a1FastTrackAccentKeys');
assert.equal(accents.children.length,9,'Russian keyboards need all nine Hungarian accented-letter buttons');
assert.equal(lookup('a1FastTrack').insertedBeforeCardHint,true,
 'The ordinary card instructions must remain immediately before the flashcard');
assert.equal(methods.canAdvance(),false,'No beginner skips cards before checking their words');
start.onclick();
assert.equal(task.hidden,false);
assert.match(lookup('a1FastTrackPrompt').textContent,/Слово 1 из 4/);

input.value='metro';submit.onclick();
assert.equal(state.a1FastTrackPassed,false,'A missing accent must not be accepted');
assert.equal(checkpointSaved,0,'A failed check must not save a pass');
assert.equal(routeSaved,0,'A failed check must not move the lesson');
assert.equal(start.hidden,false,'A learner may try again after studying');
assert.match(lookup('a1FastTrackFeedback').textContent,/o → ó/,
 'A mistaken accent receives a specific explanation');

start.onclick();
for(const [index,correct] of ['metró','telefon','park','internet'].entries()){
 assert.match(lookup('a1FastTrackPrompt').textContent,new RegExp(`Слово ${index+1} из 4`));
 if(index===0){input.value='metr';accents.children.find(key=>key.textContent==='ó').onclick();assert.equal(input.value,'metró')}
 else input.value=correct;
 submit.onclick();
 if(index<3)assert.equal(state.a1FastTrackPassed,false,'All four exact spellings are required');
}
assert.equal(state.a1FastTrackPassed,true);
assert.equal(state.step,1,'A successful check opens the grammar stage directly');
assert.equal(renderedStep,1);
assert.equal(checkpointSaved,1,'The fast-track flag persists through normal checkpoints');
assert.equal(routeSaved,1,'The new stage persists through normal route saving');
assert.deepEqual([...state.flippedWords],[],'Untouched flashcards must not be falsely marked as read');
assert.deepEqual([...state.checkedBatches],[],'Untaken retrieval quizzes must not be falsely passed');
assert.equal(methods.seen(),true,'A1 only: placement provides an alternative route into grammar');
assert.equal(methods.canAdvance(),false,'Grammar must still be taught and checked before advancing');
assert.match(announced,/итоговая проверка остаются обязательными/);

state.level='A2';state.step=0;
methods.render();
assert.equal(lookup('a1FastTrack').hidden,true,'The A2 route is not modified');
assert.equal(methods.seen(),false,'A1 placement must not unlock A2 words');

const checkpointScript=[
 source('function saveCheckpoint(){','function restoreCheckpoint(){'),
 source('function restoreCheckpoint(){','function randomOrder(items){')
].join('\n');
const storage=new Map();
const restored={
 level:'A1',a1FastTrackPassed:true,flippedWords:new Set(),correctWriting:new Set(),
 checkedBatches:new Set(),grammarReviewed:false,dialoguePractised:false,checkBatch:0,checkStep:0,checkRendered:'',
 rows:()=>words,lessonKey:()=> 'A1:1',cardChunks:()=>[[0,5],[5,10]],requiredCardCount:()=>10,
 checkpoint:()=>JSON.parse(storage.get('progress')||'{}')['A1:1']||{},
 read:()=>JSON.parse(storage.get('progress')||'{}'),
 checkpointKey:'progress',
 localStorage:{setItem:(_,value)=>storage.set('progress',value)},
 $:()=>({value:''})
};
const keep=runInNewContext(`${checkpointScript}\n({save:saveCheckpoint,restore:restoreCheckpoint})`,restored);
keep.save();
assert.equal(JSON.parse(storage.get('progress'))['A1:1'].a1FastTrackPassed,true);
restored.a1FastTrackPassed=false;keep.restore();
assert.equal(restored.a1FastTrackPassed,true,'Returning learners keep their optional placement pass');
assert.deepEqual([...restored.flippedWords],[],'The checkpoint never invents flipped-word records');
restored.level='A2';keep.restore();
assert.equal(restored.a1FastTrackPassed,false,'The same checkpoint cannot bypass A2 requirements');

assert.match(read('clean-interface.css'),/\.lesson-fast-track-task input/);
console.log('PASS: optional A1 quick-check uses two words per group and strict accent-aware writing.');
console.log('PASS: mistakes fall back to study; four correct answers skip only cards, not grammar or assessment.');
console.log('PASS: placement survives restoration without forging card-review or A2 progress.');
