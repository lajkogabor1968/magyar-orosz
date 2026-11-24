(() => {
  'use strict';
  // The second question always checks a different detail. The first explanation
  // quotes only the part needed for that answer.
  const lessons = [
    {id:'targyak', title:'Что вы услышали?', questions:[
      {ask:'Какой предмет назван первым?', answer:'Телефон.', other:['Радио.','Банан.'], evidence:'«Ez egy telefon» — «Это телефон».', cue:["Ez egy telefon."]},
      {ask:'Какие два вида транспорта названы?', answer:'Такси и метро.', other:['Такси и автобус.','Метро и трамвай.'], evidence:'После слова telefon звучат taxi и metró.', cue:["Ez egy taxi.", "Ez a metró."]}
    ]},
    {id:'koszones', title:'Первое знакомство', questions:[
      {ask:'Какое имя вы услышали?', answer:'Анна.', other:['Ольга.','Мария.'], evidence:'«A nevem Anna» — «Меня зовут Анна».', cue:["A nevem Anna."]},
      {ask:'Что Анна говорит о своём самочувствии?', answer:'У неё всё хорошо.', other:['Она устала.','Она хочет спать.'], evidence:'«Jól vagyok, köszönöm» — «У меня всё хорошо, спасибо».', cue:["Jól vagyok, köszönöm."]}
    ]},
    {id:'csalad', title:'Семейная фотография', questions:[
      {ask:'О ком этот рассказ?', answer:'О семье.', other:['О соседях.','О друзьях.'], evidence:'«Ez a családom» — «Это моя семья».', cue:["Ez a családom."]},
      {ask:'Кого представляют после мамы?', answer:'Папу.', other:['Бабушку.','Брата.'], evidence:'После anyukám звучит «Ő az apukám» — «Это мой папа».', cue:["Ő az apukám."]}
    ]},
    {id:'kulcs', title:'Где лежит ключ?', questions:[
      {ask:'Какой предмет мебели называют во второй фразе?', answer:'Стул.', other:['Кровать.','Шкаф.'], evidence:'«Ez egy szék» — «Это стул».', cue:["Ez egy szék."]},
      {ask:'Где находится ключ?', answer:'На столе.', other:['На стуле.','В сумке.'], evidence:'«A kulcs az asztalon van» — «Ключ на столе».', cue:["A kulcs az asztalon van."]}
    ]},
    {id:'ital', title:'Напиток и завтрак', questions:[
      {ask:'Какой напиток заказывает говорящий?', answer:'Чай.', other:['Воду.','Кофе.'], evidence:'«Kérek egy teát» — «Один чай, пожалуйста». Воду упоминают отдельно: «Vizet iszom» — «Я пью воду».', cue:["Kérek egy teát."]},
      {ask:'Что говорящий ест утром?', answer:'Хлеб.', other:['Банан.','Яблоко.'], evidence:'«Reggel kenyeret eszem» — «Утром я ем хлеб».', cue:["Reggel kenyeret eszem."]}
    ]},
    {id:'napirend', title:'Сегодня и завтра', questions:[
      {ask:'Что человек делает сегодня?', answer:'Учится.', other:['Работает.','Готовит.'], evidence:'«Ma tanulok» — «Сегодня я учусь».', cue:["Ma tanulok."]},
      {ask:'Когда человек будет работать?', answer:'Завтра.', other:['Сегодня вечером.','Сегодня утром.'], evidence:'«Holnap dolgozom» — «Завтра я работаю».', cue:["Holnap dolgozom."]}
    ]},
    {id:'kerdesek', title:'Утром и вечером', questions:[
      {ask:'Когда человек учится?', answer:'Утром.', other:['Днём.','Вечером.'], evidence:'«Reggel tanulok» — «Я учусь утром».', cue:["Reggel tanulok."]},
      {ask:'Что человек делает вечером?', answer:'Читает.', other:['Пишет.','Работает.'], evidence:'«Este olvasok» — «Вечером я читаю».', cue:["Este olvasok."]}
    ]},
    {id:'hely', title:'Где мама и папа?', questions:[
      {ask:'Где папа?', answer:'В магазине.', other:['Дома.','В парке.'], evidence:'«Apa a boltban van» — «Папа в магазине».', cue:["Apa a boltban van."]},
      {ask:'Где мама?', answer:'В саду.', other:['В магазине.','В школе.'], evidence:'«Anya a kertben van» — «Мама в саду».', cue:["Anya a kertben van."]}
    ]},
    {id:"bemutatkozas", title:"Знакомство", questions:[
      {"ask": "Кто Анна по роду занятий?", "answer": "Студентка.", "other": ["Учительница.", "Врач."], "evidence": "«Diák vagyok» — «Я студентка».", cue:["Diák vagyok."]},
      {"ask": "В каком городе живёт Анна?", "answer": "В Будапеште.", "other": ["В Сегеде.", "В Москве."], "evidence": "«Budapesten lakom» — «Я живу в Будапеште».", cue:["Budapesten lakom."]}
    ]},
    {id:"nyelvek", title:"Языки", questions:[
      {"ask": "На каком языке говорит Петер?", "answer": "По-русски.", "other": ["По-французски.", "По-немецки."], "evidence": "«Oroszul beszél» — «Он говорит по-русски».", cue:["Oroszul beszél."]},
      {"ask": "На каком языке говорит Анна?", "answer": "По-венгерски.", "other": ["По-русски.", "По-английски."], "evidence": "«Magyarul beszél» — «Она говорит по-венгерски».", cue:["Magyarul beszél."]}
    ]},
    {id:"jegyek", title:"Что в комнате?", questions:[
      {"ask": "Сколько стульев в комнате?", "answer": "Три.", "other": ["Два.", "Пять."], "evidence": "«Három szék van itt» — «Здесь три стула».", cue:["Három szék van itt."]},
      {"ask": "Что лежит на столе?", "answer": "Два яблока.", "other": ["Три яблока.", "Пять яблок."], "evidence": "«Két alma van az asztalon» — «На столе два яблока».", cue:["Két alma van az asztalon."]}
    ]},
    {id:"eletkor", title:"Возраст и учёба", questions:[
      {"ask": "Сколько лет Анне?", "answer": "18 лет.", "other": ["20 лет.", "12 лет."], "evidence": "«Anna 18 éves» — «Анне восемнадцать лет».", cue:["Anna 18 éves."]},
      {"ask": "Какой язык изучает Анна?", "answer": "Венгерский.", "other": ["Русский.", "Немецкий."], "evidence": "«Magyarul tanul» — «Она изучает венгерский язык».", cue:["Magyarul tanul."]}
    ]},
    {id:"testver", title:"Семья Петера", questions:[
      {"ask": "Кем приходится Петеру Ева?", "answer": "Младшей сестрой.", "other": ["Старшей сестрой.", "Бабушкой."], "evidence": "«Ő a húgom» — «Она моя младшая сестра».", cue:["Ő a húgom."]},
      {"ask": "Кем Илона приходится Петеру?", "answer": "Бабушкой.", "other": ["Мамой.", "Старшей сестрой."], "evidence": "«Ő a nagymamám» — «Это моя бабушка».", cue:["Ő a nagymamám."]}
    ]},
    {id:"munkahely", title:"Три профессии", questions:[
      {"ask": "Кем работает Ева?", "answer": "Врачом.", "other": ["Учительницей.", "Официанткой."], "evidence": "«Éva orvos» — «Ева — врач».", cue:["Éva orvos."]},
      {"ask": "Где работает Анна?", "answer": "В ресторане.", "other": ["В школе.", "В больнице."], "evidence": "«Az étteremben dolgozik» — «Она работает в ресторане».", cue:["Az étteremben dolgozik."]}
    ]},
    {id:"leiras", title:"Описание людей и мест", questions:[
      {"ask": "Какой Петер?", "answer": "Высокий и приветливый.", "other": ["Молодой и невысокий.", "Невысокий и недобрый."], "evidence": "«Magas és kedves» — «Он высокий и приветливый».", cue:["Magas és kedves."]},
      {"ask": "Что говорится о комнате?", "answer": "Она маленькая.", "other": ["Она большая.", "Она светлая."], "evidence": "«A szoba kicsi» — «Комната маленькая».", cue:["A szoba kicsi."]}
    ]},
    {id:"birtoklas", title:"Вещи Анны", questions:[
      {"ask": "Чего у Анны нет?", "answer": "Машины.", "other": ["Книги.", "Сумки."], "evidence": "«Nincs autóm» — «У меня нет машины».", cue:["Nincs autóm."]},
      {"ask": "Кого Анна упоминает в начале рассказа?", "answer": "Брата или сестру.", "other": ["Бабушку.", "Двоих детей."], "evidence": "«Van egy testvérem» — «У меня есть брат или сестра».", cue:["Van egy testvérem."]}
    ]},
    {id:"szobak", title:"Квартира", questions:[
      {"ask": "Где находится кровать?", "answer": "В спальне.", "other": ["На кухне.", "В гостиной."], "evidence": "«Az ágy a hálószobában van» — «Кровать находится в спальне».", cue:["Az ágy a hálószobában van."]},
      {"ask": "В какой комнате стоит лампа?", "answer": "В гостиной.", "other": ["На кухне.", "В спальне."], "evidence": "«A nappaliban van egy lámpa» — «В гостиной есть лампа».", cue:["A nappaliban van egy lámpa."]}
    ]},
    {id:"irany", title:"Утренние планы", questions:[
      {"ask": "Куда идёт Ева?", "answer": "В школу.", "other": ["В магазин.", "На кухню."], "evidence": "«Éva az iskolába megy» — «Ева идёт в школу».", cue:["Éva az iskolába megy."]},
      {"ask": "Куда идёт Анна?", "answer": "На кухню.", "other": ["В школу.", "В магазин."], "evidence": "«Anna a konyhába megy» — «Анна идёт на кухню».", cue:["Anna a konyhába megy."]}
    ]},
    {id:"felulet", title:"В комнате", questions:[
      {"ask": "Где находится телефон?", "answer": "На стуле.", "other": ["На столе.", "На стене."], "evidence": "«A telefon a széken van» — «Телефон находится на стуле».", cue:["A telefon a széken van."]},
      {"ask": "Где лежит ключ?", "answer": "На полу.", "other": ["На полке.", "На столе."], "evidence": "«A kulcs a földön van» — «Ключ лежит на земле».", cue:["A kulcs a földön van."]}
    ]},
    {id:"tanterem", title:"В классе", questions:[
      {"ask": "Где находится сумка?", "answer": "Под столом.", "other": ["На столе.", "За дверью."], "evidence": "«A táska az asztal alatt van» — «Сумка под столом».", cue:["A táska az asztal alatt van."]},
      {"ask": "Где находится учитель?", "answer": "Перед дверью.", "other": ["У доски.", "За столом."], "evidence": "«A tanár az ajtó előtt van» — «Учитель перед дверью».", cue:["A tanár az ajtó előtt van."]}
    ]},
    {id:"cselekves", title:"Кто что делает?", questions:[
      {"ask": "Кто работает?", "answer": "Петер.", "other": ["Анна.", "Я."], "evidence": "«Péter dolgozik» — «Петер работает».", cue:["Péter dolgozik."]},
      {"ask": "На каком языке говорит Анна?", "answer": "По-русски.", "other": ["По-венгерски.", "По-английски."], "evidence": "«Anna oroszul beszél» — «Анна говорит по-русски».", cue:["Anna oroszul beszél."]}
    ]},
    {id:"szabadido", title:"Свободное время", questions:[
      {"ask": "Что Петер не любит делать?", "answer": "Готовить.", "other": ["Учиться.", "Читать."], "evidence": "«Péter nem szeret főzni» — «Петер не любит готовить».", cue:["Péter nem szeret főzni."]},
      {"ask": "Когда рассказчик любит гулять?", "answer": "Утром.", "other": ["Днём.", "Вечером."], "evidence": "«Reggel szeretek sétálni» — «Утром я люблю гулять».", cue:["Reggel szeretek sétálni."]}
    ]},
    {id:"idopont", title:"Планы на неделю", questions:[
      {"ask": "В котором часу рассказчик занимается в понедельник?", "answer": "В восемь.", "other": ["В шесть.", "В девять."], "evidence": "«Reggel nyolckor tanulok» — «Утром в восемь я учусь».", cue:["Reggel nyolckor tanulok."]},
      {"ask": "В какой день рассказчик работает?", "answer": "Во вторник.", "other": ["В понедельник.", "В среду."], "evidence": "«Kedden dolgozom» — «Во вторник я работаю».", cue:["Kedden dolgozom."]}
    ]},
    {id:"bolt", title:"Покупки", questions:[
      {"ask": "Что Анна просит в конце покупок?", "answer": "Молоко.", "other": ["Кофе.", "Банан."], "evidence": "«Anna tejet kér» — «Анна просит молоко».", cue:["Anna tejet kér."]},
      {"ask": "Сколько стоит чай?", "answer": "Тысячу форинтов.", "other": ["Сто форинтов.", "Две тысячи форинтов."], "evidence": "«A tea ezer forint» — «Чай стоит тысячу форинтов».", cue:["A tea ezer forint."]}
    ]},
    {id:"udvariasan", title:"В кафе", questions:[
      {"ask": "Как Анна просит подать чай?", "answer": "Без сахара.", "other": ["С сахаром.", "С молоком."], "evidence": "«Cukor nélkül kéri» — «Она просит чай без сахара».", cue:["Cukor nélkül kéri."]},
      {"ask": "Что хочет заказать Петер?", "answer": "Кофе.", "other": ["Чай.", "Стакан воды."], "evidence": "«Péter egy kávét szeretne» — «Петер хотел бы кофе».", cue:["Péter egy kávét szeretne."]}
    ]},
    {id:"mennyiseg", title:"На рынке", questions:[
      {"ask": "Сколько яблок просит Анна?", "answer": "Два.", "other": ["Три.", "Одно."], "evidence": "«Két almát kér» — «Она просит два яблока».", cue:["Két almát kér."]},
      {"ask": "Сколько сыра просит Ева?", "answer": "Полкилограмма.", "other": ["Килограмм.", "Два килограмма."], "evidence": "«Éva fél kiló sajtot kér» — «Ева просит полкилограмма сыра».", cue:["Éva fél kiló sajtot kér."]}
    ]},
    {id:"etterem", title:"Обед в ресторане", questions:[
      {"ask": "Что Петер просит в конце?", "answer": "Счёт.", "other": ["Ещё один суп.", "Стакан воды."], "evidence": "«Végül Péter azt mondja: „Kérem a számlát.”» — «В конце Петер говорит: «Счёт, пожалуйста»».", cue:["Végül Péter azt mondja: „Kérem a számlát.”"]},
      {"ask": "Что хочет заказать Анна?", "answer": "Салат.", "other": ["Суп.", "Пирожное."], "evidence": "«Anna egy salátát szeretne» — «Анна хотела бы салат».", cue:["Anna egy salátát szeretne."]}
    ]},
    {id:"piac", title:"Цена покупки", questions:[
      {"ask": "Сколько стоит вся покупка Анны?", "answer": "Две тысячи форинтов.", "other": ["Тысяча форинтов.", "Три тысячи форинтов."], "evidence": "«Összesen kétezer forint» — «Всего две тысячи форинтов».", cue:["Összesen kétezer forint."]},
      {"ask": "Сколько апельсинов покупает Анна?", "answer": "Два.", "other": ["Один.", "Три."], "evidence": "«Két narancsot is kér» — «Она просит ещё два апельсина».", cue:["Két narancsot is kér."]}
    ]}
  ];
  const clips = [...window.TanuloGaborReadingClips.A1];
  for (const [text, url] of Object.entries(window.TanuloA1Audio || {})) {
    const match = /^audio\/a1-listening\/([a-z]+)\.mp3$/.exec(url);
    if (match) clips.push({id: match[1], text, url});
  }
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
  const cueButton = $('listeningCue');
  cueButton.onclick = () => {
    player.pause();
    const phrases = active.questions[index].cue;
    function playPart(position) {
      window.TanuloTTS.speak({
        text: phrases[position], lang: 'hu-HU', rate: player.playbackRate,
        onend: () => { if (position + 1 < phrases.length) playPart(position + 1); },
        onerror: () => { $('listeningStatus').textContent = 'Не удалось воспроизвести фразу. Можно снова послушать всю запись.'; }
      });
    }
    playPart(0);
  };
  function showQuestion() {
    cueButton.hidden = true;
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
        cueButton.hidden = correct;
        $('listeningFeedback').textContent = (correct ? '✓ Верно. ' : 'Правильный ответ: ' + question.answer + ' ') + question.evidence;
        $('listeningNext').textContent = index + 1 === active.questions.length ? 'Результат' : 'Следующий вопрос';
        $('listeningNext').hidden = false;
        $('listeningNext').focus();
      };
      options.append(button);
    }
  }
  const speed = $('listeningSlow');
  function setSpeed(slow) {
    player.defaultPlaybackRate = slow ? 0.8 : 1;
    player.playbackRate = player.defaultPlaybackRate;
    speed.setAttribute('aria-pressed', String(slow));
  }
  speed.onclick = () => setSpeed(speed.getAttribute('aria-pressed') !== 'true');
  $('listeningReload').onclick = () => {
    $('listeningReload').hidden = true;
    player.load();
    player.play().catch(() => { if (dialog.open && !player.error) $('listeningStatus').textContent = 'Нажмите кнопку воспроизведения ещё раз.'; });
  };
  function start() {
    player.pause();
    index = 0; heard = false; usedText = false; answers = [];
    $('listeningResult').hidden = true;
    $('listeningTask').hidden = false;
    $('listeningTitle').textContent = active.title;
    $('listeningStatus').textContent = 'Прослушайте запись до конца. Её можно включать несколько раз.';
    transcript.open = false;
    transcript.querySelector('p').textContent = active.clip.text;
    $('listeningReload').hidden = true;
    setSpeed(false);
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
    if (!dialog.open || !player.hasAttribute('src') || !player.error) return;
    $('listeningReload').hidden = false;
    $('listeningStatus').textContent = 'Запись не загрузилась. Попробуйте ещё раз или откройте текст.';
  });
  transcript.addEventListener('toggle', () => {
    if (!dialog.open || !transcript.open || !$('listeningResult').hidden) return;
    usedText = true;
    $('listeningStatus').textContent = 'Следующие ответы будут отмечены как работа с текстом.';
    unlock();
  });
  $('listeningNext').onclick = () => {
    if (!answers[index]) return;
    window.TanuloTTS.cancel();
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
    window.TanuloTTS.cancel();
    player.pause(); player.removeAttribute('src'); player.load();
  });
  window.TanmuhelyListening = {items, open, progress: store.read};
})();
