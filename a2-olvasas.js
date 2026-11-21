(() => {
  'use strict';

  const lessons = window.A2_READING_LESSONS || [];
  const $ = id => document.getElementById(id);
  const progressKey = 'hu-ru-a2-reading-v1';
  let active = 0;
  let checked = false;
  let progress = {};

  try {
    const saved = JSON.parse(localStorage.getItem(progressKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) progress = saved;
  } catch {
    progress = {};
  }

  function makeText(tag, value, className) {
    const node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function makeQuestion(index, section, number, prompt, options, answer, evidence) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'exercise';
    fieldset.dataset.question = String(index);
    fieldset.dataset.correct = String(answer);
    fieldset.dataset.evidence = evidence;
    fieldset.dataset.solution = options[answer];
    const legend = makeText('legend', number + '. ' + prompt);
    const choices = makeText('div', '', 'choices');
    options.forEach((option, optionIndex) => {
      const label = makeText('label', '', 'choice');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'question-' + index;
      radio.value = String(optionIndex);
      const span = makeText('span', option);
      label.append(radio, span);
      choices.append(label);
    });
    fieldset.append(legend, choices);
    $(section).append(fieldset);
  }

  function updateProgress() {
    const completed = lessons.filter(lesson => progress[lesson.id]?.max === 10).length;
    const best = lessons.reduce((sum, lesson) => sum + (progress[lesson.id]?.score || 0), 0);
    $('progress').textContent = completed + ' / ' + lessons.length + ' szöveg megoldva · ' +
      best + ' / ' + (lessons.length * 10) + ' legjobb pont összesen (a megoldott szövegekből).';
  }

  function render() {
    checked = false;
    const lesson = lessons[active];
    $('lesson').value = lesson.id;
    $('previous').disabled = active === 0;
    $('next').disabled = active === lessons.length - 1;
    $('next-bottom').disabled = active === lessons.length - 1;
    $('reading-title').textContent = (active + 1) + '. ' + lesson.title;
    $('topic').textContent = lesson.topic + ' · A2';
    $('reading').replaceChildren();
    lesson.paragraphs.forEach(paragraph => $('reading').append(makeText('p', paragraph)));

    $('glossary').replaceChildren();
    lesson.glossary.forEach(([hungarian, russian]) => {
      const item = makeText('div', '', 'word');
      const hu = makeText('strong', hungarian);
      const ru = makeText('span', ' — ' + russian, 'ru');
      ru.lang = 'ru';
      item.append(hu, ru);
      $('glossary').append(item);
    });
    document.querySelector('.glossary').open = false;

    ['true-false', 'multiple-choice', 'fill'].forEach(id => $(id).replaceChildren());
    let questionIndex = 0;
    lesson.trueFalse.forEach((question, index) => {
      makeQuestion(questionIndex++, 'true-false', index + 1, question.text,
        ['Igaz', 'Hamis'], question.answer ? 0 : 1, question.evidence);
    });
    lesson.multipleChoice.forEach((question, index) => {
      makeQuestion(questionIndex++, 'multiple-choice', index + 1, question.text,
        question.options, question.answer, question.evidence);
    });
    makeQuestion(questionIndex++, 'fill', 1, lesson.fill.text,
      lesson.fill.options, lesson.fill.answer, lesson.fill.evidence);

    $('open-question').textContent = lesson.open.question;
    $('open-answer').value = '';
    $('open-answer').disabled = false;
    $('model').classList.add('hidden');
    $('model').textContent = '';
    $('check').disabled = false;
    $('result').replaceChildren();
    updateProgress();
  }

  function changeLesson(nextIndex) {
    if (nextIndex < 0 || nextIndex >= lessons.length) return;
    active = nextIndex;
    render();
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lesson', lessons[active].id);
    window.history.replaceState(null, '', nextUrl.pathname + nextUrl.search + nextUrl.hash);
    window.scrollTo(0, 0);
  }

  function saveScore(score, max) {
    const lesson = lessons[active];
    const previous = progress[lesson.id];
    if (!previous || score > previous.score) {
      progress[lesson.id] = { score, max, date: new Date().toISOString() };
      try {
        localStorage.setItem(progressKey, JSON.stringify(progress));
      } catch {
        // A böngésző letilthatja a helyi tárolást; a feladat ekkor is működik.
      }
    }
  }

  function check() {
    if (checked) return;
    const questions = Array.from(document.querySelectorAll('[data-question]'));
    const missing = questions.find(fieldset => !fieldset.querySelector('input:checked'));
    $('result').replaceChildren();
    if (missing) {
      $('result').append(makeText('p',
        'Először mind a 10 kérdésre válaszolj! / Сначала ответьте на все 10 вопросов.',
        'notice'));
      missing.querySelector('input')?.focus();
      return;
    }
    checked = true;
    let score = 0;
    questions.forEach(fieldset => {
      const correct = Number(fieldset.dataset.correct);
      const picked = Number(fieldset.querySelector('input:checked').value);
      const isCorrect = picked === correct;
      if (isCorrect) score++;
      fieldset.querySelectorAll('.choice').forEach((label, index) => {
        if (index === correct) label.classList.add('correct');
        else if (index === picked) label.classList.add('wrong');
      });
      fieldset.querySelectorAll('input').forEach(input => { input.disabled = true; });
      const feedback = makeText('div', '', 'answer-feedback' + (isCorrect ? '' : ' wrong'));
      feedback.append(makeText('strong',
        isCorrect ? '✓ Helyes válasz / Верно' : '✗ Helyes: ' + fieldset.dataset.solution + ' / Правильный ответ'));
      feedback.append(makeText('span', 'A szövegben: „' + fieldset.dataset.evidence + '”'));
      fieldset.append(feedback);
    });
    $('model').textContent = 'Lehetséges válasz / Пример ответа: ' + lessons[active].open.sample;
    $('model').classList.remove('hidden');
    $('check').disabled = true;
    saveScore(score, questions.length);
    $('result').append(makeText('p',
      'Eredmény / Результат: ' + score + ' / ' + questions.length +
      ' pont. ' + (score === questions.length ? 'Nagyszerű! / Отлично!' : 'Olvasd el az indoklásokat, majd próbáld újra! / Прочитайте объяснения и попробуйте ещё раз.'),
      'result'));
    updateProgress();
  }

  if (!lessons.length) {
    $('reading-title').textContent = 'A szövegek nem érhetők el.';
    $('check').disabled = true;
    return;
  }
  lessons.forEach((lesson, index) => {
    const option = document.createElement('option');
    option.value = lesson.id;
    option.textContent = (index + 1) + '. ' + lesson.title;
    $('lesson').append(option);
  });
  const requested = new URLSearchParams(window.location.search).get('lesson');
  const requestedIndex = lessons.findIndex(lesson => lesson.id === requested);
  if (requestedIndex >= 0) active = requestedIndex;
  $('lesson').addEventListener('change', event => {
    changeLesson(lessons.findIndex(lesson => lesson.id === event.target.value));
  });
  $('previous').addEventListener('click', () => changeLesson(active - 1));
  $('next').addEventListener('click', () => changeLesson(active + 1));
  $('next-bottom').addEventListener('click', () => changeLesson(active + 1));
  $('check').addEventListener('click', check);
  $('retry').addEventListener('click', render);
  render();
})();
