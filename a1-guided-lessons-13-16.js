/* A1 lessons 13–16. Original explanations and model dialogues for Russian speakers. */
(() => {
  'use strict';

  const lessons = [
    {
      title: 'Родные: кто кому приходится',
      words: ['öcs', 'húg', 'nővér', 'nagymama', 'nagyapa', 'szülő', 'nagyszülő', 'testvér', 'férj', 'feleség', 'család'],
      // The core teaches basic family members and possession first. The
      // spouse terms at indices 8–9 remain optional, and the already taught
      // család stays at its legacy index 10 for revision.
      coreCount: 8,
      extra: [
        ['húgom', 'моя младшая сестра', 'Éva a húgom.', 'Ева — моя младшая сестра.'],
        ['öcsém', 'мой младший брат', 'Péter az öcsém.', 'Петер — мой младший брат.'],
        ['nővérem', 'моя старшая сестра', 'Kata a nővérem.', 'Ката — моя старшая сестра.'],
        ['nagymamám', 'моя бабушка', 'Ő a nagymamám.', 'Это моя бабушка.'],
        ['nagyapám', 'мой дедушка', 'Ő a nagyapám.', 'Это мой дедушка.'],
        ['testvérem', 'мой брат или моя сестра', 'Anna a testvérem.', 'Анна — моя сестра.'],
        ['szüleim', 'мои родители', 'A szüleim itt laknak.', 'Мои родители живут здесь.']
      ],
      grammar: [
        '«Мой» без отдельного слова: húgom, nővérem, nagymamám',
        'В венгерском языке значение «мой / моя» обычно выражается окончанием существительного. Anya → anyám («моя мама»): конечная a при присоединении личного окончания меняется на á. Так же nagymama → nagymamám («моя бабушка»), nagyapa → nagyapám («мой дедушка»). Для других слов окончания могут отличаться: testvér → testvérem («мой брат или сестра»), húg → húgom («моя младшая сестра»), nővér → nővérem («моя старшая сестра»). Слово testvér само по себе не указывает пол; зато öcs означает младшего брата, húg — младшую сестру, nővér в теме семьи — старшую сестру. Форма szüleim означает «мои родители»; её запоминаем отдельно, не выводя по одному правилу для единственного числа. В предложении Ő a húgom. — «Это моя младшая сестра» — в третьем лице настоящего времени глагол «быть» не нужен.',
        'Ki ő? — Ő a húgom. / Kata a nővérem. / A szüleim itt laknak.'
      ],
      dialogue: [
        'Ki ő?',
        'Ő a húgom, Éva.',
        'És ki ez a nő?',
        'Ő a nagymamám.'
      ],
      composition: [
        'Моя семья: новые родственники',
        'Напишите пять разных коротких фраз о родственниках. Используйте не менее трёх форм со значением «мой / моя». Имена и семейные обстоятельства могут быть вымышленными.',
        'Éva a húgom. / Péter az öcsém. / Kata a nővérem. / Ő a nagymamám. / A családom nagy.'
      ],
      min: 5,
      reading: {
        lines: [
          ['A nevem Péter.', 'Меня зовут Петер.'],
          ['Ez Éva.', 'Это Ева.'],
          ['Ő a húgom.', 'Она моя младшая сестра.'],
          ['Kata a nővérem.', 'Ката — моя старшая сестра.'],
          ['Ez Ilona.', 'Это Илона.'],
          ['Ő a nagymamám.', 'Это моя бабушка.'],
          ['A családom nagy.', 'У меня большая семья.']
        ],
        q: 'Кем приходится Петеру Ева?',
        options: ['Младшей сестрой.', 'Старшей сестрой.', 'Бабушкой.'],
        answer: 0
      },
      preparation: [
        ['Ki ő?', 'Кто это? / Кто он или она?', 'Ki — кто; ő — он или она. Венгерское ő не различает грамматический род.'],
        ['Ő a húgom.', 'Это моя младшая сестра.', 'Húg — младшая сестра; húgom — моя младшая сестра.'],
        ['Péter az öcsém.', 'Петер — мой младший брат.', 'Öcs → öcsém: обратите внимание на é в притяжательной форме.'],
        ['Kata a nővérem.', 'Ката — моя старшая сестра.', 'Nővér — старшая сестра (здесь); nővérem — моя старшая сестра.'],
        ['Ő a nagymamám.', 'Это моя бабушка.', 'Nagymama → nagymamám: конечная a становится á.'],
        ['A szüleim itt laknak.', 'Мои родители живут здесь.', 'Szüleim — мои родители; laknak — живут (они). Обе формы запоминаем как образец.']
      ],
      grammarTable: [
        ['anya → anyám', 'мама → моя мама', 'Конечная a → á перед -m'],
        ['nagymama → nagymamám', 'бабушка → моя бабушка', 'a → á + -m'],
        ['testvér → testvérem', 'брат / сестра → мой брат / моя сестра', '-em'],
        ['húg → húgom', 'младшая сестра → моя младшая сестра', '-om'],
        ['nővér → nővérem', 'старшая сестра → моя старшая сестра', '-em'],
        ['szüleim', 'мои родители', 'Готовая форма множественного числа']
      ]
    },
    {
      title: 'Профессии и место работы',
      words: ['tanár', 'tanárnő', 'magyartanár', 'orvos', 'eladó', 'pincér', 'dolgozik', 'munka', 'iskola', 'kórház', 'étterem', 'bolt'],
      // The fifth prepared sentence explains étteremben before the reading;
      // étterem remains an extra card at its original saved index.
      wordPreviewCount: 5,
      extra: [
        ['dolgozom', 'я работаю', 'Az iskolában dolgozom.', 'Я работаю в школе.'],
        ['dolgozol', 'ты работаешь', 'Hol dolgozol?', 'Где ты работаешь?'],
        ['Hol dolgozol?', 'Где ты работаешь?', 'Hol dolgozol, Péter?', 'Где ты работаешь, Петер?'],
        ['tanár vagyok', 'я учитель / учительница', 'Tanár vagyok.', 'Я учитель / учительница.'],
        ['orvos vagyok', 'я врач', 'Orvos vagyok.', 'Я врач.'],
        ['kórházban', 'в больнице', 'Éva a kórházban dolgozik.', 'Ева работает в больнице.'],
        ['étteremben', 'в ресторане', 'A pincér az étteremben dolgozik.', 'Официант работает в ресторане.']
      ],
      grammar: [
        'Кто работает и где: dolgozom, dolgozol, dolgozik',
        'Чтобы назвать свою профессию, используйте название профессии и vagyok: Tanár vagyok. — «Я учитель / учительница»; Orvos vagyok. — «Я врач». В третьем лице настоящего времени при назывании профессии связку обычно не ставим: Éva orvos. — «Ева — врач». Работа выражается глаголом dolgozik («работать»): én dolgozom — «я работаю», te dolgozol — «ты работаешь», ő dolgozik — «он / она работает». Эти три формы особенно важно запомнить; формы других глаголов могут отличаться. Hol dolgozol? — «Где ты работаешь?»; Az iskolában dolgozom. — «Я работаю в школе». Повторяем место: iskola → iskolában, bolt → boltban, kórház → kórházban, étterem → étteremben. Окончания -ban/-ben отвечают здесь на вопрос Hol? («Где?»).',
        'Éva orvos. / Az orvos a kórházban dolgozik. / Hol dolgozol? — Az iskolában dolgozom.'
      ],
      dialogue: [
        'Hol dolgozol, Péter?',
        'Az iskolában dolgozom. Tanár vagyok.',
        'És Éva hol dolgozik?',
        'A kórházban dolgozik. Éva orvos.'
      ],
      composition: [
        'Кто где работает?',
        'Напишите пять разных коротких предложений: назовите две профессии, два места работы и добавьте один вопрос Hol dolgozol? Можно использовать вымышленных людей.',
        'Péter tanár. / Az iskolában dolgozik. / Éva orvos. / A kórházban dolgozik. / Hol dolgozol?'
      ],
      min: 5,
      reading: {
        lines: [
          ['Péter tanár.', 'Петер — учитель.'],
          ['Az iskolában dolgozik.', 'Он работает в школе.'],
          ['Éva orvos.', 'Ева — врач.'],
          ['A kórházban dolgozik.', 'Она работает в больнице.'],
          ['Anna pincér.', 'Анна — официантка.'],
          ['Az étteremben dolgozik.', 'Она работает в ресторане.']
        ],
        q: 'Кем работает Ева?',
        options: ['Врачом.', 'Учительницей.', 'Официанткой.'],
        answer: 0
      },
      preparation: [
        ['Tanár vagyok.', 'Я учитель / учительница.', 'Vagyok — форма «я есть», необходимая в таком предложении.'],
        ['Éva orvos.', 'Ева — врач.', 'В третьем лице настоящего времени связку не добавляем.'],
        ['Hol dolgozol?', 'Где ты работаешь?', 'Hol — где; dolgozol — ты работаешь.'],
        ['Az iskolában dolgozom.', 'Я работаю в школе.', 'Iskola → iskolában; dolgozom — я работаю.'],
        ['A pincér az étteremben dolgozik.', 'Официант работает в ресторане.', 'Étterem → étteremben; dolgozik — работает (он/она).']
      ],
      grammarTable: [
        ['Én tanár vagyok.', 'Я учитель / учительница.', 'én → vagyok'],
        ['Te orvos vagy.', 'Ты врач.', 'te → vagy'],
        ['Éva orvos.', 'Ева — врач.', 'ő → без связки в настоящем времени'],
        ['dolgozom · dolgozol · dolgozik', 'я работаю · ты работаешь · он/она работает', 'Формы глагола dolgozik'],
        ['iskola → iskolában', 'школа → в школе', 'a → á + -ban'],
        ['étterem → étteremben', 'ресторан → в ресторане', '-ben по гармонии гласных']
      ]
    },
    {
      title: 'Описываем людей: какой он?',
      words: ['kedves', 'fiatal', 'magas', 'alacsony', 'boldog', 'szép', 'jó', 'rossz', 'kicsi', 'nagy', 'új', 'régi', 'nagyon', 'nem'],
      // All five prepared phrases are needed early to introduce új, nem and
      // nagyon, even though those cards occur after the mandatory first ten.
      wordPreviewCount: 5,
      contrastPractice: [
        {ru: 'Учитель приветливый.', answers: ['A tanár kedves.', 'A tanár kedves van.', 'A tanár kedves vagyok.'], correct: 0, explanation: 'В настоящем времени с он / она прилагательное-сказуемое употребляется без van. Vagyok — форма для «я».',},
        {ru: 'Учитель невысокий.', answers: ['A tanár nem magas.', 'A tanár nincs magas.', 'A tanár nem magas van.'], correct: 0, explanation: 'Nem ставится перед прилагательным magas. Nincs обозначает отсутствие, а не качество человека.',},
        {ru: 'Я молодой / молодая.', answers: ['Fiatal vagyok.', 'Fiatal van.', 'Fiatal vagy.'], correct: 0, explanation: 'С «я» нужна форма vagyok; vagy относится к «ты». Без связки прилагательное употребляется в третьем лице.',}
      ],
      extra: [
        ['Milyen?', 'какой? какая? какое?', 'Milyen a tanár?', 'Какой учитель? / Какой он, учитель?'],
        ['kedves tanár', 'добрый / приветливый учитель', 'Ez egy kedves tanár.', 'Это приветливый учитель.'],
        ['fiatal orvos', 'молодой врач', 'A fiatal orvos itt dolgozik.', 'Молодой врач работает здесь.'],
        ['nem magas', 'не высокий', 'A tanár nem magas.', 'Учитель невысокий.']
      ],
      grammar: [
        'Прилагательное до и после существительного — Melléknevek',
        'Венгерское прилагательное не меняется по роду: kedves tanár может обозначать и учителя, и учительницу. Перед существительным прилагательное стоит без отдельного окончания: kedves tanár — «добрый учитель», fiatal orvos — «молодой врач». Если мы сообщаем качество человека, прилагательное выступает сказуемым: A tanár kedves. — «Учитель добрый». В третьем лице настоящего времени глагол van здесь не используется: нельзя говорить *A tanár kedves van. Но с «я» и «ты» формы «быть» нужны: Kedves vagyok. — «Я добрый / добрая»; Magas vagy. — «Ты высокий / высокая». Отрицание nem ставим перед сказуемым: A tanár nem magas. — «Учитель невысокий». Усиление nagyon — «очень»: A tanár nagyon kedves. Вопрос о качестве: Milyen a tanár? — «Какой учитель?»',
        'Kedves tanár. — A tanár kedves. / A tanár nem magas. / Nagyon fiatal.'
      ],
      dialogue: [
        'Milyen az új tanár?',
        'Kedves és fiatal.',
        'Magas?',
        'Igen, nagyon magas.'
      ],
      composition: [
        'Описываю людей и предметы',
        'Напишите пять разных коротких предложений: два о людях, два о предметах и одно с nem или nagyon. Не добавляйте van к прилагательному-сказуемому в третьем лице.',
        'A tanár kedves. / Péter magas. / A ház nagy. / A szoba kicsi. / Éva nem magas.'
      ],
      min: 5,
      reading: {
        lines: [
          ['Péter orvos.', 'Петер — врач.'],
          ['Magas és kedves.', 'Он высокий и приветливый.'],
          ['Éva tanár.', 'Ева — учительница.'],
          ['Fiatal és kedves.', 'Она молодая и приветливая.'],
          ['Az iskola nagy.', 'Школа большая.'],
          ['A szoba kicsi.', 'Комната маленькая.']
        ],
        q: 'Какой Петер?',
        options: ['Высокий и приветливый.', 'Молодой и невысокий.', 'Невысокий и недобрый.'],
        answer: 0
      },
      preparation: [
        ['Milyen az új tanár?', 'Какой новый учитель?', 'Milyen? — какой?; új — новый; az перед словом с гласной.'],
        ['Kedves tanár.', 'Добрый / приветливый учитель.', 'Прилагательное перед существительным: kedves + tanár.'],
        ['A tanár kedves.', 'Учитель добрый / приветливый.', 'Здесь kedves — сказуемое, без van в третьем лице.'],
        ['A tanár nem magas.', 'Учитель невысокий.', 'Nem ставится перед сказуемым magas.'],
        ['A tanár nagyon kedves.', 'Учитель очень приветливый.', 'Nagyon усиливает признак: «очень».']
      ],
      grammarTable: [
        ['kedves tanár', 'добрый учитель', 'Прилагательное перед существительным'],
        ['A tanár kedves.', 'Учитель добрый.', 'Прилагательное-сказуемое, без van'],
        ['Fiatal vagyok.', 'Я молодой / молодая.', 'én → vagyok'],
        ['Magas vagy.', 'Ты высокий / высокая.', 'te → vagy'],
        ['A tanár nem magas.', 'Учитель невысокий.', 'nem + прилагательное-сказуемое'],
        ['Nagyon kedves.', 'Очень приветливый / приветливая.', 'nagyon + прилагательное']
      ]
    },
    {
      title: 'У меня есть — у меня нет',
      words: ['van', 'könyv', 'táska', 'autó', 'testvér', 'barát', 'telefon', 'kulcs', 'család', 'nem'],
      // The fourth listening model explicitly introduces nincs before the
      // lesson uses it in dialogue, reading and obligatory free writing.
      wordPreviewCount: 5,
      contrastPractice: [
        {ru: 'У меня есть книга.', answers: ['Van egy könyvem.', 'Nincs könyvem.', 'Van egy könyved.'], correct: 0, explanation: 'Van сообщает о наличии. Könyvem — моя книга; könyved — твоя книга.',},
        {ru: 'У меня нет машины.', answers: ['Nincs autóm.', 'Nem van autóm.', 'Nincs autód.'], correct: 0, explanation: 'Nincs — отрицательная форма наличия. Autóm — моя машина; autód — твоя машина. Здесь не говорим nem van.',},
        {ru: 'У тебя есть книга?', answers: ['Van könyved?', 'Van könyvem?', 'Nincs könyved?'], correct: 0, explanation: 'Van + könyved? спрашивает о наличии книги у собеседника. -ed передаёт «твоя».',}
      ],
      extra: [
        ['nincs', 'нет; отсутствует', 'Nincs autóm.', 'У меня нет машины.'],
        ['könyvem', 'моя книга', 'Van egy könyvem.', 'У меня есть книга.'],
        ['könyved', 'твоя книга', 'Van könyved?', 'У тебя есть книга?'],
        ['táskám', 'моя сумка', 'Van egy táskám.', 'У меня есть сумка.'],
        ['táskád', 'твоя сумка', 'Hol van a táskád?', 'Где твоя сумка?'],
        ['autóm', 'моя машина', 'Nincs autóm.', 'У меня нет машины.'],
        ['autód', 'твоя машина', 'Van autód?', 'У тебя есть машина?'],
        ['testvéred', 'твой брат или сестра', 'Van testvéred?', 'У тебя есть брат или сестра?'],
      ],
      grammar: [
        'Принадлежность и наличие: van / nincs + личное окончание',
        'Для «у меня есть книга» по-венгерски говорим Van egy könyvem. Существительное könyv принимает личное окончание -em («моя книга»), а van сообщает о наличии. Не надо переводить это по словам как «есть один мой книга». Сравните: Van könyved? — «У тебя есть книга?»; здесь -ed означает «твоя». У существительного с конечной a при таком окончании a становится долгой á: táska → táskám («моя сумка»), táskád («твоя сумка»). После автó формы проще: autóm («моя машина»), autód («твоя машина»). Отсутствие передаём словом nincs: Nincs autóm. — «У меня нет машины». В таких предложениях обычно не используем *nem van: утвердительная форма van и отрицательная nincs образуют пару. Значение «родной брат или сестра» повторяем в вопросе Van testvéred? и ответе Van egy húgom. — «У меня есть младшая сестра». Все эти примеры — безопасные учебные ситуации; личные реальные сведения сообщать не требуется.',
        'Van egy könyvem. — Nincs könyvem. / Van autód? — Nem, nincs autóm. / Van egy testvérem.'
      ],
      dialogue: [
        'Van testvéred?',
        'Igen, van egy húgom.',
        'Van autód?',
        'Nem, nincs autóm.'
      ],
      composition: [
        'Что у меня есть и чего нет',
        'Напишите пять разных фраз: три утвердительных предложения с van, одно отрицательное с nincs и один вопрос с Van ...? Можно использовать вымышленные сведения.',
        'Van egy könyvem. / Van egy táskám. / Van egy testvérem. / Nincs autóm. / Van könyved?'
      ],
      min: 5,
      reading: {
        lines: [
          ['A nevem Anna.', 'Меня зовут Анна.'],
          ['Van egy testvérem.', 'У меня есть брат или сестра.'],
          ['Van egy könyvem.', 'У меня есть книга.'],
          ['Van egy táskám.', 'У меня есть сумка.'],
          ['Nincs autóm.', 'У меня нет машины.']
        ],
        q: 'Чего у Анны нет?',
        options: ['Машины.', 'Книги.', 'Сумки.'],
        answer: 0
      },
      preparation: [
        ['Van egy könyvem.', 'У меня есть книга.', 'Könyv → könyvem: личное окончание -em показывает «моя».'],
        ['Van könyved?', 'У тебя есть книга?', 'Könyv → könyved: окончание -ed показывает «твоя».'],
        ['Van egy táskám.', 'У меня есть сумка.', 'Táska → táskám: a становится á перед личным окончанием.'],
        ['Nincs autóm.', 'У меня нет машины.', 'Nincs заменяет van в отрицательном предложении о наличии.'],
        ['Van testvéred?', 'У тебя есть брат или сестра?', 'Testvér → testvéred: «твой брат или сестра».'],
        ['Igen, van egy húgom.', 'Да, у меня есть младшая сестра.', 'Húg → húgom: «моя младшая сестра»; igen — да.']
      ],
      grammarTable: [
        ['könyv → könyvem → könyved', 'книга → моя книга → твоя книга', '-em / -ed'],
        ['táska → táskám → táskád', 'сумка → моя сумка → твоя сумка', 'a → á; -m / -d'],
        ['autó → autóm → autód', 'машина → моя машина → твоя машина', '-m / -d'],
        ['Van egy könyvem.', 'У меня есть книга.', 'van + притяжательная форма'],
        ['Nincs könyvem.', 'У меня нет книги.', 'nincs + притяжательная форма'],
        ['Van testvéred?', 'У тебя есть брат или сестра?', 'Вопрос с van и формой на -ed']
      ]
    }
  ];

  const dialogueTranslations = {
    'Родные: кто кому приходится': [
      'Кто она?', 'Это моя младшая сестра Ева.', 'А кто эта женщина?', 'Это моя бабушка.'
    ],
    'Профессии и место работы': [
      'Где ты работаешь, Петер?', 'Я работаю в школе. Я учитель.', 'А где работает Ева?', 'Она работает в больнице. Ева — врач.'
    ],
    'Описываем людей: какой он?': [
      'Какой новый учитель?', 'Добрый и молодой.', 'Высокий?', 'Да, очень высокий.'
    ],
    'У меня есть — у меня нет': [
      'У тебя есть брат или сестра?', 'Да, у меня есть младшая сестра.', 'У тебя есть машина?', 'Нет, у меня нет машины.'
    ]
  };

  const checks = {
    'A1:12': {
      q: 'Что означает «húgom»?',
      a: ['Моя младшая сестра.', 'Моя старшая сестра.', 'Мой младший брат.'],
      ok: 0,
      why: 'Húg — младшая сестра, húgom — моя младшая сестра. Nővérem — старшая сестра, öcsém — младший брат.'
    },
    'A1:13': {
      q: 'Как сказать «Я работаю»?',
      a: ['Dolgozom.', 'Dolgozol.', 'Dolgozik.'],
      ok: 0,
      why: 'Dolgozom — я работаю; dolgozol — ты работаешь; dolgozik — он / она работает.'
    },
    'A1:14': {
      q: 'Как по-венгерски сказать «Учитель невысокий»?',
      a: ['A tanár nem magas.', 'A tanár magas.', 'A tanár nem magasan.'],
      ok: 0,
      why: 'Nem ставится перед прилагательным-сказуемым magas. Форма magasan означает «высоко» как наречие.'
    },
    'A1:15': {
      q: 'Как сказать «У меня нет машины»?',
      a: ['Nincs autóm.', 'Van autóm.', 'Nincs autód.'],
      ok: 0,
      why: 'Nincs выражает отсутствие; autóm — моя машина. Van autóm означает «у меня есть машина», autód — «твоя машина».'
    }
  };

  const visuals = [
    {icon: '👨‍👩‍👧', title: 'Кто кому приходится?', subtitle: 'Родственные связи и «мой / моя»', cards: [['👧', 'húgom', 'моя младшая сестра'], ['👵', 'nagymamám', 'моя бабушка'], ['👪', 'szüleim', 'мои родители']]},
    {icon: '🏥', title: 'Где работают люди?', subtitle: 'Профессия и место работы', cards: [['🏫', 'Az iskolában dolgozom.', 'Я работаю в школе.'], ['🏥', 'Éva orvos.', 'Ева — врач.'], ['💬', 'Hol dolgozol?', 'Где ты работаешь?']]},
    {icon: '🌟', title: 'Какой он? Какая она?', subtitle: 'Прилагательное, отрицание и усиление', cards: [['🙂', 'kedves tanár', 'приветливый учитель'], ['📏', 'magas', 'высокий'], ['🚫', 'nem magas', 'невысокий']]},
    {icon: '🎒', title: 'Есть или нет?', subtitle: 'Притяжательные формы и наличие', cards: [['📖', 'Van egy könyvem.', 'У меня есть книга.'], ['🎒', 'Van egy táskám.', 'У меня есть сумка.'], ['🚫', 'Nincs autóm.', 'У меня нет машины.']]}
  ];

  window.TanmuhelyA1Units13to16 = {lessons, dialogueTranslations, checks, visuals};
})();
