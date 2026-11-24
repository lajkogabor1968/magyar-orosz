(() => {
  'use strict';
  const scenes = window.TanmuhelyA1Conversations;
  const store = window.TanmuhelyPractice.store('magyarorosz.a1-sentence-recall.v1');
  const $ = id => document.getElementById(id);
  const dialog = $('a1RecallDialog');
  const input = $('recallAnswer');
  const intervals = [1, 3, 7];
  let scene, onFinish, assisted, support;
  // Use the learner's local calendar so a clock change does not move a review
  // from one study day to another.
  function dateKey(afterDays = 0) {
    const now = new Date();
    now.setDate(now.getDate() + afterDays);
    return [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  }
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
  function scheduleFirst(id) {
    if (!validDate(store.read()[id]?.due)) store.update(id, () => ({stage:0, due:dateKey(1)}));
  }
  function recommendation(lessonIndex, dialogueProgress) {
    const states = store.read(), today = dateKey();
    const ordered = scenes.map((scene,index) => ({scene,index, state:states[scene.id] || {}}));
    const interrupted = ordered.filter(item => item.state.inProgress)
      .sort((a,b) => (b.state.edited || 0) - (a.state.edited || 0))[0];
    if (interrupted) return {index:interrupted.index, scene:interrupted.scene, kind:'resume'};
    const due = ordered.filter(item => validDate(item.state.due) && item.state.due <= today)
      .sort((a,b) => a.state.due.localeCompare(b.state.due) || Number(b.index === lessonIndex)-Number(a.index === lessonIndex))[0];
    if (due) return {index:due.index, scene:due.scene, kind:'due'};
    // Legacy dialogue completions have no practice date. Offer recall without
    // inventing a date or assigning mastery for the old multiple-choice task.
    const legacy = ordered.find(item => dialogueProgress[item.index]?.completed && !validDate(item.state.due));
    return legacy ? {index:legacy.index, scene:legacy.scene, kind:'new'} : null;
  }
  function rememberDraft() {
    store.update(scene.id, () => ({ inProgress:true, draft:input.value, assisted, support, edited:Date.now() }));
  }
  function feedback(message, tone = '') {
    $('recallFeedback').textContent = message;
    $('recallFeedback').dataset.tone = tone;
  }
  function showHelp() {
    const task = scene.recall;
    if (support === 1) feedback(task.hint);
    if (support >= 2) feedback('Один из вариантов: ' + task.forms[0] + ' Сравните его со своей фразой.');
    $('recallHint').textContent = support ? 'Показать вариант' : 'Подсказка';
    $('recallHint').hidden = support >= 2;
    $('recallLater').hidden = support < 2;
  }
  function open(index, finish) {
    if (!scenes[index]?.recall || dialog.open) return;
    scene = scenes[index]; onFinish = finish;
    const state = store.read()[scene.id] || {};
    assisted = !!(state.inProgress && state.assisted);
    support = state.inProgress && [1,2].includes(state.support) ? state.support : 0;
    $('recallTitle').textContent = scene.title;
    $('recallPrompt').textContent = scene.recall.prompt;
    $('recallForm').hidden = false; $('recallResult').hidden = true;
    $('recallForm').querySelector('details').open = false;
    input.value = state.inProgress && typeof state.draft === 'string' ? state.draft : '';
    feedback(''); showHelp();
    dialog.showModal();
    $('recallTitle').focus();
  }
  function finishAttempt(form) {
    const independent = !!form && !assisted;
    const today = dateKey();
    const {record, saved} = store.update(scene.id, old => {
      let stage = Number.isInteger(old.stage) && old.stage >= 0 && old.stage < intervals.length ? old.stage : 0;
      let due = old.due;
      if (!independent || !validDate(due)) {
        stage = 0; due = dateKey(1);
      } else if (due <= today) {
        stage = Math.min(stage+1, intervals.length-1);
        due = dateKey(intervals[stage]);
      }
      return {stage, due, inProgress:false, draft:'', assisted:false, support:0, lastIndependent:independent};
    });
    $('recallForm').hidden = true; $('recallResult').hidden = false; $('recallLater').hidden = true;
    feedback(independent ? '✓ Вы составили фразу самостоятельно.' : form ? '✓ Фраза составлена после тренировки.' : 'Фраза оставлена для повторения.');
    $('recallFinalLine').textContent = form || scene.recall.forms[0];
    const [y,m,d] = record.due.split('-').map(Number);
    const date = new Date(y,m-1,d).toLocaleDateString('ru-RU',{day:'numeric', month:'long'});
    $('recallSchedule').textContent = saved ? 'Следующее повторение — ' + date + '.' : 'В этом браузере не удалось сохранить повторение.';
    $('recallFinish').textContent = onFinish ? 'Перейти к этому уроку' : 'Вернуться к уроку';
    $('recallFinish').focus();
  }
  const normalize = text => text.normalize('NFC').toLocaleLowerCase('hu-HU').replace(/[.,!?…:;„”«»"]/gu,' ').trim().replace(/\s+/gu,' ');
  const stripAccents = text => text.normalize('NFD').replace(/\p{M}/gu,'');
  input.addEventListener('input', rememberDraft);
  window.TanmuhelyPractice.accentKeyboard($('recallAccentKeys'), input);
  $('recallForm').onsubmit = event => {
    event.preventDefault();
    const entered = normalize(input.value);
    if (!entered) { feedback('Напишите фразу по-венгерски.'); input.focus(); return; }
    const match = scene.recall.forms.find(form => normalize(form) === entered);
    if (match) { finishAttempt(match); return; }
    assisted = true;
    const accents = scene.recall.forms.some(form => stripAccents(normalize(form)) === stripAccents(entered));
    const mistake = scene.recall.commonError;
    let message = 'Такого варианта нет среди проверенных ответов. Можно изменить фразу или сравнить её с образцом.';
    if (accents) message = 'Слова подобраны верно. Проверьте знаки над венгерскими гласными.';
    else if (mistake.forms.some(form => normalize(form) === entered)) message = mistake.note;
    feedback(message, 'retry');
    rememberDraft(); input.focus();
  };
  $('recallHint').onclick = () => {
    assisted = true; support = Math.min(2,support+1);
    showHelp(); rememberDraft(); input.focus();
  };
  $('recallLater').onclick = () => finishAttempt(null);
  dialog.querySelector('.dialog-close').onclick = () => dialog.close();
  $('recallFinish').onclick = () => { dialog.close(); onFinish?.(); };
  window.TanmuhelyRecall = {open, scheduleFirst, recommendation};
})();
