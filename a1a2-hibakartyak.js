/* A1–A2: Russian-speaker contrastive exercises, free-text correction and targeted review. */
(()=>{'use strict';
const cards=[
{id:'article',level:'A1',lessons:[0,1,4],title:'Артикли: a/az и egy',wrong:'Ez telefon.',right:'Ez egy telefon.',why:'В русском языке нет артиклей. Здесь перед существительным нужен egy.'},
{id:'vowels',level:'A1',lessons:[0,3,5],title:'Долгие гласные',wrong:'Ez viz.',right:'Ez víz.',why:'В словарной форме víz пишется с í; но в форме vizet гласная краткая.'},
{id:'place',level:'A1',lessons:[3,7],title:'Где находится предмет?',wrong:'A kulcs az asztalban van.',right:'A kulcs az asztalon van.',context:'Переведите ситуацию правильно: «Ключ лежит НА столе». Исходная фраза грамматически возможна, но означает, что ключ находится ВНУТРИ стола.',why:'Если ключ лежит НА столе, нужен -on: az asztalon. Форма az asztalban означает «внутри стола» и не подходит к описанной ситуации.'},
{id:'harmony',level:'A1',lessons:[3,7],title:'Гармония гласных',wrong:'A kertban vagyok.',right:'A kertben vagyok.',why:'После гласной переднего ряда в kert используется -ben.'},
{id:'move',level:'A2',lessons:[0,1],title:'Где? Куда?',wrong:'Az iskolában megyek.',right:'Az iskolába megyek.',why:'Hová? (куда?) → iskolába. Hol? (где?) → iskolában.'},
{id:'past',level:'A2',lessons:[0,2],title:'Прошедшее время',wrong:'Tegnap tanulok.',right:'Tegnap tanultam.',why:'Для события, произошедшего вчера, требуется прошедшее время: tanultam.'},
{id:'conjugation',level:'A2',lessons:[0,2],title:'Определённое и неопределённое спряжение',wrong:'Olvasok a könyvet.',right:'Olvasom a könyvet.',why:'a könyvet — определённое дополнение, поэтому olvasom. Сравните: Olvasok egy könyvet.'}
];
const progressKey='magyarorosz.error-card-progress.v1';
const normalize=s=>String(s||'').normalize('NFC').toLocaleLowerCase('hu-HU').trim().replace(/[.!?]+$/g,'').replace(/\s+/g,' ');
const read=()=>{try{const d=JSON.parse(localStorage.getItem(progressKey)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch(_){return {}}};
const save=d=>{try{localStorage.setItem(progressKey,JSON.stringify(d))}catch(_){}};
const node=(tag,value,cls)=>{const e=document.createElement(tag);if(value!==undefined)e.textContent=value;if(cls)e.className=cls;return e};
function statusFor(data,id){
 const raw=data[id];
 return raw&&typeof raw==='object'?{attempts:Number(raw.attempts)||0,wrong:Number(raw.wrong)||0,correct:Number(raw.correct)||0,lastWrongAt:Number(raw.lastWrongAt)||0}: {attempts:0,wrong:0,correct:0,lastWrongAt:0};
}
function scoreCard(c,correct){
 const data=read(),state=statusFor(data,c.id);
 state.attempts++;if(correct)state.correct++;else{state.wrong++;state.lastWrongAt=Date.now();}
 data[c.id]=state;save(data);return state;
}
window.TanmuhelyRenderErrorCards=function(level,index){
 const anchor=document.getElementById('integratedGrammarExamples');if(!anchor)return;
 document.getElementById('tanmuhelyErrorCards')?.remove();
 let selected=cards.filter(c=>c.level===level&&c.lessons.includes(index));
 if(!selected.length)return;
 const data=read();
 selected.sort((a,b)=>{
  const x=statusFor(data,a.id),y=statusFor(data,b.id);
  return (y.wrong-y.correct)-(x.wrong-x.correct);
 });
 const section=node('section',undefined,'lesson-error-cards');section.id='tanmuhelyErrorCards';
 section.append(node('h4','Найдите и исправьте ошибку или неточность'));
 section.append(node('p','Напишите правильное предложение по-венгерски. При ошибке карточка будет предложена снова.'));
 for(const c of selected){
  const card=node('article',undefined,'error-card');
  card.append(node('h4',c.title));
  if(c.context)card.append(node('p',c.context));
  const wrong=node('p',c.wrong);wrong.lang='hu';card.append(wrong);
  const label=node('label','Исправьте предложение:');const input=node('input');input.type='text';input.lang='hu';input.autocomplete='off';input.spellcheck=false;
  const id='error-answer-'+c.id;input.id=id;label.htmlFor=id;
  const check=node('button','Проверить');check.type='button';
  const reveal=node('button','Показать объяснение');reveal.type='button';reveal.className='secondary';
  const feedback=node('p');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
  const explanation=node('div',undefined,'error-card-answer');explanation.hidden=true;
  const right=node('strong',c.right);right.lang='hu';explanation.append(right,node('p',c.why));
  const past=statusFor(data,c.id);
  const stats=node('small','Верных ответов: '+past.correct+' · ошибок: '+past.wrong);
  let answered=false;
  const submit=()=>{
   if(answered||!input.value.trim())return;
   answered=true;const ok=normalize(input.value)===normalize(c.right);
   const next=scoreCard(c,ok);
   stats.textContent='Верных ответов: '+next.correct+' · ошибок: '+next.wrong;
   feedback.textContent=ok?'✓ Верно!':'✗ Пока неверно. Изучите объяснение и повторите позже.';
   explanation.hidden=ok;check.disabled=true;
   if(ok){input.disabled=true;}else{const retry=node('button','Попробовать ещё раз');retry.type='button';retry.onclick=()=>{answered=false;check.disabled=false;input.value='';input.focus();};card.append(retry);}
  };
  check.onclick=submit;input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submit();}});
  reveal.onclick=()=>{explanation.hidden=!explanation.hidden;reveal.textContent=explanation.hidden?'Показать объяснение':'Скрыть объяснение'};
  card.append(label,input,check,reveal,feedback,explanation,stats);section.append(card);
 }
 anchor.insertAdjacentElement('afterend',section);
};
window.TanmuhelyErrorCardOverview=()=>cards.map(c=>({id:c.id,level:c.level,title:c.title,...statusFor(read(),c.id)})).sort((a,b)=>(b.wrong-b.correct)-(a.wrong-a.correct));
})();