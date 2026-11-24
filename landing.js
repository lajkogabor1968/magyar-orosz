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
  let recommendedIndex;

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
    $('homeConversation').hidden = !recommendation;
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
      recommendedIndex = index;
      const unfinished = state.phase === 'reply' || state.phase === 'write';
      $('homeConversationKind').textContent = state.review ? 'К повторению' : 'Короткая практика';
      $('homeConversationTitle').textContent = scene.title;
      $('homeConversationQuestion').textContent = scene.question;
      $('homeConversationAction').textContent = unfinished ? 'Продолжить диалог' : state.completed ? 'Повторить диалог' : 'Разыграть диалог';
    }
  }
  function launchConversation(index) {
    window.TanmuhelyConversation.open(index, () => enterLesson(index));
  }
  function renderCatalog() {
    const level = selected();
    const course = window.TanuloWorkbook.overview(level);
    const conversations = level === 'A1' && $('catalogMode').querySelector('input:checked').value === 'scenes';
    const progress = conversations ? window.TanmuhelyConversation.progress() : null;
    const items = conversations ? window.TanmuhelyA1Conversations : course.lessons;
    $('courseCatalogTitle').textContent = (conversations ? 'Диалоги ' : 'Уроки ') + level;
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
      const isCurrent = index === (conversations ? recommendedIndex : course.index);
      if (isCurrent) button.setAttribute('aria-current', 'step');
      let label = '';
      if (conversations) {
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
        if (conversations) launchConversation(index);
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
    current.focus({preventScroll:true});
    current.scrollIntoView({block:'nearest'});
  }
  $('catalogMode').addEventListener('change', renderCatalog);
  $('conversationBrowse').onclick = () => {
    $('conversationDialog').close();
    openCatalog(true);
  };
  start.addEventListener('click', () => enterLesson());
  picker.addEventListener('click', () => openCatalog());
  catalog.querySelector('.dialog-close').onclick = () => catalog.close();
  $('homeConversation').onclick = () => launchConversation(recommendedIndex);
  $('conversationDialog').addEventListener('close', () => {
    if (!screen.hidden) refreshLanding();
    const url = new URL(location.href);
    if (url.searchParams.has('scene')) {
      url.searchParams.delete('scene');
      history.replaceState(history.state, '', url);
    }
  });
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
    const index = window.TanmuhelyA1Conversations.findIndex(scene => scene.id === params.get('scene'));
    if (!screen.hidden && index >= 0) {
      menu.querySelector('input[value="A1"]').checked = true;
      launchConversation(index);
    }
    refreshLanding();
  });
  window.addEventListener('pageshow', refreshLanding);
  window.addEventListener('storage', () => { if (!screen.hidden) refreshLanding(); });
})();
