// Reproducible A1 card-semantic regression checks. This does not replace a
// native Russian language editor or a full independent grammar audit.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(folder,name),'utf8');
const context={window:{}};
for(const name of [
 'data.js','ecl-vocab.js','a1-guided-lessons-next.js',
 'a1-guided-lessons-13-16.js','a1-guided-lessons-17-20.js',
 'a1-guided-lessons-21-24.js','a1-guided-lessons-25-28.js',
 'a1-guided-lessons-29-30.js'
])runInNewContext(read(name),context,{filename:name});

const book=read('lesson-book.js');
const json=book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1];
const rowsFn=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
assert.ok(json&&rowsFn,'Actual rendered card content must be readable by the audit');
const courses=JSON.parse(json);
const extensions=[
 context.window.TanmuhelyA1Continuation,context.window.TanmuhelyA1Units13to16,
 context.window.TanmuhelyA1Units17to20,context.window.TanmuhelyA1Units21to24,
 context.window.TanmuhelyA1Units25to28,
 context.window.TanmuhelyA1Units29to30
];
for(const extension of extensions){
 assert.ok(extension?.lessons,'A1 lesson extension missing');
 courses.A1.push(...extension.lessons);
}
const corrections=book.match(/function improveEarlyA1CardExamples\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(corrections,'Beginner-specific example overrides must remain loaded');
runInNewContext(`(function(courses){${corrections}; improveEarlyA1CardExamples()})`)(courses);
assert.equal(courses.A1.length,30);
assert.equal(courses.A2.length,3,'A2 course stays unchanged');
const rendered=courses.A1.map((lesson,lessonIndex)=>runInNewContext(`${rowsFn};rows()`,{
 window:context.window,level:'A1',lessonIndex,lesson:()=>lesson
}));
let totalCards=0;
for(const [i,rows] of rendered.entries()){
 assert.ok(rows.length>=10,`A1 lesson ${i+1} has fewer than ten visible cards`);
 totalCards+=rows.length;
 const russian=new Map();
 for(const card of rows){
  assert.ok(card.hu.trim()&&card.ru.trim()&&card.example.trim()&&card.translation.trim());
  const ru=card.ru.toLocaleLowerCase('ru-RU').replace(/[.!?]+$/g,'').trim();
  const previous=russian.get(ru);
  assert.ok(!previous||previous===card.hu,`A1 lesson ${i+1}: ${previous} / ${card.hu} share an ambiguous Russian writing prompt «${ru}»`);
  russian.set(ru,card.hu);
 }
 const earlyPast=/\b(?:jöttem|jöttél|tanultam|mentem|voltam|voltunk|beszéltem)\b/iu;
 const prematureImperative=/\b(?:ülj|fordulj|vedd|nyisd|kérj)\b/iu;
 for(const card of rows.slice(0,10)){
  assert.doesNotMatch(card.example,earlyPast,`A1 lesson ${i+1}: unexplained past tense in required card`);
  assert.doesNotMatch(card.example,prematureImperative,`A1 lesson ${i+1}: untaught imperative in required card`);
 }
}

for(const lessonNumber of [11,19,20]){
 const chair=rendered[lessonNumber-1].find(card=>card.hu==='szék');
 assert.deepEqual([chair?.example,chair?.translation],['Ez egy szék.','Это стул.'],
  `A1 lesson ${lessonNumber} must not teach a new word through an unexplained imperative`);
}
const tomato=rendered[27].find(card=>card.hu==='paradicsomot');
assert.equal(tomato?.ru,'помидор (винительный падеж, ед. число)',
 'The isolated Hungarian accusative noun is singular; do not label it as Russian plural');
const market=extensions[4].lessons[3];
assert.match(market.grammarTable[0][1],/помидор → помидор/);
assert.match(extensions[4].visuals[3].cards[0][2],/ед\. число/);
assert.match(market.grammar[1],/существительное остаётся в единственном числе/,
 'The Russian learner must still see the contrast with a plural Russian quantity phrase');
const earlySamples=[
 [1,'én','Én jól vagyok.','У меня всё хорошо.'],
 [1,'te','Te hogy vagy?','А ты как?'],
 [1,'ő','Ő magyar.','Он — венгр / она — венгерка.'],
 [1,'vagy','Te jól vagy.','У тебя всё хорошо.'],
 [1,'ki','Ki ő?','Кто он / она?'],
 [4,'víz','Vizet kérek.','Мне воды, пожалуйста.'],
 [4,'tea','Teát kérek.','Мне чай, пожалуйста.'],
 [4,'tej','Tejet kérek.','Мне молока, пожалуйста.'],
 [4,'tojás','Tojást kérek.','Мне яйцо, пожалуйста.'],
 [6,'lakik','Anna itt lakik.','Анна живёт здесь.'],
 [9,'angol','Anna angol.','Анна — англичанка.'],
 [9,'francia','Anna francia.','Анна — француженка.']
];
for(const [index,hu,example,translation] of earlySamples){
 const card=rendered[index].find(x=>x.hu===hu);
 assert.deepEqual([card?.example,card?.translation],[example,translation],
  `A1 lesson ${index+1}: ${hu} must use a taught, correctly translated beginner example`);
}
assert.match(courses.A1[1].grammar[1],/magyarul beszél/,
 'The beginner must be taught that magyarul means "in Hungarian" before using the phrase');
assert.match(courses.A1[4].grammar[1],/Vizet iszom/,
 'The beginner must be told that the first-person drinking pattern is a fixed expression');
const html=read('index.html');
for(const script of [
 'a1-guided-lessons-next.js?v=20261123-a1-merged1',
 'a1-guided-lessons-17-20.js?v=20261123-a1-merged1',
 'a1-guided-lessons-25-28.js?v=20261123-a1-merged1',
 'a1-guided-lessons-29-30.js?v=20261123-a1-travel-health1'
])assert.ok(html.includes(script),`Browser must refresh corrected A1 material: ${script}`);
console.log(`PASS: ${courses.A1.length} A1 lessons, ${totalCards} visible cards, no duplicate Russian spelling prompts or early imperatives in required cards.`);
console.log('PASS: three chair examples use a beginner sentence; the Hungarian singular tomato form is translated as singular in the card, table and visual.');
console.log('PASS: 12 beginner sample translations and staged grammar explanations are explicitly verified.');
console.log('NOTE: a bilingual human reviewer is still required for semantic and stylistic assurance.');
