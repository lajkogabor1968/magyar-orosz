/* Csak a megjelenítést egyszerűsíti; eredményekhez és feladatadatokhoz nem nyúl. */
(() => {
  'use strict';
  const root = document.documentElement;
  const hub = document.getElementById('studyHub');
  const back = document.getElementById('studyBack');
  const extra = document.getElementById('studyExtra');
  const more = document.getElementById('studyMore');
  const quick = document.getElementById('quickReviewPrimary');
  if (!hub || !back || !extra || !more) return;
  function refreshQuickReview() {
    if (!quick) return;
    const isA1 = document.querySelector('.welcome .level.active')?.dataset.level === 'A1';
    quick.hidden = !isA1;
    if (!isA1) return;
    const progress = document.getElementById('a1DailyOverall')?.textContent || '';
    const done = progress.includes('завершена') ? 3 : Math.min(3, Number(progress.match(/(\d+)\/3/)?.[1] || 0));
    document.getElementById('quickReviewProgress').textContent = done === 3
      ? 'Сегодня все три этапа выполнены. Можно повторить.'
      : done ? 'Сегодня выполнено ' + done + ' из 3 этапов.'
        : 'Короткие задания с учётом ваших прежних ошибок';
  }
  quick?.addEventListener('click', () => {
    if (document.querySelector('.welcome .level.active')?.dataset.level === 'A1') mode('study-daily');
  });
  const dailyProgress = document.getElementById('a1DailyOverall');
  if (dailyProgress) new MutationObserver(refreshQuickReview).observe(dailyProgress, { childList: true, characterData: true, subtree: true });
  document.querySelectorAll('.welcome .level').forEach(button => button.addEventListener('click', refreshQuickReview));
  function mode(value) {
    root.classList.remove('study-menu', 'study-active', 'study-daily', 'study-exam', 'study-online', 'study-coach', 'study-book');
    for (const id of ['examView','onlineLessonView','coachView','integratedLessonView']) {
      const pane=document.getElementById(id);
      if(pane) pane.hidden=true;
    }
    const exam = document.getElementById('examView');
    if (exam) exam.hidden = true;
    root.classList.add(value);
    back.hidden = value === 'study-menu';
    hub.hidden = value !== 'study-menu';
    window.scrollTo(0, 0);
  }
  function openView(view) {
    const tab = document.querySelector('.tabs .tab[data-view="' + view + '"]');
    if (!tab) return;
    tab.click();
    mode('study-active');
  }
  hub.querySelectorAll('[data-hub-view]').forEach(button => {
    button.addEventListener('click', () => openView(button.dataset.hubView));
  });
  more.addEventListener('click', () => {
    extra.hidden = !extra.hidden;
    root.classList.toggle('study-advanced-open', !extra.hidden);
    more.setAttribute('aria-expanded', String(!extra.hidden));
    more.textContent = extra.hidden ? 'Дополнительные занятия и инструменты ▾' : 'Скрыть дополнительные занятия ▴';
  });
  document.getElementById('studyDaily')?.addEventListener('click', () => {
    const isA1 = document.querySelector('.welcome .level.active')?.dataset.level === 'A1';
    if (!isA1) { openView('steps'); return; }
    mode('study-daily');
  });
  back.addEventListener('click', () => mode('study-menu'));
  document.addEventListener('tanulo:viewchange', () => {
    if (root.classList.contains('study-active') || root.classList.contains('study-daily')) mode('study-active');
  });
  const start = document.getElementById('landingStart');
  // Landing's A1 button opens the guided lesson directly.
  // Do not overwrite that action with a later menu-mode click listener.
  start?.addEventListener('click', () => {
    const level=document.querySelector('#landingScreen input[name="landingLevel"]:checked')?.value||'A1';
    if(level!=='A1')mode('study-menu');
  });
  document.querySelector('.landing-back')?.addEventListener('click', () => mode('study-menu'));
  refreshQuickReview();
  mode('study-menu');
})();
