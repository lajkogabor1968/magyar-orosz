/* Csak a megjelenítést egyszerűsíti; eredményekhez és feladatadatokhoz nem nyúl. */
(() => {
  'use strict';
  const root = document.documentElement;
  const hub = document.getElementById('studyHub');
  const back = document.getElementById('studyBack');
  const extra = document.getElementById('studyExtra');
  const more = document.getElementById('studyMore');
  if (!hub || !back || !extra || !more) return;
  function mode(value) {
    root.classList.remove('study-menu', 'study-active', 'study-daily');
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
    more.textContent = extra.hidden ? 'Другие упражнения' : 'Скрыть дополнительные занятия';
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
  start?.addEventListener('click', () => mode('study-menu'));
  document.querySelector('.landing-back')?.addEventListener('click', () => mode('study-menu'));
  mode('study-menu');
})();
