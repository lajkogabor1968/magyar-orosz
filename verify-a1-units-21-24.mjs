import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(folder,name),'utf8');
const context={window:{}};
for(const name of ['data.js','a1-guided-lessons-next.js','a1-guided-lessons-13-16.js',
  'a1-guided-lessons-17-20.js','a1-guided-lessons-21-24.js']) {
  runInNewContext(read(name),context,{filename:name});
}
const extension=context.window.TanmuhelyA1Units21to24;
assert.ok(extension,'The new A1 units must be registered');
const {lessons,dialogueTranslations,checks,visuals}=extension;
assert.equal(lessons.length,4,'Four sequential units are required');
assert.equal(visuals.length,4,'Each unit needs a distinct visual introduction');

const book=read('lesson-book.js');
const match=book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/);
assert.ok(match,'Original lessons cannot be parsed');
const original=JSON.parse(match[1]);
const older=[...original.A1,...context.window.TanmuhelyA1Continuation.lessons,
  ...context.window.TanmuhelyA1Units13to16.lessons,
  ...context.window.TanmuhelyA1Units17to20.lessons];
assert.equal(older.length,20,'A1:0–19 must preserve existing indexes');
assert.equal(original.A2.length,3,'Do not modify existing A2 course indexes');
const titles=new Set(older.map(lesson=>lesson.title));
const known=new Set(context.window.MAGYAR_OROSZ_DATA.A1.map(row=>row[0].toLocaleLowerCase('hu-HU')));
const rowsSource=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowsSource,'Student flashcard renderer is required');
const expected=[
  ['tanulok','tanulsz','beszélek','olvasol','dolgozom'],
  ['szeretek','szeretsz','olvasni','főzni','nem szeretek'],
  ['Hány óra van?','Hány órakor?','nyolckor','hétfőn','szerdán'],
  ['kérek','almát','teát','tejet','Mennyibe kerül?']
];

for(const [offset,lesson] of lessons.entries()){
  const key='A1:'+(20+offset);
  assert.ok(!titles.has(lesson.title),`${key}: duplicate lesson title`);
  titles.add(lesson.title);
  assert.ok(lesson.words.length>=9 && lesson.words.length<=12,`${key}: too many new headwords at once`);
  assert.equal(new Set(lesson.words).size,lesson.words.length,`${key}: duplicate headwords`);
  const extras=new Map((lesson.extra||[]).map(row=>[row[0].toLocaleLowerCase('hu-HU'),row]));
  assert.equal(extras.size,lesson.extra.length,`${key}: duplicate extra cards`);
  for(const word of lesson.words)assert.ok(known.has(word.toLocaleLowerCase('hu-HU'))||extras.has(word.toLocaleLowerCase('hu-HU')),
    `${key}: unknown word ${word}`);
  for(const form of expected[offset])assert.ok(extras.has(form.toLocaleLowerCase('hu-HU')),
    `${key}: missing central teaching form ${form}`);
  for(const row of lesson.extra)assert.ok(row.length===4&&row.every(item=>typeof item==='string'&&item.trim()),
    `${key}: bilingual form must have word, meaning and example pair`);
  assert.ok(lesson.grammar.length===3&&lesson.grammar[1].length>=700,`${key}: Russian grammar needs detail`);
  assert.ok(lesson.grammarTable.length>=6&&lesson.grammarTable.every(row=>row.length===3),
    `${key}: grammar table missing`);
  assert.ok(lesson.preparation.length>=6&&lesson.preparation.every(row=>row.length===3),
    `${key}: sentence preparation missing`);
  assert.ok(lesson.dialogue.length>=4&&dialogueTranslations[lesson.title]?.length===lesson.dialogue.length,
    `${key}: dialogue translations missing`);
  assert.ok(lesson.reading.lines.length>=6&&lesson.reading.lines.every(row=>row.length===2),
    `${key}: reading must have bilingual lines`);
  assert.ok(lesson.reading.options[lesson.reading.answer],`${key}: reading key missing`);
  assert.equal(new Set(lesson.reading.options).size,lesson.reading.options.length,`${key}: duplicate options`);
  assert.ok(lesson.composition.length===3&&lesson.min===5,`${key}: writing exercise missing`);
  assert.ok(checks[key]?.a[checks[key].ok]&&checks[key].why.length>=80,`${key}: explanatory quiz key missing`);
  assert.equal(new Set(checks[key].a).size,checks[key].a.length,`${key}: duplicate quiz choices`);
  const runtime={window:context.window,level:'A1',lessonIndex:20+offset,lesson:()=>lesson};
  const cards=runInNewContext(rowsSource+'; rows()',runtime);
  assert.ok(cards.length>=lesson.words.length&&cards.length<=20,`${key}: 20-card cap exceeded`);
  assert.ok(cards.every(card=>card.hu&&card.ru&&card.example&&card.translation),
    `${key}: incomplete displayed card`);
  assert.equal(cards[0].hu,lesson.words[0],`${key}: teaching order changed`);
  assert.ok(visuals[offset].cards.length===3,`${key}: introduction must have three examples`);
}

const scripts=read('index.html');
assert.match(scripts,/src="a1-guided-lessons-17-20\.js[^\"]*"[^\n]*src="a1-guided-lessons-21-24\.js[^\"]*"[^\n]*src="lesson-book\.js/);
assert.match(book,/courses\.A1\.push\(\.\.\.actionUnits\.lessons\)/);
assert.match(book,/Object\.assign\(checks,actionUnits\.checks\)/);
assert.match(book,/chapterVisuals\.A1\.push\(\.\.\.actionUnits\.visuals\)/);
assert.ok(lessons[0].grammar[1].includes('olvasol'),'Second-person sibilant verbs must be explicit');
assert.ok(lessons[0].grammar[1].includes('dolgozom'),'Ik conjugation exception must be explicit');
assert.ok(lessons[2].grammar[1].includes('Hány óra van?'),'Time and action time must be distinguished');
assert.ok(lessons[3].grammar[1].includes('kenyeret'),'Irregular accusative patterns must be explained');

console.log('PASS: A1 units 21–24 teach present tense, infinitives, time and object marking in Russian.');
console.log('PASS: 20 preceding A1 checkpoints and all A2 checkpoints keep their historical indexes.');
console.log('PASS: all four lessons have ≤20 bilingual cards, dialogue, reading, grammar, writing and answer keys.');
