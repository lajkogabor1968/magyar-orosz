(()=>{'use strict';
const all=window.ECL_DIALOGUES||[],$=s=>document.getElementById(s);let mode='read',level='A2',lesson=null,checked=false,slow=false,seq=0;
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const show=(id,yes)=>$(id).classList.toggle('hidden',!yes);
const compatible=l=>all.filter(x=>x.level===l||(l==='A2'&&x.level==='A2–B1')||(l==='B1'&&x.level==='A2–B1'));
function restore(){try{return JSON.parse(localStorage.getItem('hu-ru-ecl-progress')||'{}')}catch{return {}}}
function saveScore(kind,result,max){const s=restore();s[lesson.id+'-'+kind]={result,max,date:new Date().toISOString()};try{localStorage.setItem('hu-ru-ecl-progress',JSON.stringify(s))}catch{}renderStats()}
function renderStats(){const s=restore(),parts=Object.values(s);$('stats').textContent=`${parts.length} befejezett feladatsor · ${parts.reduce((a,b)=>a+(b.result||0),0)} / ${parts.reduce((a,b)=>a+(b.max||0),0)} pont összesen`}
function stop(){seq++;if('speechSynthesis'in window)TanuloTTS.cancel();$('audioStatus').textContent=''}
function speak(){if(!('speechSynthesis'in window)){$('audioStatus').textContent='A készüléken nem elérhető a hangos felolvasás.';return}stop();const token=seq,lines=lesson.lines.map(([speaker,text])=>text);let i=0;function next(){if(token!==seq)return;if(i>=lines.length){$('audioStatus').textContent='A párbeszéd véget ért.';return}const utter=new SpeechSynthesisUtterance(lines[i]);utter.lang='hu-HU';utter.rate=slow?0.72:0.88;utter.onend=()=>{i++;next()};utter.onerror=()=>{$('audioStatus').textContent='A felolvasás megszakadt. Ellenőrizd a magyar beszédhangot.'};$('audioStatus').textContent=`Magyar felolvasás: ${i+1}/${lines.length}. megszólalás`;TanuloTTS.speak(utter)}next()}
function changeLevel(l){level=l;stop();const matches=compatible(l);$('lesson').replaceChildren();for(const item of matches){const option=document.createElement('option');option.value=item.id;option.textContent=`${item.id}. ${item.title}`;$('lesson').append(option)}$('levelNote').textContent=l==='A1'?'A most hozzáadott ECL-párbeszédek A2–B1 szintűek. Az A1 eredeti gyakorlókat a korábbi modulban találod.':l==='B2'?'A most hozzáadott ECL-párbeszédek legfeljebb B1 szintűek. A B2 eredeti gyakorlókat a korábbi modulban találod.':`${matches.length} párbeszéd választható ezen a szinten.`;$('lesson').disabled=!matches.length;if(matches.length){lesson=matches[0];render()}else{lesson=null;$('lessonTitle').textContent='Ehhez a szinthez a mellékletben nincs új párbeszéd.';$('lessonIntro').textContent='Válaszd az A2 vagy a B1 szintet, vagy térj vissza a korábbi gyakorlókhoz.';$('transcript').replaceChildren();$('exercise').replaceChildren();$('talk').textContent='';$('feedback').textContent='';show('check',false);show('reveal',false);show('audio',false);$('lessonTag').textContent=l}}
function chooseLesson(id){stop();lesson=all.find(x=>x.id===Number(id));render()}
function makeQuestion(q,i){const div=document.createElement('div');div.className='question';const h=document.createElement('h3');h.textContent=`${i+1}. ${q.q}`;div.append(h);const group=document.createElement('div');group.className='answers';q.options.forEach((o,j)=>{const label=document.createElement('label'),input=document.createElement('input');input.type='radio';input.name='q'+i;input.value=j;const span=document.createElement('span');span.textContent=o;label.append(input,span);group.append(label)});div.append(group);return div}
function renderLines(tr,withRussianHelp){
  tr.replaceChildren();
  lesson.lines.forEach(([name,phrase],index)=>{
    const line=document.createElement('div');line.className='line';
    const speaker=document.createElement('strong');speaker.textContent=name+': ';
    line.append(speaker,document.createTextNode(phrase));
    if(withRussianHelp&&lesson.translations?.[index]){
      const russian=document.createElement('p');russian.className='ru-translation hidden';russian.lang='ru';
      russian.textContent=lesson.translations[index];line.append(russian);
    }
    tr.append(line);
  });
  if(!withRussianHelp)return;
  if(Array.isArray(lesson.translations)&&lesson.translations.length===lesson.lines.length){
    const toggle=document.createElement('button');toggle.type='button';
    toggle.textContent='🇷🇺 Orosz fordítás megjelenítése / Показать перевод';
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click',()=>{
      const open=toggle.getAttribute('aria-expanded')!=='true';
      toggle.setAttribute('aria-expanded',String(open));
      toggle.textContent=open?'🇷🇺 Orosz fordítás elrejtése / Скрыть перевод':'🇷🇺 Orosz fordítás megjelenítése / Показать перевод';
      tr.querySelectorAll('.ru-translation').forEach(node=>node.classList.toggle('hidden',!open));
    });
    tr.prepend(toggle);
  }
  if(Array.isArray(lesson.glossary)&&lesson.glossary.length){
    const details=document.createElement('details');details.className='vocabulary-help';
    const summary=document.createElement('summary');summary.textContent='Magyar–orosz szószedet / Венгерско-русский словарь';
    details.append(summary);
    for(const [hungarian,russian]of lesson.glossary){
      const row=document.createElement('p');
      const word=document.createElement('strong');word.textContent=hungarian;
      const meaning=document.createElement('span');meaning.lang='ru';meaning.textContent=' — '+russian;
      row.append(word,meaning);details.append(row);
    }
    tr.append(details);
  }
  if(Array.isArray(lesson.sources)&&lesson.sources.length){
    const details=document.createElement('details');details.className='vocabulary-help';
    const summary=document.createElement('summary');summary.textContent='Hivatalos tájékoztatók / Официальные источники';
    details.append(summary);
    for(const source of lesson.sources){
      const p=document.createElement('p'),link=document.createElement('a');
      link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=source.label;
      p.append(link);details.append(p);
    }
    tr.append(details);
  }
}
function renderSpeaking(){
  const talk=$('talk');talk.replaceChildren();
  const heading=document.createElement('strong');heading.textContent='Beszédgyakorlat: '+lesson.speaking;talk.append(heading);
  if(lesson.speakingRu){const p=document.createElement('p');p.lang='ru';p.textContent=lesson.speakingRu;talk.append(p)}
  if(lesson.note){const p=document.createElement('p');p.className='small';p.textContent='Fontos: '+lesson.note;talk.append(p)}
  if(lesson.noteRu){const p=document.createElement('p');p.className='small';p.lang='ru';p.textContent='Важно: '+lesson.noteRu;talk.append(p)}
}
function render(){if(!lesson)return;checked=false;$('feedback').textContent='';show('check',true);show('reveal',false);show('audio',true);$('lessonTag').textContent=lesson.level;$('lessonTitle').textContent=lesson.title;$('lessonIntro').textContent=`${lesson.lines.length} megszólalás · ${mode==='grammar'?'Nyelvtani gyakorlás':mode==='listen'?'Hallott szövegértés':'Olvasott szövegértés'}`;
const tr=$('transcript');tr.replaceChildren();if(mode==='read'){renderLines(tr,true)}else if(mode==='listen'){const p=document.createElement('p');p.className='task';p.textContent='Először hallgasd meg a magyar párbeszédet! A szöveg a válaszok ellenőrzése után válik olvashatóvá.';tr.append(p)}else{const p=document.createElement('p');p.className='small';p.textContent='Gyakorold a párbeszédhez tartozó nyelvtani szerkezetet!';tr.append(p)}
const qs=mode==='grammar'?[lesson.grammar]:lesson.questions,box=$('exercise');box.replaceChildren();qs.forEach((q,i)=>box.append(makeQuestion(q,i)));renderSpeaking();renderStats()}
function check(){if(!lesson||checked)return;const qs=mode==='grammar'?[lesson.grammar]:lesson.questions;let score=0;qs.forEach((q,i)=>{const choice=document.querySelector('input[name=q'+i+']:checked');if(choice&&Number(choice.value)===q.answer)score++});checked=true;const out=$('feedback');out.className='feedback '+(score===qs.length?'ok':'bad');out.textContent=`Eredmény: ${score}/${qs.length} pont. `+qs.map((q,i)=>`${i+1}. ${q.options[q.answer]}${q.explain?' — '+q.explain:''}`).join(' | ');saveScore(mode,score,qs.length);show('check',false);if(mode==='listen')show('reveal',true);document.querySelectorAll('#exercise input').forEach(x=>x.disabled=true)}
function reveal(){if(!lesson)return;renderLines($('transcript'),true);show('reveal',false)}
$('level').addEventListener('change',e=>changeLevel(e.target.value));$('lesson').addEventListener('change',e=>chooseLesson(e.target.value));document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('selected',x===b));render()}));$('check').addEventListener('click',check);$('reveal').addEventListener('click',reveal);$('speak').addEventListener('click',speak);$('stop').addEventListener('click',stop);$('slow').addEventListener('click',()=>{slow=!slow;$('slow').textContent=`🐢 Lassú felolvasás: ${slow?'be':'ki'}`});window.addEventListener('pagehide',stop);$('level').value='A2';changeLevel('A2');
const deepLinkId=Number(new URLSearchParams(window.location.search).get('lesson'));
const deepLinkLesson=compatible('A2').find(item=>item.id===deepLinkId);
if(deepLinkLesson){$('lesson').value=String(deepLinkId);chooseLesson(deepLinkId)}
})();
