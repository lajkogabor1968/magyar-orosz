// Futtatás: node magyar-orosz/verify-a1.mjs
// Az adatszerkezetet, a stabil A1 azonosítókat és a rögzített hangokat ellenőrzi.
// Nem helyettesíti a kézi, anyanyelvi nyelvi lektorálást.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const context = { window: {} };
for (const file of ['data.js', 'ecl-vocab.js', 'audio/hu-manifest.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const errors = [];
const levels = context.window.MAGYAR_OROSZ_DATA;
const expected = { A1: 600, A2: 1200, B1: 431, B2: 14 };
for (const [level, count] of Object.entries(expected)) {
  const rows = levels[level] || [];
  if (rows.length !== count) errors.push(`${level}: ${rows.length} elem, várt: ${count}`);
  rows.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== 4 || row.some(value => typeof value !== 'string' || !value.trim())) {
      errors.push(`${level}:${index}: hiányos vagy hibás négymezős szócikk`);
    }
  });
}

// A helyben tárolt tanulói eredmények szócikkazonosítója a szint és az index.
const a1HeadwordHash = crypto.createHash('sha256')
  .update(JSON.stringify(levels.A1.map(row => row[0]))).digest('hex');
const expectedA1Hash = 'e45687b411e97b7035fba78f5395bbe3ef1c10e3aa4aa290d6e8c47eab36a651';
if (a1HeadwordHash !== expectedA1Hash) errors.push('Az A1 címszavak sorrendje vagy szövege megváltozott.');

const manifest = context.window.TanuloAudioManifest || {};
const linkedPaths = new Set(Object.values(manifest));
const soundFiles = fs.readdirSync(path.join(root, 'audio/hu'))
  .filter(file => file.endsWith('.mp3')).map(file => `audio/hu/${file}`);
const unlinkedFiles = soundFiles.filter(file => !linkedPaths.has(file));
const activeKeys = new Set(levels.A1.flatMap(row => [row[0], row[2]]));
const knownOldRecordings = new Set(['Ez egy amerikai ember.', 'Ez egy angol ember.']);
const unmatched = [];
for (const [spokenText, relativeFile] of Object.entries(manifest)) {
  if (!relativeFile.startsWith('audio/hu/') || !fs.existsSync(path.join(root, relativeFile))) {
    errors.push(`Hiányzó vagy hibás hangfájl: ${spokenText} -> ${relativeFile}`);
  }
  if (!activeKeys.has(spokenText)) unmatched.push(spokenText);
}
for (const key of unmatched) {
  if (!knownOldRecordings.has(key)) errors.push(`Újonnan elavult MP3-szövegkulcs: ${key}`);
}

console.log(`A1: ${levels.A1.length}; A2: ${levels.A2.length}; B1: ${levels.B1.length}; B2: ${levels.B2.length}`);
console.log(`Magyar MP3-hivatkozások: ${Object.keys(manifest).length}; elavult szövegkulcsok: ${unmatched.length}`);
if (unmatched.length) console.warn(`Újrafelvételt igényel: ${unmatched.join(' | ')}`);
if (unlinkedFiles.length) console.warn(`Nem hivatkozott meglévő hangfájlok: ${unlinkedFiles.join(' | ')}`);
if (errors.length) {
  for (const error of errors) console.error(`HIBA: ${error}`);
  process.exitCode = 1;
} else {
  console.log('A1 szerkezeti és hangfájl-ellenőrzés: RENDBEN (a nyelvi lektorálás külön feladat).');
}
