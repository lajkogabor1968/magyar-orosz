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

  // Suggestions for open-ended writing are intentionally non-scoring. A
  // spelling is suggested only when the current lesson provides exactly one
  // Hungarian model for that accent-insensitive word; ambiguous pairs are
  // left alone. Inflected forms must occur explicitly in the teacher models.
  const hungarianWords = value => String(value ?? '').normalize('NFC')
    .toLocaleLowerCase('hu-HU').match(/[a-záéíóöőúüű]+/gu) || [];
  function suggestAccents(draft, modelPhrases) {
    if (!Array.isArray(modelPhrases)) return [];
    const models = new Map();
    for (const phrase of modelPhrases) for (const word of hungarianWords(phrase)) {
      const key = base(word);
      if (!models.has(key)) models.set(key, new Set());
      models.get(key).add(word);
    }
    const suggestions = [], seen = new Set();
    for (const typed of hungarianWords(draft)) {
      if (seen.has(typed)) continue;
      seen.add(typed);
      const options = models.get(base(typed));
      if (!options || options.size !== 1) continue;
      const [expected] = options;
      if (typed === expected || base(expected) === expected) continue;
      suggestions.push({received: typed, expected});
      if (suggestions.length === 3) break;
    }
    return suggestions;
  }

  // These are narrow A1 writing prompts, not a general grammar checker.
  // Only unequivocal forms explicitly contrasted in lessons 15–16 are
  // mentioned, and the caller must never turn a suggestion into a score.
  function suggestBeginnerGrammar(draft, lessonIndex) {
    const text = normalize(draft);
    if (lessonIndex === 14) {
      const subject = '(?:a tanár|az orvos|a ház|a szoba|péter|éva)';
      const adjective = '(?:kedves|fiatal|magas|alacsony|boldog|szép|jó|rossz|kicsi|nagy|új|régi)';
      const unnecessaryVan = new RegExp(`(?:^|[.!?]\\s*)${subject}\\s+(?:nem\\s+)?(?:nagyon\\s+)?${adjective}\\s+van(?=\\s*(?:[.!?]|$))`, 'u');
      if (unnecessaryVan.test(text)) return [
        'При описании качества в третьем лице настоящего времени не добавляйте van: A tanár kedves. / A ház nagy. Сравните: Én kedves vagyok.'
      ];
    }
    if (lessonIndex === 15 && /\bnem\s+van\b/u.test(text)) return [
      'Когда говорим, что чего-то нет, используйте nincs: Nincs autóm. Форма Nem van autóm в этом упражнении неверна.'
    ];
    return [];
  }

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

  function insertHungarianLetter(input, letter) {
    if (!input || typeof input.value !== 'string' ||
        typeof letter !== 'string' || letter.length !== 1 || !'áéíóöőúüű'.includes(letter)) return false;
    const start = Number.isInteger(input.selectionStart) ? input.selectionStart : input.value.length;
    const end = Number.isInteger(input.selectionEnd) ? input.selectionEnd : start;
    const first = Math.min(start, end), last = Math.max(start, end);
    input.value = input.value.slice(0, first) + letter + input.value.slice(last);
    input.focus?.();
    input.setSelectionRange?.(first + 1, first + 1);
    const EventType = input.ownerDocument?.defaultView?.Event;
    if (EventType && input.dispatchEvent) input.dispatchEvent(new EventType('input', {bubbles: true}));
    return true;
  }

  window.TanmuhelyWritingFeedback = Object.freeze({checkWord, checkSentence, suggestAccents, suggestBeginnerGrammar, insertHungarianLetter});
})();
