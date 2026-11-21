// Futtatás: node magyar-orosz/verify-a2-olvasas.mjs
// Szerkezeti és bizonyítékalapú ellenőrzés; a pedagógiai lektorálást nem helyettesíti.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.join(root, 'a2-olvasas-data.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'a2-olvasas-data.js' });
const lessons = context.window.A2_READING_LESSONS;
const problems = [];
const check = (condition, message) => { if (!condition) problems.push(message); };

check(Array.isArray(lessons) && lessons.length === 4, 'Pontosan négy A2-es olvasmány szükséges.');
const ids = new Set();
let total = 0;
for (const [index, lesson] of (lessons || []).entries()) {
  const label = 'Olvasmány ' + (index + 1);
  check(typeof lesson.id === 'string' && !ids.has(lesson.id), label + ': hiányzó vagy ismétlődő azonosító');
  ids.add(lesson.id);
  const text = (lesson.paragraphs || []).join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  check(words >= 100 && words <= 185, label + ': a szöveg legyen A2-höz illő, 100–185 szó; jelenleg ' + words);
  check((lesson.paragraphs || []).length === 3, label + ': három rövid bekezdést várunk.');
  check(Array.isArray(lesson.glossary) && lesson.glossary.length >= 7, label + ': hiányos szószedet.');
  for (const pair of lesson.glossary || []) {
    check(pair.length === 2 && /[а-яё]/i.test(pair[1]), label + ': hibás magyar–orosz szószedetpár.');
  }
  check(lesson.trueFalse?.length === 6, label + ': hat igaz–hamis állítás kell.');
  check(lesson.multipleChoice?.length === 3, label + ': három feleletválasztós kérdés kell.');
  const trueCount = (lesson.trueFalse || []).filter(q => q.answer === true).length;
  check(trueCount === 3, label + ': pontosan három igaz és három hamis állítást várunk.');
  const questions = [...(lesson.trueFalse || []), ...(lesson.multipleChoice || []), lesson.fill].filter(Boolean);
  check(questions.length === 10, label + ': pontosan tíz pontozható kérdést várunk.');
  for (const [questionIndex, question] of questions.entries()) {
    const qLabel = label + ', kérdés ' + (questionIndex + 1);
    check(typeof question.text === 'string' && question.text.length > 10, qLabel + ': hiányos kérdés.');
    check(typeof question.evidence === 'string' && text.includes(question.evidence),
      qLabel + ': a bizonyító mondat szó szerint nem található a szövegben.');
    if (questionIndex < 6) {
      check(typeof question.answer === 'boolean', qLabel + ': az igaz–hamis megoldás nem logikai érték.');
    } else {
      check(Array.isArray(question.options) && question.options.length === 3, qLabel + ': három válaszlehetőség szükséges.');
      check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 3,
        qLabel + ': hibás megoldókulcs.');
      check(new Set(question.options || []).size === 3, qLabel + ': ismétlődő válaszlehetőség.');
    }
  }
  check(lesson.open?.question && lesson.open?.sample, label + ': hiányzik az önálló feladat vagy mintaválasza.');
  check(Array.isArray(lesson.shortAnswers) && lesson.shortAnswers.length === 2,
    label + ': két önellenőrzős rövid válasz szükséges.');
  for (const answer of lesson.shortAnswers || []) {
    check(typeof answer.text === 'string' && typeof answer.sample === 'string' && answer.sample.length >= 5,
      label + ': hiányos rövid válasz vagy mintamegoldás.');
    check(typeof answer.evidence === 'string' && text.includes(answer.evidence),
      label + ': a rövid válasz bizonyítéka nem szerepel a szövegben.');
  }
  total += questions.length;
}

const matching = context.window.A2_HEADING_MATCHING;
check(matching?.headings?.length === 8, 'Nyolc cím szükséges a párosításhoz.');
check(matching?.notices?.length === 6, 'Hat eredeti rövid szöveg szükséges a párosításhoz.');
const headingIds = (matching?.headings || []).map(pair => pair[0]);
const chosenHeadings = (matching?.notices || []).map(notice => notice.answer);
check(new Set(headingIds).size === 8, 'A címek azonosítója nem lehet ismétlődő.');
check(new Set(chosenHeadings).size === 6, 'A hat helyes címnek különböznie kell.');
check(chosenHeadings.every(id => headingIds.includes(id)), 'A párosítás nem létező címet jelöl helyesnek.');
check((matching?.notices || []).every(item => item.text.length >= 55 && !item.text.includes('...')),
  'A rövid hírek nem lehetnek üresek vagy hiányosak.');
check((matching?.glossary || []).length >= 5, 'A párosításhoz hiányzik a szószedet.');

const html = fs.readFileSync(path.join(root, 'a2-olvasas.html'), 'utf8');
const a2 = fs.readFileSync(path.join(root, 'a2.html'), 'utf8');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
check(html.includes('a2-olvasas-data.js') && html.includes('a2-olvasas.js'), 'Az olvasásmodul nem tölti be mindkét saját szkriptjét.');
check(html.includes('id="cimparositas"') && html.includes('id="short-answers"'),
  'A rövid válasz vagy a cím–szöveg párosítás hiányzik a felületről.');
check(a2.includes('href="a2-olvasas.html"'), 'Hiányzik a hivatkozás az A2-es párbeszédekből.');
check(home.includes('href="a2-olvasas.html" data-levels="A2"'), 'Hiányzik az A2-es főmenü-hivatkozás.');

if (problems.length) {
  problems.forEach(problem => console.error('HIBA: ' + problem));
  process.exitCode = 1;
} else {
  console.log('✓ ' + lessons.length + ' saját A2-es olvasmány, ' + total + ' pontozható kérdés, ' +
    (lessons.length * 2) + ' rövid válasz, ' + lessons.length + ' szabad válasz és 6 önálló cím–szöveg párosítás.');
  console.log('✓ A modul az eredeti Tanulóműhely A2-es felületéről érhető el; a régi tanulói adatokhoz nem nyúl.');
}
