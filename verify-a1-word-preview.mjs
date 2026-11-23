import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const preview=source.match(/function renderA1WordPreview\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(preview,'A1 needs a word-stage preview before the first flashcard');
assert.match(source,/renderWords\(\);renderA1WordPreview\(\);renderGrammarExamples\(\)/,
 'the beginner should see examples at the word stage, not only before the later dialogue');

class Node {
 constructor(tag,value,cl){this.tag=tag;this.textContent=value??'';this.className=cl??'';this.children=[];this.hidden=false;this.lang='';this.id='';}
 append(...items){this.children.push(...items)}
 replaceChildren(...items){this.children=[];this.append(...items)}
 setAttribute(key,value){(this.attributes??={})[key]=value}
}
const nodes=[];
const el=(...args)=>{const node=new Node(...args);nodes.push(node);return node};
const position=[];
const flash={previousElementSibling:{before(node){position.push(node)}}};
const $=id=>id==='integratedFlashcard'?flash:nodes.find(node=>node.id===id);
const first={preparation:[
 ['Szia!','Привет!','Приветствие при неформальном общении.'],
 ['Hogy vagy?','Как дела?','Вопрос о самочувствии.'],
 ['Jól vagyok.','У меня всё хорошо.','Простой ответ на вопрос.'],
 ['Köszönöm.','Спасибо.','Заключительная фраза.']
]};
const second={preparation:[
 ['Ki ez?','Кто это?','Вопрос о человеке.'],
 ['Ő az anyukám.','Это моя мама.','Ő — он или она.'],
 ['Ez a családom.','Это моя семья.','Család — семья.']
]};
let active=first,spoken='';
let soundAvailable=true;
const state={level:'A1',lesson:()=>active,$,el,say:hu=>{spoken=hu;return soundAvailable}};
const render=runInNewContext(`${preview}\nrenderA1WordPreview`,state);
render();
const panel=$('a1WordPreview');
assert.equal(position.length,1,'the preview inserts before the word-card instructions');
assert.equal(panel.open,true,'novices should see the explanations by default');
assert.equal(panel.hidden,false);
assert.equal(panel.children[2].tag,'ol');
assert.equal(panel.children[2].children.length,3,'only three prepared phrases are shown, not the entire glossary');
assert.match(panel.children[1].textContent,/Не нужно знать/,'no prior Hungarian vocabulary should be assumed');
const item=panel.children[2].children[0];
assert.equal(item.children[0].children[0].textContent,'Szia!');
assert.equal(item.children[0].children[0].lang,'hu');
assert.equal(item.children[0].children[1].textContent,'Привет!');
assert.equal(item.children[0].children[1].lang,'ru');
assert.equal(item.children[0].children[2].lang,'ru');
item.children[1].onclick();
assert.equal(spoken,'Szia!','every introductory phrase has a Hungarian playback action');
assert.match(panel.children[3].textContent,/Повторите вслух/,'the listening control gives a visible next action');
soundAvailable=false;
item.children[1].onclick();
assert.match(panel.children[3].textContent,/Звук не запустился/,'unavailable speech is not reported as a success');

active=second;render();
assert.equal(position.length,1,'lesson switches reuse the same panel');
assert.equal(panel.children[2].children[0].children[0].children[0].textContent,'Ki ez?',
 'the next lesson must not show stale phrases');
state.level='A2';render();
assert.equal(panel.hidden,true,'the frozen A2 teaching route is unchanged');
assert.match(readFileSync(new URL('./clean-interface.css',import.meta.url),'utf8'),/\.lesson-word-preview li/);
console.log('PASS: A1 word-stage preview teaches three existing bilingual phrases with listening and Russian explanations.');
console.log('PASS: lesson changes refresh the examples; A2 is unchanged; no saved student key is added.');
