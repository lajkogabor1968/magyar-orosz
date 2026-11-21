/* A1–A2 independent study guide. Uses existing progress without changing it. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const panel=$('coachView'), open=$('coachOpen'), steps=$('coachSteps'), back=$('studyBack');
  if(!panel||!open||!steps||!back)return;
  const root=document.documentElement;
  const KEY='magyarorosz.coach.v1';
  const DAY=86400000;
  function read(key,fallback){try{const x=JSON.parse(localStorage.getItem(key)||'null');return x&&typeof x==='object'?x:fallback}catch(_){return fallback}}
  function level(){return document.querySelector('.welcome .level.active')?.dataset.level||'A1'}
  function today(){const now=new Date();return now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0')}
  function openSection(view,actionId){
    panel.hidden=true;root.classList.remove('study-coach');
    const tab=document.querySelector('.tab[data-view="'+view+'"]');
    tab?.click();root.classList.add('study-active');back.hidden=false;
    if(actionId)document.getElementById(actionId)?.click();
    window.scrollTo(0,0);
  }
  function getSummary(lvl){
    const saved=read('magyarorosz.v1',{});
    const rows=window.MAGYAR_OROSZ_DATA?.[lvl]||[];
    const ids=new Set(rows.map((_,i)=>lvl+':'+i));
    const mistakes=Object.keys(saved.mistakes||{}).filter(id=>ids.has(id)&&(saved.mistakes[id]));
    const sentenceMistakes=Object.keys(saved.sentenceMistakes||{}).filter(id=>ids.has(id)&&(saved.sentenceMistakes[id]));
    const review=saved.reviewSchedule||{},now=Date.now();
    const due=(type)=>Object.entries(review[type]||{}).filter(([id,time])=>ids.has(id)&&Number(time)>0&&Number(time)<=now).length;
    const stats=(saved.levelStats||{})[lvl]||{};
    const attempts=Number(stats.all?.total)||0;
    const correct=Number(stats.all?.correct)||0;
    return {mistakes:mistakes.length,sentenceMistakes:sentenceMistakes.length,dueWords:due('quiz'),dueSentences:due('sentences'),attempts,accuracy:attempts?Math.round(100*correct/attempts):null};
  }
  function render(){
    const lvl=level(),summary=getSummary(lvl);
    const key=today()+':'+lvl;
    const history=read(KEY,{});
    const completed=Array.isArray(history[key])?history[key]:[];
    $('coachIntro').textContent='Уровень '+lvl+' · Короткий план на 15 минут. Вы можете проходить занятия в своём темпе.';
    steps.replaceChildren();
    const tasks=[];
    if(summary.dueWords||summary.dueSentences){
      tasks.push({title:'Повторение',time:'4 минуты',description:'Сегодня нужно повторить: '+summary.dueWords+' слов и '+summary.dueSentences+' предложений.',target:'review',action:summary.dueWords?'reviewDueWords':'reviewDueSentences'});
    }else if(summary.mistakes||summary.sentenceMistakes){
      tasks.push({title:'Работа над ошибками',time:'4 минуты',description:'Вернитесь к трудным словам и предложениям.',target:'review',action:summary.mistakes?'reviewMistakes':'reviewSentenceMistakes'});
    }else tasks.push({title:'Короткое повторение',time:'4 минуты',description:'Повторите слова по карточкам.',target:'cards'});
    tasks.push({title:'Изучение нового',time:'5 минут',description:'Прочитайте правило или урок, затем разберите примеры.',target:'contrast'});
    tasks.push({title:'Практика',time:'3 минуты',description:'Закрепите новые слова и предложения.',target:'quiz',action:'startNewWords'});
    tasks.push({title:'Разговор по-венгерски',time:'3 минуты',description:'Послушайте собеседника и ответьте вслух. Если микрофон недоступен, используйте письменный ответ.',target:'speaking'});
    tasks.forEach((task,i)=>{
      const item=document.createElement('section');item.className='coach-step';
      const header=document.createElement('div');header.className='coach-step-heading';
      const title=document.createElement('strong');title.textContent=(i+1)+'. '+task.title;
      const duration=document.createElement('small');duration.textContent=task.time;
      header.append(title,duration);
      const desc=document.createElement('p');desc.textContent=task.description;
      const actions=document.createElement('div');actions.className='coach-step-actions';
      const go=document.createElement('button');go.type='button';go.textContent='Начать →';
      go.addEventListener('click',()=>{
        if(task.target==='speaking')location.href=(lvl==='A2'?'a2.html':'a1.html')+'#spokenDialogue';
        else openSection(task.target,task.action);
      });
      const done=document.createElement('button');done.type='button';done.className='secondary';
      const mark=completed.includes(i);
      done.textContent=mark?'✓ Выполнено':'Отметить как выполненное';
      done.setAttribute('aria-pressed',String(mark));
      done.addEventListener('click',()=>{
        const current=read(KEY,{});
        const list=new Set(Array.isArray(current[key])?current[key]:[]);
        if(list.has(i))list.delete(i);else list.add(i);
        current[key]=[...list].sort((a,b)=>a-b);
        try{localStorage.setItem(KEY,JSON.stringify(current))}catch(_){}
        render();
      });
      actions.append(go,done);item.append(header,desc,actions);steps.append(item);
    });
    const next=tasks.filter((_,i)=>!completed.includes(i)).length;
    $('coachFeedback').textContent=next===0?'Отлично! План на сегодня выполнен. Завтра продолжим.':'Выполнено '+(tasks.length-next)+' из '+tasks.length+'. Отмечайте этапы после практики.';
    if(summary.accuracy!==null){
      $('coachFeedback').textContent+=' В предыдущих заданиях: '+summary.accuracy+'% правильных ответов ('+summary.attempts+' попыток).';
    }
  }
  open.addEventListener('click',()=>{
    if(!['A1','A2'].includes(level()))return;
    root.classList.remove('study-menu','study-active','study-daily','study-exam','study-online');
    root.classList.add('study-coach');
    $('onlineLessonView').hidden=true;$('examView').hidden=true;
    $('studyHub').hidden=true;panel.hidden=false;back.hidden=false;
    render();window.scrollTo(0,0);
  });
  back.addEventListener('click',()=>{root.classList.remove('study-coach');panel.hidden=true});
  $('landingStart')?.addEventListener('click',()=>{root.classList.remove('study-coach');panel.hidden=true});
  document.querySelector('.landing-back')?.addEventListener('click',()=>{root.classList.remove('study-coach');panel.hidden=true});
  document.querySelectorAll('.welcome .level').forEach(button=>button.addEventListener('click',()=>{open.hidden=!['A1','A2'].includes(level())}));
  open.hidden=!['A1','A2'].includes(level());
})();
