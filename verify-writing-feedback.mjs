import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source = readFileSync(new URL('./writing-feedback.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const workbook = readFileSync(new URL('./lesson-book.js', import.meta.url), 'utf8');
const sandbox = {window: {}};
runInNewContext(source, sandbox, {filename: 'writing-feedback.js'});
const {checkWord, checkSentence} = sandbox.window.TanmuhelyWritingFeedback;

const wordCases = [
  ['metró', 'metró', 'correct'],
  ['METRÓ ', 'metró', 'correct'],
  ['metro', 'metró', 'diacritics'],
  ['rádio', 'rádió', 'diacritics'],
  ['turo', 'túró', 'diacritics'],
  ['tűz', 'tüz', 'diacritics'],
  ['konyv', 'könyv', 'diacritics'],
  ['könvy', 'könyv', 'transposition'],
  ['telefno', 'telefon', 'transposition'],
  ['teléfon', 'telefon', 'diacritics'],
  ['banan', 'banán', 'diacritics'],
  ['telefn', 'telefon', 'missing-letter'],
  ['teléfno', 'telefon', 'other'],
  ['teleffon', 'telefon', 'extra-letter'],
  ['telexon', 'telefon', 'letter'],
  ['телефон', 'telefon', 'keyboard'],
  ['   ', 'telefon', 'empty'],
  ['tefleno', 'telefon', 'other']
];
for (const [received, expected, kind] of wordCases) {
  const result = checkWord(received, expected);
  assert.equal(result.kind, kind, `${received} → ${expected}: expected ${kind}`);
  assert.ok(result.hint.length > 6);
}
assert.match(checkWord('metro', 'metró').hint, /o → ó/);
assert.match(checkWord('konyv', 'könyv').hint, /o → ö/);
assert.doesNotMatch(checkWord('telefon', 'telefón').hint, /Правильно!/);

const sentenceCases = [
  ['Ez egy telefon.', 'Ez egy telefon.', 'correct'],
  ['  EZ   EGY TELEFON  ', 'Ez egy telefon.', 'correct'],
  ['Ez egy radio.', 'Ez egy rádió.', 'diacritics'],
  ['Ez telefon.', 'Ez egy telefon.', 'missing-word'],
  ['Ez egy egy telefon.', 'Ez egy telefon.', 'extra-word'],
  ['Telefon egy ez.', 'Ez egy telefon.', 'word-order'],
  ['Ez egy telefno.', 'Ez egy telefon.', 'transposition'],
  ['Ез egy telefon.', 'Ez egy telefon.', 'keyboard'],
  ['', 'Ez egy telefon.', 'empty'],
  ['Jó este!', 'Jó reggelt!', 'other']
];
for (const [received, expected, kind] of sentenceCases) {
  const result = checkSentence(received, expected);
  assert.equal(result.kind, kind, `${received} → ${expected}: expected ${kind}`);
  assert.ok(result.hint.length > 6);
}
assert.match(checkSentence('Ez telefon.', 'Ez egy telefon.').hint, /«egy»/);
assert.match(checkSentence('Ez egy radio.', 'Ez egy rádió.').hint, /o → ó/);

const writingScript = html.indexOf('src="writing-feedback.js?');
const lessonScript = html.indexOf('src="lesson-book.js?');
assert.ok(writingScript >= 0 && lessonScript > writingScript,
  'The spelling feedback module must load before the guided workbook.');
assert.match(workbook, /writingFeedback\.checkWord\(\$\('integratedWritingInput'\)\.value,v\.hu\)/);
assert.match(workbook, /writingFeedback\.checkSentence\(got,target\)/);
assert.match(workbook, /writingFeedback\.checkWord\(received,expected\)/);
assert.match(workbook, /correctWriting\.add\(writeIndex\);saveCheckpoint\(\)/,
  'Correct writing must continue to use the existing checkpoint IDs.');
console.log(`PASS: ${wordCases.length} word and ${sentenceCases.length} model-sentence comparisons.`);
console.log('PASS: the workbook uses the new explanatory feedback in all three writing checks without changing saved IDs.');
console.log('NOTE: comparisons assess a known model, not open-ended Hungarian grammar or pronunciation.');
