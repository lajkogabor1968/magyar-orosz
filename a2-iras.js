(() => {
  'use strict';
  const tasks = window.A2_WRITING_TASKS || [];
  const $ = id => document.getElementById(id);
  let active = 0;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function countWords(text) {
    const words = text.trim().match(/\S+/g);
    return words ? words.length : 0;
  }

  function showCount() {
    const words = countWords($('answer').value);
    let hint = '';
    if (words === 0) hint = 'Kezdj el írni! / Начните писать.';
    else if (words < 40) hint = 'Még bővítheted a szöveget. / Можно написать ещё немного.';
    else if (words > 65) hint = 'Érdemes rövidíteni. / Стоит немного сократить текст.';
    else hint = 'A gyakorláshoz javasolt hosszban vagy. / Объём текста подходит для тренировки.';
    $('word-count').textContent = 'Szavak száma / Количество слов: ' + words + '. ' + hint;
  }

  function render() {
    const task = tasks[active];
    $('task').value = task.id;
    $('previous').disabled = active === 0;
    $('next').disabled = active === tasks.length - 1;
    $('title').textContent = (active + 1) + '. ' + task.title;
    $('kind').textContent = task.kind + ' · A2 · kb. 50 szó';
    $('situation').textContent = task.situation;
    $('situation-ru').textContent = task.situationRu;
    $('cues').replaceChildren();
    task.cues.forEach(cue => $('cues').append(element('li', cue)));
    $('expressions').replaceChildren();
    task.expressions.forEach(([hungarian, russian]) => {
      const line = document.createElement('p');
      line.append(element('strong', hungarian));
      const translation = element('span', ' — ' + russian);
      translation.lang = 'ru';
      line.append(translation);
      $('expressions').append(line);
    });
    document.querySelector('.expressions').open = false;
    $('answer').value = '';
    $('checklist').replaceChildren();
    task.cues.forEach((cue, index) => {
      const label = element('label', '', 'check-row');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = 'cue';
      input.value = String(index);
      label.append(input, element('span', cue));
      $('checklist').append(label);
    });
    $('feedback').replaceChildren();
    $('model').classList.add('hidden');
    $('model').textContent = '';
    $('show-model').disabled = false;
    showCount();
  }

  function changeTask(index) {
    if (index < 0 || index >= tasks.length) return;
    active = index;
    render();
    const url = new URL(window.location.href);
    url.searchParams.set('task', tasks[active].id);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
    window.scrollTo(0, 0);
  }

  function review() {
    const wordCount = countWords($('answer').value);
    const marked = $('checklist').querySelectorAll('input:checked').length;
    $('feedback').replaceChildren();
    if (wordCount === 0) {
      $('feedback').append(element('p', 'Először írj saját szöveget! / Сначала напишите свой текст.', 'feedback warning'));
      return;
    }
    const message = [];
    message.push('A négy tartalmi pontból ' + marked + '-et jelöltél teljesítettnek.');
    if (wordCount < 40) message.push('Próbáld legalább 40 szóra bővíteni a szöveget!');
    else if (wordCount > 65) message.push('Próbáld 65 szó alá rövidíteni!');
    else message.push('A szöveg hossza megfelelő a gyakorláshoz.');
    if (marked < 4) message.push('Nézd meg, melyik tartalmi pontra nem válaszoltál!');
    message.push('A nyelvhelyességet és az érthetőséget tanár vagy más hozzáértő személy tudja megbízhatóan értékelni.');
    $('feedback').append(element('p', message.join(' '), 'feedback' + (marked < 4 || wordCount < 40 || wordCount > 65 ? ' warning' : '')));
  }

  if (!tasks.length) {
    $('title').textContent = 'Jelenleg nem érhetők el az írásfeladatok.';
    $('review').disabled = true;
    return;
  }
  tasks.forEach((task, index) => {
    const option = document.createElement('option');
    option.value = task.id;
    option.textContent = (index + 1) + '. ' + task.title;
    $('task').append(option);
  });
  const requested = new URLSearchParams(location.search).get('task');
  const index = tasks.findIndex(task => task.id === requested);
  if (index >= 0) active = index;
  $('task').addEventListener('change', event => changeTask(tasks.findIndex(task => task.id === event.target.value)));
  $('previous').addEventListener('click', () => changeTask(active - 1));
  $('next').addEventListener('click', () => changeTask(active + 1));
  $('answer').addEventListener('input', showCount);
  $('review').addEventListener('click', review);
  $('show-model').addEventListener('click', () => {
    $('model').textContent = 'Mintaválasz / Пример ответа: ' + tasks[active].sample;
    $('model').classList.remove('hidden');
    $('show-model').disabled = true;
  });
  render();
})();
