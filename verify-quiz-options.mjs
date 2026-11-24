// Futtatás: node magyar-orosz/verify-quiz-options.mjs
// Gépileg ellenőrzi, hogy a feleletválasztós teszt azonos magyar kérdéshez
// tartozó, szövegében eltérő helyes fordítást nem nevezhet hibásnak.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const optionScript = html.search(/src="choice-options\.js(?:\?v=[^"]+)?"/);
const appScript = html.search(/src="app\.js(?:\?v=[^"]+)?"/);
assert.ok(optionScript > 0 && appScript > optionScript, 'A kérdésválasz-modult az app.js előtt kell betölteni.');
assert.match(app, /MagyarOroszQuizOptions\.buildOptions\(/, 'Az alkalmazás nem a tesztelt válaszválasztót használja.');
const context = { window: {} };
for (const file of ['data.js', 'ecl-vocab.js', 'choice-options.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const buildOptions = context.window.MagyarOroszQuizOptions?.buildOptions;
assert.equal(typeof buildOptions, 'function', 'Hiányzik a kérdésválaszokat előállító modul.');

const normalize = value => String(value).normalize('NFC').trim().replace(/\s+/g, ' ').toLowerCase();
const answerKey = value => normalize(value).replace(/[.!?…]+$/u, '');
const corpus = context.window.MAGYAR_OROSZ_DATA;
let checked = 0;
let duplicateWords = 0;
let duplicateSentences = 0;

for (const [level, rows] of Object.entries(corpus)) {
  const entries = rows.map((row, index) => ({
    id: `${level}:${index}`, hu: row[0], ru: row[1], huS: row[2], ruS: row[3],
  }));
  for (const type of ['quiz', 'sentences']) {
    const hu = type === 'quiz' ? 'hu' : 'huS';
    const ru = type === 'quiz' ? 'ru' : 'ruS';
    const groups = new Map();
    for (const e of entries) {
      const key = normalize(e[hu]);
      groups.set(key, (groups.get(key) || 0) + 1);
    }
    const duplicates = [...groups.values()].filter(n => n > 1).reduce((n, count) => n + count - 1, 0);
    if (type === 'quiz') duplicateWords += duplicates;
    else duplicateSentences += duplicates;

    for (const target of entries) {
      // Állandó véletlenszám: minden futtatás ugyanolyan ellenőrizhető választ ad.
      const options = buildOptions(target, entries, type, () => 0.37);
      assert.equal(options.length, Math.min(4, entries.length), `${level}/${target.id}/${type}: kevés válasz`);
      assert.equal(options.filter(e => e.id === target.id).length, 1, `${target.id}: hiányzik vagy többszörös a jó válasz`);
      assert.equal(new Set(options.map(e => answerKey(e[ru]))).size, options.length, `${target.id}: ismétlődő orosz válasz`);
      assert.equal(options.filter(e => normalize(e[hu]) === normalize(target[hu])).length, 1,
        `${target.id}: ugyanarra a magyar kérdésre több helyesnek tekinthető orosz válasz szerepel`);
      checked++;
    }
  }
}

console.log(`Feleletválasztós teszt: ${checked} ellenőrzött kérdésvariáció.`);
console.log(`Azonos magyar címszó: ${duplicateWords}, azonos példamondat: ${duplicateSentences} – az azonos magyar kérdésből származó másik válasz kizárva.`);
console.log('Feleletválasztós minőségi teszt: RENDBEN. A szemantikai azonosság emberi nyelvi felülvizsgálatot igényel.');
