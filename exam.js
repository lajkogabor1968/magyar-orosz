/* Уровневые экзамены: стабильный ключ, случайная выборка, порог 90%.
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
  const canAccess = level => {
    const i = LEVELS.indexOf(level);
    return i <= 0 || LEVELS.slice(0,i).every(previous => state.passed[previous] === true);
  };
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
    const seen = new Set();
    const entries = shuffle(data).filter(row => {
      const signature = clean(row[promptKey]) + '|' + clean(row[answerKey]);
      if (seen.has(signature)) return false;
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
      const allowed = canAccess(input.value);
      input.disabled = !allowed;
      input.closest('label')?.classList.toggle('level-locked',!allowed);
      input.closest('label')?.setAttribute('title',allowed?'':'Откроется после экзамена предыдущего уровня (90%).');
    });
    if (!canAccess(document.querySelector('input[name="landingLevel"]:checked')?.value)) {
      const first = document.querySelector('input[name="landingLevel"][value="A1"]');
      if (first) first.checked = true;
    }
    document.querySelectorAll('.welcome .level[data-level]').forEach(button => {
      const allowed = canAccess(button.dataset.level);
      button.disabled = !allowed; button.title = allowed?'':'Сначала сдайте экзамен предыдущего уровня на 90%.';
    });
    if (open) {
      const level = currentLevel();
      open.textContent = 'Итоговый экзамен ' + level + (state.passed[level]?' ✓':'');
    }
  }
  function currentLevel() {
    return document.querySelector('.welcome .level.active')?.dataset.level || 'A1';
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
      questionEl.textContent = '';
      optionsEl.replaceChildren();
      progress.textContent = 'Экзамен завершён';
      submit.hidden=true; retry.hidden=false;
      status.textContent = correct + ' из ' + run.questions.length + ' · ' + percent + '%. ' +
        (passed?'Экзамен сдан! Следующий уровень открыт.':'Для перехода нужно не менее 90%. Повторите материал и попробуйте снова.');
      if(passed && run.level!=='B2') {
        const next=LEVELS[LEVELS.indexOf(run.level)+1];
        status.textContent += ' Доступен уровень ' + next + '.';
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
