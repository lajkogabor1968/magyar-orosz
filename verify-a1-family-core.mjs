// Pilot: the family lesson teaches eight required words; two remain optional.
// The ten-card legacy order and ten-question in-progress quizzes must survive.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const extract=pattern=>{
 const matched=source.match(pattern)?.[0];
 assert.ok(matched,`Missing family-core implementation: ${pattern}`);
 return matched;
};
const courses=JSON.parse(source.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1]);
const edits=extract(/function improveEarlyA1CardExamples\(\)\{[\s\S]*?\n\}/);
runInNewContext(`${edits};improveEarlyA1CardExamples()`,{courses});
const family=courses.A1[2];
assert.equal(family.coreCount,8,'the family lesson must not require all ten previously new words');
assert.equal(family.words.length,10,'existing card indices and vocabulary remain unchanged');
assert.deepEqual([...family.words.slice(8)],['barát','testvér'],
 'only the last two family words become optional, in their original positions');

const required=extract(/function requiredCardCount\(\)\{[^\n]+\}/);
const chunks=extract(/function cardChunks\(\)\{[^\n]+\}/);
const count=extract(/function quizQuestionCount\(\)\{[^\n]+\}/);
const order=extract(/function initialTestOrder\(\)\{[\s\S]*?\n\}/);
const words=family.words.map((hu,i)=>({hu,ru:'перевод '+i}));
const storage=new Map(),ui=new Map(),quizKey='magyarorosz.lesson-quiz.v1';
let saved;
const state={
 level:'A1',lessonIndex:2,lesson:()=>family,rows:()=>words,
 randomOrder:values=>[...values].reverse(),
 quizKey,lessonKey:()=> 'A1:2',
 read:()=>saved?{'A1:2':saved}:{},
 quizAnswers:[],quizTargetCount:0,testOrder:[],testCorrect:0,testIndex:0,
 quizMisses:[],hasAnswered:false,testCompleted:false,
 localStorage:{setItem:(key,value)=>storage.set(key,value)},
 $:id=>{if(!ui.has(id))ui.set(id,{textContent:'',hidden:false});return ui.get(id)},
 stepButton:{disabled:true},renderErrorSummary:()=>{}
};
const resume=extract(/function resumeQuiz\(\)\{[\s\S]*?\n\}/);
const persist=extract(/function persistQuiz\(clear=false\)\{[\s\S]*?\n\}/);
const result=extract(/function showQuizResult\(\)\{[\s\S]*?\n\}/);
const methods=runInNewContext(`${required}\n${chunks}\n${count}\n${order}\n${resume}\n${persist}\n${result}\n({required:requiredCardCount,chunks:cardChunks,total:quizQuestionCount,init:initialTestOrder,resume:resumeQuiz,persist:persistQuiz,result:showQuizResult})`,state);
assert.equal(methods.required(),8);
assert.deepEqual(Array.from(methods.chunks(),([a,b])=>[a,b]),[[0,5],[5,8]]);
assert.equal(methods.total(),8);
assert.deepEqual([...methods.init().slice(0,8)].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7],
 'new quiz prompts come only from the eight mandatory family words');
assert.deepEqual([...methods.init().slice(8)],[9,8],
 'both optional words remain accessible at their legacy indices');

// Starting a fresh family quiz creates eight items with an explicit count.
methods.resume();
assert.equal(state.quizTargetCount,8);
state.testOrder=methods.init();state.testIndex=1;state.quizAnswers=['перевод 7'];
methods.persist();
assert.equal(JSON.parse(storage.get(quizKey))['A1:2'].count,8);
assert.equal(JSON.parse(storage.get(quizKey))['A1:2'].order.length,10,
 'even new saved orders retain all old word indices');

// Existing users have a ten-question snapshot without a count property.
saved={order:[...family.words],answers:words.slice(0,8).map(row=>row.ru),index:8,done:false};
state.testCorrect=0;state.quizMisses=[];state.testIndex=0;
methods.resume();
assert.equal(state.quizTargetCount,10,'unfinished ten-question quizzes keep their historical length');
assert.equal(state.testCorrect,8,'old answers remain valid');
assert.equal(state.testIndex,8);
assert.deepEqual([...state.testOrder],[0,1,2,3,4,5,6,7,8,9]);

saved={order:[...family.words],answers:words.slice(0,10).map(row=>row.ru),index:9,done:true};
state.testCorrect=0;state.quizMisses=[];state.testCompleted=false;
methods.resume();
assert.equal(state.quizTargetCount,10);
assert.equal(state.testCompleted,true,'a completed old quiz is not discarded');
assert.equal(state.testCorrect,10);
methods.result();
assert.match(ui.get('integratedAnswerFeedback').textContent,/Результат: 10 \/ 10 \(100%\)/,
 'the legacy score denominator must remain ten');

saved={order:[...family.words],answers:words.slice(0,4).map(row=>row.ru),index:4,done:false,count:8};
state.testCorrect=0;state.quizMisses=[];state.testCompleted=false;
methods.resume();
assert.equal(state.quizTargetCount,8,'new quizzes resume at the shorter eight-word target');
assert.equal(state.testCorrect,4);
assert.match(source,/max:quizTargetCount/,'the stored final lesson score uses the actual quiz length');
assert.match(source,/panel\.querySelector\('h4'\)\.textContent=/,
 'the smaller second card group has a correctly adjusted heading');

state.level='A2';
assert.equal(methods.required(),5,'A2 keeps its unchanged five-card stage gate');
assert.equal(methods.total(),10,'A2 keeps its unchanged ten-question final check');
console.log('PASS: A1 family has eight mandatory words and two optional words at their original saved indices.');
console.log('PASS: new eight-question and legacy ten-question quiz snapshots both resume safely; A2 unchanged.');
