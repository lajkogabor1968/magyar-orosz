import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const required=source.match(/function requiredCardCount\(\)\{[^\n]+\}/)?.[0];
const seen=source.match(/function requiredCardsSeen\(\)\{[^\n]+\}/)?.[0];
const order=source.match(/function initialTestOrder\(\)\{[\s\S]*?\n\}/)?.[0];
const canAdvance=source.match(/function canAdvance\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(required&&seen&&order&&canAdvance,'A1 teaching and test-order gates must exist');
assert.match(source,/if\(level==='A1'\)testOrder=initialTestOrder\(\)/,
 'The guided A1 quiz must start with the taught word subset');
assert.match(source,/testOrder=order;testIndex=saved\.index;quizAnswers=saved\.answers/,
 'Previously saved active quizzes must retain their exact original ordering');
assert.match(source,/const distractors=level==='A1'\?w\.slice\(0,requiredCardCount\(\)\):w/,
 'A1 multiple-choice distractors must also come from taught cards');
assert.match(source,/requiredCardsSeen\(\):flippedWords\.size>=requiredCardCount\(\)/,
 'A1 stage 1 must not unlock after only five arbitrary cards');

const functions=[required,seen,order,canAdvance].join('\n');
const words=Array.from({length:20},(_,i)=>({hu:`word-${i}`}));
const make=(level,flippedWords,step=0)=>runInNewContext(`${functions}\n({count:requiredCardCount(),passed:canAdvance(),order:initialTestOrder()})`,{
 level,flippedWords:new Set(flippedWords),step,rows:()=>words,randomOrder:a=>[...a].reverse(),
 grammarReviewed:false,dialoguePractised:false,correctWriting:new Set(),lessonIndex:1,
 compositionChecked:false,testCompleted:false
});
const allCore=Array.from({length:10},(_,i)=>i);
const afterFive=make('A1',allCore.slice(0,5));
assert.equal(afterFive.count,10);
assert.equal(afterFive.passed,false,'Five cards must never unlock a 10-question A1 test');
assert.deepEqual([...afterFive.order.slice(0,10)].sort((a,b)=>a-b),allCore,
 'Every possible A1 test word must be in the first ten taught cards');
assert.equal(new Set(afterFive.order).size,20,'The full order still contains every card for saved-quiz compatibility');
assert.equal(make('A1',[...allCore.slice(0,9),19]).passed,false,
 'An optional card cannot replace one of the ten taught and assessed cards');
assert.equal(make('A1',allCore).passed,true);
const a2=make('A2',[1,4,7,15,19]);
assert.equal(a2.count,5,'A2 keeps its previous five-card rule');
assert.equal(a2.passed,true,'A2 can still advance with any five known cards');
assert.deepEqual([...a2.order],[...Array(20).keys()].reverse(),'A2 random ordering stays unchanged');

console.log('PASS: A1 quiz asks only 10 previously shown cards; optional cards are not required.');
console.log('PASS: all old quiz IDs/orders remain resumable; A2 study gates are unchanged.');
