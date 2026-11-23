// Source-level regression checks for the two appended beginner lessons.
// These assertions cannot replace an independent teacher and browser QA session.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(folder,name),'utf8');
const context={window:{}};
for(const file of [
 'data.js','ecl-vocab.js','a1-guided-lessons-next.js','a1-guided-lessons-13-16.js',
 'a1-guided-lessons-17-20.js','a1-guided-lessons-21-24.js',
 'a1-guided-lessons-25-28.js','a1-guided-lessons-29-30.js'
])runInNewContext(read(file),context,{filename:file});

const extension=context.window.TanmuhelyA1Units29to30;
assert.ok(extension,'The new A1 lessons must be exposed to the workbook');
const {lessons,dialogueTranslations,checks,visuals}=extension;
assert.equal(lessons.length,2);
assert.equal(visuals.length,2);

const book=read('lesson-book.js');
const courses=JSON.parse(book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1]||'null');
assert.ok(courses?.A1,'Cannot locate the permanent lesson ID source');
const previous=[
 context.window.TanmuhelyA1Continuation,
 context.window.TanmuhelyA1Units13to16,
 context.window.TanmuhelyA1Units17to20,
 context.window.TanmuhelyA1Units21to24,
 context.window.TanmuhelyA1Units25to28
];
for(const part of previous)courses.A1.push(...part.lessons);
assert.equal(courses.A1.length,28,'Previously saved A1:0–27 IDs must remain unchanged');
assert.equal(courses.A2.length,3,'A2 lesson IDs must remain unchanged');
const titles=new Set(courses.A1.map(lesson=>lesson.title));
const previouslyTaught=new Set(courses.A1.flatMap(lesson=>lesson.words.map(word=>word.toLocaleLowerCase('hu-HU'))));
const dictionary=new Set(context.window.MAGYAR_OROSZ_DATA.A1.map(entry=>entry[0].toLocaleLowerCase('hu-HU')));
const rowFunction=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowFunction,'Use the same rendered cards as the real workbook');

for(const [offset,lesson] of lessons.entries()){
 const key=`A1:${28+offset}`;
 assert.ok(!titles.has(lesson.title),`${key}: repeated title`);
 titles.add(lesson.title);
 assert.equal(lesson.words.length,10,`${key}: exactly ten progressive core cards are required`);
 const firstTime=lesson.words.filter(word=>!previouslyTaught.has(word.toLocaleLowerCase('hu-HU')));
 assert.ok(firstTime.length<=8,`${key}: more than eight new core words for a beginner`);
 for(const word of lesson.words)previouslyTaught.add(word.toLocaleLowerCase('hu-HU'));
 assert.equal(new Set(lesson.words).size,lesson.words.length,`${key}: repeated headword`);
 assert.ok(lesson.words.every(word=>dictionary.has(word.toLocaleLowerCase('hu-HU'))||lesson.extra.some(extra=>extra[0].toLocaleLowerCase('hu-HU')===word.toLocaleLowerCase('hu-HU'))),
  `${key}: an A1 word is unavailable to the card renderer`);
 assert.ok(lesson.extra.every(row=>row.length===4&&row.every(value=>typeof value==='string'&&value.trim())),
  `${key}: a bilingual phrase card is incomplete`);
 assert.ok(lesson.grammar.length===3&&lesson.grammar[1].length>750,`${key}: Russian grammar explanation is missing`);
 assert.ok(lesson.grammarTable.length>=8&&lesson.grammarTable.every(row=>row.length===3),
  `${key}: bilingual grammar table is missing`);
 assert.equal(lesson.preparation.length,6,`${key}: six bilingual pre-dialogue hints are required`);
 assert.ok(lesson.preparation.every(row=>row.length===3&&row.every(s=>typeof s==='string'&&s.trim())),
  `${key}: pre-dialogue explanation is incomplete`);
 assert.equal(lesson.dialogue.length,6,`${key}: dialogue length changed`);
 assert.equal(dialogueTranslations[lesson.title]?.length,lesson.dialogue.length,
  `${key}: Russian dialogue lines do not align`);
 assert.ok(lesson.reading.lines.length>=6&&lesson.reading.lines.every(row=>row.length===2),
  `${key}: complete bilingual reading required`);
 assert.equal(new Set(lesson.reading.options).size,lesson.reading.options.length,
  `${key}: ambiguous duplicate comprehension options`);
 assert.ok(lesson.reading.options[lesson.reading.answer],`${key}: missing correct reading answer`);
 assert.equal(lesson.min,5,`${key}: five short sentences required`);
 assert.equal(lesson.composition.length,3,`${key}: writing guidance missing`);
 assert.ok(checks[key]?.a[checks[key].ok]&&checks[key]?.why.length>75,
  `${key}: grammar test lacks an explained answer`);
 assert.equal(new Set(checks[key].a).size,checks[key].a.length,
  `${key}: duplicate grammar options`);
 assert.equal(visuals[offset].cards.length,3,`${key}: introduce three visual words`);
 const cards=runInNewContext(`${rowFunction};rows()`,{
  window:context.window,level:'A1',lessonIndex:28+offset,lesson:()=>lesson
 });
 assert.ok(cards.length>=12&&cards.length<=20,`${key}: rendered card count outside A1 limits`);
 assert.equal(cards.length-lesson.words.length,offset===0?9:7,
  `${key}: optional transport and self-care expressions should remain browsable`);
 assert.ok(cards.every(row=>row.hu&&row.ru&&row.example&&row.translation),
  `${key}: rendered bilingual card incomplete`);
 assert.equal(cards[0].hu,lesson.words[0],`${key}: lost beginner sequencing`);
}

assert.ok(lessons[0].words.includes('buszmegálló')&&lessons[0].words.includes('gyalog'));
assert.ok(lessons[0].grammar[1].includes('buszjegyet')&&lessons[0].grammar[1].includes('jobbra'));
assert.ok(lessons[1].words.includes('fáj a fejem')&&lessons[1].words.includes('fáj a torkom'));
assert.ok(lessons[1].grammar[1].includes('torok → torkom'));
assert.ok(lessons[1].composition[1].includes('Не нужно сообщать настоящие медицинские сведения'));

const html=read('index.html');
assert.match(html,/src="a1-guided-lessons-25-28\.js[^\"]*"[\s\S]*?src="a1-guided-lessons-29-30\.js[^\"]*"[\s\S]*?src="lesson-book\.js/,
 'New lesson data must be loaded in ID order before the workbook');
assert.match(book,/courses\.A1\.push\(\.\.\.travelHealthUnits\.lessons\)/);
assert.match(book,/Object\.assign\(dialogueTranslations,travelHealthUnits\.dialogueTranslations\)/);
assert.match(book,/Object\.assign\(checks,travelHealthUnits\.checks\)/);
assert.match(book,/chapterVisuals\.A1\.push\(\.\.\.travelHealthUnits\.visuals\)/);

console.log('PASS: A1:28–29 transport and self-care lessons have complete bilingual stages and keys.');
console.log('PASS: previous 28 A1 IDs and all A2 IDs remain unchanged; new cards stay within 20.');
console.log('NOTE: real mobile speech and feedback quality, and Russian language quality, remain unverified.');
