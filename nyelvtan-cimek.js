/*
 * A meglévő 36 orosz címfordítást megőrzi, hozzáadja a négy új leckét,
 * és a megjelenítő számára topic.titleRu mezőben is elérhetővé teszi.
 * Az eredeti topic.title változatlan, így a mentett pontszámok megmaradnak.
 */
(() => {
  'use strict';
  const russian = window.GRAMMAR_TOPIC_TITLES_RU;
  if (!russian || !Array.isArray(window.GRAMMAR_TOPICS)) {
    throw new Error('A nyelvtani leckék és az orosz címek még nincsenek betöltve.');
  }
  Object.assign(russian, {
    'Ki cselekszik? Alany, ige és tárgy': 'Кто действует? Подлежащее, глагол и дополнение',
    'Birtoklás: van könyvem, nincs autóm': 'Наличие и отсутствие — van könyvem, nincs autóm',
    'Részes eset: -nak/-nek – kinek?': 'Дательный падеж: -nak/-nek — кому?',
    'Helyragok II.: -ra/-re, -on/-en/-ön, -ról/-ről': 'Падежи места II — на что? на чём? с чего?',
    'Társ és eszköz: -val/-vel': 'С кем? Чем? Формы с -val/-vel',
    'Helyragok III.: -hoz/-hez/-höz, -nál/-nél, -tól/-től': 'Падежи места III — к кому? у кого? от кого?',
    'Melléknevek fokozása: -bb és mint': 'Сравнительная степень прилагательных — -bb и mint'
  });
  for (const topic of window.GRAMMAR_TOPICS) {
    if (!russian[topic.title]) throw new Error('Hiányzó orosz témacím: ' + topic.title);
    topic.titleRu = russian[topic.title];
  }
  window.GRAMMAR_RUSSIAN_TITLES_INFO = Object.freeze({topics: window.GRAMMAR_TOPICS.length});
})();
