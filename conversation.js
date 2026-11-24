(() => {
  'use strict';
  const scenes = window.TanmuhelyA1Conversations;
  const $ = id => document.getElementById(id);
  const dialog = $('conversationDialog');
  const key = 'magyarorosz.a1-conversations.v1';
  const phases = ['choice', 'reply', 'write', 'done'];
  let memory = {};
  let memoryOnly = false;
  let active, attempt, onFinish, finalWord, hintShown;

  function records() {
    if (memoryOnly) return memory;
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    } catch {}
    return memory;
  }
  function previous(record = {}) {
    return {
      phase: phases.includes(record?.phase) ? record.phase : 'choice',
      completed: record?.completed === true,
      review: record?.review === true,
      assisted: record?.assisted === true,
      draft: typeof record?.draft === 'string' ? record.draft : ''
    };
  }
  function save(changes) {
    Object.assign(attempt, changes);
    const all = records();
    // Retain a completion earned in another tab while this tab was practising.
    attempt.completed ||= all[active.id]?.completed === true;
    all[active.id] = { ...attempt };
    memory = all;
    try {
      localStorage.setItem(key, JSON.stringify(all));
      return true;
    } catch { memoryOnly = true; return false; }
  }
  function recommendation(lessonIndex) {
    const all = records();
    const current = scenes[lessonIndex];
    if (!current) return null;
    // Resume an interrupted attempt first, then revisit a dialogue that needed help.
    const unfinished = scene => ['reply', 'write'].includes(all[scene.id]?.phase);
    const needsReview = scene => all[scene.id]?.review === true;
    const ordered = [current, ...scenes.filter(s => s !== current)];
    const scene = ordered.find(unfinished) || ordered.find(needsReview) || current;
    const state = previous(all[scene.id]);
    return { index: scenes.indexOf(scene), scene, state };
  }
  function setFeedback(id, message, tone = '') {
    const output = $(id);
    output.textContent = message;
    output.dataset.tone = tone;
  }
  function showChoice() {
    const answered = attempt.phase === 'reply';
    const options = $('conversationOptions');
    options.replaceChildren();
    $('conversationModel').textContent = active.model[0];
    $('conversationMeaning').textContent = active.model[1];
    $('conversationQuestion').textContent = active.question;
    $('conversationTranslation').textContent = active.translation;
    $('conversationGloss').open = false;
    $('conversationInstruction').textContent = active.instruction;
    setFeedback('conversationChoiceFeedback', answered ? '✓ ' + active.reply[1] : '', 'ok');
    $('conversationNext').hidden = !answered;
    const choices = window.MagyarOroszQuizOptions.shuffle([active.reply, ...active.alternatives]);
    for (const choice of choices) {
      const button = document.createElement('button');
      button.type = 'button';
      button.lang = 'hu';
      button.textContent = choice[0];
      button.disabled = answered;
      const correct = choice === active.reply;
      if (answered && correct) button.classList.add('is-correct');
      button.onclick = () => {
        if (attempt.phase !== 'choice') return;
        if (correct) {
          save({ phase: 'reply' });
          button.classList.add('is-correct');
          for (const option of options.children) option.disabled = true;
          setFeedback('conversationChoiceFeedback', '✓ ' + active.reply[1], 'ok');
          $('conversationNext').hidden = false;
          $('conversationNext').focus();
        } else {
          save({ assisted: true, review: true });
          button.classList.add('is-mistake');
          button.disabled = true;
          setFeedback('conversationChoiceFeedback', choice[1] + ' Выберите другую реплику.', 'retry');
          options.querySelector('button:not(:disabled)')?.focus({preventScroll:true});
        }
      };
      options.append(button);
    }
  }
  function render() {
    const choice = attempt.phase === 'choice' || attempt.phase === 'reply';
    $('conversationChoice').hidden = !choice;
    $('conversationWrite').hidden = attempt.phase !== 'write';
    $('conversationResult').hidden = attempt.phase !== 'done';
    $('conversationProgress').textContent = 'A1 · ' + (choice ? 'Реплика 1 из 2' : attempt.phase === 'write' ? 'Реплика 2 из 2' : 'Диалог пройден');
    $('conversationTitle').textContent = active.title;
    if (choice) showChoice();
    if (attempt.phase === 'write') {
      $('conversationTask').textContent = active.task;
      $('conversationFrame').textContent = active.frame;
      $('conversationAnswer').value = attempt.draft;
      $('conversationForm').querySelector('details').open = false;
      setFeedback('conversationWriteFeedback', '');
      hintShown = false;
      $('conversationHint').textContent = 'Подсказка';
    }
    if (attempt.phase === 'done') {
      $('conversationFinalLine').textContent = active.frame.replace('___', finalWord ?? active.answers[0]).replace(/^./u, letter => letter.toLocaleUpperCase('hu-HU'));
      $('conversationSummary').textContent = attempt.review
        ? 'Обе реплики готовы. Этот диалог появится на главной для повторения.'
        : 'Обе реплики готовы. Вы справились без подсказки.';
      $('conversationFinish').textContent = onFinish ? 'Перейти к этому уроку' : 'Вернуться к уроку';
    }
    dialog.scrollTop = 0;
  }
  function open(index, finish) {
    if (!scenes[index] || dialog.open) return;
    active = scenes[index];
    onFinish = finish;
    finalWord = null;
    attempt = previous(records()[active.id]);
    if (attempt.phase === 'done') {
      attempt.phase = 'choice';
      attempt.assisted = false;
      attempt.draft = '';
    }
    $('conversationBrowse').hidden = !finish;
    render();
    dialog.showModal();
    $('conversationTitle').focus();
  }
  const normalize = value => value.normalize('NFC').trim().toLocaleLowerCase('hu-HU').replace(/[.!?…]+$/u, '').trim().replace(/\s+/gu, ' ');
  $('conversationNext').onclick = () => {
    if (attempt.phase !== 'reply') return;
    save({ phase: 'write' });
    render();
    $('conversationAnswer').focus();
  };
  $('conversationAnswer').addEventListener('input', () => {
    if (attempt.phase === 'write') save({ draft: $('conversationAnswer').value });
  });
  $('conversationGloss').addEventListener('toggle', () => {
    if (dialog.open && $('conversationGloss').open && attempt.phase === 'choice') save({ assisted: true, review: true });
  });
  $('conversationHint').onclick = () => {
    save({ assisted: true, review: true });
    setFeedback('conversationWriteFeedback', hintShown ? 'Пропущенное слово: ' + active.answers[0] + '.' : active.hint);
    $('conversationHint').textContent = 'Показать слово';
    hintShown = true;
    $('conversationAnswer').focus();
  };
  window.TanmuhelyPractice.accentKeyboard($('conversationAccentKeys'), $('conversationAnswer'));
  $('conversationForm').onsubmit = event => {
    event.preventDefault();
    if (attempt.phase !== 'write') return;
    const input = $('conversationAnswer');
    const entered = normalize(input.value);
    if (!entered) {
      setFeedback('conversationWriteFeedback', 'Впишите пропущенное слово.');
      input.focus();
      return;
    }
    const match = active.answers.find(word =>
      entered === normalize(word) || entered === normalize(active.frame.replace('___', word))
    );
    if (!match) {
      save({ assisted: true, review: true });
      setFeedback('conversationWriteFeedback', active.hint + ' Попробуйте ещё раз.', 'retry');
      $('conversationHint').textContent = 'Показать слово';
      hintShown = true;
      input.focus();
      return;
    }
    finalWord = match;
    window.TanmuhelyRecall.scheduleFirst(active.id);
    const saved = save({ phase: 'done', completed: true, review: attempt.assisted, draft: '' });
    render();
    if (!saved) $('conversationSummary').textContent = 'Обе реплики готовы. В этом браузере не удалось сохранить результат.';
    $('conversationTitle').focus();
  };
  dialog.querySelector('.dialog-close').onclick = () => dialog.close();
  $('conversationRecallOpen').onclick = () => {
    const index = scenes.indexOf(active);
    dialog.close();
    window.TanmuhelyRecall.open(index, onFinish);
  };
  $('conversationFinish').onclick = () => {
    const finish = onFinish;
    dialog.close();
    finish?.();
  };
  function progress() {
    const all = records();
    return scenes.map(scene => previous(all[scene.id]));
  }
  window.TanmuhelyConversation = { open, recommendation, progress };
})();
