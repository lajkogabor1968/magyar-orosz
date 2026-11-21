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
const extendedTopics = [...context.window.GRAMMAR_TOPICS];
runInNewContext(readFileSync(join(base, 'nyelvtan-a2-melyites.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-a2-tovabb.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-a1a2-hidak.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-cimek-ru.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-cimek.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-elofeltetelek.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-tankonyv.js'), 'utf8'), context);
runInNewContext(readFileSync(join(base, 'nyelvtan-utasitasok.js'), 'utf8'), context);
const topics = context.window.GRAMMAR_TOPICS;
const info = context.window.GRAMMAR_EXTENSION_INFO;
const deepening = context.window.GRAMMAR_A2_DEEPENING_INFO;
const continuation = context.window.GRAMMAR_A2_CONTINUATION_INFO;
const bridges = context.window.GRAMMAR_BRIDGES_INFO;
const russianTitles = context.window.GRAMMAR_RUSSIAN_TITLES_INFO;
const prerequisites = context.window.GRAMMAR_PREREQUISITES_INFO;
const textbook = context.window.GRAMMAR_TEXTBOOK_INFO;
const russianInstructions = context.window.GRAMMAR_RUSSIAN_INSTRUCTIONS_INFO;

assert.equal(originalTopics.length, 16, 'A korábbi 16 témakör megmaradt.');
assert.equal(topics.length, originalTopics.length + info.topics + deepening.topics + continuation.topics + bridges.topics);
assert.ok(info.topics >= 12, 'Legalább 12 új nyelvtani lecke szükséges.');
assert.ok(info.questions >= 95, 'Legalább 95 új feladat szükséges.');
assert.equal(deepening.topics, 3, 'Három új A2-es fejezet szükséges.');
assert.equal(deepening.questions, 34, 'A három fejezetben összesen 34 feladatnak kell lennie.');
assert.equal(continuation.topics, 3, 'Három folytatólagos A2-es fejezet szükséges.');
assert.equal(continuation.questions, 36, 'Mindhárom új A2-es fejezethez 12 feladat kell.');
assert.equal(bridges.topics, 4, 'Egy A1-es és három A2-es összekötő fejezet szükséges.');
assert.equal(bridges.a1Topics, 1);
assert.equal(bridges.a2Topics, 3);
assert.equal(bridges.questions, 45, 'Kilenc A1-es és 36 A2-es hídgyakorlat szükséges.');
assert.equal(textbook.chapters, 32, 'Minden A1–A2 fejezetnek legyen tankönyvi oldala.');
assert.equal(russianTitles.topics, 40, 'Az összes A1–B2 témakör címe legyen oroszul is megadva.');
assert.equal(prerequisites.a2Topics, 22, 'Az A2 összes témájához kell előismereti hivatkozás.');
assert.ok(prerequisites.links >= 30, 'Az A2 témáihoz valós előismereti lánc szükséges.');
assert.equal(russianInstructions.topics, 40, 'A1-től B2-ig minden nyelvtani fejezethez kell orosz utasítás.');
assert.equal(russianInstructions.questions, 304, 'Minden nyelvtani kérdésnél legyen orosz feladatutasítás.');
assert.equal(russianInstructions.fallbackTopics.length, 0,
  'Jelenleg minden A1–B2 témakörhöz egyedi orosz feladatutasítás szükséges.');
assert.equal(topics.find(t => t.level === 'A1' && t.title.includes('létige'))
  ?.questions[0].options[2], 'vagyok', 'A létige-lecke nyitófeladata a létigét kérdezze.');

for (const [i, old] of originalTopics.entries()) {
  assert.equal(topics[i], old, `A korábbi ${i + 1}. fejezet megváltozott.`);
}
for (const [i, old] of extendedTopics.entries()) {
  assert.equal(topics[i], old, `A korábbi kiegészített ${i + 1}. fejezet sorrendje megváltozott.`);
}

for (const [topicId, topic] of topics.entries()) {
  assert.ok(['A1', 'A2', 'B1', 'B2'].includes(topic.level));
  assert.ok(topic.title?.trim());
  assert.match(topic.titleRu, /[А-Яа-яЁё]/u, 'A témacímhez valódi orosz fordítás szükséges.');
  assert.ok(topic.rule?.trim());
  assert.ok(Array.isArray(topic.examples) && topic.examples.length >= 2);
  assert.ok(Array.isArray(topic.questions) && topic.questions.length >= 5);
  if (['A1', 'A2'].includes(topic.level)) {
    const lesson = topic.lesson;
    assert.ok(lesson, `${topic.title}: hiányzó tankönyvfejezet.`);
    assert.ok(topic.table?.heads?.length >= 2, `${topic.title}: hiányzik a nyelvtani táblázat.`);
    assert.ok(lesson.goalHu?.trim() && lesson.goalRu?.trim());
    assert.ok(lesson.steps.length >= 2, `${topic.title}: kevés tanítási lépés.`);
    for (const step of lesson.steps) {
      assert.ok(step.hu?.trim() && step.ru?.trim());
      assert.ok(step.exampleHu?.trim() && step.exampleRu?.trim());
    }
    assert.ok(lesson.worked.question?.trim() && lesson.worked.answer?.trim());
    assert.ok(lesson.worked.whyHu?.trim() && lesson.worked.whyRu?.trim());
    assert.ok(lesson.pitfall.hu?.trim() && lesson.pitfall.ru?.trim());
  }
  if (topic.level === 'A2') {
    assert.ok(topic.prerequisites?.length, topic.title + ': hiányzó előismeret.');
    for (const source of topic.prerequisites) {
      assert.ok(source.titleRu?.trim() && source.title?.trim());
      const match = topics.find(t => t.title === source.title);
      assert.ok(match && match.level === source.level, topic.title + ': hibás előfeltétel.');
      if (source.level === 'A2') {
        assert.ok(topics.filter(t => t.level === 'A2').indexOf(match) <
          topics.filter(t => t.level === 'A2').indexOf(topic),
        topic.title + ': az előfeltétel nem lehet későbbi A2-es téma.');
      }
    }
  }
  if (topic.table) {
    assert.ok(topic.table.heads.length >= 2);
    for (const row of topic.table.rows) {
      assert.equal(row.length, topic.table.heads.length,
        `${topic.title}: a táblázat oszlopszáma hibás.`);
    }
  }
  for (const [i, question] of topic.questions.entries()) {
    assert.ok(question.instructionRu?.trim(), 'A gyakorlási utasításnak oroszul is meg kell jelennie.');
    assert.match(question.instructionRu, /[А-Яа-яЁё]/u, 'Valódi cirill betűs utasítás szükséges.');
    assert.ok(question.q?.trim(), `${topic.title}: ${i + 1}. kérdés üres.`);
    assert.ok(question.why?.trim(), `${topic.title}: ${i + 1}. magyarázat üres.`);
    if (topicId >= extendedTopics.length) assert.ok(question.whyRu?.trim(),
      `${topic.title}: ${i + 1}. hiányzik az orosz nyelvű visszajelzés.`);
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
assert.ok(verbatim.includes('renderLesson(t.lesson)'),
  'A motor jelenítse meg a tankönyvi oldalakat.');
assert.ok(verbatim.includes('q.instructionRu'),
  'A gyakorló mutassa az orosz nyelvű utasítást minden feladat alatt.');
assert.ok(verbatim.includes('t.titleRu') && verbatim.includes('t.prerequisites'),
  'Az orosz témacímek és a tanulási előfeltételek a felületen is jelenjenek meg.');
assert.ok(page.includes('nyelvtan-a2-tovabb.js'),
  'Az A2-es folytatás töltődjön be a tankönyv és a motor előtt.');
assert.ok(page.indexOf('src="nyelvtan-utasitasok.js') >
  page.indexOf('src="nyelvtan-tankonyv.js') &&
  page.indexOf('src="nyelvtan-utasitasok.js') <
  page.indexOf('src="nyelvtan-motor.js'),
  'Az orosz utasítások az értékelőmotor előtt töltődjenek be.');
const continuationScript = page.indexOf('src="nyelvtan-a2-tovabb.js');
assert.ok(continuationScript > page.indexOf('src="nyelvtan-a2-melyites.js') &&
  continuationScript < page.indexOf('src="nyelvtan-tankonyv.js'),
  'A folytatás a korábbi A2-fejezetek után, a tankönyv előtt töltődjön be.');
const bridgeScript = page.indexOf('src="nyelvtan-a1a2-hidak.js');
const existingTitleScript = page.indexOf('src="nyelvtan-cimek-ru.js');
const titleScript = page.indexOf('src="nyelvtan-cimek.js');
const prerequisiteScript = page.indexOf('src="nyelvtan-elofeltetelek.js');
assert.ok(continuationScript < bridgeScript && bridgeScript < existingTitleScript &&
  existingTitleScript < titleScript &&
  titleScript < prerequisiteScript && prerequisiteScript < page.indexOf('src="nyelvtan-tankonyv.js'),
  'Az összekötő leckék, címek és előfeltételek a tankönyv előtt töltődjenek be.');
const scriptReferences = ['nyelvtan-a1a2-bovites.js', 'nyelvtan-a2-melyites.js',
  'nyelvtan-tankonyv.js', 'nyelvtan-motor.js'].map(s => page.indexOf(`src="${s}`));
assert.ok(scriptReferences.every(v => v !== -1) &&
  scriptReferences.every((v, i) => i === 0 || v > scriptReferences[i - 1]),
  'A tankönyv és az új leckék az értékelőmotor előtt töltődjenek be.');
assert.equal(counts.A1.topics, 10);
assert.equal(counts.A1.questions, 66);
assert.equal(counts.A2.topics, 22);
assert.equal(counts.A2.questions, 198);
const unusual = topics.find(t => t.title === 'Rendhagyó felszólítás – egyél vagy edd?');
assert.ok(unusual.questions.some(q => q.accept?.includes('Egyed')),
  'Az egyed hosszabb alakot is el kell fogadni.');

const future = topics.find(t => t.title === 'Jövő idő – fog + főnévi igenév');
const necessity = topics.find(t => t.title === 'Kell és a személyragos főnévi igenév');
const possession = topics.find(t => t.title === 'Birtokos személyjelek – könyvem, könyved, könyve');
const b1 = topics.find(t => t.level === 'B1' && t.title === 'Vonatkozó mellékmondatok');
const b2 = topics.find(t => t.level === 'B2' && t.title === 'Szórend: fókusz és hangsúly');
assert.match(b1.questions[0].instructionRu, /относительное/u,
  'A B1-es vonatkozó mellékmondat kapjon saját orosz utasítást.');
assert.match(b2.questions[0].instructionRu, /порядок слов/u,
  'A B2-es szórendi feladat kapjon saját orosz utasítást.');
assert.ok(future && necessity && possession, 'Az új A2-es tanító fejezetek hiányoznak.');
assert.deepEqual(Array.from(future.table.rows[0]), ['én', 'tanulni fogok', 'olvasni fogom'],
  'A jövő idejű két ragozást külön kell tanítani.');
assert.deepEqual(Array.from(future.table.rows[5]), ['ők / Önök', 'tanulni fognak', 'olvasni fogják']);
assert.deepEqual(Array.from(necessity.table.rows[2]), ['neki / Önnek', 'tanulnia', 'beszélnie']);
assert.deepEqual(Array.from(necessity.table.rows[5]), ['nekik / Önöknek', 'tanulniuk', 'beszélniük']);
assert.deepEqual(Array.from(possession.table.rows[2]), ['ő / Ön', 'könyve', 'háza']);
assert.deepEqual(Array.from(possession.table.rows[5]), ['ők', 'könyvük', 'házuk']);
for (const topic of [future, necessity, possession]) {
  assert.equal(topic.questions.length, 12);
  assert.equal(topic.questions.filter(q => q.type === 'input').length, 4);
  assert.ok(topic.questions.every(q => q.whyRu?.trim()), 'A2-es javításhoz orosz indoklás kell.');
}
for (const title of [
  'Ki cselekszik? Alany, ige és tárgy',
  'Birtoklás: van könyvem, nincs autóm',
  'Részes eset: -nak/-nek – kinek?',
  'Helyragok II.: -ra/-re, -on/-en/-ön, -ról/-ről'
]) {
  const topic = topics.find(t => t.title === title);
  assert.ok(topic?.lesson?.steps?.length >= 3, title + ': részletes tanító magyarázat szükséges.');
  assert.equal(topic.questions.length, title.startsWith('Ki cselekszik') ? 9 : 12);
  assert.ok(topic.table?.rows?.length >= 6);
  assert.ok(topic.questions.every(q => q.whyRu?.trim()));
}
const indexPage = readFileSync(join(base, 'index.html'), 'utf8');
assert.match(indexPage, /id="landingScreen"[^>]*lang="ru"/);
assert.match(indexPage, /id="landingStart"/);
assert.match(indexPage, /landing\.css/);
assert.match(indexPage, /landing\.js/);
const landingStyles = readFileSync(join(base, 'landing.css'), 'utf8');
assert.match(landingStyles, /landing-mode main\.wrap/);

console.log(JSON.stringify({oldTopics: originalTopics.length, addedTopics: info.topics,
  newQuestions: info.questions + deepening.questions + continuation.questions + bridges.questions,
  textbookChapters: textbook.chapters, russianTopicTitles: russianTitles.topics,
  a2PrerequisiteLinks: prerequisites.links,
  russianPracticeInstructions: russianInstructions.questions,
  totalTopics: topics.length,
  totalQuestions: topics.reduce((n, t) => n + t.questions.length, 0), levels: counts}, null, 2));
