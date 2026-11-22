import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder = dirname(fileURLToPath(import.meta.url));
const read = name => readFileSync(join(folder, name), 'utf8');
const context = {window: {}};
runInNewContext(read('data.js'), context);
runInNewContext(read('ecl-vocab.js'), context);
runInNewContext(read('a1-guided-lessons-next.js'), context);
const match = read('lesson-book.js').match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/);
if (!match) throw new Error('Nem találhatók a vezetett leckék.');
const courses = JSON.parse(match[1]);
courses.A1.push(...context.window.TanmuhelyA1Continuation.lessons);

for (const level of ['A1', 'A2']) {
  const entries = context.window.MAGYAR_OROSZ_DATA[level];
  const forms = new Set(entries.map(entry => entry[0].toLocaleLowerCase('hu-HU')));
  const covered = new Set();
  const unmatched = [];
  const lessonWords = new Set();

  for (const lesson of courses[level]) {
    const available = new Set(lesson.words);
    const extra = new Set((lesson.extra || []).map(entry => entry[0]));
    for (const word of available) {
      // A2-ben az A1-es tananyag tudatosan visszatérhet; ez ismétlés.
      const known = forms.has(word.toLocaleLowerCase('hu-HU')) ||
        (level === 'A2' && context.window.MAGYAR_OROSZ_DATA.A1.some(entry =>
          entry[0].toLocaleLowerCase('hu-HU') === word.toLocaleLowerCase('hu-HU')));
      if (!known && !extra.has(word)) unmatched.push(`${lesson.title}: ${word}`);
      if (known || extra.has(word)) lessonWords.add(word.toLocaleLowerCase('hu-HU'));
    }
    for (const word of extra) lessonWords.add(word.toLocaleLowerCase('hu-HU'));
  }

  for (const word of lessonWords) if (forms.has(word)) covered.add(word);
  const ratio = (100 * covered.size / forms.size).toFixed(1);
  console.log(`${level}: ${courses[level].length} vezetett lecke; ` +
    `${lessonWords.size} különböző tanított szó/kifejezés, ` +
    `${covered.size}/${forms.size} szintbeli címszó (${ratio}%).`);
  if (unmatched.length) throw new Error(`Elérhetetlen tanulói szavak: ${unmatched.join('; ')}`);
}
console.log('A lefedettség diagnosztika, nem szintzáró minősítés. A tananyag egésze ennél bővebb.');
