import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));
const source = filename => readFileSync(join(root, filename), 'utf8');

// A kiegészítő szövegértési és nyelvtani feladatoknál az első válasz
// szerepel megoldásként az adatfájlban: ezt a megjelenítőnek kevernie kell.
const communication = source('kommunikacio.js');
const shuffleSource = communication.match(/function shuffled\(items, random=Math\.random\)\{[^\n]+\}/)?.[0];
assert.ok(shuffleSource, 'A kommunikációs feladatok keverőfüggvénye hiányzik.');
const {shuffle} = runInNewContext(`${shuffleSource}; ({shuffle: shuffled})`);
const sample = ['helyes', 'téves 1', 'téves 2'];
const shift = [...shuffle(sample, () => 0)];
const unchanged = [...shuffle(sample, () => 0.9999)];
assert.notDeepEqual(shift, sample, 'A keverés nem változtat a helyes válasz első pozícióján.');
assert.deepEqual(unchanged, sample, 'A keverés nem tartja meg a válaszok halmazát.');
assert.deepEqual([...shift].sort(), [...sample].sort(), 'A keverés megváltoztatta a válaszlehetőségeket.');

const dataContext = {window: {}};
runInNewContext(source('tananyag.js'), dataContext);
const data = dataContext.window.TANANYAG;
let supplementaryQuestions = 0;
for (const [level, material] of Object.entries(data)) {
  for (const text of material.texts) {
    for (const item of text[3]) {
      assert.equal(item.length, 4, `${level}: hiányos szövegértési válaszsor.`);
      supplementaryQuestions += 1;
    }
  }
  for (const question of material.grammar) {
    assert.equal(question.length, 6, `${level}: hiányos nyelvtani válaszsor.`);
    supplementaryQuestions += 1;
  }
}
assert.ok(supplementaryQuestions >= 176, 'A kiegészítő kérdések egy része hiányzik.');
assert.ok(data.A2.grammar.some(item => item[1] === 'A fiú tegnap reggel ___ .' &&
  item[2] === 'felébredt'), 'A múlt idejű feladat továbbra is kétféleképpen értelmezhető.');
assert.ok(!data.A2.grammar.some(item => item[1] === 'A fiú reggel ___ .'),
  'Megmaradt a kétféleképpen értelmezhető kérdés.');

// A vezetett leckék mini-szövegértéseinél az adatbeli helyes indexet
// a válaszok keverése után is meg kell őrizni.
const workbook = source('lesson-book.js');
const coursesText = workbook.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1];
assert.ok(coursesText, 'A vezetett leckék adatai nem olvashatók.');
const courses = JSON.parse(coursesText);
const continuationContext = {window: {}};
runInNewContext(source('a1-guided-lessons-next.js'), continuationContext);
courses.A1.push(...continuationContext.window.TanmuhelyA1Continuation.lessons);
let guidedReadingQuestions = 0;
for (const [level, lessons] of Object.entries(courses)) {
  for (const lesson of lessons) {
    const {options, answer} = lesson.reading;
    assert.ok(options[answer], `${level} – ${lesson.title}: hibás válaszindex.`);
    assert.equal(new Set(options).size, options.length,
      `${level} – ${lesson.title}: azonos válaszlehetőségek.`);
    guidedReadingQuestions += 1;
  }
}
assert.match(workbook, /randomOrder\(reading\.options\.map\(\(option,i\)=>\(\{option,i\}\)\)\)\.forEach\(\(\{option,i\}\)=>/,
  'A vezetett leckék olvasmányainál a helyes válasz indexével együtt kell keverni.');
assert.match(workbook, /randomOrder\(c\.a\.map\(\(answer,i\)=>\(\{answer,i\}\)\)\)\.forEach\(\(\{answer,i\}\)=>/,
  'A leckék nyelvtani ellenőrző válaszait is keverni kell a megoldásindex megtartásával.');

// A korábbi eredménykulcsok változatlanok, de csak a megnyitott szint
// eredménye kerülhet a szintenkénti kijelzőre.
const motor = source('nyelvtan-motor.js');
const progressFunction = motor.match(/function updateProgress\(\) \{[\s\S]*?\n  \}/)?.[0];
assert.ok(progressFunction, 'Hiányzik a haladásjelző.');
for (const [level, score] of [['A1', 4], ['A2', 2]]) {
  const display = {textContent: ''};
  const context = {
    level,
    progress: {'A1:0': {score: 4, max: 5}, 'A2:0': {score: 2, max: 5}},
    $: () => display
  };
  runInNewContext(`${progressFunction}; updateProgress()`, context);
  assert.ok(display.textContent.includes(`1 befejezett témakör`) &&
    display.textContent.includes(`${score} / 5`),
  `${level}: más szint eredménye is megjelent: ${display.textContent}`);
}

console.log(`✓ ${supplementaryQuestions} kiegészítő kérdés: működő, valódi válaszkeverés.`);
console.log(`✓ ${guidedReadingQuestions} vezetett olvasmány: kevert válasz és megőrzött megoldásindex.`);
console.log('✓ Kétértelmű múltidő-kérdés javítva; nyelvtani eredmény szintenként különül el.');
