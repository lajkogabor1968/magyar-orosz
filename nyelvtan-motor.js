(() => {
  'use strict';
  const topicsAll = window.GRAMMAR_TOPICS;
  const levels = ['A1', 'A2', 'B1', 'B2'];
  const $ = id => document.getElementById(id);
  const storeKey = 'hu-ru-grammar-v1'; // A korábbi eredmények tárolókulcsa változatlan.
  const params = new URLSearchParams(window.location.search);
  const initialLevel = levels.includes(params.get('level')) ? params.get('level') : 'A1';
  let level = initialLevel;
  let topicIndex = 0;
  let selections = {};
  let optionOrders = {};
  let checked = false;
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(storeKey) || '{}') || {}; } catch (_) {}

  const topics = () => topicsAll.filter(t => t.level === level);
  const node = (tag, value, className) => {
    const el = document.createElement(tag);
    if (value !== undefined) el.textContent = value;
    if (className) el.className = className;
    return el;
  };
  const normalize = s => String(s ?? '')
    .trim().toLocaleLowerCase('hu-HU')
    .replace(/[.!?]+$/u, '')
    .replace(/\s+/gu, ' ')
    .trim();

  // A régi feleletválasztós leckékben sokszor az első válasz volt helyes.
  // Fisher–Yates-keveréssel minden próbálkozásban változhat a sorrend,
  // miközben a tárolt pontszámok és az eredeti válaszkulcsok változatlanok.
  function shuffleOptions(options) {
    const order = options.map((label, originalIndex) => ({label, originalIndex}));
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  // A régi oldal adatainak és a kiegészített fejezeteknek közös megjelenítője.
  const ruleEl = $('rule');
  const titleRu = node('p', '', 'grammar-topic-title-ru');
  titleRu.lang = 'ru';
  $('title').after(titleRu);
  const prerequisitesEl = node('div', '', 'grammar-prerequisites');
  titleRu.after(prerequisitesEl);
  const topicLabel = document.querySelector('label[for="topic"]');
  if (topicLabel) topicLabel.textContent = 'Грамматическая тема:';
  const huRule = node('div', '', 'rule-hu');
  huRule.id = 'huRule';
  huRule.lang = 'hu';
  ruleEl.before(huRule);
  const tables = node('div', '', 'conjugation-wrap');
  tables.id = 'conjugation';
  $('examples').before(tables);

  // A tankönyvi magyarázat külön, olvasásra optimalizált egységben jelenik
  // meg. A feladatok továbbra is ugyanazon az oldalon és azonos pontkulccsal élnek.
  const practicePanel = $('questions').closest('section');
  practicePanel.id = 'nyelvtan-gyakorlas';
  const practiceIntroRu = node('p',
    'Прочитайте венгерское задание. Под каждым вопросом по-русски указано, что нужно сделать: выбрать вариант или вписать ответ. При проверке учитываются также долгие гласные.',
    'muted practice-intro-ru');
  practiceIntroRu.lang = 'ru';
  practicePanel.querySelector('p.muted')?.after(practiceIntroRu);
  $('restart').textContent = '↺ Попробовать снова';
  $('next').textContent = 'Следующая тема →';
  const introPanel = $('title').closest('section');
  introPanel.id = 'nyelvtan-magyarazat';
  const lessonPanel = node('section', undefined, 'panel textbook-panel');
  lessonPanel.id = 'nyelvtan-tankonyv';
  const lessonHeader = node('h2', '📖 Объяснение и примеры');
  const lessonGoal = node('div', '', 'textbook-goal');
  const lessonSteps = node('div', '', 'textbook-steps');
  const lessonWorked = node('div', '', 'textbook-worked');
  const lessonPitfall = node('div', '', 'textbook-pitfall');
  const lessonGo = node('button', 'Перейти к заданиям →', 'primary lesson-go');
  lessonGo.type = 'button';
  lessonGo.onclick = () => practicePanel.scrollIntoView({behavior: 'smooth', block: 'start'});
  lessonPanel.append(lessonHeader, lessonGoal, lessonSteps, lessonWorked, lessonPitfall, lessonGo);
  practicePanel.before(lessonPanel);
  const lessonBack = node('button', '↑ Вернуться к объяснению', 'lesson-back');
  lessonBack.type = 'button';
  lessonBack.onclick = () => lessonPanel.scrollIntoView({behavior: 'smooth', block: 'start'});
  practicePanel.append(lessonBack);
  const quickNav = node('nav', undefined, 'lesson-quick-nav');
  quickNav.setAttribute('aria-label', 'Tananyag és gyakorlás / Учебник и задания');
  const lessonNavButton = node('button', '📖 Объяснение', 'lesson-nav-study');
  lessonNavButton.type = 'button';
  lessonNavButton.onclick = () => lessonPanel.scrollIntoView({behavior: 'smooth', block: 'start'});
  const practiceNavButton = node('button', '✍️ Упражнения', 'lesson-nav-practice');
  practiceNavButton.type = 'button';
  practiceNavButton.onclick = () => practicePanel.scrollIntoView({behavior: 'smooth', block: 'start'});
  quickNav.append(lessonNavButton, practiceNavButton);
  $('progress').after(quickNav);
  const sourceFooter = document.querySelector('.footer');
  if (sourceFooter) sourceFooter.append(document.createTextNode(
    ' A tankönyvi bemutatás mintája: Kolpakova–Dolovai–Nagy: Венгерская грамматика в таблицах и схемах (КАРО, 2021). A magyarázatok, táblázatok és feladatok saját szerkesztésűek.'));

  function addBilingual(parent, hu, ru, className) {
    const container = node('div', undefined, className);
    const hungarian = node('p', hu, 'lesson-hu');
    const russian = node('p', ru, 'lesson-ru');
    hungarian.lang = 'hu';
    russian.lang = 'ru';
    container.append(hungarian, russian);
    parent.append(container);
    return container;
  }

  function renderLesson(lesson) {
    lessonPanel.classList.toggle('hidden', !lesson);
    lessonBack.classList.toggle('hidden', !lesson);
    lessonNavButton.classList.toggle('hidden', !lesson);
    lessonGoal.replaceChildren();
    lessonSteps.replaceChildren();
    lessonWorked.replaceChildren();
    lessonPitfall.replaceChildren();
    if (!lesson) return;
    addBilingual(lessonGoal, lesson.goalHu, lesson.goalRu, 'lesson-goal-text');
    lesson.steps.forEach((step, i) => {
      const block = node('article', undefined, 'lesson-step');
      block.append(node('h3', `${i + 1}. lépés · Шаг ${i + 1}`));
      addBilingual(block, step.hu, step.ru, 'lesson-step-description');
      addBilingual(block, step.exampleHu, step.exampleRu, 'lesson-step-example');
      lessonSteps.append(block);
    });
    lessonWorked.append(node('h3', 'Kidolgozott mintafeladat · Разобранный пример'));
    lessonWorked.append(node('p', lesson.worked.question));
    lessonWorked.append(node('strong', lesson.worked.answer));
    addBilingual(lessonWorked, lesson.worked.whyHu, lesson.worked.whyRu, 'lesson-reason');
    lessonPitfall.append(node('h3', 'Erre figyelj! · Обрати внимание!'));
    addBilingual(lessonPitfall, lesson.pitfall.hu, lesson.pitfall.ru, 'lesson-warning');
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      $('result').textContent = 'Этот браузер не поддерживает озвучивание.';
      return;
    }
    if (window.TanuloTTS?.cancel) window.TanuloTTS.cancel();
    else window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hu-HU';
    utterance.rate = .85;
    const hungarianVoice = window.speechSynthesis.getVoices()
      .find(v => v.lang.toLowerCase().startsWith('hu'));
    if (hungarianVoice) utterance.voice = hungarianVoice;
    if (window.TanuloTTS?.speak) window.TanuloTTS.speak(utterance);
    else window.speechSynthesis.speak(utterance);
  }

  function updateProgress() {
    const values = Object.values(progress).filter(v =>
      typeof v.score === 'number' && typeof v.max === 'number');
    const points = values.reduce((sum, v) => sum + v.score, 0);
    const max = values.reduce((sum, v) => sum + v.max, 0);
    $('progress').textContent = `${values.length} befejezett témakör · ${points} / ${max} legjobb pont`;
  }

  function renderTable(tableData) {
    tables.replaceChildren();
    if (!tableData) return;
    const heading = node('h3', 'Ragozási és nyelvtani táblázat / Таблица форм');
    const outer = node('div', '', 'conjugation-scroll');
    const table = node('table', '', 'conjugation-table');
    const caption = node('caption', 'Tanuld meg a mintát, majd oldd meg a feladatokat!');
    const thead = node('thead');
    const tr = node('tr');
    tableData.heads.forEach(v => tr.append(node('th', v)));
    thead.append(tr);
    const tbody = node('tbody');
    tableData.rows.forEach(cells => {
      const row = node('tr');
      cells.forEach(v => row.append(node('td', v)));
      tbody.append(row);
    });
    table.append(caption, thead, tbody);
    outer.append(table);
    tables.append(heading, outer);
  }

  function render() {
    checked = false;
    selections = {};
    optionOrders = {};
    const t = topics()[topicIndex];
    $('topic').value = String(topicIndex);
    $('count').textContent = `${level} · ${topics().length} témakör / тем · ${topics().reduce((n, item) => n + item.questions.length, 0)} feladat / заданий`;
    $('tag').textContent = level;
    $('title').textContent = t.title;
    titleRu.textContent = t.titleRu;
    prerequisitesEl.replaceChildren();
    prerequisitesEl.classList.toggle('hidden', !t.prerequisites?.length);
    if (t.prerequisites?.length) {
      prerequisitesEl.append(node('strong', 'Korábban tanultad / Перед этой темой повторите:'));
      const links = node('div', '', 'grammar-prerequisites-links');
      t.prerequisites.forEach(related => {
        const button = node('button', related.level + ' · ' + related.title + ' / ' + related.titleRu);
        button.type = 'button';
        button.className = 'secondary';
        button.onclick = () => {
          setLevel(related.level);
          const target = topics().findIndex(item => item.title === related.title);
          if (target < 0) return;
          topicIndex = target;
          render();
          $('nyelvtan-magyarazat').scrollIntoView({behavior: 'smooth', block: 'start'});
        };
        links.append(button);
      });
      prerequisitesEl.append(links);
    }
    $('rule').textContent = t.rule;
    huRule.textContent = t.ruleHu || '';
    huRule.classList.toggle('hidden', !t.ruleHu);
    renderTable(t.table);
    renderLesson(t.lesson);
    $('check').disabled = false;
    $('result').textContent = '';

    $('examples').replaceChildren();
    t.examples.forEach(([hu, ru]) => {
      const ex = node('div', undefined, 'example');
      ex.append(node('strong', hu), node('span', ru));
      const audioButton = node('button', '🔊');
      audioButton.type = 'button';
      audioButton.setAttribute('aria-label', `${hu} – magyar felolvasás`);
      audioButton.onclick = () => speak(hu);
      ex.append(document.createTextNode(' '), audioButton);
      $('examples').append(ex);
    });

    $('questions').replaceChildren();
    t.questions.forEach((q, i) => {
      const group = node('div', undefined, 'question');
      group.append(node('h3', `${i + 1}. ${q.q}`));
      const instructionRu = node('p', q.instructionRu, 'question-instruction-ru');
      instructionRu.lang = 'ru';
      group.append(instructionRu);
      if (q.type === 'input') {
        const inp = node('input');
        inp.type = 'text';
        inp.className = 'grammar-input';
        inp.autocomplete = 'off';
        inp.spellcheck = false;
        inp.placeholder = 'Írd be az alakot! / Впишите форму';
        inp.setAttribute('aria-label', `A(z) ${i + 1}. feladat megoldása`);
        inp.addEventListener('input', () => { selections[i] = inp.value; });
        inp.addEventListener('keydown', e => {
          if (e.key === 'Enter' && !checked) {
            e.preventDefault();
            const next = $('questions').querySelectorAll('.grammar-input');
            const index = [...next].indexOf(inp);
            if (index < next.length - 1) next[index + 1].focus();
            else $('check').focus();
          }
        });
        group.append(inp);
      } else {
        const options = node('div', undefined, 'options');
        const order = shuffleOptions(q.options);
        optionOrders[i] = order;
        order.forEach(({label, originalIndex}, j) => {
          const button = node('button', label);
          button.type = 'button';
          button.setAttribute('aria-pressed', 'false');
          button.onclick = () => {
            if (checked) return;
            selections[i] = originalIndex;
            [...options.children].forEach((other, k) => {
              other.classList.toggle('chosen', k === j);
              other.setAttribute('aria-pressed', String(k === j));
            });
          };
          options.append(button);
        });
        group.append(options);
      }
      const feedback = node('p', '', 'feedback');
      feedback.setAttribute('aria-live', 'polite');
      group.append(feedback);
      $('questions').append(group);
    });
    updateProgress();
  }

  function setLevel(newLevel) {
    level = newLevel;
    document.querySelectorAll('[data-level]').forEach(button =>
      button.classList.toggle('active', button.dataset.level === newLevel));
    const selector = $('topic');
    selector.replaceChildren();
    topics().forEach((t, i) => {
      const opt = node('option', `${i + 1}. ${t.title} / ${t.titleRu}`);
      opt.value = String(i);
      selector.append(opt);
    });
    topicIndex = 0;
    render();
  }

  function grade() {
    if (checked) return;
    const t = topics()[topicIndex];
    const missing = t.questions.findIndex((q, i) =>
      q.type === 'input' ? !String(selections[i] ?? '').trim() : !Number.isInteger(selections[i]));
    if (missing !== -1) {
      $('result').textContent = `Még nincs meg minden válasz: a(z) ${missing + 1}. feladatot is oldd meg! / Заполните все ответы.`;
      const row = $('questions').children[missing];
      (row.querySelector('input') || row.querySelector('button'))?.focus();
      return;
    }
    checked = true;
    let score = 0;
    [...$('questions').children].forEach((group, i) => {
      const q = t.questions[i];
      const correct = q.type === 'input'
        ? q.accept.some(a => normalize(a) === normalize(selections[i]))
        : selections[i] === q.answer;
      if (correct) score += 1;
      let correctAnswer;
      if (q.type === 'input') {
        const inp = group.querySelector('input');
        inp.disabled = true;
        inp.classList.toggle('right', correct);
        inp.classList.toggle('wrong', !correct);
        correctAnswer = q.accept.join(' / ');
      } else {
        const buttons = [...group.querySelectorAll('.options button')];
        buttons.forEach((button, j) => {
          button.disabled = true;
          button.classList.remove('chosen');
          const originalIndex = optionOrders[i][j].originalIndex;
          if (originalIndex === q.answer) button.classList.add('right');
          else if (originalIndex === selections[i]) button.classList.add('wrong');
        });
        correctAnswer = q.options[q.answer];
      }
      const feedback = group.querySelector('.feedback');
      // A1–A2: a tanuló a visszajelzést magyar nyelvtudás nélkül is értse.
      const explanation = q.whyRu || (['A1','A2'].includes(level) ? t.rule : q.why);
      feedback.textContent =
        `${correct ? '✓ Верно. ' : '✗ Попробуйте ещё раз. '}${q.type === 'input' ? 'Правильные варианты' : 'Правильный ответ'}: ${correctAnswer}. ${explanation || ''}`;
      feedback.lang = 'ru';
    });
    const percent = Math.round(score / t.questions.length * 100);
    $('result').textContent = `${score} / ${t.questions.length} баллов · ${percent}%. ` +
      (score === t.questions.length
        ? 'Отлично!'
        : 'Прочитайте объяснения и попробуйте снова.');
    $('check').disabled = true;
    const key = `${level}:${topicIndex}`;
    // Csak a legjobb eredményt tároljuk, a korábbi pontok nem vesznek el.
    if (!progress[key] || score > progress[key].score) {
      progress[key] = {score, max: t.questions.length};
      try { localStorage.setItem(storeKey, JSON.stringify(progress)); } catch (_) {}
    }
    updateProgress();
  }

  levels.forEach(value => {
    const btn = node('button', value);
    btn.type = 'button';
    btn.dataset.level = value;
    btn.onclick = () => setLevel(value);
    $('levels').append(btn);
  });
  $('topic').onchange = e => {
    topicIndex = Number(e.target.value);
    render();
  };
  $('check').onclick = grade;
  $('restart').onclick = render;
  $('next').onclick = () => {
    topicIndex = (topicIndex + 1) % topics().length;
    render();
  };
  setLevel(initialLevel);
})();
