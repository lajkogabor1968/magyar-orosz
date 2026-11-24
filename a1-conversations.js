/* One short, optional conversation for each guided A1 lesson, in workbook order.
   The last task is a constrained gap, so its answer can be checked reliably. */
window.TanmuhelyA1Conversations = [
  {
    id: 'targyak', title: 'В бюро находок', goal: 'Назовите предмет, который вам показывают.',
    model: ['Ez egy taxi.', 'Это такси.'],
    question: 'Mi ez?', translation: 'Что это?',
    instruction: 'Сотрудник показывает вам телефон. Назовите его.',
    reply: ['Ez egy telefon.', 'Это телефон.'],
    alternatives: [['Ez egy park.', 'Park — это парк.'], ['Ez egy rádió.', 'Rádió — это радио.']],
    task: 'На стойке лежит радио. Назовите его по-венгерски.', frame: 'Ez egy ___.',
    answers: ['rádió'], hint: 'В слове rádió две долгие гласные: á и ó.'
  },
  {
    id: 'koszones', title: 'Встреча с соседом', goal: 'Поздоровайтесь со знакомым и спросите, как у него дела.',
    model: ['Szia! Hogy vagy?', 'Привет! Как дела?'],
    question: 'Szia! Hogy vagy?', translation: 'Привет! Как дела?',
    instruction: 'У вас всё хорошо. Ответьте приятелю.',
    reply: ['Jól vagyok, köszönöm.', 'У меня всё хорошо, спасибо.'],
    alternatives: [['Viszontlátásra!', 'Так вежливо прощаются.'], ['Hogy hívnak?', 'Так спрашивают имя собеседника.']],
    task: 'Теперь спросите сами: «Как дела?» Впишите вопросительное слово.', frame: 'Szia! ___ vagy?',
    answers: ['Hogy', 'Hogyan'], hint: 'В коротком приветствии обычно говорят Hogy vagy?'
  },
  {
    id: 'csalad', title: 'Показываем семейное фото', goal: 'Представьте маму и папу по семейной фотографии.',
    model: ['Ő az anyukám.', 'Это моя мама.'],
    question: 'Ki ő?', translation: 'Кто это?',
    instruction: 'На фотографии ваш папа. Представьте его.',
    reply: ['Ő az apukám.', 'Это мой папа.'],
    alternatives: [['Ő az anyukám.', 'Anyukám — моя мама.'], ['Ő a barátom.', 'Barátom — мой друг.']],
    task: 'На следующем фото ваша мама. Впишите слово «мама» с окончанием «моя».', frame: 'Ő az ___.',
    answers: ['anyukám', 'anyám', 'édesanyám'], hint: 'Слово anyuka в форме «моя мама» заканчивается на -ám.'
  },
  {
    id: 'kulcs', title: 'Ищем ключи', goal: 'Объясните, где лежит ключ.',
    model: ['A kulcs az asztalon van.', 'Ключ на столе.'],
    question: 'Hol van a kulcs?', translation: 'Где ключ?',
    instruction: 'Вы видите ключ на стуле. Подскажите, где он.',
    reply: ['A széken van.', 'Он на стуле.'],
    alternatives: [['Az asztalon van.', 'Asztal — стол.'], ['A táskában van.', 'Táskában означает «в сумке».']],
    task: 'Теперь ключ на столе. Поставьте asztal в нужную форму.', frame: 'A kulcs az ___ van.',
    answers: ['asztalon'], hint: 'Когда предмет лежит на поверхности стола, говорим asztal + -on.'
  },
  {
    id: 'ital', title: 'Чай или кофе?', goal: 'Закажите напиток одной вежливой фразой.',
    model: ['Egy kávét kérek.', 'Один кофе, пожалуйста.'],
    question: 'Mit kér?', translation: 'Что будете заказывать?',
    instruction: 'Вы хотите воды. Сделайте заказ.',
    reply: ['Vizet kérek.', 'Воды, пожалуйста.'],
    alternatives: [['Egy kávét kérek.', 'Kávé — кофе.'], ['Egy teát kérek.', 'Teát — чай.']],
    task: 'Теперь закажите чай. Впишите форму слова tea после kérek.', frame: 'Kérek egy ___.',
    answers: ['teát'], hint: 'У того, что вы просите, появляется -t. Конечное a удлиняется: tea → teát.'
  },
  {
    id: 'napirend', title: 'Договариваемся на завтра', goal: 'Расскажите, что делаете сегодня и завтра.',
    model: ['Ma tanulok.', 'Сегодня я учусь.'],
    question: 'Mit csinálsz holnap?', translation: 'Что ты делаешь завтра?',
    instruction: 'Завтра вы работаете. Что скажете?',
    reply: ['Holnap dolgozom.', 'Завтра я работаю.'],
    alternatives: [['Ma dolgozom.', 'Ma означает «сегодня».'], ['Holnap olvasok.', 'Olvasok означает «я читаю».']],
    task: 'Заполните фразу «Сегодня я читаю». Впишите слово «сегодня».', frame: '___ olvasok.',
    answers: ['ma'], hint: 'Ma — сегодня, holnap — завтра.'
  },
  {
    id: 'kerdesek', title: 'Уточняем время', goal: 'Спросите, когда начинается занятие.',
    model: ['Mikor tanulsz?', 'Когда ты учишься?'],
    question: 'Mikor kezdődik az óra?', translation: 'Когда начинается занятие?',
    instruction: 'Занятие начинается утром. Выберите ответ о времени.',
    reply: ['Reggel.', 'Утром.'],
    alternatives: [['Az iskolában.', 'Это ответ на вопрос «где?».'], ['A tanár.', 'Это ответ на вопрос «кто?».']],
    task: 'Спросите «Когда начинается фильм?». Впишите «когда».', frame: '___ kezdődik a film?',
    answers: ['Mikor'], hint: 'Hol? — где? Ki? — кто? Mikor? — когда?'
  },
  {
    id: 'hely', title: 'Ищем друга в парке', goal: 'Скажите по телефону, где вы находитесь.',
    model: ['A boltban vagyok.', 'Я в магазине.'],
    question: 'Hol vagy?', translation: 'Где ты?',
    instruction: 'Вы уже в парке. Ответьте другу.',
    reply: ['A parkban vagyok.', 'Я в парке.'],
    alternatives: [['A parkba megyek.', 'Вы ещё идёте в парк.'], ['A boltban vagyok.', 'Bolt — магазин.']],
    task: 'Затем вы встретились в саду. Впишите форму слова kert для ответа на Hol?', frame: 'A ___ vagyunk.',
    answers: ['kertben'], hint: 'Для места внутри используйте -ban/-ben. К слову kert подходит -ben.'
  },
  {
    id: 'bemutatkozas', title: 'Знакомство в группе', goal: 'Представьтесь и назовите город, где живёте.',
    model: ['A nevem Anna.', 'Меня зовут Анна.'],
    question: 'Hol laksz?', translation: 'Где ты живёшь?',
    instruction: 'Вы живёте в Будапеште. Ответьте новому знакомому.',
    reply: ['Budapesten lakom.', 'Я живу в Будапеште.'],
    alternatives: [['Anna vagyok.', 'Здесь вы назвали имя.'], ['Tanár vagyok.', 'Здесь вы назвали профессию.']],
    task: 'Представьтесь от имени Анны. Впишите «моё имя».', frame: 'A ___ Anna.',
    answers: ['nevem'], hint: 'Név — имя, nevem — моё имя. В этой форме é становится коротким e.'
  },
  {
    id: 'nyelvek', title: 'На каком языке продолжим?', goal: 'Объясните знакомому, на каком языке вы говорите.',
    model: ['Magyarul beszélek.', 'Я говорю по-венгерски.'],
    question: 'Beszélsz oroszul?', translation: 'Ты говоришь по-русски?',
    instruction: 'Вы говорите по-русски. Подтвердите это.',
    reply: ['Igen, beszélek oroszul.', 'Да, я говорю по-русски.'],
    alternatives: [['Nem, csak angolul.', 'Вы ответили, что говорите только по-английски.'], ['Nem értem.', 'Так говорят «я не понимаю».']],
    task: 'Скажите «Я немного говорю по-венгерски». Образуйте «по-венгерски» от magyar.', frame: 'Egy kicsit beszélek ___.',
    answers: ['magyarul'], hint: 'Язык после beszélek: magyar → magyarul, orosz → oroszul.'
  },
  {
    id: 'jegyek', title: 'Покупаем билеты', goal: 'Назовите количество билетов.',
    model: ['Két jegyet kérek.', 'Два билета, пожалуйста.'],
    question: 'Hány jegyet kér?', translation: 'Сколько билетов вам нужно?',
    instruction: 'Вам нужны три билета.',
    reply: ['Három jegyet kérek.', 'Три билета, пожалуйста.'],
    alternatives: [['Egy jegyet kérek.', 'Egy — один.'], ['Négy jegyet kérek.', 'Négy — четыре.']],
    task: 'Теперь нужны два билета. Напишите число словом перед jegyet.', frame: '___ jegyet kérek.',
    answers: ['két', 'kettő'], hint: 'Перед существительным обычно говорят két: két jegyet.'
  },
  {
    id: 'eletkor', title: 'Сколько тебе лет?', goal: 'Поймите вопрос о возрасте и ответьте числом.',
    model: ['Tizenhat éves vagyok.', 'Мне шестнадцать лет.'],
    question: 'Hány éves vagy?', translation: 'Сколько тебе лет?',
    instruction: 'Сыграйте роль девятнадцатилетнего студента.',
    reply: ['Tizenkilenc éves vagyok.', 'Мне девятнадцать лет.'],
    alternatives: [['Tizenkét éves vagyok.', 'Tizenkét — двенадцать.'], ['Húszéves vagyok.', 'Húsz — двадцать.']],
    task: 'Вашей сестре восемнадцать. Впишите число 18 словом.', frame: 'A húgom ___ éves.',
    answers: ['tizennyolc'], hint: 'Tizen- + nyolc пишется слитно. Соседние n и ny сохраняются: tizennyolc.'
  },
  {
    id: 'testver', title: 'Знакомим с сестрой', goal: 'Уточните, кто старше и кто младше в семье.',
    model: ['Ő a nővérem.', 'Это моя старшая сестра.'],
    question: 'Ki ő?', translation: 'Кто это?',
    instruction: 'Представьте свою младшую сестру.',
    reply: ['Ő a húgom.', 'Это моя младшая сестра.'],
    alternatives: [['Ő a nővérem.', 'Nővérem — моя старшая сестра.'], ['Ő az öcsém.', 'Öcsém — мой младший брат.']],
    task: 'Теперь представьте своего старшего брата. Впишите «мой старший брат».', frame: 'Ő a ___.',
    answers: ['bátyám'], hint: 'Báty — старший брат. Форма «мой старший брат» — bátyám.'
  },
  {
    id: 'munkahely', title: 'Разговор о работе', goal: 'Назовите свою профессию и место работы.',
    model: ['Tanár vagyok. Iskolában dolgozom.', 'Я учитель. Работаю в школе.'],
    question: 'Hol dolgozol?', translation: 'Где ты работаешь?',
    instruction: 'Вы работаете в больнице. Назовите место.',
    reply: ['Kórházban dolgozom.', 'Я работаю в больнице.'],
    alternatives: [['Boltban dolgozom.', 'Bolt — магазин.'], ['Iskolában dolgozom.', 'Iskola — школа.']],
    task: 'Теперь ответьте за учителя. Поставьте iskola в форму «в школе».', frame: '___ dolgozom.',
    answers: ['iskolában'], hint: 'Iskola получает -ban. Перед ним конечное a удлиняется до á.'
  },
  {
    id: 'leiras', title: 'Узнаём человека в толпе', goal: 'Опишите знакомого, чтобы его узнали.',
    model: ['Anna magas.', 'Анна высокая.'],
    question: 'Milyen Péter?', translation: 'Какой Петер?',
    instruction: 'Петер невысокий. Как вы его опишете?',
    reply: ['Péter alacsony.', 'Петер невысокий.'],
    alternatives: [['Péter magas.', 'Magas — высокий.'], ['Péter fiatal.', 'Fiatal говорит о возрасте.']],
    task: 'У ворот стоит высокий человек. Впишите «высокий».', frame: 'A kapunál egy ___ ember áll.',
    answers: ['magas'], hint: 'Слово magas одинаково в сочетаниях magas nő и magas férfi.'
  },
  {
    id: 'birtoklas', title: 'Есть ли у вас ручка?', goal: 'Скажите, что у вас есть, а чего нет.',
    model: ['Van tollam.', 'У меня есть ручка.'],
    question: 'Van tollad?', translation: 'У тебя есть ручка?',
    instruction: 'Вы забыли ручку дома. Ответьте.',
    reply: ['Nincs tollam.', 'У меня нет ручки.'],
    alternatives: [['Van tollam.', 'Это означает, что ручка есть.'], ['Nincs könyvem.', 'Könyvem — моя книга.']],
    task: 'Теперь у вас нет ключа. Впишите слово со значением «нет».', frame: '___ kulcsom.',
    answers: ['nincs'], hint: 'Van — есть, nincs — нет. Kulcsom уже означает «мой ключ».'
  },
  {
    id: 'szobak', title: 'Дома у знакомых', goal: 'Подскажите, в какой комнате находится человек.',
    model: ['A konyhában van.', 'Он или она на кухне.'],
    question: 'Hol van Anna?', translation: 'Где Анна?',
    instruction: 'Анна в гостиной. Ответьте хозяину дома.',
    reply: ['A nappaliban van.', 'Она в гостиной.'],
    alternatives: [['A konyhában van.', 'Konyha — кухня.'], ['A kertben van.', 'Kert — сад.']],
    task: 'Теперь Анна в комнате. Поставьте szoba в форму «в комнате».', frame: 'Anna a ___ van.',
    answers: ['szobában'], hint: 'Szoba + -ban → szobában. Конечное a перед окончанием становится á.'
  },
  {
    id: 'irany', title: 'Куда мы идём?', goal: 'Различайте «я в магазине» и «я иду в магазин».',
    model: ['Az iskolába megyek.', 'Я иду в школу.'],
    question: 'Hová mész?', translation: 'Куда ты идёшь?',
    instruction: 'Вы идёте в магазин. Назовите цель.',
    reply: ['A boltba megyek.', 'Я иду в магазин.'],
    alternatives: [['A boltban vagyok.', 'Здесь вы уже в магазине.'], ['A kertbe megyek.', 'Kertbe — в сад.']],
    task: 'Вы идёте в сад. Поставьте kert в форму направления.', frame: 'A ___ megyek.',
    answers: ['kertbe'], hint: 'Hová? — куда? К слову kert добавьте -be. У формы направления нет конечного n.'
  },
  {
    id: 'felulet', title: 'Где лежит книга?', goal: 'Объясните, на какой поверхности лежит вещь.',
    model: ['A könyv az asztalon van.', 'Книга на столе.'],
    question: 'Hol van a könyv?', translation: 'Где книга?',
    instruction: 'Книга на полке. Где её искать?',
    reply: ['A polcon van.', 'Она на полке.'],
    alternatives: [['A széken van.', 'Széken — на стуле.'], ['Az asztalon van.', 'Asztalon — на столе.']],
    task: 'Теперь книга на стуле. Поставьте szék в нужную форму.', frame: 'A könyv a ___ van.',
    answers: ['széken'], hint: 'После szék используется вариант -en: széken.'
  },
  {
    id: 'tanterem', title: 'Встречаемся у двери', goal: 'Укажите место рядом с предметом или под ним.',
    model: ['A szék az ajtó mellett van.', 'Стул рядом с дверью.'],
    question: 'Hol van a táska?', translation: 'Где сумка?',
    instruction: 'Сумка под стулом. Помогите её найти.',
    reply: ['A szék alatt van.', 'Она под стулом.'],
    alternatives: [['A szék előtt van.', 'Előtt означает «перед».'], ['A szék mögött van.', 'Mögött означает «за».']],
    task: 'Скажите: «Я жду рядом с дверью». Впишите «рядом с».', frame: 'Az ajtó ___ várok.',
    answers: ['mellett'], hint: 'Сначала предмет, затем слово места: az ajtó mellett.'
  },
  {
    id: 'cselekves', title: 'Чем ты занимаешься?', goal: 'Выберите форму глагола для «я» и «ты».',
    model: ['Én tanulok. Te tanulsz.', 'Я учусь. Ты учишься.'],
    question: 'Mit csinálsz most?', translation: 'Что ты сейчас делаешь?',
    instruction: 'Вы сейчас читаете. Ответьте от своего лица.',
    reply: ['Olvasok.', 'Я читаю.'],
    alternatives: [['Olvasol.', 'Это форма «ты читаешь».'], ['Olvas.', 'Это форма «он или она читает».']],
    task: 'Теперь спросите друга: «Ты учишься?» Впишите форму tanul для «ты».', frame: 'Te ___?',
    answers: ['tanulsz'], hint: 'Для «ты» здесь нужно -sz: tanul + sz.'
  },
  {
    id: 'szabadido', title: 'Разговор об увлечениях', goal: 'Расскажите, чем любите заниматься.',
    model: ['Szeretek olvasni.', 'Я люблю читать.'],
    question: 'Mit szeretsz csinálni?', translation: 'Чем ты любишь заниматься?',
    instruction: 'Вы любите плавать. Ответьте.',
    reply: ['Szeretek úszni.', 'Я люблю плавать.'],
    alternatives: [['Nem szeretek úszni.', 'Nem меняет смысл: плавать вы не любите.'], ['Szeretek főzni.', 'Főzni означает «готовить еду».']],
    task: 'Теперь вы любите гулять. Образуйте инфинитив от sétál.', frame: 'Szeretek ___.',
    answers: ['sétálni'], hint: 'После szeretek действие называют в форме на -ni: sétál + ni.'
  },
  {
    id: 'idopont', title: 'Назначаем встречу', goal: 'Согласуйте день и время встречи.',
    model: ['Hétfőn nyolckor találkozunk.', 'Мы встречаемся в понедельник в восемь.'],
    question: 'Hány órakor találkozunk?', translation: 'Во сколько мы встречаемся?',
    instruction: 'Встреча в девять. Уточните время.',
    reply: ['Kilenckor.', 'В девять.'],
    alternatives: [['Nyolckor.', 'Nyolc — восемь.'], ['Hétfőn.', 'Это день недели, а вас спросили о часе.']],
    task: 'Перенесите встречу на шесть. Напишите hat с окончанием времени.', frame: '___ találkozunk.',
    answers: ['hatkor'], hint: 'К числу добавляется -kor: hat + kor.'
  },
  {
    id: 'bolt', title: 'У прилавка', goal: 'Попросите продукт у продавца.',
    model: ['Egy almát kérek.', 'Одно яблоко, пожалуйста.'],
    question: 'Mit adhatok?', translation: 'Что вам дать?',
    instruction: 'Вы хотите один банан. Сделайте заказ.',
    reply: ['Egy banánt kérek.', 'Один банан, пожалуйста.'],
    alternatives: [['Egy almát kérek.', 'Almát — яблоко.'], ['Vizet kérek.', 'Vizet — воду.']],
    task: 'Теперь попросите яблоко. Впишите нужную форму слова alma.', frame: 'Egy ___ kérek.',
    answers: ['almát'], hint: 'Что просите? Alma → almát: добавьте -t и удлините a.'
  },
  {
    id: 'udvariasan', title: 'Заказываем в кафе', goal: 'Вежливо попросите напиток с помощью szeretnék.',
    model: ['Egy kávét szeretnék.', 'Я хотел(а) бы кофе.'],
    question: 'Mit szeretne?', translation: 'Что бы вы хотели?',
    instruction: 'Вы хотели бы чай.',
    reply: ['Egy teát szeretnék.', 'Я хотел(а) бы чай.'],
    alternatives: [['Egy kávét szeretnék.', 'Вы заказали кофе.'], ['Szeretek teázni.', 'Это значит «я люблю пить чай». Для заказа используйте szeretnék.']],
    task: 'Впишите «я хотел(а) бы», чтобы вежливо заказать воду.', frame: 'Egy pohár vizet ___.',
    answers: ['szeretnék'], hint: 'Szeretek — «я люблю», szeretnék — «я хотел(а) бы». Обратите внимание на -nék.'
  },
  {
    id: 'mennyiseg', title: 'Отмеряем продукты', goal: 'Назовите нужное количество в килограммах и литрах.',
    model: ['Két kiló almát kérek.', 'Два килограмма яблок, пожалуйста.'],
    question: 'Mennyi tejet kér?', translation: 'Сколько молока вам нужно?',
    instruction: 'Вам нужен один литр молока.',
    reply: ['Egy litert kérek.', 'Один литр, пожалуйста.'],
    alternatives: [['Két litert kérek.', 'Két — два.'], ['Egy kiló almát kérek.', 'Вы заказали килограмм яблок.']],
    task: 'Спросите «Сколько литров молока нужно?». Перед словом liter впишите вопрос о числе единиц.', frame: '___ liter tej kell?',
    answers: ['Hány', 'Mennyi'], hint: 'Когда считают единицы, удобно спросить Hány liter? О количестве самого молока спрашивают Mennyi tej?'
  },
  {
    id: 'etterem', title: 'Просим счёт', goal: 'Завершите обед в ресторане и попросите счёт.',
    model: ['Az étlapot kérem.', 'Меню, пожалуйста.'],
    question: 'Hozhatok még valamit?', translation: 'Вам ещё что-нибудь принести?',
    instruction: 'Вы закончили обед и хотите расплатиться.',
    reply: ['A számlát kérem.', 'Счёт, пожалуйста.'],
    alternatives: [['Az étlapot kérem.', 'Étlap — меню.'], ['Egy levest kérek.', 'Так вы заказываете суп.']],
    task: 'Самостоятельно попросите счёт. Впишите форму слова számla.', frame: 'A ___ kérem.',
    answers: ['számlát'], hint: 'Számla → számlát. В слове остаётся первая á и удлиняется последняя a.'
  },
  {
    id: 'piac', title: 'Спрашиваем цену на рынке', goal: 'Узнайте цену и назовите количество.',
    model: ['Mennyibe kerül egy kiló alma?', 'Сколько стоит килограмм яблок?'],
    question: 'Mennyit kér?', translation: 'Сколько вам нужно?',
    instruction: 'Цена вас устраивает. Попросите полкилограмма помидоров.',
    reply: ['Fél kiló paradicsomot kérek.', 'Полкилограмма помидоров, пожалуйста.'],
    alternatives: [['Egy kiló paradicsomot kérek.', 'Egy kiló — целый килограмм.'], ['Fél kiló almát kérek.', 'Almát — яблоки.']],
    task: 'Спросите цену килограмма помидоров. Впишите первое слово вопроса о цене.', frame: '___ kerül egy kiló paradicsom?',
    answers: ['Mennyibe'], hint: 'Для цены употребляют устойчивый вопрос Mennyibe kerül…?'
  }
];
