import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(folder,name),'utf8');
const ctx={window:{}};
for(const name of ['data.js','a1-guided-lessons-next.js','a1-guided-lessons-13-16.js',
  'a1-guided-lessons-17-20.js','a1-guided-lessons-21-24.js','a1-guided-lessons-25-28.js']) {
  runInNewContext(read(name),ctx,{filename:name});
}
const {lessons,dialogueTranslations,checks,visuals}=ctx.window.TanmuhelyA1Units25to28;
assert.equal(lessons.length,4,'Expected four new A1 learning units');
assert.equal(visuals.length,4,'Each unit needs its own visual vocabulary introduction');
const book=read('lesson-book.js');
const originalText=book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1];
assert.ok(originalText,'Cannot find original guided course list');
const originals=JSON.parse(originalText);
const older=[...originals.A1,...ctx.window.TanmuhelyA1Continuation.lessons,
  ...ctx.window.TanmuhelyA1Units13to16.lessons,
  ...ctx.window.TanmuhelyA1Units17to20.lessons,
  ...ctx.window.TanmuhelyA1Units21to24.lessons];
assert.equal(older.length,24,'A1:0–23 lesson identities must stay untouched');
assert.equal(originals.A2.length,3,'A2 lesson identities must stay untouched');
const known=new Set(ctx.window.MAGYAR_OROSZ_DATA.A1.map(row=>row[0].toLocaleLowerCase('hu-HU')));
const used=new Set(older.map(x=>x.title));
const rowFn=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowFn,'Missing lesson word-card renderer');
const essential=[
  ['szeretnék','szeretnél','szeretne','szeretnék fizetni'],
  ['Hány?','Mennyi?','egy liter tejet','két üveg vizet','fél kiló'],
  ['étlap','kérem','számlát','levest','salátát'],
  ['paradicsomot','narancsot','Mennyibe kerül?','összesen','kétezer forint']
];

for(const [offset,lesson] of lessons.entries()){
  const id=`A1:${24+offset}`;
  assert.ok(!used.has(lesson.title),`${id} repeats a previous title`);used.add(lesson.title);
  assert.ok(lesson.words.length>=9 && lesson.words.length<=14,`${id}: headword load too high`);
  assert.equal(lesson.words[0],['szeretnék','Hány?','étlap','Mennyibe kerül?'][offset],
    `${id}: introduce the central new expression first`);
  assert.equal(new Set(lesson.words).size,lesson.words.length,`${id}: duplicated headword`);
  const extras=new Map(lesson.extra.map(row=>[row[0].toLocaleLowerCase('hu-HU'),row]));
  assert.equal(extras.size,lesson.extra.length,`${id}: duplicate new form`);
  for(const word of lesson.words)assert.ok(known.has(word.toLocaleLowerCase('hu-HU'))||extras.has(word.toLocaleLowerCase('hu-HU')),
    `${id}: ${word} cannot be displayed`);
  for(const form of essential[offset])assert.ok(extras.has(form.toLocaleLowerCase('hu-HU')),
    `${id}: missing central form ${form}`);
  assert.ok(lesson.extra.every(row=>row.length===4&&row.every(v=>typeof v==='string'&&v.trim())),
    `${id}: missing bilingual word or example`);
  assert.ok(lesson.grammar.length===3&&lesson.grammar[1].length>750,`${id}: Russian explanation is incomplete`);
  assert.ok(lesson.grammarTable.length>=7&&lesson.grammarTable.every(row=>row.length===3),
    `${id}: missing grammar table`);
  assert.ok(lesson.preparation.length>=6&&lesson.preparation.every(row=>row.length===3),
    `${id}: missing progressive sentence examples`);
  assert.ok(lesson.dialogue.length>=6&&dialogueTranslations[lesson.title]?.length===lesson.dialogue.length,
    `${id}: bilingual dialogue mismatch`);
  assert.ok(lesson.reading.lines.length>=6&&lesson.reading.lines.every(row=>row.length===2),
    `${id}: reading must have complete translations`);
  assert.ok(lesson.reading.options[lesson.reading.answer],`${id}: answer key invalid`);
  assert.equal(new Set(lesson.reading.options).size,lesson.reading.options.length,`${id}: duplicate answers`);
  assert.ok(lesson.composition.length===3&&lesson.min===5,`${id}: five-sentence writing exercise required`);
  assert.ok(checks[id]?.a[checks[id].ok]&&checks[id].why.length>80,`${id}: no explanatory grammar key`);
  assert.equal(new Set(checks[id].a).size,checks[id].a.length,`${id}: grammar answer ambiguity`);
  const cards=runInNewContext(rowFn+'; rows()',{window:ctx.window,level:'A1',lessonIndex:24+offset,lesson:()=>lesson});
  assert.ok(cards.length>=lesson.words.length&&cards.length<=20,`${id}: cards over the 20-card cap`);
  assert.ok(cards.every(row=>row.hu&&row.ru&&row.example&&row.translation),`${id}: incomplete rendered card`);
  assert.equal(cards[0].hu,lesson.words[0],`${id}: changed teacher word order`);
  assert.equal(visuals[offset].cards.length,3,`${id}: visual requires three examples`);
}

const html=read('index.html');
assert.match(html,/src="a1-guided-lessons-21-24\.js[^\"]*"[\s\S]*?src="a1-guided-lessons-25-28\.js[^\"]*"[\s\S]*?src="lesson-book\.js/,
  'New course units must load after the previous A1 units and before the renderer');
assert.match(book,/courses\.A1\.push\(\.\.\.shoppingUnits\.lessons\)/);
assert.match(book,/Object\.assign\(checks,shoppingUnits\.checks\)/);
assert.match(book,/chapterVisuals\.A1\.push\(\.\.\.shoppingUnits\.visuals\)/);
assert.ok(lessons[0].grammar[1].includes('szeretek olvasni')&&lessons[0].grammar[1].includes('szeretnék olvasni'),
  'Polite desire must be distinguished from liking an activity');
assert.ok(lessons[1].grammar[1].includes('единственном числе'),'Hungarian singular after quantities must be taught');
assert.ok(lessons[2].grammar[1].includes('Kérek egy levest.')&&lessons[2].grammar[1].includes('Kérem a számlát.'),
  'Indefinite and definite request forms must be contrasted');
assert.ok(lessons[3].grammar[1].includes('Ez olcsó')&&lessons[3].grammar[1].includes('Ez drága'),
  'Capstone should include price comparison');
assert.ok(visuals[3].cards.every(card=>!['💶','💰'].includes(card[0])),
  'Market visuals must not imply that Hungarian forint prices are in euros or dollars');

console.log('PASS: A1 units 25–28: polite requests, quantities, restaurant and market with Russian explanations.');
console.log('PASS: 24 previous A1 lesson keys and all A2 keys unchanged; ≤20 bilingual cards per new unit.');
