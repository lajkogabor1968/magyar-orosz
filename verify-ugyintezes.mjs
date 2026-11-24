// Futtatás: node magyar-orosz/verify-ugyintezes.mjs
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const base = new URL('./', import.meta.url);
const read = (name) => readFileSync(new URL(name, base), 'utf8');
const context = { window: {} };

runInNewContext(read('ecl-data.js'), context);
const originals = JSON.stringify(context.window.ECL_DIALOGUES);
assert.equal(context.window.ECL_DIALOGUES.length, 17, 'A meglévő ECL-tananyag 17 témakörös.');

runInNewContext(read('ugyintezes-data.js'), context);
const all = context.window.ECL_DIALOGUES;
assert.equal(all.length, 26, 'Az ügyintézési leckék száma kilenc.');
assert.equal(JSON.stringify(all.slice(0, 17)), originals, 'A régi leckék változatlanok.');
assert.deepEqual(Array.from(all.slice(17), (lesson) => lesson.id), [18, 19, 20, 21, 22, 23, 24, 25, 26]);
const earlierLessonsHash = createHash('sha256').update(JSON.stringify(all.slice(17, 23).map((lesson) => ({ ...lesson, level: 'A2' })))).digest('hex');
assert.equal(earlierLessonsHash, '7dd34a452d6e03d4e31ad5cc976a205e01ed5d3a48373230567d883927d72d12', 'A korábbi hat ügyintézési lecke tartalma változatlan, csak a szintje módosult.');
assert.equal(new Set(all.map((lesson) => lesson.id)).size, all.length, 'Nincs ismétlődő leckeazonosító.');
assert.ok(!all.filter((lesson) => lesson.level === 'A2' || lesson.level === 'A2–B1').some((lesson) => lesson.id >= 18), 'A részletes ügyintézés nem kerülhet az A2-választékba.');

for (const lesson of all.slice(17)) {
  assert.equal(lesson.level, 'B1');
  assert.ok(lesson.lines.length >= 10, `${lesson.id}: életszerű párbeszéd`);
  assert.equal(lesson.translations.length, lesson.lines.length, `${lesson.id}: minden megszólaláshoz fordítás`);
  assert.ok(lesson.glossary.length >= 8, `${lesson.id}: legalább nyolc szószedetelem`);
  assert.ok(lesson.speaking && lesson.speakingRu && lesson.note && lesson.noteRu);

  for (const [index, [speaker, hungarian]] of lesson.lines.entries()) {
    assert.ok(speaker && hungarian, `${lesson.id}: ${index + 1}. megszólalás`);
    assert.ok(!/[А-Яа-яЁё]/u.test(hungarian), `${lesson.id}: magyar szövegben nincs cirill betű`);
    assert.match(lesson.translations[index], /[А-Яа-яЁё]/u, `${lesson.id}: ${index + 1}. orosz fordítás`);
  }
  for (const [hu, ru] of lesson.glossary) {
    assert.ok(hu && /[А-Яа-яЁё]/u.test(ru), `${lesson.id}: hiányos szószedet`);
  }

  const checks = [...lesson.questions, lesson.grammar];
  assert.equal(lesson.questions.length, 3, `${lesson.id}: három szövegértési kérdés`);
  for (const [index, question] of checks.entries()) {
    assert.ok(question.q && question.explain, `${lesson.id}: ${index + 1}. kérdés és magyarázat`);
    assert.equal(question.options.length, 3, `${lesson.id}: három válaszlehetőség`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 3);
    assert.equal(new Set(question.options.map((value) => value.trim().toLocaleLowerCase('hu'))).size, 3);
  }
  assert.deepEqual(Array.from(lesson.questions, (q) => q.answer), [0, 1, 2], `${lesson.id}: változatos helyes válaszpozíciók`);

  assert.ok(lesson.sources.length > 0, `${lesson.id}: hatósági hivatkozás`);
  for (const source of lesson.sources) {
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:');
    assert.ok(['nav.gov.hu', 'www.oif.gov.hu', 'oif.gov.hu', 'neak.gov.hu', 'www.neak.gov.hu', 'kormanyhivatalok.hu', 'www.magyarorszag.hu', 'egeszsegvonal.gov.hu', 'njt.hu', 'njt.jog.gov.hu', 'www.mnb.hu'].includes(url.hostname));
  }
}

runInNewContext(read('ugyintezes-data.js'), context);
assert.equal(all.length, 26, 'A tananyag kétszeri betöltése nem hoz létre duplikátumot.');

const page = read('ecl.html');
assert.match(page, /<script src="ecl-data\.js"><\/script><script src="ugyintezes-data\.js"><\/script><script src="ecl\.js(?:\?[^"]+)?"><\/script>/);
assert.match(page, /26 témakör/);
assert.match(read('index.html'), /href="ecl\.html\?lesson=18"/);
assert.match(read('index.html'), /href="ecl\.html\?lesson=21"/);
assert.match(read('index.html'), /href="ecl\.html\?lesson=24"/);
assert.match(read('ecl.js'), /hu-ru-ecl-progress/, 'A tanulói előzményeket ugyanaz a kulcs őrzi.');
assert.match(read('ecl.js'), /renderLines\(tr,true\)/, 'Az orosz segítség bekapcsolható.');
assert.match(read('ecl.js'), /changeLevel\(targetLevel\)/, 'A mélylink a B1 szintet is kiválasztja.');

const admin = all.slice(17);
const count = (key) => admin.reduce((total, item) => total + item[key].length, 0);
console.log(`✓ Ügyintézési leckék: ${admin.length} B1-es párbeszéd, ${count('lines')} megszólalás, ${count('glossary')} szószedetelem, ${count('questions') + admin.length} feladat.`);
console.log('✓ Az A2-választék nem tartalmaz részletes ügyintézést; a régi 17 lecke, az előző 6 lecke tartalma és az eredménykulcs megmaradt.');
