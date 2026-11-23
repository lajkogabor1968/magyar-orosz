/* A nyitóképernyő kizárólag megjelenítést vezérel, a tanulási adatokat nem. */
(() => {
  'use strict';
  const screen = document.getElementById('landingScreen');
  const start = document.getElementById('landingStart');
  if (!screen || !start) throw new Error('Nem található a nyitóképernyő.');
  const showApp = () => {
    const chosen = screen.querySelector('input[name="landingLevel"]:checked')?.value || 'A1';
    const levelButton = document.querySelector('.welcome .level[data-level="' + chosen + '"]');
    levelButton?.click();
    screen.hidden = true;
    document.documentElement.classList.remove('landing-mode');
    window.scrollTo({top: 0, behavior: 'instant'});
    document.querySelector('.masthead h1')?.focus?.();
  };
  const showLanding = () => {
    screen.hidden = false;
    document.documentElement.classList.add('landing-mode');
    window.scrollTo({top: 0, behavior: 'instant'});
    document.getElementById('landingTitle')?.focus();
  };
  // Open the saved A1 lesson directly, without a second menu click.
  // Other levels keep their existing route until their courses are ready.
  start.addEventListener('click', () => {
    const chosen=screen.querySelector('input[name="landingLevel"]:checked')?.value || 'A1';
    showApp();
    if(chosen==='A1')document.getElementById('lessonsPrimary')?.click();
  });
  const currentLevel = document.querySelector('.welcome .level.active')?.dataset.level;
  const initialChoice = screen.querySelector('input[name="landingLevel"][value="' + currentLevel + '"]');
  if (initialChoice) initialChoice.checked = true;
  const home = document.createElement('button');
  home.type = 'button';
  home.className = 'secondary landing-back';
  home.textContent = '⌂ Главная';
  home.setAttribute('aria-label', 'Вернуться на главную страницу');
  home.addEventListener('click', showLanding);
  document.querySelector('.masthead .headrow')?.append(home);
  if (location.hash === '#tanulas' || new URLSearchParams(location.search).get('open') === 'app' || new URLSearchParams(location.search).get('review') === '1') {
    showApp();
  }
})();
