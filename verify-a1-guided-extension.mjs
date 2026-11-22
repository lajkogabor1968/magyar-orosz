import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const directory = dirname(fileURLToPath(import.meta.url));
const read = filename => readFileSync(join(directory, filename), 'utf8');
const context = {window: {}};
runInNewContext(read('a1-guided-lessons-next.js'), context);
runInNewContext(read('data.js'), context);
runInNewContext(read('ecl-vocab.js'), context);
const {lessons, dialogueTranslations, checks, visuals} = context.window.TanmuhelyA1Continuation;

const book = read('lesson-book.js');
const base = JSON.parse(book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)[1]);
assert.equal(base.A1.length, 8, 'A korábbi nyolc leckét változatlanul kell meghagyni.');
assert.equal(lessons.length, 4, 'A bővítés pontosan a 9–12. leckét tartalmazza.');
assert.equal(visuals.length, lessons.length, 'Minden új leckéhez szükséges tematikus ábra.');
const originalKeys = new Set(base.A1.map(lesson => lesson.title));
const dictionary = new Set(context.window.MAGYAR_OROSZ_DATA.A1.map(item => item[0].toLocaleLowerCase('hu-HU')));
const allKeys = new Set(originalKeys);
const numberSpellings = [
  'egy','kettő','három','négy','öt','hat','hét','nyolc','kilenc','tíz',
  'tizenegy','tizenkettő','tizenhárom','tizennégy','tizenöt','tizenhat',
  'tizenhét','tizennyolc','tizenkilenc','húsz'
];
const taught = new Set();

for (const [offset, lesson] of lessons.entries()) {
  const id = `A1:${offset + 8}`;
  assert.ok(!allKeys.has(lesson.title), `${id}: a lecke címe már létezik.`);
  allKeys.add(lesson.title);
  const extra = new Map((lesson.extra || []).map(row => [row[0].toLocaleLowerCase('hu-HU'), row]));
  assert.ok(lesson.words.length >= 10, `${id}: kevés szókártya.`);
  assert.equal(new Set(lesson.words).size, lesson.words.length, `${id}: ismétlődő kártya.`);
  for (const word of lesson.words) {
    const normalized = word.toLocaleLowerCase('hu-HU');
    assert.ok(dictionary.has(normalized) || extra.has(normalized), `${id}: hiányzó szócikk: ${word}`);
    taught.add(normalized);
  }
  for (const [word, ru, sample, translation] of lesson.extra || []) {
    assert.ok(word && ru && sample && translation, `${id}: hiányos önálló szójelentés.`);
  }
  assert.ok(lesson.grammar.every(x => x.length > 25), `${id}: hiányos nyelvtani tanítás.`);
  assert.ok(lesson.grammarTable.length >= 4 && lesson.grammarTable.every(x => x.length === 3), `${id}: hiányos nyelvtani táblázat.`);
  assert.ok(lesson.preparation.length >= 4 && lesson.preparation.every(x => x.length === 3), `${id}: hiányos kétnyelvű mondat-előkészítés.`);
  assert.ok(lesson.dialogue.length >= 4, `${id}: rövid párbeszéd.`);
  assert.equal(dialogueTranslations[lesson.title]?.length, lesson.dialogue.length, `${id}: hiányzó orosz párbeszédfordítás.`);
  assert.ok(lesson.reading.lines.length >= 4 && lesson.reading.lines.every(x => x.length === 2), `${id}: hiányos kétnyelvű olvasmány.`);
  assert.ok(lesson.reading.options[lesson.reading.answer], `${id}: hibás olvasmányválasz.`);
  assert.equal(new Set(lesson.reading.options).size, lesson.reading.options.length, `${id}: duplázódó választási lehetőség.`);
  assert.ok(lesson.min >= 4 && lesson.composition.length === 3, `${id}: hiányos írásfeladat.`);
  assert.ok(checks[id]?.a[checks[id].ok] && checks[id].why, `${id}: hiányzó nyelvtani ellenőrzés.`);
  assert.equal(new Set(checks[id].a).size, checks[id].a.length, `${id}: azonos nyelvtani válaszok.`);
}

for (const number of numberSpellings) assert.ok(taught.has(number), `A számnevek között hiányzik: ${number}.`);
assert.match(read('index.html'), /src="a1-guided-lessons-next\.js[^\"]*"[^\n]*src="lesson-book\.js/,
  'A folytatásnak a tanulói felület betöltése előtt kell érkeznie.');
assert.match(book, /courses\.A1\.push\(\.\.\.continuation\.lessons\)/,
  'A 9–12. lecke nem kapcsolódik a tanulási útvonalhoz.');
assert.match(book, /Object\.assign\(checks,continuation\.checks\)/,
  'A nyelvtani ellenőrzéseket is csatlakoztatni kell.');

console.log(`✓ ${lessons.length} új A1-lecke; 20 számnév; mindegyikhez szóanyag, orosz nyelvtan, párbeszéd, olvasmány, írás és ellenőrzés.`);
console.log('✓ Az eredeti A1:0–7 és A2 leckeindexek nem változtak; a 9–12. új A1:8–11 kulcsokat kapott.');
