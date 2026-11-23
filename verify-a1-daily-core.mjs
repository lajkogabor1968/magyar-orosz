// Second eight-word pilot: the daily-routine unit keeps legacy indices,
// makes only genuinely supplementary words optional, and leaves A2 alone.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=name=>readFileSync(new URL('./'+name,import.meta.url),'utf8');
const book=read('lesson-book.js');
const courseText=book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1];
assert.ok(courseText,'the original guided lesson data must remain loadable');
const courses=JSON.parse(courseText);
const edit=book.match(/function improveEarlyA1CardExamples\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(edit);
runInNewContext(`${edit};improveEarlyA1CardExamples()`,{courses});
const daily=courses.A1[5];
assert.equal(daily.coreCount,8);
assert.deepEqual(daily.words,[
 'ma','holnap','reggel','este','iskola','tanul','olvas','dolgozik','sétál','mindennap'
]);
const essential=[...daily.grammar,...daily.dialogue,...daily.reading.lines.map(pair=>pair[0]),...daily.composition].join(' ');
assert.doesNotMatch(essential,/sétál|mindennap/,
 'the two optional words must not be necessary for dialogue, writing, reading or grammar');

const longerReading=read('a1-tematikus-szovegek.js');
const extraDailyReading=longerReading.match(/,5:\{title:[\s\S]*?(?=,6:\{title:)/)?.[0];
assert.ok(extraDailyReading,'the longer daily reading must remain available');
assert.match(extraDailyReading,/\['Néha a parkban sétálok\.',\s*'Иногда я гуляю в парке\.'\]/,
 'the optional inflected word in the longer reading must have an explicit Russian translation');
assert.match(longerReading,/const details=el\('details'\)/,
 'the longer reading must remain an optional expandable section');

const data={window:{}};
runInNewContext(read('data.js'),data);
runInNewContext(read('ecl-vocab.js'),data);
const rowsSource=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowsSource);
const rows=runInNewContext(`${rowsSource};rows()`,{
 window:data.window,level:'A1',lessonIndex:5,lesson:()=>daily
});
assert.deepEqual(Array.from(rows.slice(0,10),row=>row.hu),daily.words,
 'saved flipped/written card indices must still refer to the same exact words');

const snippets=[
 /function requiredCardCount\(\)\{[^\n]+\}/,
 /function cardChunks\(\)\{[^\n]+\}/,
 /function quizQuestionCount\(\)\{[^\n]+\}/,
 /function initialTestOrder\(\)\{[\s\S]*?\n\}/
].map(pattern=>book.match(pattern)?.[0]);
assert.ok(snippets.every(Boolean));
const context={level:'A1',lesson:()=>daily,rows:()=>rows,randomOrder:a=>[...a].reverse()};
const layout=runInNewContext(`${snippets.join('\n')}\n({core:requiredCardCount(),packs:cardChunks(),quiz:quizQuestionCount(),order:initialTestOrder()})`,context);
assert.equal(layout.core,8);
assert.deepEqual(Array.from(layout.packs,([first,last])=>[first,last]),[[0,5],[5,8]]);
assert.equal(layout.quiz,8);
assert.deepEqual([...layout.order.slice(0,8)].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7]);
assert.deepEqual([...layout.order.slice(8)],[9,8],
 'sétál and mindennap remain at their legacy indices as optional cards');
context.level='A2';
assert.equal(runInNewContext(`${snippets[0]}\nrequiredCardCount()`,context),5,
 'the A2 mandatory vocabulary stays at five cards');
assert.match(book,/saved\.count===undefined\?Math\.min\(10,saved\.order\.length\):saved\.count/,
 'older ten-question quizzes still use their original target length');

console.log('PASS: A1 daily lesson needs eight taught words and keeps sétál/mindennap optional at their original card indices.');
console.log('PASS: the supplemental longer reading stays expandable and translates the optional word in context.');
console.log('PASS: the new quiz uses eight prompts; historical ten-question snapshots and A2 remain protected.');
