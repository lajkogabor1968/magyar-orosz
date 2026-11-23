import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const book=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const snippet=book.match(/function installEarlyA1ContrastPractice\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(snippet,'the first two A1 lessons need optional grammar contrast practice');
assert.match(book,/installEarlyA1ContrastPractice\(\);/,
 'the early contrast models must be installed before the lesson view renders');

const originalA1=[{title:'first',words:['telefon']},{title:'second',words:['én']}];
const originalA2=[{title:'separate',words:['abc']}];
const state={courses:{A1:originalA1,A2:originalA2}};
runInNewContext(`${snippet}\ninstallEarlyA1ContrastPractice();`,state);
assert.equal(state.courses.A1.length,2,'existing A1 lesson indices must remain in place');
assert.equal(state.courses.A2[0].contrastPractice,undefined,'A2 lessons must not gain A1 practice');
assert.equal(state.courses.A1[0].words[0],'telefon','word indices must not move');
assert.equal(state.courses.A1[1].words[0],'én','previous writing and quiz keys must remain valid');

const [articles,copula]=state.courses.A1.map(lesson=>lesson.contrastPractice);
assert.equal(articles.length,3);
assert.equal(copula.length,3);
const expected=[
 ['Ez egy telefon.','Ez a metró.','Mi ez?'],
 ['Jól vagyok.','Hogy vagy?','Ő tanár.']
];
for(const [index,items] of [articles,copula].entries())for(const [i,item] of items.entries()){
 assert.equal(item.answers.length,3,'every contrast has exactly three concise Hungarian choices');
 assert.equal(new Set(item.answers).size,3,'distractors must differ');
 assert.equal(item.answers[item.correct],expected[index][i],
  'a novice must be shown the precise taught Hungarian model');
 assert.ok(item.ru.length>12&&item.explanation.length>35,
  'each answer needs Russian context and a clear Russian correction');
}
assert.match(articles[0].ru,/впервые/,'the indefinite article needs its missing Russian context');
assert.match(articles[1].ru,/конкретное/,'a vs egy must not be called a spelling-only question');
assert.match(copula[2].explanation,/связка van не нужна/,
 'third-person profession predicates need the exact beginner rule');
assert.match(book,/const exercises=level==='A1'\?lesson\(\)\.contrastPractice\|\|\[\]:\[\]/,
 'the interactive renderer must exclude A2 and non-targeted lessons');
assert.match(book,/listen\.onclick=\(\)=>\{/,'a correct model has the optional Hungarian listening action');
console.log('PASS: A1/1–2 install six unambiguous Russian-to-Hungarian mini-contrasts with immediate explanation.');
console.log('PASS: A1 lesson indices and words remain unchanged; A2 is excluded; the interactive answer and audio renderer is reused.');
