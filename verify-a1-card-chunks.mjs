import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const extract=pattern=>{
 const matched=source.match(pattern)?.[0];
 assert.ok(matched,`Missing card-chunk function: ${pattern}`);
 return matched;
};
const required=extract(/function requiredCardCount\(\)\{[^\n]+\}/);
const chunks=extract(/function cardChunks\(\)\{[^\n]+\}/);
const resumeIndex=extract(/function resumeA1CardIndex\(\)\{[\s\S]*?\n\}/);
const renderer=extract(/function renderCardCheckpoint\(\)\{[\s\S]*?\n\}/);
const words=Array.from({length:12},(_,i)=>({hu:'magyar'+i,ru:'русский'+i}));

class Element {
 constructor(tag,text,cl){this.tag=tag;this.textContent=text??'';this.className=cl??'';this.children=[];this.hidden=false;this.id='';this.classes=new Set();this.classList={add:value=>this.classes.add(value)};}
 append(...items){for(const item of items){item.parent=this;this.children.push(item)}}
 after(item){const index=this.parent.children.indexOf(this);item.parent=this.parent;this.parent.children.splice(index+1,0,item)}
 replaceChildren(...items){this.children=[];this.append(...items)}
 setAttribute(key,value){(this.attributes??={})[key]=value}
}
const root=new Element('main'),flash=new Element('section');flash.id='integratedFlashcard';root.append(flash);
const find=(node,id)=>node.id===id?node:node.children.map(child=>find(child,id)).find(Boolean);
let saved=0,lastNote='',routeSaved=0,breaks=0;
const state={
 level:'A1',flippedWords:new Set([0,1,2,3]),checkedBatches:new Set(),
 a1FastTrackPassed:false,
 checkBatch:-1,checkStep:0,checkRendered:'',cardIndex:4,step:0,
 rows:()=>words,$:id=>find(root,id),el:(...args)=>new Element(...args),
 randomOrder:items=>[...items].reverse(),
 saveCheckpoint:()=>{saved++},
 save:()=>{routeSaved++},back:{click:()=>{breaks++}},
 note:message=>{lastNote=message},
 stepButton:{disabled:true}
};
const context=runInNewContext(`${required}\n${chunks}\n${renderer}\nfunction card(){renderCardCheckpoint()}\nfunction canAdvance(){return checkedBatches.size===2}\n({show:renderCardCheckpoint,store:checkedBatches})`,state);
context.show();
assert.equal(find(root,'a1CardCheckpoint').hidden,true,'the self-check waits for all five translations');
state.flippedWords.add(4);context.show();
assert.equal(find(root,'a1CardCheckpoint').hidden,false);
assert.match(find(root,'a1CardCheckPrompt').textContent,/Вопрос 1 из 2/);
const choose=(right=true)=>{
 const options=find(root,'a1CardCheckOptions').children;
 assert.equal(options.length,3,'three choices in each retrieval question');
 const target=Number(find(root,'a1CardCheckPrompt').textContent.match(/русский(\d+)/)?.[1]);
 const selected=options.find(x=>(Number(x.textContent.replace('magyar',''))===target)===right);
 assert.ok(selected,'a suitable answer is visible');selected.onclick();
};
choose(false);
assert.match(find(root,'a1CardCheckFeedback').textContent,/Пока неверно/,'incorrect answers receive a learning hint');
assert.equal(context.store.size,0,'a wrong answer cannot pass the check');
choose();
assert.match(find(root,'a1CardCheckPrompt').textContent,/Вопрос 2 из 2/);
choose();
assert.deepEqual([...context.store],[0]);
assert.equal(state.cardIndex,5,'second five-word pack opens after the first retrieval check');
assert.equal(find(root,'a1CardCheckpoint').hidden,true,'completed check disappears');
const pause=find(root,'a1CardBreak');
assert.ok(pause&&!pause.hidden,'after five taught words a break option must appear');
pause.onclick();
assert.equal(routeSaved,1,'pausing preserves the selected lesson and step');
assert.equal(breaks,1,'a voluntary break returns to the study menu');
for(const index of [5,6,7,8,9])state.flippedWords.add(index);
context.show();
assert.match(find(root,'a1CardCheckPrompt').textContent,/Блок 2/);
choose();choose();
assert.deepEqual([...context.store],[0,1]);
assert.equal(pause.hidden,true,'the five-word break suggestion disappears after finishing both groups');
assert.equal(state.stepButton.disabled,false,'the next learning stage opens only after both checks');
assert.match(lastNote,/Оба блока закреплены/);
assert.equal(saved,3,'both pack completions and the optional break are saved');

const suggested=(level,flipped,checked=[],quick=false)=>runInNewContext(`${required}\n${chunks}\n${resumeIndex}\nresumeA1CardIndex()`,{
 level,a1FastTrackPassed:quick,flippedWords:new Set(flipped),checkedBatches:new Set(checked),rows:()=>words
});
assert.equal(suggested('A1',[]),0,'brand-new A1 begins with the first card');
assert.equal(suggested('A1',[0,1]),2,'returning after two cards resumes the third');
assert.equal(suggested('A1',[0,1,2,3,4]),0,'a fully viewed but unchecked group reopens its own quiz');
assert.equal(suggested('A1',[0,1,2,3,4],[0]),5,'after the first retrieval check resume in the second group');
assert.equal(suggested('A1',[0,1,2,3,4,5,6,7],[0]),8,'second group resumes at its first unseen card');
assert.equal(suggested('A1',[],[],true),0,'fast-track has no forged card progress to restore');
assert.equal(suggested('A2',[0,1,2,3,4],[0]),0,'A2 keeps its previous card-start behavior');
assert.match(source,/restoreCheckpoint\(\);cardIndex=resumeA1CardIndex\(\);resumeQuiz\(\)/,
 'the actual workbook must use the restored A1 card position');

const legacy=extract(/function restoreCheckpoint\(\)\{[\s\S]*?\n\}/);
const restore=flipped=>runInNewContext(`${required}\n${chunks}\n${legacy}\nrestoreCheckpoint();([...checkedBatches])`,{
 level:'A1',rows:()=>words,lessonKey:()=> 'A1:2',
 checkpoint:()=>({flipped,written:[],grammar:false,dialogue:false}),
 flippedWords:new Set(),correctWriting:new Set(),checkedBatches:new Set(),
 checkBatch:0,checkStep:1,checkRendered:'question',grammarReviewed:false,dialoguePractised:false
});
assert.deepEqual([...restore([0,1,2,3,4,5,6,7,8,9])],[0,1],
 'a fully reviewed legacy ten-card checkpoint is accepted without repeating the new quizzes');
assert.deepEqual([...restore([0,1,2,3,4,5,6])],[0],
 'a legacy learner already studying the second half retains access to it');
console.log('PASS: A1 retrieval checks appear only after each five-card pack and require two correct answers.');
console.log('PASS: wrong choices offer feedback; the second pack and next stage remain gated.');
console.log('PASS: saved legacy word progress resumes without a new lesson ID; A2 is unchanged.');
console.log('PASS: five-word breaks save the stage; reopening continues at the next unseen card.');
