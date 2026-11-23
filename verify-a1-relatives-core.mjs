// Third eight-word A1 pilot: the family-relations lesson keeps all eleven
// legacy cards and lets beginners defer spouse vocabulary without losing it.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=name=>readFileSync(new URL('./'+name,import.meta.url),'utf8');
const book=read('lesson-book.js');
const context={window:{}};
runInNewContext(read('a1-guided-lessons-13-16.js'),context);
const unit=context.window.TanmuhelyA1Units13to16;
assert.equal(unit.lessons.length,4,'the established four-lesson bundle must stay intact');
const relatives=unit.lessons[0];
assert.equal(relatives.coreCount,8);
assert.deepEqual([...relatives.words],[
 'öcs','húg','nővér','nagymama','nagyapa','szülő','nagyszülő','testvér',
 'férj','feleség','család'
]);
const mandatory=[...relatives.grammar,...relatives.dialogue,
 ...relatives.reading.lines.map(pair=>pair[0]),...relatives.composition].join(' ');
assert.doesNotMatch(mandatory,/férj|feleség/,
 'the two new optional spouse words must not be required in the taught patterns');
assert.doesNotMatch(unit.checks['A1:12'].q,/férj|feleség/,
 'the independent grammar check must not test the two optional words');
assert.match(mandatory,/család/,
 'the revisited family word must remain available for the existing model text');

const data={window:{}};
runInNewContext(read('data.js'),data);
runInNewContext(read('ecl-vocab.js'),data);
const rowsSource=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowsSource);
const rows=runInNewContext(`${rowsSource};rows()`,{
 window:data.window,level:'A1',lessonIndex:12,lesson:()=>relatives
});
assert.equal(rows.length,18,'eleven base cards and seven supplementary expressions stay available');
assert.deepEqual(Array.from(rows.slice(0,11),row=>row.hu),[...relatives.words],
 'all eleven original base-card indices and meanings must keep their positions');

const patterns=[
 /function requiredCardCount\(\)\{[^\n]+\}/,
 /function cardChunks\(\)\{[^\n]+\}/,
 /function quizQuestionCount\(\)\{[^\n]+\}/,
 /function initialTestOrder\(\)\{[\s\S]*?\n\}/,
 /function resumeQuiz\(\)\{[\s\S]*?\n\}/,
 /function persistQuiz\(clear=false\)\{[\s\S]*?\n\}/,
 /function showQuizResult\(\)\{[\s\S]*?\n\}/
];
const snippets=patterns.map(p=>book.match(p)?.[0]);
assert.ok(snippets.every(Boolean),'the actual quiz and card functions must be loadable');
const quizKey='magyarorosz.lesson-quiz.v1';
const local=new Map(),ui=new Map();
let saved;
const state={
 level:'A1',lesson:()=>relatives,rows:()=>rows,
 randomOrder:items=>[...items].reverse(),
 quizKey,lessonKey:()=> 'A1:12',read:()=>saved?{'A1:12':saved}:{},
 quizAnswers:[],quizTargetCount:0,testOrder:[],testCorrect:0,testIndex:0,
 quizMisses:[],hasAnswered:false,testCompleted:false,
 localStorage:{setItem:(key,value)=>local.set(key,value)},
 $:id=>{if(!ui.has(id))ui.set(id,{textContent:'',hidden:false});return ui.get(id)},
 stepButton:{disabled:true},renderErrorSummary:()=>{}
};
const methods=runInNewContext(`${snippets.join('\n')}\n({core:requiredCardCount,packs:cardChunks,count:quizQuestionCount,order:initialTestOrder,resume:resumeQuiz,persist:persistQuiz,result:showQuizResult})`,state);
assert.equal(methods.core(),8);
assert.deepEqual(Array.from(methods.packs(),([start,end])=>[start,end]),[[0,5],[5,8]]);
assert.equal(methods.count(),8);
assert.deepEqual([...methods.order().slice(0,8)].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7]);
assert.deepEqual([...methods.order().slice(8)],[17,16,15,14,13,12,11,10,9,8],
 'spouse words, repeated family and seven supplementary expressions stay optional');

methods.resume();
assert.equal(state.quizTargetCount,8);
state.testOrder=methods.order();state.testIndex=1;state.quizAnswers=[rows[7].ru];
methods.persist();
const stored=JSON.parse(local.get(quizKey))['A1:12'];
assert.equal(stored.count,8);
assert.equal(stored.order.length,18,'all optional words and expressions remain in saved quiz ordering');

saved={order:rows.map(row=>row.hu),answers:rows.slice(0,8).map(row=>row.ru),index:8,done:false};
state.testCorrect=0;state.quizMisses=[];
methods.resume();
assert.equal(state.quizTargetCount,10,'old quizzes without a count still require ten questions');
assert.equal(state.testCorrect,8);
assert.equal(state.testIndex,8);
assert.deepEqual([...state.testOrder],Array.from({length:18},(_,i)=>i));

saved={order:rows.map(row=>row.hu),answers:rows.slice(0,10).map(row=>row.ru),index:9,done:true};
state.testCorrect=0;state.quizMisses=[];
methods.resume();methods.result();
assert.equal(state.testCompleted,true);
assert.match(ui.get('integratedAnswerFeedback').textContent,/Результат: 10 \/ 10 \(100%\)/,
 'historical scores keep their old denominator');
state.level='A2';
assert.equal(methods.core(),5,'A2 mandatory cards remain unchanged');
assert.equal(methods.count(),10,'A2 final quiz remains ten questions');

console.log('PASS: A1/13 teaches eight mandatory family words; the other base cards and seven extra expressions keep their positions.');
console.log('PASS: new eight-question and old ten-question results resume safely, while A2 remains unchanged.');
