/* One short, optional conversation for each guided A1 lesson, in workbook order.
   Guided replies and independent sentence recall use separate progress records. */
window.TanmuhelyA1Conversations = [
  {
    id: 'targyak', title: 'В бюро находок', goal: 'Назовите предмет, который вам показывают.',
    model: ['Ez egy taxi.', 'Это такси.'],
    question: 'Mi ez?', translation: 'Что это?',
    instruction: 'Сотрудник показывает вам телефон. Назовите его.',
    reply: ['Ez egy telefon.', 'Это телефон.'],
    alternatives: [['Ez egy park.', 'Park — это парк.'], ['Ez egy rádió.', 'Rádió — это радио.']],
    task: 'На стойке лежит радио. Назовите его по-венгерски.', frame: 'Ez egy ___.',
    answers: ['rádió'], hint: 'В слове rádió две долгие гласные: á и ó.',
    recall: {
      commonError: {"forms": ["Ez egy bank van.", "Ez van egy bank."], "note": "В предложении «Это банк» глагол van не нужен. Оставьте ez, артикль и название предмета."},
      prompt: "Перед вами здание банка. Скажите: «Это банк».",
      forms: ["Ez egy bank.", "Ez itt egy bank."],
      hint: "Вы называете предмет. Начните с Ez, затем можно добавить egy."
    }
  },
  {
    id: 'koszones', title: 'Встреча с соседом', goal: 'Поздоровайтесь со знакомым и спросите, как у него дела.',
    model: ['Szia! Hogy vagy?', 'Привет! Как дела?'],
    question: 'Szia! Hogy vagy?', translation: 'Привет! Как дела?',
    instruction: 'У вас всё хорошо. Ответьте приятелю.',
    reply: ['Jól vagyok, köszönöm.', 'У меня всё хорошо, спасибо.'],
    alternatives: [['Viszontlátásra!', 'Так вежливо прощаются.'], ['Hogy hívnak?', 'Так спрашивают имя собеседника.']],
    task: 'Теперь спросите сами: «Как дела?» Впишите вопросительное слово.', frame: 'Szia! ___ vagy?',
    answers: ['Hogy', 'Hogyan'], hint: 'В коротком приветствии обычно говорят Hogy vagy?',
    recall: {
      commonError: {"forms": ["Hogy hívsz?", "Hogyan hívsz?"], "note": "Hívsz относится к «ты называешь». Чтобы узнать имя собеседника, спросите, как его называют."},
      prompt: "Спросите знакомого: «Как тебя зовут?»",
      forms: ["Hogy hívnak?", "Hogyan hívnak?", "Téged hogy hívnak?", "Hogy hívnak téged?", "Mi a neved?", "Neked mi a neved?"],
      hint: "Вам нужно имя человека. Можно начать с вопросительного слова Hogy или Mi."
    }
  },
  {
    id: 'csalad', title: 'Показываем семейное фото', goal: 'Представьте маму и папу по семейной фотографии.',
    model: ['Ő az anyukám.', 'Это моя мама.'],
    question: 'Ki ő?', translation: 'Кто это?',
    instruction: 'На фотографии ваш папа. Представьте его.',
    reply: ['Ő az apukám.', 'Это мой папа.'],
    alternatives: [['Ő az anyukám.', 'Anyukám — моя мама.'], ['Ő a barátom.', 'Barátom — мой друг.']],
    task: 'На следующем фото ваша мама. Впишите слово «мама» с окончанием «моя».', frame: 'Ő az ___.',
    answers: ['anyukám', 'anyám', 'édesanyám'], hint: 'Слово anyuka в форме «моя мама» заканчивается на -ám.',
    recall: {
      commonError: {"forms": ["Ő az anyuka.", "Ő az anya."], "note": "Так вы назвали маму, но пропустили «моя». Добавьте к венгерскому слову показатель принадлежности -m."},
      prompt: "На фото мама. Представьте её фразой «Она моя мама».",
      forms: ["Ő az anyukám.", "Ő az anyám.", "Ő az édesanyám.", "Ő az én anyukám.", "Ez az anyukám.", "Az anyukám ő."],
      hint: "Ő подходит для «он» и «она». Перед anyukám нужен артикль az."
    }
  },
  {
    id: 'kulcs', title: 'Ищем ключи', goal: 'Объясните, где лежит ключ.',
    model: ['A kulcs az asztalon van.', 'Ключ на столе.'],
    question: 'Hol van a kulcs?', translation: 'Где ключ?',
    instruction: 'Вы видите ключ на стуле. Подскажите, где он.',
    reply: ['A széken van.', 'Он на стуле.'],
    alternatives: [['Az asztalon van.', 'Asztal — стол.'], ['A táskában van.', 'Táskában означает «в сумке».']],
    task: 'Теперь ключ на столе. Поставьте asztal в нужную форму.', frame: 'A kulcs az ___ van.',
    answers: ['asztalon'], hint: 'Когда предмет лежит на поверхности стола, говорим asztal + -on.',
    recall: {
      commonError: {"forms": ["A kulcs a székben van.", "A székben van a kulcs."], "note": "Székben означает «внутри стула». Ключ лежит на его поверхности. Подберите окончание со значением «на»."},
      prompt: "Скажите целой фразой: «Ключ на стуле».",
      forms: ["A kulcs a széken van.", "A széken van a kulcs.", "A kulcs ott van a széken.", "Ott van a kulcs a széken."],
      hint: "Используйте kulcs и szék. На вопрос «на чём?» слово szék получает окончание -en."
    }
  },
  {
    id: 'ital', title: 'Чай или кофе?', goal: 'Закажите напиток одной вежливой фразой.',
    model: ['Egy kávét kérek.', 'Один кофе, пожалуйста.'],
    question: 'Mit kér?', translation: 'Что будете заказывать?',
    instruction: 'Вы хотите воды. Сделайте заказ.',
    reply: ['Vizet kérek.', 'Воды, пожалуйста.'],
    alternatives: [['Egy kávét kérek.', 'Kávé — кофе.'], ['Egy teát kérek.', 'Teát — чай.']],
    task: 'Теперь закажите чай. Впишите форму слова tea после kérek.', frame: 'Kérek egy ___.',
    answers: ['teát'], hint: 'У того, что вы просите, появляется -t. Конечное a удлиняется: tea → teát.',
    recall: {
      commonError: {"forms": ["Kávé kérek.", "Egy kávé kérek.", "Kérek egy kávé."], "note": "После kérek напиток отвечает на вопрос mit? («что?»). Добавьте -t к слову kávé."},
      prompt: "В кафе закажите один кофе. Используйте глагол kérek.",
      forms: ["Egy kávét kérek.", "Kérek egy kávét.", "Kérek szépen egy kávét.", "Egy kávét kérek szépen.", "Egy kávét kérek, köszönöm.", "Kérek egy kávét, köszönöm."],
      hint: "Что вы просите? У слова kávé появляется -t. Глагол можно поставить в начале или в конце."
    }
  },
  {
    id: 'napirend', title: 'Договариваемся на завтра', goal: 'Расскажите, что делаете сегодня и завтра.',
    model: ['Ma tanulok.', 'Сегодня я учусь.'],
    question: 'Mit csinálsz holnap?', translation: 'Что ты делаешь завтра?',
    instruction: 'Завтра вы работаете. Что скажете?',
    reply: ['Holnap dolgozom.', 'Завтра я работаю.'],
    alternatives: [['Ma dolgozom.', 'Ma означает «сегодня».'], ['Holnap olvasok.', 'Olvasok означает «я читаю».']],
    task: 'Заполните фразу «Сегодня я читаю». Впишите слово «сегодня».', frame: '___ olvasok.',
    answers: ['ma'], hint: 'Ma — сегодня, holnap — завтра.',
    recall: {
      commonError: {"forms": ["Holnap tanulsz.", "Te holnap tanulsz."], "note": "Tanulsz означает «ты учишься». В плане на завтра речь идёт о вас: нужна форма «я учусь»."},
      prompt: "Расскажите о плане: «Завтра я учусь».",
      forms: ["Holnap tanulok.", "Tanulok holnap.", "Én holnap tanulok.", "Holnap én tanulok."],
      hint: "Holnap — завтра. При наличии слова времени здесь подходит настоящее время глагола."
    }
  },
  {
    id: 'kerdesek', title: 'Уточняем время', goal: 'Спросите, когда начинается занятие.',
    model: ['Mikor tanulsz?', 'Когда ты учишься?'],
    question: 'Mikor kezdődik az óra?', translation: 'Когда начинается занятие?',
    instruction: 'Занятие начинается утром. Выберите ответ о времени.',
    reply: ['Reggel.', 'Утром.'],
    alternatives: [['Az iskolában.', 'Это ответ на вопрос «где?».'], ['A tanár.', 'Это ответ на вопрос «кто?».']],
    task: 'Спросите «Когда начинается фильм?». Впишите «когда».', frame: '___ kezdődik a film?',
    answers: ['Mikor'], hint: 'Hol? — где? Ki? — кто? Mikor? — когда?',
    recall: {
      commonError: {"forms": ["Mikor találkozol?", "Te mikor találkozol?"], "note": "Találkozol относится к одному собеседнику («ты»). О встрече вдвоём спросите в форме «мы», с окончанием -unk."},
      prompt: "Вы не знаете время встречи. Спросите: «Когда мы встречаемся?»",
      forms: ["Mikor találkozunk?", "Mi mikor találkozunk?", "Mikor találkozunk mi?"],
      hint: "Для времени нужно Mikor? Глагол «встречаемся» — találkozunk."
    }
  },
  {
    id: 'hely', title: 'Ищем друга в парке', goal: 'Скажите по телефону, где вы находитесь.',
    model: ['A boltban vagyok.', 'Я в магазине.'],
    question: 'Hol vagy?', translation: 'Где ты?',
    instruction: 'Вы уже в парке. Ответьте другу.',
    reply: ['A parkban vagyok.', 'Я в парке.'],
    alternatives: [['A parkba megyek.', 'Вы ещё идёте в парк.'], ['A boltban vagyok.', 'Bolt — магазин.']],
    task: 'Затем вы встретились в саду. Впишите форму слова kert для ответа на Hol?', frame: 'A ___ vagyunk.',
    answers: ['kertben'], hint: 'Для места внутри используйте -ban/-ben. К слову kert подходит -ben.',
    recall: {
      commonError: {"forms": ["A kertbe vagyok.", "Én a kertbe vagyok."], "note": "Kertbe указывает направление («в сад»). Вы уже в саду: для ответа на hol? нужно окончание -ben."},
      prompt: "Позвоните другу и скажите: «Я в саду».",
      forms: ["A kertben vagyok.", "Én a kertben vagyok.", "Ott vagyok a kertben.", "A kertben vagyok én."],
      hint: "Kert — сад. Вы уже там, поэтому используйте окончание места -ben."
    }
  },
  {
    id: 'bemutatkozas', title: 'Знакомство в группе', goal: 'Представьтесь и назовите город, где живёте.',
    model: ['A nevem Anna.', 'Меня зовут Анна.'],
    question: 'Hol laksz?', translation: 'Где ты живёшь?',
    instruction: 'Вы живёте в Будапеште. Ответьте новому знакомому.',
    reply: ['Budapesten lakom.', 'Я живу в Будапеште.'],
    alternatives: [['Anna vagyok.', 'Здесь вы назвали имя.'], ['Tanár vagyok.', 'Здесь вы назвали профессию.']],
    task: 'Представьтесь от имени Анны. Впишите «моё имя».', frame: 'A ___ Anna.',
    answers: ['nevem'], hint: 'Név — имя, nevem — моё имя. В этой форме é становится коротким e.',
    recall: {
      commonError: {"forms": ["Budapestben lakom.", "Budapestben élek.", "Én Budapestben lakom."], "note": "У названия Budapest для ответа на вопрос hol? используется окончание -en. Попробуйте присоединить его к названию города."},
      prompt: "Скажите новому знакомому: «Я живу в Будапеште».",
      forms: ["Budapesten lakom.", "Budapesten lakok.", "Budapesten élek.", "Én Budapesten lakom.", "Én Budapesten élek.", "Én Budapesten lakok."],
      hint: "Для ответа на Hol? название Budapest получает -en."
    }
  },
  {
    id: 'nyelvek', title: 'На каком языке продолжим?', goal: 'Объясните знакомому, на каком языке вы говорите.',
    model: ['Magyarul beszélek.', 'Я говорю по-венгерски.'],
    question: 'Beszélsz oroszul?', translation: 'Ты говоришь по-русски?',
    instruction: 'Вы говорите по-русски. Подтвердите это.',
    reply: ['Igen, beszélek oroszul.', 'Да, я говорю по-русски.'],
    alternatives: [['Nem, csak angolul.', 'Вы ответили, что говорите только по-английски.'], ['Nem értem.', 'Так говорят «я не понимаю».']],
    task: 'Скажите «Я немного говорю по-венгерски». Образуйте «по-венгерски» от magyar.', frame: 'Egy kicsit beszélek ___.',
    answers: ['magyarul'], hint: 'Язык после beszélek: magyar → magyarul, orosz → oroszul.',
    recall: {
      commonError: {"forms": ["Egy kicsit beszélsz oroszul.", "Beszélsz egy kicsit oroszul."], "note": "Beszélsz означает «ты говоришь». Вы рассказываете о себе, поэтому нужна форма «я говорю»."},
      prompt: "Скажите: «Я немного говорю по-русски».",
      forms: ["Egy kicsit beszélek oroszul.", "Beszélek egy kicsit oroszul.", "Egy kicsit oroszul beszélek.", "Oroszul egy kicsit beszélek.", "Oroszul beszélek egy kicsit.", "Beszélek oroszul egy kicsit.", "Kicsit beszélek oroszul.", "Egy kicsit tudok oroszul."],
      hint: "«По-русски» — oroszul. Для «немного» подходит egy kicsit."
    }
  },
  {
    id: 'jegyek', title: 'Покупаем билеты', goal: 'Назовите количество билетов.',
    model: ['Két jegyet kérek.', 'Два билета, пожалуйста.'],
    question: 'Hány jegyet kér?', translation: 'Сколько билетов вам нужно?',
    instruction: 'Вам нужны три билета.',
    reply: ['Három jegyet kérek.', 'Три билета, пожалуйста.'],
    alternatives: [['Egy jegyet kérek.', 'Egy — один.'], ['Négy jegyet kérek.', 'Négy — четыре.']],
    task: 'Теперь нужны два билета. Напишите число словом перед jegyet.', frame: '___ jegyet kérek.',
    answers: ['két', 'kettő'], hint: 'Перед существительным обычно говорят két: két jegyet.',
    recall: {
      commonError: {"forms": ["Két jegyeket kérek.", "Kérek két jegyeket."], "note": "После két существительное стоит в единственном числе. Уберите показатель множественного числа, сохранив форму объекта."},
      prompt: "Вы идёте вдвоём. Попросите два билета целой фразой.",
      forms: ["Két jegyet kérek.", "Kérek két jegyet.", "Két jegyet szeretnék.", "Szeretnék két jegyet.", "Két jegyet kérnék.", "Kérnék két jegyet.", "Két jegyet kérek szépen."],
      hint: "Перед существительным обычно говорят két. После числа существительное остаётся в единственном числе: jegyet."
    }
  },
  {
    id: 'eletkor', title: 'Сколько тебе лет?', goal: 'Поймите вопрос о возрасте и ответьте числом.',
    model: ['Tizenhat éves vagyok.', 'Мне шестнадцать лет.'],
    question: 'Hány éves vagy?', translation: 'Сколько тебе лет?',
    instruction: 'Сыграйте роль девятнадцатилетнего студента.',
    reply: ['Tizenkilenc éves vagyok.', 'Мне девятнадцать лет.'],
    alternatives: [['Tizenkét éves vagyok.', 'Tizenkét — двенадцать.'], ['Húszéves vagyok.', 'Húsz — двадцать.']],
    task: 'Вашей сестре восемнадцать. Впишите число 18 словом.', frame: 'A húgom ___ éves.',
    answers: ['tizennyolc'], hint: 'Tizen- + nyolc пишется слитно. Соседние n и ny сохраняются: tizennyolc.',
    recall: {
      commonError: {"forms": ["Húsz év vagyok.", "20 év vagyok."], "note": "Év означает «год». Когда называете возраст с глаголом vagyok, используйте форму éves."},
      prompt: "Ответьте от лица двадцатилетнего человека: «Мне двадцать лет».",
      forms: ["Húszéves vagyok.", "20 éves vagyok.", "Én húszéves vagyok.", "Én 20 éves vagyok."],
      hint: "Возраст выражается со словом éves и формой vagyok. Словом пишется húszéves, цифрами — 20 éves."
    }
  },
  {
    id: 'testver', title: 'Знакомим с сестрой', goal: 'Уточните, кто старше и кто младше в семье.',
    model: ['Ő a nővérem.', 'Это моя старшая сестра.'],
    question: 'Ki ő?', translation: 'Кто это?',
    instruction: 'Представьте свою младшую сестру.',
    reply: ['Ő a húgom.', 'Это моя младшая сестра.'],
    alternatives: [['Ő a nővérem.', 'Nővérem — моя старшая сестра.'], ['Ő az öcsém.', 'Öcsém — мой младший брат.']],
    task: 'Теперь представьте своего старшего брата. Впишите «мой старший брат».', frame: 'Ő a ___.',
    answers: ['bátyám'], hint: 'Báty — старший брат. Форма «мой старший брат» — bátyám.',
    recall: {
      commonError: {"forms": ["Ő az öcséd.", "Ez az öcséd."], "note": "Öcséd — «твой младший брат». Чтобы сказать «мой», замените показатель принадлежности -d на -m."},
      prompt: "Представьте младшего брата: «Это мой младший брат».",
      forms: ["Ő az öcsém.", "Ez az öcsém.", "Ő az én öcsém.", "Ez az én öcsém."],
      hint: "Для младшего брата есть особое слово. В форме «мой младший брат» это öcsém."
    }
  },
  {
    id: 'munkahely', title: 'Разговор о работе', goal: 'Назовите свою профессию и место работы.',
    model: ['Tanár vagyok. Iskolában dolgozom.', 'Я учитель. Работаю в школе.'],
    question: 'Hol dolgozol?', translation: 'Где ты работаешь?',
    instruction: 'Вы работаете в больнице. Назовите место.',
    reply: ['Kórházban dolgozom.', 'Я работаю в больнице.'],
    alternatives: [['Boltban dolgozom.', 'Bolt — магазин.'], ['Iskolában dolgozom.', 'Iskola — школа.']],
    task: 'Теперь ответьте за учителя. Поставьте iskola в форму «в школе».', frame: '___ dolgozom.',
    answers: ['iskolában'], hint: 'Iskola получает -ban. Перед ним конечное a удлиняется до á.',
    recall: {
      commonError: {"forms": ["Iskolába dolgozom.", "Az iskolába dolgozom.", "Egy iskolába dolgozom."], "note": "Iskolába отвечает на вопрос «куда?». Работа происходит в школе: здесь нужно окончание места -ban."},
      prompt: "Назовите место работы: «Я работаю в школе».",
      forms: ["Iskolában dolgozom.", "Egy iskolában dolgozom.", "Az iskolában dolgozom.", "Én iskolában dolgozom.", "Én egy iskolában dolgozom.", "Én az iskolában dolgozom.", "Egy iskolában dolgozok.", "Az iskolában dolgozok.", "Iskolában dolgozok."],
      hint: "Iskola получает -ban. Конечное a удлиняется до á."
    }
  },
  {
    id: 'leiras', title: 'Узнаём человека в толпе', goal: 'Опишите знакомого, чтобы его узнали.',
    model: ['Anna magas.', 'Анна высокая.'],
    question: 'Milyen Péter?', translation: 'Какой Петер?',
    instruction: 'Петер невысокий. Как вы его опишете?',
    reply: ['Péter alacsony.', 'Петер невысокий.'],
    alternatives: [['Péter magas.', 'Magas — высокий.'], ['Péter fiatal.', 'Fiatal говорит о возрасте.']],
    task: 'У ворот стоит высокий человек. Впишите «высокий».', frame: 'A kapunál egy ___ ember áll.',
    answers: ['magas'], hint: 'Слово magas одинаково в сочетаниях magas nő и magas férfi.',
    recall: {
      commonError: {"forms": ["Anna van magas.", "Anna magas van."], "note": "Описывая Анну в настоящем времени, соедините её имя с прилагательным magas. Глагол van здесь лишний."},
      prompt: "Опишите Анну целой фразой: «Анна высокая».",
      forms: ["Anna magas."],
      hint: "В настоящем времени при описании человека глагол van обычно опускают."
    }
  },
  {
    id: 'birtoklas', title: 'Есть ли у вас ручка?', goal: 'Скажите, что у вас есть, а чего нет.',
    model: ['Van tollam.', 'У меня есть ручка.'],
    question: 'Van tollad?', translation: 'У тебя есть ручка?',
    instruction: 'Вы забыли ручку дома. Ответьте.',
    reply: ['Nincs tollam.', 'У меня нет ручки.'],
    alternatives: [['Van tollam.', 'Это означает, что ручка есть.'], ['Nincs könyvem.', 'Könyvem — моя книга.']],
    task: 'Теперь у вас нет ключа. Впишите слово со значением «нет».', frame: '___ kulcsom.',
    answers: ['nincs'], hint: 'Van — есть, nincs — нет. Kulcsom уже означает «мой ключ».',
    recall: {
      commonError: {"forms": ["Nincs toll.", "Nincsen toll."], "note": "Так вы сказали, что ручки нет. Чтобы уточнить «у меня», прибавьте к toll показатель принадлежности -am."},
      prompt: "У вас просят ручку. Скажите: «У меня нет ручки».",
      forms: ["Nincs tollam.", "Nekem nincs tollam.", "Sajnos nincs tollam.", "Nincsen tollam.", "Nekem nincsen tollam."],
      hint: "Для отсутствия нужен глагол nincs, а окончание в tollam указывает на владельца."
    }
  },
  {
    id: 'szobak', title: 'Дома у знакомых', goal: 'Подскажите, в какой комнате находится человек.',
    model: ['A konyhában van.', 'Он или она на кухне.'],
    question: 'Hol van Anna?', translation: 'Где Анна?',
    instruction: 'Анна в гостиной. Ответьте хозяину дома.',
    reply: ['A nappaliban van.', 'Она в гостиной.'],
    alternatives: [['A konyhában van.', 'Konyha — кухня.'], ['A kertben van.', 'Kert — сад.']],
    task: 'Теперь Анна в комнате. Поставьте szoba в форму «в комнате».', frame: 'Anna a ___ van.',
    answers: ['szobában'], hint: 'Szoba + -ban → szobában. Конечное a перед окончанием становится á.',
    recall: {
      commonError: {"forms": ["Anna a konyhába van.", "A konyhába van Anna."], "note": "Konyhába означает «на кухню». Анна уже там, поэтому нужен ответ на hol? («где?») с окончанием -ban."},
      prompt: "Ответьте: «Анна на кухне».",
      forms: ["Anna a konyhában van.", "A konyhában van Anna.", "Anna ott van a konyhában."],
      hint: "Слово konyha для ответа на Hol? принимает форму konyhában."
    }
  },
  {
    id: 'irany', title: 'Куда мы идём?', goal: 'Различайте «я в магазине» и «я иду в магазин».',
    model: ['Az iskolába megyek.', 'Я иду в школу.'],
    question: 'Hová mész?', translation: 'Куда ты идёшь?',
    instruction: 'Вы идёте в магазин. Назовите цель.',
    reply: ['A boltba megyek.', 'Я иду в магазин.'],
    alternatives: [['A boltban vagyok.', 'Здесь вы уже в магазине.'], ['A kertbe megyek.', 'Kertbe — в сад.']],
    task: 'Вы идёте в сад. Поставьте kert в форму направления.', frame: 'A ___ megyek.',
    answers: ['kertbe'], hint: 'Hová? — куда? К слову kert добавьте -be. У формы направления нет конечного n.',
    recall: {
      commonError: {"forms": ["Iskolában megyek.", "Az iskolában megyek.", "Én iskolában megyek."], "note": "Iskolában отвечает на «где?». Вы направляетесь в школу, поэтому здесь нужно окончание направления -ba."},
      prompt: "Вы выходите из дома. Скажите: «Я иду в школу».",
      forms: ["Az iskolába megyek.", "Iskolába megyek.", "Megyek az iskolába.", "Megyek iskolába.", "Én iskolába megyek.", "Én az iskolába megyek."],
      hint: "Школа — цель движения. Используйте -ba, как в ответе на вопрос Hová?"
    }
  },
  {
    id: 'felulet', title: 'Где лежит книга?', goal: 'Объясните, на какой поверхности лежит вещь.',
    model: ['A könyv az asztalon van.', 'Книга на столе.'],
    question: 'Hol van a könyv?', translation: 'Где книга?',
    instruction: 'Книга на полке. Где её искать?',
    reply: ['A polcon van.', 'Она на полке.'],
    alternatives: [['A széken van.', 'Széken — на стуле.'], ['Az asztalon van.', 'Asztalon — на столе.']],
    task: 'Теперь книга на стуле. Поставьте szék в нужную форму.', frame: 'A könyv a ___ van.',
    answers: ['széken'], hint: 'После szék используется вариант -en: széken.',
    recall: {
      commonError: {"forms": ["A könyv a polcban van.", "A polcban van a könyv."], "note": "Книга лежит на поверхности полки. Для слова polc используйте окончание -on («на»)."},
      prompt: "Сообщите: «Книга на полке».",
      forms: ["A könyv a polcon van.", "A polcon van a könyv.", "A könyv ott van a polcon."],
      hint: "Polc — полка. Когда книга на её поверхности, говорят polcon."
    }
  },
  {
    id: 'tanterem', title: 'Встречаемся у двери', goal: 'Укажите место рядом с предметом или под ним.',
    model: ['A szék az ajtó mellett van.', 'Стул рядом с дверью.'],
    question: 'Hol van a táska?', translation: 'Где сумка?',
    instruction: 'Сумка под стулом. Помогите её найти.',
    reply: ['A szék alatt van.', 'Она под стулом.'],
    alternatives: [['A szék előtt van.', 'Előtt означает «перед».'], ['A szék mögött van.', 'Mögött означает «за».']],
    task: 'Скажите: «Я жду рядом с дверью». Впишите «рядом с».', frame: 'Az ajtó ___ várok.',
    answers: ['mellett'], hint: 'Сначала предмет, затем слово места: az ajtó mellett.',
    recall: {
      commonError: {"forms": ["Az ajtó előtt várok.", "Várok az ajtó előtt."], "note": "Előtt означает «перед». В этой ситуации вы ждёте рядом с дверью: поставьте mellett после ajtó."},
      prompt: "Друг ищет вас. Скажите: «Я жду у двери». Используйте mellett.",
      forms: ["Az ajtó mellett várok.", "Várok az ajtó mellett.", "Én az ajtó mellett várok.", "Az ajtó mellett várok rád."],
      hint: "Слово mellett ставят после предмета. У ajtó есть определённый артикль."
    }
  },
  {
    id: 'cselekves', title: 'Чем ты занимаешься?', goal: 'Выберите форму глагола для «я» и «ты».',
    model: ['Én tanulok. Te tanulsz.', 'Я учусь. Ты учишься.'],
    question: 'Mit csinálsz most?', translation: 'Что ты сейчас делаешь?',
    instruction: 'Вы сейчас читаете. Ответьте от своего лица.',
    reply: ['Olvasok.', 'Я читаю.'],
    alternatives: [['Olvasol.', 'Это форма «ты читаешь».'], ['Olvas.', 'Это форма «он или она читает».']],
    task: 'Теперь спросите друга: «Ты учишься?» Впишите форму tanul для «ты».', frame: 'Te ___?',
    answers: ['tanulsz'], hint: 'Для «ты» здесь нужно -sz: tanul + sz.',
    recall: {
      commonError: {"forms": ["Most tanul.", "Ő most tanul."], "note": "Tanul без личного окончания означает «он/она учится». В ответе о себе глагол должен стоять в первом лице."},
      prompt: "Скажите: «Сейчас я учусь».",
      forms: ["Most tanulok.", "Én most tanulok.", "Most éppen tanulok.", "Éppen most tanulok.", "Most én tanulok."],
      hint: "Most — сейчас. Для «я» глагол tanul получает окончание -ok."
    }
  },
  {
    id: 'szabadido', title: 'Разговор об увлечениях', goal: 'Расскажите, чем любите заниматься.',
    model: ['Szeretek olvasni.', 'Я люблю читать.'],
    question: 'Mit szeretsz csinálni?', translation: 'Чем ты любишь заниматься?',
    instruction: 'Вы любите плавать. Ответьте.',
    reply: ['Szeretek úszni.', 'Я люблю плавать.'],
    alternatives: [['Nem szeretek úszni.', 'Nem меняет смысл: плавать вы не любите.'], ['Szeretek főzni.', 'Főzni означает «готовить еду».']],
    task: 'Теперь вы любите гулять. Образуйте инфинитив от sétál.', frame: 'Szeretek ___.',
    answers: ['sétálni'], hint: 'После szeretek действие называют в форме на -ni: sétál + ni.',
    recall: {
      commonError: {"forms": ["Szeretek olvasok.", "Én szeretek olvasok."], "note": "Szeretek уже показывает, кто любит это делать. Второй глагол поставьте в неопределённую форму на -ni."},
      prompt: "Расскажите о себе: «Я люблю читать».",
      forms: ["Szeretek olvasni.", "Én szeretek olvasni.", "Olvasni szeretek."],
      hint: "После szeretek второе действие называют в форме на -ni."
    }
  },
  {
    id: 'idopont', title: 'Назначаем встречу', goal: 'Согласуйте день и время встречи.',
    model: ['Hétfőn nyolckor találkozunk.', 'Мы встречаемся в понедельник в восемь.'],
    question: 'Hány órakor találkozunk?', translation: 'Во сколько мы встречаемся?',
    instruction: 'Встреча в девять. Уточните время.',
    reply: ['Kilenckor.', 'В девять.'],
    alternatives: [['Nyolckor.', 'Nyolc — восемь.'], ['Hétfőn.', 'Это день недели, а вас спросили о часе.']],
    task: 'Перенесите встречу на шесть. Напишите hat с окончанием времени.', frame: '___ találkozunk.',
    answers: ['hatkor'], hint: 'К числу добавляется -kor: hat + kor.',
    recall: {
      commonError: {"forms": ["Nyolc találkozunk.", "Nyolc órában találkozunk.", "Találkozunk nyolc."], "note": "Чтобы указать час встречи, добавьте -kor к числу nyolc или к слову óra."},
      prompt: "Договоритесь о встрече: «Мы встречаемся в восемь».",
      forms: ["Nyolckor találkozunk.", "Nyolc órakor találkozunk.", "Találkozunk nyolckor.", "Találkozunk nyolc órakor.", "8-kor találkozunk.", "8 órakor találkozunk.", "Találkozunk 8-kor.", "Találkozunk 8 órakor."],
      hint: "К числу nyolc добавьте -kor. «Мы встречаемся» — találkozunk."
    }
  },
  {
    id: 'bolt', title: 'У прилавка', goal: 'Попросите продукт у продавца.',
    model: ['Egy almát kérek.', 'Одно яблоко, пожалуйста.'],
    question: 'Mit adhatok?', translation: 'Что вам дать?',
    instruction: 'Вы хотите один банан. Сделайте заказ.',
    reply: ['Egy banánt kérek.', 'Один банан, пожалуйста.'],
    alternatives: [['Egy almát kérek.', 'Almát — яблоко.'], ['Vizet kérek.', 'Vizet — воду.']],
    task: 'Теперь попросите яблоко. Впишите нужную форму слова alma.', frame: 'Egy ___ kérek.',
    answers: ['almát'], hint: 'Что просите? Alma → almát: добавьте -t и удлините a.',
    recall: {
      commonError: {"forms": ["Egy alma kérek.", "Kérek egy alma.", "Alma kérek."], "note": "Яблоко здесь отвечает на вопрос mit? («что?»). Перед окончанием -t последняя a в alma удлиняется."},
      prompt: "У прилавка попросите одно яблоко. Используйте kérek.",
      forms: ["Egy almát kérek.", "Kérek egy almát.", "Kérek szépen egy almát.", "Egy almát kérek szépen."],
      hint: "Название продукта после kérek получает -t. У слова alma удлиняется последняя гласная."
    }
  },
  {
    id: 'udvariasan', title: 'Заказываем в кафе', goal: 'Вежливо попросите напиток с помощью szeretnék.',
    model: ['Egy kávét szeretnék.', 'Я хотел(а) бы кофе.'],
    question: 'Mit szeretne?', translation: 'Что бы вы хотели?',
    instruction: 'Вы хотели бы чай.',
    reply: ['Egy teát szeretnék.', 'Я хотел(а) бы чай.'],
    alternatives: [['Egy kávét szeretnék.', 'Вы заказали кофе.'], ['Szeretek teázni.', 'Это значит «я люблю пить чай». Для заказа используйте szeretnék.']],
    task: 'Впишите «я хотел(а) бы», чтобы вежливо заказать воду.', frame: 'Egy pohár vizet ___.',
    answers: ['szeretnék'], hint: 'Szeretek — «я люблю», szeretnék — «я хотел(а) бы». Обратите внимание на -nék.',
    recall: {
      commonError: {"forms": ["Szeretek teázni.", "Én szeretek teázni."], "note": "Это значит «я люблю пить чай». Для вежливого заказа нужна форма со значением «я хотел(а) бы»."},
      prompt: "Вежливо скажите: «Я хотел(а) бы один чай». Используйте szeretnék.",
      forms: ["Egy teát szeretnék.", "Szeretnék egy teát.", "Egy teát szeretnék kérni.", "Szeretnék kérni egy teát.", "Szeretnék egy teát kérni."],
      hint: "Не путайте «я люблю» и «я хотел(а) бы». Напиток, который вы просите, получает -t."
    }
  },
  {
    id: 'mennyiseg', title: 'Отмеряем продукты', goal: 'Назовите нужное количество в килограммах и литрах.',
    model: ['Két kiló almát kérek.', 'Два килограмма яблок, пожалуйста.'],
    question: 'Mennyi tejet kér?', translation: 'Сколько молока вам нужно?',
    instruction: 'Вам нужен один литр молока.',
    reply: ['Egy litert kérek.', 'Один литр, пожалуйста.'],
    alternatives: [['Két litert kérek.', 'Két — два.'], ['Egy kiló almát kérek.', 'Вы заказали килограмм яблок.']],
    task: 'Спросите «Сколько литров молока нужно?». Перед словом liter впишите вопрос о числе единиц.', frame: '___ liter tej kell?',
    answers: ['Hány', 'Mennyi'], hint: 'Когда считают единицы, удобно спросить Hány liter? О количестве самого молока спрашивают Mennyi tej?',
    recall: {
      commonError: {"forms": ["Két liter tej kérek.", "Kérek két liter tej."], "note": "Вы просите молоко: в этом сочетании форму объекта принимает слово tej. Получится tejet."},
      prompt: "В магазине попросите два литра молока. Используйте kérek.",
      forms: ["Két liter tejet kérek.", "Kérek két liter tejet.", "Két liter tejet kérek szépen.", "Kérek szépen két liter tejet."],
      hint: "После két слово liter остаётся в единственном числе. Tej в роли объекта — tejet."
    }
  },
  {
    id: 'etterem', title: 'Просим счёт', goal: 'Завершите обед в ресторане и попросите счёт.',
    model: ['Az étlapot kérem.', 'Меню, пожалуйста.'],
    question: 'Hozhatok még valamit?', translation: 'Вам ещё что-нибудь принести?',
    instruction: 'Вы закончили обед и хотите расплатиться.',
    reply: ['A számlát kérem.', 'Счёт, пожалуйста.'],
    alternatives: [['Az étlapot kérem.', 'Étlap — меню.'], ['Egy levest kérek.', 'Так вы заказываете суп.']],
    task: 'Самостоятельно попросите счёт. Впишите форму слова számla.', frame: 'A ___ kérem.',
    answers: ['számlát'], hint: 'Számla → számlát. В слове остаётся первая á и удлиняется последняя a.',
    recall: {
      commonError: {"forms": ["A számlát kérek.", "Kérek a számlát."], "note": "Вы просите конкретный счёт с артиклем a. С таким объектом выбирайте определённую форму глагола: kérem."},
      prompt: "Обед окончен. Попросите счёт, используя kérem.",
      forms: ["A számlát kérem.", "Kérem a számlát.", "Kérem szépen a számlát.", "A számlát kérem szépen."],
      hint: "Вы просите конкретный счёт. Számla становится számlát, а перед ним нужен артикль."
    }
  },
  {
    id: 'piac', title: 'Спрашиваем цену на рынке', goal: 'Узнайте цену и назовите количество.',
    model: ['Mennyibe kerül egy kiló alma?', 'Сколько стоит килограмм яблок?'],
    question: 'Mennyit kér?', translation: 'Сколько вам нужно?',
    instruction: 'Цена вас устраивает. Попросите полкилограмма помидоров.',
    reply: ['Fél kiló paradicsomot kérek.', 'Полкилограмма помидоров, пожалуйста.'],
    alternatives: [['Egy kiló paradicsomot kérek.', 'Egy kiló — целый килограмм.'], ['Fél kiló almát kérek.', 'Almát — яблоки.']],
    task: 'Спросите цену килограмма помидоров. Впишите первое слово вопроса о цене.', frame: '___ kerül egy kiló paradicsom?',
    answers: ['Mennyibe'], hint: 'Для цены употребляют устойчивый вопрос Mennyibe kerül…?',
    recall: {
      commonError: {"forms": ["Mennyit kerül egy kiló alma?", "Egy kiló alma mennyit kerül?"], "note": "Mennyit подходит, например, в вопросе Mennyit fizetek? («Сколько я плачу?»). С глаголом kerül о цене спрашивают словом mennyibe."},
      prompt: "Спросите продавца: «Сколько стоит килограмм яблок?»",
      forms: ["Mennyibe kerül egy kiló alma?", "Egy kiló alma mennyibe kerül?", "Mennyibe kerül egy kilogramm alma?", "Mennyi egy kiló alma?", "Mennyi az ára egy kiló almának?"],
      hint: "О цене можно спросить с помощью Mennyibe kerül…? После kiló здесь идёт alma."
    }
  }
];
