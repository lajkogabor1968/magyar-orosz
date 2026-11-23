import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./a1-tematikus-szovegek.js',import.meta.url),'utf8');
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('./clean-interface.css',import.meta.url),'utf8');

class Element {
 constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.textContent='';this.hidden=false;this.className='';this.id='';this.classes=new Set();this.classList={toggle:(name,enabled)=>enabled?this.classes.add(name):this.classes.delete(name)};}
 append(...items){this.children.push(...items)}
 setAttribute(key,value){this.attributes[key]=value}
 querySelectorAll(selector){const all=this.children.flatMap(child=>[child,...child.querySelectorAll('*')]);return selector==='*'?all:all.filter(child=>child.tag===selector)}
 insertAdjacentElement(where,element){assert.equal(where,'afterend');placed=element}
 remove(){this.removed=true;placed=null}
}

let placed=null;const anchor=new Element('div'),played=[];
const document={createElement:tag=>new Element(tag),getElementById:id=>id==='lessonReadingLines'?anchor:id==='a1LongReading'?placed:null};
class Utterance{constructor(text){this.text=text}}
const window={SpeechSynthesisUtterance:Utterance,TanuloTTS:{speak:u=>{played.push(u);return true}}};
const captured=source.replace(/\}\)\(\);\s*$/, 'window.__qaUnits=units;window.__qaGuidance=readingGuidance;})();');
assert.notEqual(captured,source,'test harness must capture the 11 active A1 units');
runInNewContext(captured,{document,window,SpeechSynthesisUtterance:Utterance});

const units=window.__qaUnits,indices=Object.keys(units).map(Number).sort((a,b)=>a-b);
assert.deepEqual(indices,[1,2,3,4,5,6,7,8,9,10,11]);
for(const index of [1,2,3]){
 assert.equal(window.__qaGuidance[index].length,3,`A1 lesson ${index+1} needs three concise Russian preparation notes`);
 for(const [hu,ru,why] of window.__qaGuidance[index])assert.ok(hu.trim()&&ru.trim()&&why.trim());
}
for(const index of indices){
 const unit=units[index];
 assert.equal(unit.lines.length,15,`A1 extra text ${index}: exactly 15 sentences`);
 assert.equal(unit.dialogue.length,8,`A1 extra text ${index}: exactly eight dialogue lines`);
 assert.equal(unit.questions.length,2,`A1 extra text ${index}: two comprehension checks`);
 for(const [hu,ru] of [...unit.lines,...unit.dialogue]){
  assert.ok(hu.trim()&&ru.trim(),`A1 extra text ${index}: empty translation`);
  assert.match(hu,/[.!?]$/,`A1 extra text ${index}: Hungarian phrase punctuation`);
  assert.match(ru,/[.!?]$/,`A1 extra text ${index}: Russian phrase punctuation`);
 }
 for(const question of unit.questions){
  assert.equal(question.length,5,`A1 extra text ${index}: three choices and a key`);
  assert.ok(Number.isInteger(question[4])&&question[4]>=0&&question[4]<3);
  assert.equal(new Set(question.slice(1,4)).size,3,'distractors must not duplicate the answer');
 }
 const earlyPast=/\b(?:jött|jöttem|jöttél|volt|voltam|mentem|ment|tanultam|tanult|beszéltem|beszélt)\b/iu;
 for(const [hu] of [...unit.lines,...unit.dialogue])assert.doesNotMatch(hu,earlyPast,
  `A1 optional reading ${index}: do not introduce unprepared past-tense forms`);
}
assert.match(units[9].questions[0][0],/német vagy magyar/,'nationality reading asks about a structure taught in A1');
assert.equal(units[9].dialogue[0][1],'Привет! Ты русская?','Anna is addressed with accurate Russian gender');

window.TanmuhelyRenderA1LongReadings('A1',1);
assert.equal(placed?.tag,'details');
assert.equal(placed.id,'a1LongReading');
assert.equal(placed.open,undefined,'the extra reference must stay collapsed by default');
assert.equal(placed.querySelectorAll('li').length,3,'pre-reading explanation appears before the exercise');
assert.equal(placed.querySelectorAll('h5')[0].textContent,'Перед чтением: три полезные формы');
const buttons=placed.querySelectorAll('button');
assert.equal(buttons.filter(button=>button.className==='a1-reading-play-line').length,23,'15+8 Hungarian lines must be individually playable');
assert.equal(buttons.filter(button=>button.className==='a1-reading-play-all').length,2,'both full text and dialogue must be playable');
const russian=placed.querySelectorAll('p').filter(item=>item.lang==='ru');
assert.equal(russian.length,23);
assert.ok(russian.every(item=>item.hidden),'translations remain hidden until requested');
const full=buttons.find(button=>button.className==='a1-reading-play-all');
full.onclick();
assert.equal(played.length,1);
assert.equal(played[0].lang,'hu-HU');
assert.equal(played[0].rate,.85);
assert.match(played[0].text,/Anna vagyok/);
const audioStatus=placed.querySelectorAll('p').find(item=>item.className==='a1-long-reading-audio-status');
assert.match(audioStatus.textContent,/Запрашиваем озвучивание/,'a request is not proof of audible playback');
played[0].onerror({error:'synthesis-failed'});
assert.match(audioStatus.textContent,/Не удалось воспроизвести/,'the learner must see the actual TTS failure');
const single=buttons.find(button=>button.className==='a1-reading-play-line');
single.onclick();
assert.equal(played[1].text,'Anna vagyok.');
played[1].onstart();assert.match(audioStatus.textContent,/Воспроизводится/);
played[1].onend();assert.match(audioStatus.textContent,/Воспроизведение завершено/);
const toggle=buttons.find(button=>button.className==='a1-reading-translate');
toggle.onclick();assert.ok(russian.every(item=>!item.hidden),'one control reveals translations for both text and dialogue');
toggle.onclick();assert.ok(russian.every(item=>item.hidden),'translations can be hidden again');
const choices=buttons.filter(button=>button.className==='integrated-answer');
assert.equal(choices.length,6);
choices[1].onclick();
const answerFeedback=placed.querySelectorAll('p').find(item=>item.className==='a1-reading-feedback');
assert.match(answerFeedback.textContent,/Правильный ответ: В школе\./);
assert.doesNotMatch(answerFeedback.textContent,/\.\./,'a correct answer ending with a period must not gain another');
choices[0].onclick();
assert.match(answerFeedback.textContent,/✓ Верно: В школе\./);
assert.doesNotMatch(answerFeedback.textContent,/\.\./);
window.TanmuhelyRenderA1LongReadings('A2',1);
assert.equal(placed,null,'A2 never receives A1 supplementary content');

assert.match(html,/a1-tematikus-szovegek\.js\?v=20261123-a1-guidance1/);
assert.match(css,/\.a1-long-reading \.a1-reading-play-line/);
assert.match(css,/\.a1-reading-preparation/);
assert.match(css,/@media \(max-width: 700px\)/);
console.log('PASS: eleven A1 topics, 165 paired sentences, 88 dialogue turns and 22 valid comprehension questions.');
console.log('PASS: early A1 readings explain nine advanced forms in Russian; no premature past tense in the 11 topic texts.');
console.log('PASS: bilingual translations stay hidden; 253 selectable Hungarian audio items + 22 full-reading players use the existing voice engine.');
console.log('PASS: failed voice playback is never reported as success; comprehension feedback names the correct answer; A2 remains untouched.');
