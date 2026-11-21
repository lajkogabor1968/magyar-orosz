/* A nyitóképernyő kizárólag megjelenítést vezérel, a tanulási adatokat nem. */
(() => {
  'use strict';
  const screen = document.getElementById('landingScreen');
  const start = document.getElementById('landingStart');
  if (!screen || !start) throw new Error('Nem található a nyitóképernyő.');
  const showApp = () => {
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
  start.addEventListener('click', showApp);
  const home = document.createElement('button');
  home.type = 'button';
  home.className = 'secondary landing-back';
  home.textContent = '⌂ Главная / Kezdőlap';
  home.setAttribute('aria-label', 'Вернуться на главную страницу');
  home.addEventListener('click', showLanding);
  document.querySelector('.masthead .headrow')?.append(home);
  if (location.hash === '#tanulas' || new URLSearchParams(location.search).get('open') === 'app') {
    showApp();
  }
})();
