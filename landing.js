(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const screen = $('landingScreen');
  const menu = $('landingLevelMenu');
  const start = $('landingStart');
  const picker = $('landingChooseLesson');
  const catalog = $('courseCatalog');
  const selected = () => menu.querySelector('input:checked').value;
  const activeLevel = () => document.querySelector('.welcome .level.active')?.dataset.level;
  const summaries = {
    A2: ['Обсудите планы на завтра и задайте собеседнику вопрос.', 'Объясните, куда переезжаете и где находится новый дом.', 'Расскажите, что делали вчера и что делаете сегодня.'],
    B1: 'Пройдите собеседование, обсудите условия аренды и запишитесь на приём.',
    B2: 'Обоснуйте выбор между офисом и удалённой работой или предложите решение спора.'
  };
  let recommendedIndex, recommendRecall = false;
  const invite = $('homeConversation');
  const description = document.createElement('span');
  description.style.cssText = 'display:block;line-height:1.45;font-size:.95rem;font-weight:500';
  $('homeConversationAction').before(description);
  const layout = document.createElement('style');
  layout.textContent = '.course-deck{grid-template-columns:minmax(0,1fr)} #homeConversation:not([hidden]){align-self:start;display:flex;flex-direction:column;align-items:flex-start;gap:.65rem;padding:1.25rem} #homeConversation .conversation-invite-action{margin-top:0;padding:.65rem .9rem;background:#164b40;color:white;border-radius:.7rem} #homeConversationQuestion{max-width:100%}';
  document.head.append(layout);

  function showApp() {
    const level = selected();
    if (activeLevel() !== level) document.querySelector('.welcome .level[data-level="' + level + '"]').click();
    screen.hidden = true;
    document.documentElement.classList.remove('landing-mode');
    window.scrollTo(0, 0);
  }
  function enterLesson(index) {
    showApp();
    window.TanuloWorkbook.openLesson(index);
  }
  function refreshLanding() {
    const level = selected();
    const course = window.TanuloWorkbook.overview(level);
    $('landingTitle').textContent = level === 'A1' ? 'Венгерский с нуля' : 'Венгерский язык';
    $('homeProgress').hidden = !course;
    const recommendation = level === 'A1' && window.TanmuhelyConversation.recommendation(course.index);
    $('homeConversation').hidden = true;
    if (course) {
      const { index, started, stageName, lessons } = course;
      const completed = lessons.filter(lesson => lesson.completed).length;
      $('homeLessonPosition').textContent = 'Урок ' + (index + 1) + ' из ' + lessons.length + (started ? ' · ' + stageName : '');
      $('homeLessonTitle').textContent = lessons[index].title;
      $('homeLessonGoal').textContent = level === 'A1' ? window.TanmuhelyA1Conversations[index]?.goal ?? '' : summaries.A2[index] ?? '';
      start.textContent = completed === lessons.length ? 'Открыть урок' : started ? 'Продолжить урок' : 'Начать урок';
      picker.textContent = 'Все уроки ' + level;
      picker.setAttribute('aria-haspopup', 'dialog');
      $('homeProgressBar').max = lessons.length;
      $('homeProgressBar').value = completed;
      $('homeProgressLabel').textContent = 'Пройдено уроков: ' + completed + ' из ' + lessons.length;
    } else {
      $('homeLessonPosition').textContent = 'Курс ' + level;
      $('homeLessonTitle').textContent = 'Диалоги и понимание речи';
      $('homeLessonGoal').textContent = summaries[level];
      start.textContent = 'Открыть диалоги';
      picker.textContent = 'Все занятия ' + level;
      picker.removeAttribute('aria-haspopup');
    }
    if (recommendation) {
      const {index, scene, state} = recommendation;
      const unfinished = state.phase === 'reply' || state.phase === 'write' || (!state.completed && state.assisted);
      const recall = !unfinished && window.TanmuhelyRecall.recommendation(course.index, window.TanmuhelyConversation.progress());
      recommendRecall = !!recall;
      recommendedIndex = recall ? recall.index : index;
      $('homeConversationTitle').textContent = recall ? recall.scene.title : scene.title;
      $('homeConversationQuestion').hidden = !!recall;
      if (recall) {
        description.textContent = 'Вспомните и напишите венгерскую фразу без образца.';
        $('homeConversationKind').textContent = recall.kind === 'due' ? 'Повторение на сегодня' : 'Фраза по памяти';
        $('homeConversationAction').textContent = recall.kind === 'resume' ? 'Продолжить ответ' : 'Составить фразу';
      } else {
        $('homeConversationKind').textContent = state.review ? 'К повторению' : 'Короткая практика';
        $('homeConversationQuestion').textContent = scene.question;
        description.textContent = state.phase === 'write' ? 'Дополните венгерскую фразу и проверьте ответ.' : scene.goal + ' Выберите ответ, затем дополните фразу.';
        $('homeConversationAction').textContent = unfinished ? 'Продолжить диалог' : state.completed ? 'Повторить диалог' : 'Разыграть диалог';
      }
    }
  }
  const listenButton = document.createElement('button');
  listenButton.type = 'button';
  listenButton.className = 'practice-secondary';
  listenButton.textContent = '🔊 Прослушать вопрос';
  $('conversationQuestion').after(listenButton);
  const audioStatus = document.createElement('p');
  audioStatus.setAttribute('role','status');
  listenButton.after(audioStatus);
  listenButton.onclick = () => {
    audioStatus.textContent = '';
    const utterance = {text:$('conversationQuestion').textContent,lang:'hu-HU',rate:1,onerror:()=>{audioStatus.textContent='Не удалось воспроизвести звук.';}};
    if (!window.TanuloTTS?.speak(utterance)) audioStatus.textContent = 'Звук недоступен на этом устройстве.';
  };
  $('conversationDialog').addEventListener('close', () => { window.TanuloTTS?.cancel(); audioStatus.textContent = ''; });
  function launchConversation(index) {
    window.TanmuhelyConversation.open(index, () => enterLesson(index));
  }
  function renderCatalog() {
    const level = selected();
    const course = window.TanuloWorkbook.overview(level);
    const kind = level === 'A1' ? $('catalogMode').querySelector('input:checked').value : 'lessons';
    const conversations = kind === 'scenes', listening = kind === 'listening';
    const progress = conversations ? window.TanmuhelyConversation.progress() : null;
    const scores = listening ? window.TanmuhelyListening.progress() : null;
    const items = listening ? window.TanmuhelyListening.items : conversations ? window.TanmuhelyA1Conversations : course.lessons;
    let currentIndex = conversations ? recommendedIndex : course.index;
    if (listening) {
      currentIndex = items.findIndex(item => item.id === window.TanmuhelyA1Conversations[course.index]?.id);
      if (currentIndex < 0) currentIndex = Math.max(0, items.findIndex(item => scores[item.id]?.best !== item.questions.length));
    }
    invite.hidden = level !== 'A1' || listening || !recommendRecall;
    $('courseCatalogTitle').textContent = (listening ? 'Аудирование ' : conversations ? 'Диалоги ' : 'Уроки ') + level;
    const list = $('courseCatalogList');
    list.replaceChildren();
    for (const [index, item] of items.entries()) {
      const row = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      const number = document.createElement('span');
      number.className = 'course-list-number';
      number.textContent = String(index + 1);
      const title = document.createElement('span');
      title.textContent = item.title;
      button.append(number, title);
      const isCurrent = index === currentIndex;
      if (isCurrent) button.setAttribute('aria-current', 'step');
      let label = '';
      if (listening) {
        const score = scores[item.id];
        if (score) label = score.listened ? 'На слух: ' + score.best + '/' + item.questions.length : 'С текстом';
      } else if (conversations) {
        const state = progress[index];
        if (['reply','write'].includes(state.phase)) label = 'Продолжить';
        else if (state.review) label = 'К повторению';
        else if (state.completed) label = '✓ Пройден';
      } else if (item.completed) label = '✓ Пройден';
      else if (isCurrent) label = 'Ваш урок';
      if (label) {
        const status = document.createElement('small');
        status.textContent = label;
        button.append(status);
      }
      button.onclick = () => {
        catalog.close();
        if (listening) {
          const lessonIndex = window.TanmuhelyA1Conversations.findIndex(scene => scene.id === item.id);
          window.TanmuhelyListening.open(item.id, () => enterLesson(lessonIndex));
        } else if (conversations) launchConversation(index);
        else enterLesson(index);
      };
      row.append(button);
      list.append(row);
    }
  }
  function openCatalog(conversations = false) {
    const level = selected();
    if (!window.TanuloWorkbook.overview(level)) {
      showApp();
      $('studyBack').click();
      $('lessonsPrimary').focus();
      return;
    }
    $('catalogMode').hidden = level !== 'A1';
    $('catalogMode').querySelector(conversations ? '[value="scenes"]' : '[value="lessons"]').checked = true;
    renderCatalog();
    catalog.showModal();
    const current = $('courseCatalogList').querySelector('[aria-current="step"]');
    current?.focus({preventScroll:true});
    current?.scrollIntoView({block:'nearest'});
  }
  $('catalogMode').addEventListener('change', renderCatalog);
  $('conversationBrowse').onclick = () => {
    $('conversationDialog').close();
    openCatalog(true);
  };
  start.addEventListener('click', () => enterLesson());
  picker.addEventListener('click', () => openCatalog());
  catalog.querySelector('.dialog-close').onclick = () => catalog.close();
  $('homeConversation').onclick = () => {
    if (catalog.open) catalog.close();
    const index = recommendedIndex;
    if (recommendRecall) window.TanmuhelyRecall.open(index, () => enterLesson(index));
    else launchConversation(index);
  };
  for (const [id,param] of [['conversationDialog','scene'],['a1RecallDialog','recall'],['a1ListeningDialog','listen']]) {
    $(id).addEventListener('close', () => {
      if (!screen.hidden) refreshLanding();
      const url = new URL(location.href);
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        history.replaceState(history.state, '', url);
      }
    });
  }
  menu.addEventListener('change', refreshLanding);
  const home = document.createElement('button');
  home.type = 'button';
  home.className = 'secondary landing-back';
  home.textContent = '⌂ Главная';
  home.setAttribute('aria-label', 'Вернуться на главную страницу');
  home.onclick = () => {
    const radio = menu.querySelector('input[value="' + activeLevel() + '"]');
    if (radio) radio.checked = true;
    refreshLanding();
    screen.hidden = false;
    document.documentElement.classList.add('landing-mode');
    window.scrollTo(0, 0);
    $('landingTitle').focus();
  };
  document.querySelector('.masthead .headrow').append(home);
  const initial = menu.querySelector('input[value="' + activeLevel() + '"]');
  if (initial) initial.checked = true;
  const params = new URLSearchParams(location.search);
  if (location.hash === '#tanulas' || params.get('open') === 'app' || params.get('review') === '1') showApp();
  document.addEventListener('DOMContentLoaded', () => {
    for (const type of ['listen','recall','scene']) {
      const id = params.get(type);
      if (!id || screen.hidden) continue;
      const index = window.TanmuhelyA1Conversations.findIndex(scene => scene.id === id);
      if (index < 0) continue;
      menu.querySelector('input[value="A1"]').checked = true;
      if (type === 'listen') window.TanmuhelyListening.open(id, () => enterLesson(index));
      else if (type === 'recall') window.TanmuhelyRecall.open(index, () => enterLesson(index));
      else launchConversation(index);
      break;
    }
    refreshLanding();
  });
  window.addEventListener('pageshow', refreshLanding);
  window.addEventListener('storage', () => { if (!screen.hidden) refreshLanding(); });
})();
