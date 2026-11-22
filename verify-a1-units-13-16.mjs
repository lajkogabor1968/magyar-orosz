import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));
const read = filename => readFileSync(join(root, filename), 'utf8');
const context = {window: {}};
for (const filename of [
  'data.js', 'ecl-vocab.js', 'a1-guided-lessons-next.js', 'a1-guided-lessons-13-16.js'
]) runInNewContext(read(filename), context);

const {lessons, dialogueTranslations, checks, visuals} = context.window.TanmuhelyA1Units13to16;
const preceding = context.window.TanmuhelyA1Continuation.lessons;
const book = read('lesson-book.js');
const original = JSON.parse(book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)[1]);

assert.equal(original.A1.length, 8, 'A korábbi nyolc lecke indexe ne változzon.');
assert.equal(preceding.length, 4, 'A korábbi 9–12. lecke maradjon meg.');
assert.equal(lessons.length, 4, 'Négy új lecke szükséges (13–16.).');
assert.equal(visuals.length, 4, 'Mindegyik új leckéhez tartozzon látványelem.');

const allOldTitles = new Set([...original.A1, ...preceding].map(lesson => lesson.title));
const dictionary = new Set(context.window.MAGYAR_OROSZ_DATA.A1.map(row => row[0].toLocaleLowerCase('hu-HU')));
const requiredOriginals = [
  ['húgom', 'öcsém', 'nővérem', 'nagymamám'],
  ['dolgozom', 'dolgozol', 'Hol dolgozol?'],
  ['Milyen?', 'kedves tanár', 'nem magas'],
  ['nincs', 'könyvem', 'könyved', 'táskám', 'táskád', 'autóm', 'autód']
];
const rowsCode = book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(rowsCode, 'A szókártya-rendező nem olvasható.');

for (const [offset, lesson] of lessons.entries()) {
  const id = `A1:${offset + 12}`;
  assert.ok(!allOldTitles.has(lesson.title), `${id}: ismétlődő leckecím.`);
  allOldTitles.add(lesson.title);
  assert.ok(lesson.words.length >= 10, `${id}: kevés új szókártya.`);
  assert.equal(new Set(lesson.words).size, lesson.words.length, `${id}: kétszer szerepel egy tanított szó.`);
  const extra = new Map((lesson.extra || []).map(row => [row[0].toLocaleLowerCase('hu-HU'), row]));
  for (const word of lesson.words) assert.ok(
    dictionary.has(word.toLocaleLowerCase('hu-HU')) || extra.has(word.toLocaleLowerCase('hu-HU')),
    `${id}: a ${word} nem szerepel a szótárban és nincs saját szócikke.`
  );
  for (const row of lesson.extra || []) {
    assert.equal(row.length, 4, `${id}: hiányos új szóadat.`);
    assert.ok(row.every(value => typeof value === 'string' && value.trim()), `${id}: üres kétnyelvű szómagyarázat.`);
  }
  for (const originalForm of requiredOriginals[offset]) assert.ok(extra.has(originalForm.toLocaleLowerCase('hu-HU')),
    `${id}: hiányzik az új szerkezet: ${originalForm}`);
  assert.ok(lesson.grammar.length === 3 && lesson.grammar[1].length > 450,
    `${id}: a tanításnak részletes orosz magyarázatot kell adnia.`);
  assert.ok(lesson.grammarTable.length >= 5 && lesson.grammarTable.every(row => row.length === 3),
    `${id}: hiányos nyelvtani példatábla.`);
  assert.ok(lesson.preparation.length >= 5 && lesson.preparation.every(row => row.length === 3),
    `${id}: hiányos magyar–orosz mondatmagyarázat.`);
  assert.ok(lesson.dialogue.length >= 4, `${id}: nincs teljes párbeszéd.`);
  assert.equal(dialogueTranslations[lesson.title]?.length, lesson.dialogue.length,
    `${id}: a párbeszéd magyar és orosz sorai nem egyeznek.`);
  assert.ok(lesson.reading.lines.length >= 5 && lesson.reading.lines.every(row => row.length === 2),
    `${id}: hiányos kétnyelvű olvasmány.`);
  assert.ok(lesson.reading.options[lesson.reading.answer], `${id}: hiányzik az olvasmánymegoldás.`);
  assert.equal(new Set(lesson.reading.options).size, lesson.reading.options.length,
    `${id}: azonos válaszlehetőségek.`);
  assert.equal(lesson.composition.length, 3, `${id}: hiányos írásbeli feladat.`);
  assert.ok(lesson.min >= 5, `${id}: legalább öt önálló mondat kell.`);
  assert.ok(checks[id]?.a[checks[id].ok] && checks[id]?.why,
    `${id}: a nyelvtani ellenőrzésnek javítást és magyarázatot kell adnia.`);
  assert.equal(new Set(checks[id].a).size, checks[id].a.length, `${id}: azonos nyelvtani opciók.`);
  const runtime = {window: context.window, level: 'A1', lessonIndex: offset + 12, lesson: () => lesson};
  const cards = runInNewContext(`${rowsCode}; rows()`, runtime);
  assert.ok(cards.length >= lesson.words.length && cards.every(card => card.hu && card.ru && card.example && card.translation),
    `${id}: nem minden tanulói kártyához tartozik magyar és orosz példa.`);
  assert.ok(cards.length <= 20, `${id}: húsznál több kártya túlterhelheti a kezdő tanulót.`);
  assert.equal(cards[0].hu, lesson.words[0], `${id}: a kártyák nem tanári sorrendben kezdődnek.`);
}

assert.match(book, /courses\.A1\.push\(\.\.\.familyAndWorkUnits\.lessons\)/,
  'A 13–16. lecke nem csatlakozik az alkalmazáshoz.');
assert.match(book, /Object\.assign\(checks,familyAndWorkUnits\.checks\)/,
  'Az új nyelvtani kérdések nem csatlakoznak az alkalmazáshoz.');
assert.match(book, /chapterVisuals\.A1\.push\(\.\.\.familyAndWorkUnits\.visuals\)/,
  'Az új tematikus ábrák nem csatlakoznak az alkalmazáshoz.');
assert.match(read('index.html'), /src="a1-guided-lessons-13-16\.js[^\"]*"[^\n]*src="lesson-book\.js/,
  'A böngésző az új tananyagot a leckemotor előtt kell, hogy betöltse.');

console.log('✓ A1 13–16: négy teljes kétnyelvű lecke, hibátlan szerkezeti kapcsolatok.');
console.log('✓ Helyes leckesorrend, 4 nyelvtani kérdés, 4 olvasmány és 4 ötmondatos írásfeladat.');
console.log('✓ A korábbi A1:0–11 és A2:0–2 azonosítók megtartva.');
