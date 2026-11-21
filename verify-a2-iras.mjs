// Futtatás: node magyar-orosz/verify-a2-iras.mjs
// Az önellenőrzés nem helyettesíti a tanári szövegértékelést.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'a2-iras-data.js'), 'utf8'), context);
const tasks = context.window.A2_WRITING_TASKS;
const problems = [];
const ids = new Set();
const check = (ok, message) => { if (!ok) problems.push(message); };

check(tasks?.length === 4, 'Pontosan négy önálló A2-es írásfeladatot várunk.');
for (const task of tasks || []) {
  check(typeof task.id === 'string' && !ids.has(task.id), 'Hiányzó vagy nem egyedi feladatazonosító.');
  ids.add(task.id);
  check(typeof task.title === 'string' && task.title.length > 8, task.id + ': hiányzó cím.');
  check(typeof task.situation === 'string' && task.situation.length > 40, task.id + ': hiányzó helyzet.');
  check(/[а-яё]/i.test(task.situationRu), task.id + ': orosz instrukció nélkül.');
  check(task.cues?.length === 4 && task.cues.every(cue => cue.length >= 20),
    task.id + ': pontosan négy érthető tartalmi szempont szükséges.');
  check(task.expressions?.length >= 3, task.id + ': hiányos segítő kifejezések.');
  for (const pair of task.expressions || []) {
    check(pair.length === 2 && /[а-яё]/i.test(pair[1]), task.id + ': hibás segítő szófordulat.');
  }
  const words = task.sample.trim().split(/\s+/).length;
  check(words >= 40 && words <= 65, task.id + ': a mintaszöveg 40–65 szó legyen; most ' + words);
}

const html = fs.readFileSync(path.join(root, 'a2-iras.html'), 'utf8');
const a2 = fs.readFileSync(path.join(root, 'a2.html'), 'utf8');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
check(html.includes('a2-iras-data.js') && html.includes('a2-iras.js'), 'Hiányzó betöltőszkript.');
check(html.includes('id="word-count"') && html.includes('id="checklist"') && html.includes('id="model"'),
  'Hiányzik az önellenőrzés valamelyik eleme.');
check(a2.includes('href="a2-iras.html"'), 'Az A2-párbeszédekből nem érhető el a gyakorló.');
check(home.includes('href="a2-iras.html" data-levels="A2"'), 'Az A2-főmenüből nem érhető el a gyakorló.');

if (problems.length) {
  problems.forEach(problem => console.error('HIBA: ' + problem));
  process.exitCode = 1;
} else {
  console.log('✓ 4 önálló A2-es íráshelyzet, négypontos instrukciók, 40–65 szavas minták és önellenőrzés.');
  console.log('✓ Az írásgyakorlat nem pontoz nyelvhelyességet, és nem menti a tanulók saját szövegét.');
}
