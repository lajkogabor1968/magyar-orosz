// Feleletválasztós válaszok: azonos magyar kérdéshez tartozó másik helyes
// orosz fordítás SOHA nem lehet hibás válaszlehetőség.
(() => {
  'use strict';

  const normalized = text => String(text ?? '')
    .normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
  const normalizedAnswer = text => normalized(text).replace(/[.!?…]+$/u, '');

  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function buildOptions(target, entries, type, random = Math.random) {
    if (type !== 'quiz' && type !== 'sentences') {
      throw new Error(`Ismeretlen feladattípus: ${type}`);
    }
    const promptField = type === 'sentences' ? 'huS' : 'hu';
    const answerField = type === 'sentences' ? 'ruS' : 'ru';
    const prompt = normalized(target[promptField]);
    const seenAnswers = new Set([normalizedAnswer(target[answerField])]);
    const options = [target];

    for (const candidate of shuffle(entries, random)) {
      // Többjelentésű címszavaknál és azonos példamondatoknál a másik
      // fordítás is helyes lehet, ezért a magyar kérdés nem ismétlődhet.
      if (candidate.id === target.id || normalized(candidate[promptField]) === prompt) continue;
      const answer = normalizedAnswer(candidate[answerField]);
      if (!answer || seenAnswers.has(answer)) continue;
      seenAnswers.add(answer);
      options.push(candidate);
      if (options.length === 4) break;
    }
    return shuffle(options, random);
  }

  window.MagyarOroszQuizOptions = Object.freeze({ buildOptions, shuffle });
})();
