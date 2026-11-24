(() => {
  'use strict';
  // The second question always checks a different detail. The first explanation
  // quotes only the part needed for that answer.
  const lessons = [
    {id:'targyak', title:'Что вы услышали?', questions:[
      {ask:'Какой предмет назван первым?', answer:'Телефон.', other:['Радио.','Банан.'], evidence:'«Ez egy telefon» — «Это телефон».'},
      {ask:'Какие два вида транспорта названы?', answer:'Такси и метро.', other:['Такси и автобус.','Метро и трамвай.'], evidence:'После слова telefon звучат taxi и metró.'}
    ]},
    {id:'koszones', title:'Первое знакомство', questions:[
      {ask:'Какое имя вы услышали?', answer:'Анна.', other:['Ольга.','Мария.'], evidence:'«A nevem Anna» — «Меня зовут Анна».'},
      {ask:'Что Анна говорит о своём самочувствии?', answer:'У неё всё хорошо.', other:['Она устала.','Она хочет спать.'], evidence:'«Jól vagyok, köszönöm» — «У меня всё хорошо, спасибо».'}
    ]},
    {id:'csalad', title:'Семейная фотография', questions:[
      {ask:'О ком этот рассказ?', answer:'О семье.', other:['О соседях.','О друзьях.'], evidence:'«Ez a családom» — «Это моя семья».'},
      {ask:'Кого представляют после мамы?', answer:'Папу.', other:['Бабушку.','Брата.'], evidence:'После anyukám звучит «Ő az apukám» — «Это мой папа».'}
    ]},
    {id:'kulcs', title:'Где лежит ключ?', questions:[
      {ask:'Какой предмет мебели называют во второй фразе?', answer:'Стул.', other:['Кровать.','Шкаф.'], evidence:'«Ez egy szék» — «Это стул».'},
      {ask:'Где находится ключ?', answer:'На столе.', other:['На стуле.','В сумке.'], evidence:'«A kulcs az asztalon van» — «Ключ на столе».'}
    ]},
    {id:'ital', title:'Напиток и завтрак', questions:[
      {ask:'Какой напиток заказывает говорящий?', answer:'Чай.', other:['Воду.','Кофе.'], evidence:'«Kérek egy teát» — «Один чай, пожалуйста». Воду упоминают отдельно: «Vizet iszom» — «Я пью воду».'},
      {ask:'Что говорящий ест утром?', answer:'Хлеб.', other:['Банан.','Яблоко.'], evidence:'«Reggel kenyeret eszem» — «Утром я ем хлеб».'}
    ]},
    {id:'napirend', title:'Сегодня и завтра', questions:[
      {ask:'Что человек делает сегодня?', answer:'Учится.', other:['Работает.','Готовит.'], evidence:'«Ma tanulok» — «Сегодня я учусь».'},
      {ask:'Когда человек будет работать?', answer:'Завтра.', other:['Сегодня вечером.','Сегодня утром.'], evidence:'«Holnap dolgozom» — «Завтра я работаю».'}
    ]},
    {id:'kerdesek', title:'Утром и вечером', questions:[
      {ask:'Когда человек учится?', answer:'Утром.', other:['Днём.','Вечером.'], evidence:'«Reggel tanulok» — «Я учусь утром».'},
      {ask:'Что человек делает вечером?', answer:'Читает.', other:['Пишет.','Работает.'], evidence:'«Este olvasok» — «Вечером я читаю».'}
    ]},
    {id:'hely', title:'Где мама и папа?', questions:[
      {ask:'Где папа?', answer:'В магазине.', other:['Дома.','В парке.'], evidence:'«Apa a boltban van» — «Папа в магазине».'},
      {ask:'Где мама?', answer:'В саду.', other:['В магазине.','В школе.'], evidence:'«Anya a kertben van» — «Мама в саду».'}
    ]}
  ];
  const clips = window.TanuloGaborReadingClips.A1;
  const items = lessons.map(lesson => ({...lesson, clip: clips.find(clip => clip.id === lesson.id)})).filter(lesson => lesson.clip);
  const $ = id => document.getElementById(id);
  const dialog = $('a1ListeningDialog');
  const player = $('listeningAudio');
  const transcript = $('listeningTranscript');
  const store = window.TanmuhelyPractice.store('magyarorosz.a1-listening.v1');
  let active, finish, index, heard, usedText, answers;

  function unlock() {
    if (answers[index] || (!heard && !usedText)) return;
    for (const button of $('listeningOptions').children) button.disabled = false;
  }
  function showQuestion() {
    const question = active.questions[index];
    $('listeningStep').textContent = 'Вопрос ' + (index + 1) + ' из ' + active.questions.length;
    $('listeningQuestion').textContent = question.ask;
    $('listeningFeedback').textContent = '';
    $('listeningNext').hidden = true;
    const options = $('listeningOptions');
    options.replaceChildren();
    for (const label of window.MagyarOroszQuizOptions.shuffle([question.answer, ...question.other])) {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = label; button.disabled = !heard && !usedText;
      button.onclick = () => {
        if (answers[index] || (!heard && !usedText)) return;
        const correct = label === question.answer;
        answers[index] = { correct, withText: usedText || transcript.open };
        for (const option of options.children) {
          option.disabled = true;
          option.classList.toggle('is-correct', option.textContent === question.answer);
        }
        if (!correct) button.classList.add('is-mistake');
        $('listeningFeedback').textContent = (correct ? '✓ Верно. ' : 'Правильный ответ: ' + question.answer + ' ') + question.evidence;
        $('listeningNext').textContent = index + 1 === active.questions.length ? 'Результат' : 'Следующий вопрос';
        $('listeningNext').hidden = false;
        $('listeningNext').focus();
      };
      options.append(button);
    }
  }
  function start() {
    player.pause();
    index = 0; heard = false; usedText = false; answers = [];
    $('listeningResult').hidden = true;
    $('listeningTask').hidden = false;
    $('listeningTitle').textContent = active.title;
    $('listeningStatus').textContent = 'Прослушайте запись до конца. Её можно включать несколько раз.';
    transcript.open = false;
    transcript.querySelector('p').textContent = active.clip.text;
    player.src = active.clip.url;
    showQuestion();
  }
  function open(id, onFinish) {
    const lesson = items.find(item => item.id === id);
    if (!lesson || dialog.open) return;
    active = lesson; finish = onFinish;
    start(); dialog.showModal(); $('listeningTitle').focus();
  }
  player.addEventListener('play', () => {
    window.TanuloTTS?.cancel();
    window.tanmuhelyActiveTeacherReading?.pause();
    const stopRecording = $('integratedVoiceRecordStop');
    if (stopRecording && !stopRecording.disabled) stopRecording.click();
  });
  player.addEventListener('ended', () => {
    if (!dialog.open || !active || !$('listeningResult').hidden) return;
    heard = true;
    if (!usedText) $('listeningStatus').textContent = 'Теперь ответьте. При желании послушайте ещё раз.';
    unlock();
  });
  player.addEventListener('error', () => {
    if (dialog.open && player.hasAttribute('src') && player.error) $('listeningStatus').textContent = 'Запись не загрузилась. Можно открыть текст и выполнить задание по чтению.';
  });
  transcript.addEventListener('toggle', () => {
    if (!dialog.open || !transcript.open || !$('listeningResult').hidden) return;
    usedText = true;
    $('listeningStatus').textContent = 'Следующие ответы будут отмечены как работа с текстом.';
    unlock();
  });
  $('listeningNext').onclick = () => {
    if (!answers[index]) return;
    if (index + 1 < active.questions.length) {
      index++;
      showQuestion();
      $('listeningQuestion').focus();
      return;
    }
    player.pause();
    const listened = answers.filter(answer => !answer.withText);
    const onlyAudio = listened.filter(answer => answer.correct).length;
    const totalCorrect = answers.filter(answer => answer.correct).length;
    const {saved} = store.update(active.id, old => ({
      best: Math.max(old.best || 0, onlyAudio),
      listened: !!old.listened || listened.length > 0,
      last: {correct:totalCorrect, audio:onlyAudio, text:answers.length-listened.length}
    }));
    $('listeningTask').hidden = true;
    $('listeningResult').hidden = false;
    $('listeningStatus').textContent = '';
    $('listeningScore').textContent = 'Верных ответов: ' + totalCorrect + ' из ' + answers.length + '. Из них на слух, до открытия текста: ' + onlyAudio + '.' + (saved ? '' : ' Не удалось сохранить результат в браузере.');
    $('listeningFinish').textContent = finish ? 'Перейти к уроку' : 'Вернуться к уроку';
    $('listeningResult').querySelector('h3').focus();
  };
  $('listeningRetry').onclick = () => { start(); player.focus(); };
  $('listeningFinish').onclick = () => { dialog.close(); finish?.(); };
  dialog.querySelector('.dialog-close').onclick = () => dialog.close();
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    player.pause(); player.removeAttribute('src'); player.load();
  });
  window.TanmuhelyListening = {items, open, progress: store.read};
})();
