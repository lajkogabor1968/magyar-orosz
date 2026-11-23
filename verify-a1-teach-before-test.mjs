import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const required=source.match(/function requiredCardCount\(\)\{[^\n]+\}/)?.[0];
const chunks=source.match(/function cardChunks\(\)\{[^\n]+\}/)?.[0];
const seen=source.match(/function requiredCardsSeen\(\)\{[^\n]+\}/)?.[0];
const order=source.match(/function initialTestOrder\(\)\{[\s\S]*?\n\}/)?.[0];
const canAdvance=source.match(/function canAdvance\(\)\{[\s\S]*?\n\}/)?.[0];
const nextCard=source.match(/function nextCardIndex\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(required&&chunks&&seen&&order&&canAdvance&&nextCard,'A1 two-part teaching and test-order gates must exist');
assert.match(source,/if\(level==='A1'\)testOrder=initialTestOrder\(\)/,
 'The guided A1 quiz must start with the taught word subset');
assert.match(source,/testOrder=order;testIndex=saved\.index;quizAnswers=saved\.answers/,
 'Previously saved active quizzes must retain their exact original ordering');
assert.match(source,/const distractors=level==='A1'\?w\.slice\(0,requiredCardCount\(\)\):w/,
 'A1 multiple-choice distractors must also come from taught cards');
assert.match(source,/requiredCardsSeen\(\):flippedWords\.size>=requiredCardCount\(\)/,
 'A1 stage 1 must not unlock after only five arbitrary cards');

const functions=[required,chunks,seen,order,canAdvance,nextCard].join('\n');
const words=Array.from({length:20},(_,i)=>({hu:`word-${i}`}));
const make=(level,flippedWords,checked=[],step=0,cardIndex=0,fastTrack=false)=>runInNewContext(`${functions}\n({count:requiredCardCount(),passed:canAdvance(),order:initialTestOrder(),next:nextCardIndex()})`,{
 level,a1FastTrackPassed:fastTrack,flippedWords:new Set(flippedWords),checkedBatches:new Set(checked),cardIndex,step,rows:()=>words,randomOrder:a=>[...a].reverse(),
 grammarReviewed:false,dialoguePractised:false,correctWriting:new Set(),lessonIndex:1,
 compositionChecked:false,testCompleted:false
});
const allCore=Array.from({length:10},(_,i)=>i);
const afterFive=make('A1',allCore.slice(0,5));
assert.equal(afterFive.count,10);
assert.equal(afterFive.passed,false,'Five cards must never unlock a 10-question A1 test');
assert.equal(make('A1',allCore.slice(0,5),[],0,4).next,0,'First pack stays separate until its retrieval check is completed');
assert.equal(make('A1',allCore.slice(0,5),[0],0,4).next,5,'After the first check the second pack opens');
assert.equal(make('A1',allCore,[0],0,9).next,5,'Second pack cycles until its check is completed');
assert.equal(make('A1',allCore,[0,1],0,9).next,10,'Optional words unlock only after both checks');
assert.deepEqual([...afterFive.order.slice(0,10)].sort((a,b)=>a-b),allCore,
 'Every possible A1 test word must be in the first ten taught cards');
assert.equal(new Set(afterFive.order).size,20,'The full order still contains every card for saved-quiz compatibility');
assert.equal(make('A1',[...allCore.slice(0,9),19]).passed,false,
 'An optional card cannot replace one of the ten taught and assessed cards');
assert.equal(make('A1',allCore,[0]).passed,false,'The second five-card retrieval check cannot be skipped');
assert.equal(make('A1',allCore,[0,1]).passed,true);
assert.equal(make('A1',[],[],0,0,true).passed,true,'Four verified written words may substitute for the card practice');
assert.equal(make('A1',[],[],1,0,true).passed,false,'Fast-track does not bypass the grammar lesson');
const a2=make('A2',[1,4,7,15,19]);
assert.equal(a2.count,5,'A2 keeps its previous five-card rule');
assert.equal(a2.passed,true,'A2 can still advance with any five known cards');
assert.equal(make('A2',[],[],0,0,true).passed,false,'A1 fast-track cannot bypass the A2 teaching gate');
assert.deepEqual([...a2.order],[...Array(20).keys()].reverse(),'A2 random ordering stays unchanged');

assert.match(source,/a1CheckedBatches:\[\.\.\.checkedBatches\]/,'Two-part checkpoints are saved with the old per-lesson keys');
assert.match(source,/!Array\.isArray\(c\.a1CheckedBatches\)/,'Old saved card progress still works after the change');
assert.match(source,/Вопрос '\+\(checkStep\+1\)\+' из 2/,'Both packs contain two Russian-to-Hungarian retrieval questions');
console.log('PASS: A1 words unlock via two checked five-card packs or a separately verified optional four-word placement.');
console.log('PASS: A1 quiz asks only 10 previously shown cards; optional cards are not required.');
console.log('PASS: all old quiz IDs/orders remain resumable; A2 study gates are unchanged.');
