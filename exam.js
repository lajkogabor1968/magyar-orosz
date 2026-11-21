/* Уровневые экзамены: стабильный ключ, случайная выборка, рекомендуемый ориентир 90%.
   Оценка словарного запаса и понимания предложений; не сертификат CEFR. */
(() => {
  'use strict';
  const LEVELS = ['A1','A2','B1','B2'];
  const KEY = 'magyarorosz.level-exams.v1';
  const PASS = 90, COUNT = 40;
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (_) { state = {}; }
  if (!state.passed || typeof state.passed !== 'object') state.passed = {};
  if (!Array.isArray(state.history)) state.history = [];
  const $ = id => document.getElementById(id);
  const rows = level => (window.MAGYAR_OROSZ_DATA?.[level] || [])
    .filter(r => Array.isArray(r) && r.length >= 4 && r.every(x => typeof x === 'string' && x.trim()))
    .map(r => ({hu:r[0].trim(),ru:r[1].trim(),sentence:r[2].trim(),translation:r[3].trim()}));
  const random = size => {
    if (window.crypto?.getRandomValues) {
      const n = new Uint32Array(1); window.crypto.getRandomValues(n); return n[0] % size;
    }
    return Math.floor(Math.random() * size);
  };
  const shuffle = source => {
    const a = [...source];
    for (let i = a.length-1; i > 0; i--) { const j=random(i+1); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  };
  // A szintek szabadon választhatók; a 90% csak pedagógiai ajánlás.
  const canAccess = level => LEVELS.includes(level);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} };
  const root = $('examView');
  const status = $('examStatus');
  const questionEl = $('examQuestion');
  const optionsEl = $('examOptions');
  const progress = $('examProgress');
  const submit = $('examSubmit');
  const retry = $('examRetry');
  const open = $('examOpen');
  let run = null;
  const labels = {word:'Слова: перевод с венгерского',reverse:'Слова: перевод на венгерский',sentence:'Понимание предложений'};
  const clean = s => s.replace(/\s+/g,' ').trim();
  function bank(level, kind, count) {
    const data = rows(level);
    const answerKey = kind === 'reverse' ? 'hu' : kind === 'sentence' ? 'translation' : 'ru';
    const promptKey = kind === 'reverse' ? 'ru' : kind === 'sentence' ? 'sentence' : 'hu';
    const answersByPrompt = new Map();
    for (const row of data) {
      const prompt = clean(row[promptKey]).normalize('NFC').toLocaleLowerCase();
      if (!answersByPrompt.has(prompt)) answersByPrompt.set(prompt, new Set());
      answersByPrompt.get(prompt).add(clean(row[answerKey]));
    }
    const seen = new Set();
    const entries = shuffle(data).filter(row => {
      const prompt = clean(row[promptKey]).normalize('NFC').toLocaleLowerCase();
      const beginners = level === 'A1' || level === 'A2';
      const signature = beginners ? prompt : clean(row[promptKey]) + '|' + clean(row[answerKey]);
      if (seen.has(signature) || (beginners && answersByPrompt.get(prompt).size !== 1)) return false;
      seen.add(signature); return true;
    });
    const answerPool = [...new Set(data.map(r=>r[answerKey]))];
    return entries.slice(0,count).map(row => {
      const correct = row[answerKey];
      const distractors = shuffle(answerPool.filter(v=>v!==correct && v!==row[promptKey])).slice(0,3);
      if (distractors.length < 3) return null;
      return {kind, prompt:row[promptKey],answer:correct,options:shuffle([correct,...distractors])};
    }).filter(Boolean);
  }
  function build(level) {
    const sets = [bank(level,'word',15),bank(level,'reverse',15),bank(level,'sentence',10)];
    if (sets[0].length < 15 || sets[1].length < 15 || sets[2].length < 10) return null;
    return shuffle(sets.flat());
  }
  function updateLocks() {
    document.querySelectorAll('input[name="landingLevel"]').forEach(input => {
      input.disabled = false;
      input.closest('label')?.classList.remove('level-locked');
      input.closest('label')?.removeAttribute('title');
    });
    document.querySelectorAll('.welcome .level[data-level]').forEach(button => {
      button.disabled = false;
      button.removeAttribute('title');
    });
    if (open) {
      const level = currentLevel();
      open.textContent = 'Итоговый экзамен ' + level + (state.passed[level]?' ✓':'');
    }
  }
  function currentLevel() {
    return document.querySelector('.welcome .level.active')?.dataset.level || 'A1';
  }
  function feedback(questions, answers, percent) {
    const types = [
      {kind:'word', name:'Понимание венгерских слов', action:'Повторите значения слов: слушайте произношение и подбирайте русский перевод.', view:'list'},
      {kind:'reverse', name:'Воспроизведение венгерских слов', action:'Повторите венгерские слова по русскому переводу; произносите их вслух и проверяйте написание.', view:'cards'},
      {kind:'sentence', name:'Понимание венгерских предложений', action:'Читайте короткие венгерские предложения, находите знакомые конструкции и проверяйте перевод.', view:'sentences'}
    ];
    const byType = types.map(type => {
      const ids = questions.map((q,i)=>q.kind===type.kind?i:-1).filter(i=>i>=0);
      const right=ids.filter(i=>answers[i]===questions[i].answer).length;
      const incorrect=ids.filter(i=>answers[i]!==questions[i].answer);
      return {...type, right, total:ids.length, incorrect, percent:ids.length?Math.round(100*right/ids.length):0};
    });
    const priorities=[...byType].filter(x=>x.incorrect.length).sort((a,b)=>a.percent-b.percent);
    const good=byType.filter(x=>x.percent>=90).map(x=>x.name);
    let intro;
    if(percent>=90) intro='Отличная работа! Вы уверенно справились с заданиями этого уровня. Достигнут рекомендуемый ориентир 90%. Продолжайте повторять знакомые слова и конструкции.';
    else if(percent>=75) intro='Хороший результат! Вы уже многое знаете. Перед переходом рекомендуем укрепить несколько навыков и достичь 90%.';
    else if(percent>=50) intro='У вас уже есть основа. Пока некоторые задания вызывают затруднения; это нормально на этапе обучения. Повторите указанные ниже темы и попробуйте снова.';
    else intro='Сейчас полезнее сосредоточиться на основах: закрепить знакомые слова и короткие предложения, затем вернуться к экзамену. Продвигайтесь небольшими шагами.';
    const tasks=priorities.slice(0,2).map(x=>({
      label:x.name+' — '+x.right+'/'+x.total+' ('+x.percent+'%)',
      description:x.action,
      view:x.view
    }));
    if(!tasks.length) tasks.push({label:'Закрепление изученного',description:'Повторите лексику и предложения перед переходом к следующему уровню.',view:'review'});
    return {intro,good,tasks,byType};
  }
  function showFeedback(result) {
    const container=$('examFeedback');
    if(!container)return;
    container.replaceChildren();
    const heading=document.createElement('h3'); heading.textContent='Ваши результаты и план занятий';
    const intro=document.createElement('p'); intro.textContent=result.intro;
    container.append(heading,intro);
    if(result.good.length) {
      const strong=document.createElement('p');
      strong.textContent='Сильные стороны: '+result.good.join('; ')+'.';
      container.append(strong);
    }
    const title=document.createElement('h4');title.textContent='Что делать дальше';
    container.append(title);
    const list=document.createElement('ol');
    result.tasks.forEach(task => {
      const li=document.createElement('li');
      const label=document.createElement('strong');label.textContent=task.label;
      const description=document.createElement('p');description.textContent=task.description;
      const button=document.createElement('button');
      button.type='button';button.textContent='Перейти к практике →';
      button.addEventListener('click',()=>{
        document.getElementById('studyBack')?.click();
        document.querySelector('[data-hub-view="'+task.view+'"]')?.click();
      });
      li.append(label,description,button);list.append(li);
    });
    container.append(list);
    container.hidden=false;
  }
  function render() {
    if (!run) return;
    const item = run.questions[run.index];
    if (!item) {
      const correct=run.answers.filter((answer,i)=>answer===run.questions[i].answer).length;
      const percent=Math.round(correct*100/run.questions.length);
      const passed=percent>=PASS;
      state.history.push({level:run.level,correct,total:run.questions.length,percent,passed,date:new Date().toISOString()});
      state.history=state.history.slice(-60);
      if(passed) state.passed[run.level]=true;
      save(); updateLocks();
      showFeedback(feedback(run.questions,run.answers,percent));
      questionEl.textContent = '';
      optionsEl.replaceChildren();
      progress.textContent = 'Экзамен завершён';
      submit.hidden=true; retry.hidden=false;
      status.textContent = correct + ' из ' + run.questions.length + ' · ' + percent + '%. ' +
        (passed?'Отличный результат! Можно уверенно переходить к следующему уровню.':'Рекомендуем набрать не менее 90% перед переходом. Вы можете продолжить обучение или повторить материал.');
      if(passed && run.level!=='B2') {
        const next=LEVELS[LEVELS.indexOf(run.level)+1];
        status.textContent += ' Рекомендуемый следующий уровень: ' + next + '.';
      }
      return;
    }
    const last = run.index===run.questions.length-1;
    progress.textContent=(run.index+1)+' / '+run.questions.length+' · '+labels[item.kind];
    questionEl.textContent=item.prompt;
    optionsEl.replaceChildren();
    item.options.forEach(answer => {
      const button=document.createElement('button');
      button.type='button';button.className='exam-option';button.textContent=answer;
      button.addEventListener('click',()=>{
        run.selected=answer;
        optionsEl.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
        submit.disabled=false;
      });
      button.setAttribute('aria-pressed','false');
      optionsEl.append(button);
    });
    submit.textContent=last?'Завершить экзамен':'Следующий вопрос →';
    submit.disabled=true;
    status.textContent='Выберите один вариант ответа.';
  }
  function startExam() {
    const level=currentLevel();
    const questions=build(level);
    if(!questions || questions.length!==COUNT) {
      status.textContent='Недостаточно проверенных заданий для экзамена этого уровня.';
      questionEl.textContent='';optionsEl.replaceChildren();submit.hidden=true;retry.hidden=true;return;
    }
    run={level,questions,index:0,answers:[],selected:null};
    const feedbackBox=$('examFeedback'); if(feedbackBox){feedbackBox.hidden=true;feedbackBox.replaceChildren();}
    retry.hidden=true;submit.hidden=false;render();
  }
  submit?.addEventListener('click',()=>{
    if(!run || run.selected===null)return;
    run.answers.push(run.selected);run.selected=null;run.index++;render();
  });
  retry?.addEventListener('click',startExam);
  open?.addEventListener('click',()=>{
    if(!root)return;
    document.documentElement.classList.remove('study-menu','study-active','study-daily');
    document.documentElement.classList.add('study-exam');
    root.hidden=false;
    $('studyBack').hidden=false;
    startExam();
    window.scrollTo(0,0);
  });
  window.TanuloExam = {canAccess,updateLocks,getResults:()=>state.history.slice(),getPassed:()=>({...state.passed})};
  updateLocks();
})();
