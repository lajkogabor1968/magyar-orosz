/* Deterministic feedback for copying a known Hungarian word or model sentence.
   This compares spelling with a model; it is NOT a grammar or pronunciation grader. */
(() => {
  'use strict';

  const normalize = value => String(value ?? '').normalize('NFC')
    .toLocaleLowerCase('hu-HU').trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
  const base = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const letters = value => Array.from(value);
  const sameExceptOne = (shorter, longer) => {
    const a = letters(shorter), b = letters(longer);
    if (b.length !== a.length + 1) return -1;
    for (let i = 0; i < b.length; i++) {
      if ([...b.slice(0, i), ...b.slice(i + 1)].join('') === a.join('')) return i;
    }
    return -1;
  };
  const diacritics = (received, expected) => {
    const a = letters(received), b = letters(expected);
    if (a.length !== b.length || base(received) !== base(expected)) return [];
    return a.flatMap((letter, i) => letter === b[i] ? [] : [`${letter} → ${b[i]}`]);
  };

  function checkWord(received, expected) {
    const a = normalize(received), b = normalize(expected);
    if (!a) return {kind: 'empty', hint: 'Введите слово.'};
    if (a === b) return {kind: 'correct', hint: '✓ Правильно!'};
    if (/\p{Script=Cyrillic}/u.test(a)) return {
      kind: 'keyboard', hint: 'Используйте венгерские латинские буквы, а не кириллицу.'
    };
    const accentDifferences = diacritics(a, b);
    if (accentDifferences.length) return {
      kind: 'diacritics',
      hint: 'Проверьте написание венгерских гласных: ' + [...new Set(accentDifferences)].join(', ') + '. '
        + 'Буквы a–á, e–é, ö–ő, ü–ű важно различать.'
    };
    const current = letters(a), model = letters(b);
    if (current.length === model.length) {
      for (let i = 0; i < current.length - 1; i++) {
        const swapped = [...current];
        [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
        if (swapped.join('') === b && current[i] !== current[i + 1]) return {
          kind: 'transposition', hint: 'Две соседние буквы перепутаны местами. Проверьте порядок букв.'
        };
      }
      const positions = current.flatMap((char, i) => char === model[i] ? [] : [i]);
      if (positions.length === 1) return {
        kind: 'letter', hint: `Проверьте букву: ${current[positions[0]]} → ${model[positions[0]]}.`
      };
    }
    const missing = sameExceptOne(a, b);
    if (missing !== -1) return {
      kind: 'missing-letter', hint: `Пропущена буква «${model[missing]}».`
    };
    const extra = sameExceptOne(b, a);
    if (extra !== -1) return {
      kind: 'extra-letter', hint: `Лишняя буква «${current[extra]}».`
    };
    return {kind: 'other', hint: 'Есть несколько отличий от образца. Проверьте буквы и их порядок.'};
  }

  function checkSentence(received, expected) {
    const a = normalize(received), b = normalize(expected);
    if (!a) return {kind: 'empty', hint: 'Напишите предложение по-венгерски.'};
    if (a === b) return {kind: 'correct', hint: '✓ Написание совпадает с образцом, включая венгерские гласные.'};
    if (/\p{Script=Cyrillic}/u.test(a)) return {
      kind: 'keyboard', hint: 'Напишите предложение латинскими буквами, как в венгерском образце.'
    };
    const current = a.split(' '), model = b.split(' ');
    if (base(a) === base(b)) return {kind: 'diacritics', hint: checkWord(a, b).hint};
    if (current.length === model.length - 1) {
      for (let i = 0; i < model.length; i++) {
        if (model.filter((_, k) => k !== i).join(' ') === a) return {
          kind: 'missing-word', hint: `Пропущено слово «${model[i]}».`
        };
      }
    }
    if (current.length === model.length + 1) {
      for (let i = 0; i < current.length; i++) {
        if (current.filter((_, k) => k !== i).join(' ') === b) return {
          kind: 'extra-word', hint: `Лишнее слово «${current[i]}».`
        };
      }
    }
    if (current.length === model.length) {
      const differences = current.flatMap((word, i) => word === model[i] ? [] : [i]);
      if (differences.length === 1) {
        const single = checkWord(current[differences[0]], model[differences[0]]);
        return {kind: single.kind, hint: `Слово ${differences[0] + 1}: ${single.hint}`};
      }
      if (current.slice().sort().join(' ') === model.slice().sort().join(' ')) return {
        kind: 'word-order', hint: 'Слова знакомые, но их порядок отличается от образца.'
      };
    }
    return {kind: 'other', hint: 'Есть отличия от образца. Проверьте слова, порядок слов и венгерские гласные.'};
  }

  window.TanmuhelyWritingFeedback = Object.freeze({checkWord, checkSentence});
})();
