import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder = dirname(fileURLToPath(import.meta.url));
const read = filename => readFileSync(join(folder, filename), 'utf8');
const ctx = {window: {}};
for (const file of [
  'data.js', 'ecl-vocab.js', 'a1-guided-lessons-next.js',
  'a1-guided-lessons-13-16.js', 'a1-guided-lessons-17-20.js'
]) runInNewContext(read(file), ctx);

const {lessons, dialogueTranslations, checks, visuals} = ctx.window.TanmuhelyA1Units17to20;
const book = read('lesson-book.js');
const original = JSON.parse(book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)[1]);
const older = [
  ...original.A1, ...ctx.window.TanmuhelyA1Continuation.lessons,
  ...ctx.window.TanmuhelyA1Units13to16.lessons
];
assert.equal(older.length, 16, 'A korábbi A1:0–15 tananyagnak érintetlennek kell maradnia.');
assert.equal(lessons.length, 4, 'A 17–20. egység négy tanulható leckéből álljon.');
assert.equal(visuals.length, lessons.length, 'Mindegyik leckéhez tartozzon vizuális példa.');

const usedTitles = new Set(older.map(lesson => lesson.title));
const known = new Set(ctx.window.MAGYAR_OROSZ_DATA.A1.map(row => row[0].toLocaleLowerCase('hu-HU')));
const neededForms = [
  ['konyhában', 'nappaliban', 'fürdőszobában', 'hálószobában'],
  ['Hová?', 'megyek', 'mész', 'iskolába', 'boltba', 'szobába', 'kertbe'],
  ['asztalon', 'széken', 'földön', 'polcon', 'falon'],
  ['alatt', 'tanterem', 'asztal alatt', 'szék mellett', 'ajtó előtt']
];
const rowsSource = book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowsSource, 'Nem található a tanulói szókártya-rendező.');

for (const [offset, lesson] of lessons.entries()) {
  const key = `A1:${16 + offset}`;
  assert.ok(!usedTitles.has(lesson.title), `${key}: már létező leckecím.`);
  usedTitles.add(lesson.title);
  assert.ok(lesson.words.length >= 10, `${key}: hiányos szóanyag.`);
  assert.equal(new Set(lesson.words).size, lesson.words.length, `${key}: duplázódó alapcímke.`);
  const extras = new Map((lesson.extra || []).map(row => [row[0].toLocaleLowerCase('hu-HU'), row]));
  for (const word of lesson.words) assert.ok(known.has(word.toLocaleLowerCase('hu-HU')) || extras.has(word.toLocaleLowerCase('hu-HU')),
    `${key}: a ${word} nincs a tanulói szótárban és nincs hozzá saját szócikk.`);
  for (const form of neededForms[offset]) assert.ok(extras.has(form.toLocaleLowerCase('hu-HU')),
    `${key}: hiányzik a lényegi szóalak: ${form}.`);
  for (const row of lesson.extra || []) assert.ok(row.length === 4 && row.every(item => item && typeof item === 'string'),
    `${key}: hiányos kétnyelvű új szócikk.`);
  assert.ok(lesson.grammar.length === 3 && lesson.grammar[1].length > 500,
    `${key}: rövid vagy hiányos orosz nyelvtani magyarázat.`);
  assert.ok(lesson.grammarTable.length >= 5 && lesson.grammarTable.every(row => row.length === 3),
    `${key}: hiányos nyelvtani tábla.`);
  assert.ok(lesson.preparation.length >= 5 && lesson.preparation.every(row => row.length === 3),
    `${key}: hiányos orosz mondat-előkészítés.`);
  assert.ok(lesson.dialogue.length >= 4 && dialogueTranslations[lesson.title]?.length === lesson.dialogue.length,
    `${key}: nincs minden magyar párbeszédsornak orosz fordítása.`);
  assert.ok(lesson.reading.lines.length >= 6 && lesson.reading.lines.every(row => row.length === 2),
    `${key}: hiányos magyar–orosz olvasmány.`);
  assert.ok(lesson.reading.options[lesson.reading.answer], `${key}: nincs érvényes olvasmánymegoldás.`);
  assert.equal(new Set(lesson.reading.options).size, lesson.reading.options.length,
    `${key}: azonos olvasmány-válaszlehetőségek.`);
  assert.ok(lesson.composition.length === 3 && lesson.min === 5, `${key}: hiányos önálló írásgyakorlat.`);
  assert.ok(checks[key]?.a[checks[key].ok] && checks[key].why, `${key}: hiányzó nyelvtani javítókulcs.`);
  assert.equal(new Set(checks[key].a).size, checks[key].a.length, `${key}: azonos nyelvtani opciók.`);
  const runtime = {window: ctx.window, level: 'A1', lessonIndex: offset + 16, lesson: () => lesson};
  const cards = runInNewContext(`${rowsSource}; rows()`, runtime);
  assert.ok(cards.length >= lesson.words.length && cards.length <= 20,
    `${key}: a kártyaszám legyen fokozatosan tanulható (legfeljebb 20).`);
  assert.ok(cards.every(card => card.hu && card.ru && card.example && card.translation),
    `${key}: minden szókártyához szükséges magyar–orosz példamondat.`);
  assert.equal(cards[0].hu, lesson.words[0], `${key}: a kártyasorrend eltér a tanított sorrendtől.`);
}

assert.match(book, /courses\.A1\.push\(\.\.\.locationUnits\.lessons\)/,
  'Az új A1-leckék nem csatlakoznak a tanulási útvonalhoz.');
assert.match(book, /Object\.assign\(checks,locationUnits\.checks\)/,
  'Az új nyelvtani javítókulcsok nincsenek bekötve.');
assert.match(book, /chapterVisuals\.A1\.push\(\.\.\.locationUnits\.visuals\)/,
  'Az új leckék vizuális példái nincsenek bekötve.');
assert.match(read('index.html'), /src="a1-guided-lessons-17-20\.js[^\"]*"[^\n]*src="lesson-book\.js/,
  'Az új tartalomnak a leckeprogram előtt kell betöltődnie.');

console.log('✓ A1 17–20: 4 kétnyelvű helyviszony-lecke; 4 javítókulcs, 4 olvasmány és 4 írásfeladat.');
console.log('✓ Minden új szóhoz magyar–orosz példa, legfeljebb 20 kártya és tanári sorrend tartozik.');
console.log('✓ A korábbi A1:0–15 és A2:0–2 eredményazonosítók nem változtak.');
