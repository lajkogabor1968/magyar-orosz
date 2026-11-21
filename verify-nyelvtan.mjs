import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { runInNewContext } from 'node:vm';

const base = dirname(fileURLToPath(import.meta.url));
const page = readFileSync(join(base, 'nyelvtan.html'), 'utf8');
const data = page.match(/window\.GRAMMAR_TOPICS=(\[[\s\S]*?\]);<\/script>/);
assert.ok(data, 'A meglévő nyelvtani adatok nem találhatók.');
const context = {window: {}};
runInNewContext(`window.GRAMMAR_TOPICS=${data[1]};`, context);
const originalTopics = [...context.window.GRAMMAR_TOPICS];
runInNewContext(readFileSync(join(base, 'nyelvtan-a1a2-bovites.js'), 'utf8'), context);
const topics = context.window.GRAMMAR_TOPICS;
const info = context.window.GRAMMAR_EXTENSION_INFO;

assert.equal(originalTopics.length, 16, 'A korábbi 16 témakör megmaradt.');
assert.equal(topics.length, originalTopics.length + info.topics);
assert.ok(info.topics >= 12, 'Legalább 12 új nyelvtani lecke szükséges.');
assert.ok(info.questions >= 95, 'Legalább 95 új feladat szükséges.');
assert.equal(topics.find(t => t.level === 'A1' && t.title.includes('létige'))
  ?.questions[0].options[2], 'vagyok', 'A létige-lecke nyitófeladata a létigét kérdezze.');

for (const [i, old] of originalTopics.entries()) {
  assert.equal(topics[i], old, `A korábbi ${i + 1}. fejezet megváltozott.`);
}

for (const [topicId, topic] of topics.entries()) {
  assert.ok(['A1', 'A2', 'B1', 'B2'].includes(topic.level));
  assert.ok(topic.title?.trim());
  assert.ok(topic.rule?.trim());
  assert.ok(Array.isArray(topic.examples) && topic.examples.length >= 2);
  assert.ok(Array.isArray(topic.questions) && topic.questions.length >= 5);
  if (topic.table) {
    assert.ok(topic.table.heads.length >= 2);
    for (const row of topic.table.rows) {
      assert.equal(row.length, topic.table.heads.length,
        `${topic.title}: a táblázat oszlopszáma hibás.`);
    }
  }
  for (const [i, question] of topic.questions.entries()) {
    assert.ok(question.q?.trim(), `${topic.title}: ${i + 1}. kérdés üres.`);
    assert.ok(question.why?.trim(), `${topic.title}: ${i + 1}. magyarázat üres.`);
    if (question.type === 'input') {
      assert.ok(question.accept?.[0]?.trim(), `${topic.title}: ${i + 1}. nincs megoldás.`);
      const variants = question.accept.map(s => String(s).trim().toLocaleLowerCase('hu-HU'));
      assert.equal(new Set(variants).size, variants.length,
        `${topic.title}: ${i + 1}. azonos elfogadott beírások.`);
    } else {
      assert.ok(question.options.length >= 3);
      assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length);
      assert.equal(new Set(question.options).size, question.options.length,
        `${topic.title}: ${i + 1}. azonos válaszlehetőségek.`);
    }
  }
  assert.ok(topicId < 16 || ['A1', 'A2'].includes(topic.level),
    'A kiegészítés nem módosíthatja a B1–B2 témaköröket.');
}

const counts = Object.fromEntries(['A1', 'A2', 'B1', 'B2'].map(level => [level,
  {topics: topics.filter(t => t.level === level).length,
    questions: topics.filter(t => t.level === level).reduce((n, t) => n + t.questions.length, 0)}]));
assert.ok(counts.A1.topics > 4 && counts.A2.topics > 4);
assert.ok(topics.some(t => t.level === 'A2' && /felszólító mód/i.test(t.title)));
assert.ok(topics.some(t => t.level === 'A1' && /igeragozás/i.test(t.title)));
const imperative = topics.find(t => t.level === 'A2' && /Felszólító mód I\./.test(t.title));
assert.ok(imperative.questions.some(q => q.accept?.includes('kérjél')),
  'A kérjél hosszú alakot is el kell fogadni.');
const verbatim = readFileSync(join(base, 'nyelvtan-motor.js'), 'utf8');
assert.ok(verbatim.includes('shuffleOptions(q.options)'),
  'A feladatmotor keverje a feleletválasztós lehetőségek sorrendjét.');

console.log(JSON.stringify({oldTopics: originalTopics.length, addedTopics: info.topics,
  newQuestions: info.questions, totalTopics: topics.length,
  totalQuestions: topics.reduce((n, t) => n + t.questions.length, 0), levels: counts}, null, 2));
