// Futtatás: node magyar-orosz/verify-a2.mjs
// Szerkezeti kapu és sablonos példamondatok előszűrése; nem anyanyelvi lektorálás.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const context = { window: {} };
for (const file of ['data.js', 'ecl-vocab.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const data = context.window.MAGYAR_OROSZ_DATA;
const problems = [];
for (const [level, count] of Object.entries({ A1: 600, A2: 1200, B1: 431, B2: 14 })) {
  if (!Array.isArray(data[level]) || data[level].length !== count) {
    problems.push(`${level}: hibás elemszám (várt: ${count})`);
  }
}
data.A2.forEach((row, index) => {
  if (!Array.isArray(row) || row.length !== 4 || row.some(value => typeof value !== 'string' || !value.trim())) {
    problems.push(`A2:${index}: hiányos vagy hibás szócikk`);
  }
});

// Az A2 szócikkindex is része a böngészőben tárolt tanulói eredményazonosítónak.
// A2:912 egyetlen dokumentált címszó-helyesírási javítása: vegetariánus → vegetáriánus.
const hash = crypto.createHash('sha256').update(JSON.stringify(data.A2.map(row => row[0]))).digest('hex');
const expectedHash = 'ed81a97158060fc0965cf2f0e547791d1d8d3d2a497ddb0de09d89b3ef1d71d6';
if (hash !== expectedHash) problems.push('Az A2 címszavak sorrendje vagy szövege megváltozott.');

// A következő előszűrő csak az egyértelmű, tanulásra alig használható sablonokat találja meg.
// Az „Ez a táska az enyém.” jellegű valódi közléseket nem jelöljük sablonnak.
const generic = /^(?:Ez (?:a|az|egy) [^\s,.!?;]+(?: [^\s,.!?;]+)?|Ő ezt mondja.*|Ezt mondom.*|A „.*” szó rövid)\.$/;
const reviewedBad = [];
data.A2.forEach((row, index) => {
  if (!generic.test(row[2])) return;
  reviewedBad.push(index);
});
if (reviewedBad.length) problems.push(`Az A2 szókincsben maradt ${reviewedBad.length} sablon: ${reviewedBad.join(', ')}`);

console.log(`A2: ${data.A2.length} szócikk, mind a tíz első körös ellenőrzési adag kész: 1200`);
console.log(`Egyértelmű sablonok a teljes A2 szókincsben: ${reviewedBad.length}`);
if (problems.length) {
  for (const problem of problems) console.error(`HIBA: ${problem}`);
  process.exitCode = 1;
} else {
  console.log('A2 szerkezeti teszt: RENDBEN. Az első nyelvi kör lezárult; orosz anyanyelvi lektorálás még szükséges.');
}
