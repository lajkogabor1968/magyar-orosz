/* A1 lessons 17–20: homes, directions and basic location expressions. */
(() => {
  'use strict';
  const lessons = [
    {
      title: 'Комнаты дома: где находится?',
      words: ['konyha', 'nappali', 'fürdőszoba', 'hálószoba', 'lakás', 'szoba', 'asztal', 'szekrény', 'lámpa', 'ágy', 'ablak'],
      supplemental: [["nappali","гостиная","A nappaliban van egy lámpа.","В гостиной есть лампа."]],
      extra: [
        ['konyhában', 'на кухне', 'A konyhában van egy asztal.', 'На кухне есть стол.'],
        ['nappaliban', 'в гостиной', 'A nappaliban van egy lámpa.', 'В гостиной есть лампа.'],
        ['fürdőszobában', 'в ванной комнате', 'A fürdőszobában van egy ablak.', 'В ванной комнате есть окно.'],
        ['hálószobában', 'в спальне', 'Az ágy a hálószobában van.', 'Кровать находится в спальне.'],
        ['szobában', 'в комнате', 'A szobában van egy szekrény.', 'В комнате есть шкаф.']
      ],
      grammar: [
        'Где? Повторяем -ban/-ben и названия комнат',
        'Вопрос Hol? означает «где?» и описывает местонахождение без движения. Для «внутри помещения» часто используется суффикс -ban/-ben, присоединяемый к слову: konyha → konyhában («на кухне»), szoba → szobában («в комнате»), hálószoba → hálószobában («в спальне»). Обратите внимание: конечная a перед суффиксом удлиняется до á. В слове nappali («гостиная») этой замены нет: nappaliban («в гостиной»). Выбор -ban или -ben зависит от гармонии гласных основы: kert → kertben («в саду»), но konyha → konyhában. В ответе место обычно предшествует сказуемому: Az ágy a hálószobában van. — «Кровать в спальне». Сравните два способа сказать, что предмет находится в комнате: A szobában van egy szekrény. — «В комнате есть шкаф» и A szekrény a szobában van. — «Шкаф находится в комнате». Это правило говорит о том, где предмет расположен, а не куда его несут или идут.',
        'Hol van az ágy? — A hálószobában van. / A lámpa a nappaliban van.'
      ],
      dialogue: [
        'Hol van az ágy?',
        'A hálószobában van.',
        'És a lámpa?',
        'A nappaliban van.'
      ],
      composition: [
        'Моя квартира и комнаты',
        'Напишите пять разных простых предложений о предметах в комнатах. Можно описать вымышленную квартиру. Используйте не менее трёх разных названий комнат.',
        'A lakás nagy. / A konyhában van egy asztal. / Az ágy a hálószobában van. / A lámpa a nappaliban van. / A szobában van egy szekrény.'
      ],
      min: 5,
      reading: {
        lines: [
          ['A lakás nagy.', 'Квартира большая.'],
          ['A konyhában van egy asztal.', 'На кухне есть стол.'],
          ['A nappaliban van egy lámpa.', 'В гостиной есть лампа.'],
          ['Az ágy a hálószobában van.', 'Кровать находится в спальне.'],
          ['A fürdőszoba kicsi.', 'Ванная комната маленькая.'],
          ['Az ablak a nappaliban van.', 'Окно находится в гостиной.']
        ],
        q: 'Где находится кровать?',
        options: ['В спальне.', 'На кухне.', 'В гостиной.'],
        answer: 0
      },
      preparation: [
        ['Hol van az ágy?', 'Где кровать?', 'Hol — где; az — определённый артикль перед гласной; ágy — кровать.'],
        ['Az ágy a hálószobában van.', 'Кровать находится в спальне.', 'Hálószoba → hálószobában: «в спальне».'],
        ['A konyhában van egy asztal.', 'На кухне есть стол.', 'Konyha → konyhában: a превращается в á.'],
        ['A lámpa a nappaliban van.', 'Лампа в гостиной.', 'Nappali → nappaliban: окончание -ban без удлинения конечного i.'],
        ['A szobában van egy szekrény.', 'В комнате есть шкаф.', 'Szoba → szobában; van egy ... — имеется один предмет.']
      ],
      grammarTable: [
        ['konyha → konyhában', 'кухня → на кухне', 'a → á + -ban'],
        ['szoba → szobában', 'комната → в комнате', 'a → á + -ban'],
        ['hálószoba → hálószobában', 'спальня → в спальне', 'a → á + -ban'],
        ['nappali → nappaliban', 'гостиная → в гостиной', '-ban после nappali'],
        ['kert → kertben', 'сад → в саду', '-ben из-за гласной e'],
        ['Az ágy a hálószobában van.', 'Кровать находится в спальне.', 'hol? → -ban/-ben']
      ]
    },
    {
      title: 'Куда идём? Hová? и -ba/-be',
      words: ['megy', 'iskola', 'bolt', 'ház', 'szoba', 'lakás', 'konyha', 'park', 'utca', 'könyvtár'],
      extra: [
        ['Hová?', 'куда?', 'Hová mész?', 'Куда ты идёшь?'],
        ['megyek', 'я иду / еду', 'A boltba megyek.', 'Я иду в магазин.'],
        ['mész', 'ты идёшь / едешь', 'Hová mész?', 'Куда ты идёшь?'],
        ['iskolába', 'в школу (куда?)', 'Éva az iskolába megy.', 'Ева идёт в школу.'],
        ['boltba', 'в магазин (куда?)', 'Péter a boltba megy.', 'Петер идёт в магазин.'],
        ['házba', 'в дом (куда?)', 'A fiú a házba megy.', 'Мальчик идёт в дом.'],
        ['szobába', 'в комнату (куда?)', 'Anna a szobába megy.', 'Анна идёт в комнату.'],
        ['konyhába', 'на кухню (куда?)', 'Anna a konyhába megy.', 'Анна идёт на кухню.'],
        ['kertbe', 'в сад (куда?)', 'Péter a kertbe megy.', 'Петер идёт в сад.']
      ],
      grammar: [
        'Hol? или Hová? — местонахождение и направление',
        'Не смешивайте два вопроса. Hol? — «Где?»; ответ означает, что человек уже находится в месте: A fiú az iskolában van. — «Мальчик в школе». Hová? — «Куда?»; ответ означает движение к месту: A fiú az iskolába megy. — «Мальчик идёт в школу». Для движения внутрь часто используются -ba/-be: bolt → boltba («в магазин»), ház → házba («в дом»), kert → kertbe («в сад»). Если слово заканчивается на a, она перед суффиксом меняется на á: iskola → iskolába, szoba → szobába, konyha → konyhába. Сравните пары: boltban — «в магазине» (где?), boltba — «в магазин» (куда?); kertben — «в саду», kertbe — «в сад». Вопрос Hová mész? — «Куда ты идёшь?»; ответ A boltba megyek. — «Я иду в магазин». Формы megyek (я иду), mész (ты идёшь), megy (он/она идёт) запоминаем как отдельные формы глагола megy. Не все места требуют -ba/-be, поэтому пока используем проверенные примеры помещений.',
        'Hol van Éva? — Az iskolában van. / Hová megy Éva? — Az iskolába megy.'
      ],
      dialogue: [
        'Hová mész?',
        'A boltba megyek.',
        'És Éva hová megy?',
        'Éva az iskolába megy.'
      ],
      composition: [
        'Куда идут люди?',
        'Напишите пять разных коротких предложений: один вопрос Hová?, не менее двух предложений о движении и два сравнения Hol?/Hová? с использованием разных мест.',
        'Hová mész? / A boltba megyek. / Éva az iskolába megy. / Anna a házban van. / Anna a konyhába megy.'
      ],
      min: 5,
      reading: {
        lines: [
          ['Reggel van.', 'Сейчас утро.'],
          ['Péter a boltba megy.', 'Петер идёт в магазин.'],
          ['Éva az iskolába megy.', 'Ева идёт в школу.'],
          ['Anna a házban van.', 'Анна находится в доме.'],
          ['Anna a konyhába megy.', 'Анна идёт на кухню.'],
          ['A ház nagy.', 'Дом большой.']
        ],
        q: 'Куда идёт Ева?',
        options: ['В школу.', 'В магазин.', 'На кухню.'],
        answer: 0
      },
      preparation: [
        ['Hol van Éva?', 'Где Ева?', 'Hol спрашивает о месте, где человек находится.'],
        ['Éva az iskolában van.', 'Ева находится в школе.', 'Iskolában — местонахождение; -ban отвечает на Hol?'],
        ['Hová mész?', 'Куда ты идёшь?', 'Hová — куда; mész — идёшь (ты).'],
        ['A boltba megyek.', 'Я иду в магазин.', 'Boltba — направление внутрь; megyek — иду (я).'],
        ['Éva az iskolába megy.', 'Ева идёт в школу.', 'Iskola → iskolába: a → á перед -ba.'],
        ['Péter a kertbe megy.', 'Петер идёт в сад.', 'Kert → kertbe: -be выбирается по гармонии гласных.']
      ],
      grammarTable: [
        ['boltban — boltba', 'в магазине — в магазин', 'Hol? — Hová?'],
        ['iskolában — iskolába', 'в школе — в школу', 'a → á, -ban / -ba'],
        ['házban — házba', 'в доме — в дом', '-ban / -ba'],
        ['kertben — kertbe', 'в саду — в сад', '-ben / -be'],
        ['megyek · mész · megy', 'я иду · ты идёшь · он/она идёт', 'Три формы глагола megy'],
        ['Hová mész? — A boltba megyek.', 'Куда ты идёшь? — В магазин.', 'Hová? + -ba/-be']
      ]
    },
    {
      title: 'На столе или на стуле? -on/-en/-ön',
      words: ['asztal', 'szék', 'lámpa', 'tábla', 'könyv', 'táska', 'ceruza', 'telefon', 'kulcs', 'fal', 'van'],
      supplemental: [["fal","стена","A tábla a falon van.","Доска находится на стене."]],
      examples: {szék: ['Ez egy szék.', 'Это стул.']},
      extra: [
        ['polc', 'полка', 'A polc nagy.', 'Полка большая.'],
        ['föld', 'земля, поверхность земли', 'A föld vizes.', 'Земля мокрая.'],
        ['asztalon', 'на столе', 'A könyv az asztalon van.', 'Книга лежит на столе.'],
        ['széken', 'на стуле', 'A telefon a széken van.', 'Телефон находится на стуле.'],
        ['földön', 'на земле', 'A kulcs a földön van.', 'Ключ лежит на земле.'],
        ['polcon', 'на полке', 'A lámpa a polcon van.', 'Лампа стоит на полке.'],
        ['falon', 'на стене', 'A tábla a falon van.', 'Доска находится на стене.']
      ],
      grammar: [
        'Где? На поверхности: -on/-en/-ön',
        'Для предмета, находящегося на поверхности, в венгерском языке часто используются суффиксы -on, -en, -ön: asztal → asztalon («на столе»), szék → széken («на стуле»), föld → földön («на земле»). Какую форму выбрать, зависит от гласных в слове: после asztal используется -on; после szék — -en; после föld — -ön. Ещё два полезных примера: polc → polcon («на полке»), fal → falon («на стене»). Обратите внимание: суффикс пишется слитно с существительным. Эти формы отвечают на вопрос Hol? («Где?»), как и знакомые -ban/-ben, но описывают другой тип места: A könyv a szobában van. — «Книга в комнате»; A könyv az asztalon van. — «Книга на столе». Здесь мы изучаем именно местонахождение, не направление движения «на стол». Не переносите -on/-en/-ön на любой объект: некоторые места употребляются с другими окончаниями.',
        'Hol van a könyv? — Az asztalon van. / Hol van a telefon? — A széken van.'
      ],
      dialogue: [
        'Hol van a könyv?',
        'Az asztalon van.',
        'És hol van a telefon?',
        'A széken van.'
      ],
      composition: [
        'Предметы на разных поверхностях',
        'Напишите пять разных коротких предложений, используя asztalon, széken, polcon, falon и одно слово с уже изученным -ban/-ben.',
        'A könyv az asztalon van. / A telefon a széken van. / A lámpa a polcon van. / A tábla a falon van. / A szék a szobában van.'
      ],
      min: 5,
      reading: {
        lines: [
          ['A szobában van egy asztal.', 'В комнате есть стол.'],
          ['A könyv az asztalon van.', 'Книга находится на столе.'],
          ['A telefon a széken van.', 'Телефон находится на стуле.'],
          ['A tábla a falon van.', 'Доска находится на стене.'],
          ['A lámpa a polcon van.', 'Лампа стоит на полке.'],
          ['A kulcs a földön van.', 'Ключ лежит на земле.']
        ],
        q: 'Где находится телефон?',
        options: ['На стуле.', 'На столе.', 'На стене.'],
        answer: 0
      },
      preparation: [
        ['Hol van a könyv?', 'Где книга?', 'Hol спрашивает о местонахождении.'],
        ['A könyv az asztalon van.', 'Книга находится на столе.', 'Asztal → asztalon: суффикс -on.'],
        ['A telefon a széken van.', 'Телефон находится на стуле.', 'Szék → széken: суффикс -en.'],
        ['A kulcs a földön van.', 'Ключ лежит на земле.', 'Föld → földön: суффикс -ön.'],
        ['A lámpa a polcon van.', 'Лампа стоит на полке.', 'Polc → polcon: снова -on.'],
        ['A tábla a falon van.', 'Доска находится на стене.', 'Fal → falon: суффикс -on.']
      ],
      grammarTable: [
        ['asztal → asztalon', 'стол → на столе', '-on'],
        ['szék → széken', 'стул → на стуле', '-en'],
        ['föld → földön', 'земля → на земле', '-ön'],
        ['polc → polcon', 'полка → на полке', '-on'],
        ['fal → falon', 'стена → на стене', '-on'],
        ['szobában — asztalon', 'в комнате — на столе', 'Внутри: -ban/-ben; на поверхности: -on/-en/-ön']
      ]
    },
    {
      title: 'В классе: рядом, перед, за, под',
      words: ['iskola', 'tanár', 'diák', 'tábla', 'asztal', 'szék', 'ajtó', 'ablak', 'könyv', 'táska', 'mellett', 'előtt', 'mögött'],
      supplemental: [["mellett","рядом с","Az ajtó mellett van.","Находится рядом с дверью."],["mögött","за; позади","Az ajtó mögött van.","Находится за дверью."]],
      examples: {szék: ['Ez egy szék.', 'Это стул.']},
      extra: [
        ['alatt', 'под', 'A táska az asztal alatt van.', 'Сумка находится под столом.'],
        ['tanterem', 'учебный класс; классная комната', 'Ez egy tanterem.', 'Это учебный класс.'],
        ['asztal alatt', 'под столом', 'A táska az asztal alatt van.', 'Сумка находится под столом.'],
        ['szék mellett', 'рядом со стулом', 'A táska a szék mellett van.', 'Сумка рядом со стулом.'],
        ['ajtó előtt', 'перед дверью', 'A tanár az ajtó előtt van.', 'Учитель перед дверью.'],
        ['szekrény mögött', 'за шкафом', 'A kulcs a szekrény mögött van.', 'Ключ за шкафом.']
      ],
      grammar: [
        'Послелоги положения: mellett, előtt, mögött, alatt',
        'Если мы хотим сказать «рядом со столом», «перед дверью», «за шкафом» или «под столом», часто используются отдельные слова после существительного. Это послелоги: mellett — «рядом с», előtt — «перед», mögött — «за, позади», alatt — «под». Сравните az asztal mellett («рядом со столом»), az ajtó előtt («перед дверью»), a szekrény mögött («за шкафом»), az asztal alatt («под столом»). Важно: послелог пишется отдельно, после существительного, а не перед ним, как русский предлог. Теперь сравните три способа отвечать на Hol?: a szobában («в комнате»), az asztalon («на столе»), az asztal alatt («под столом»). Все они обозначают положение, но разные отношения в пространстве. При движении внутрь на вопрос Hová? по-прежнему используем -ba/-be: A diák az iskolába megy. — «Ученик идёт в школу». В этом уроке послелоги mellett, előtt, mögött, alatt учим в ответах на вопрос «где?».',
        'Hol van a táska? — Az asztal alatt van. / A tábla az ajtó mellett van.'
      ],
      dialogue: [
        'Hol van a táska?',
        'Az asztal alatt van.',
        'És hol van a tábla?',
        'Az ajtó mellett van.'
      ],
      composition: [
        'Описываю класс',
        'Напишите пять разных коротких предложений: три предложения с послелогами места, одно с -on/-en/-ön и одно с направлением -ba/-be. Можно описать вымышленный класс.',
        'A tábla az ajtó mellett van. / A tanár az ajtó előtt van. / A táska az asztal alatt van. / A könyv az asztalon van. / A diák az iskolába megy.'
      ],
      min: 5,
      reading: {
        lines: [
          ['Ez egy tanterem.', 'Это учебный класс.'],
          ['A tábla az ajtó mellett van.', 'Доска рядом с дверью.'],
          ['A könyv az asztalon van.', 'Книга на столе.'],
          ['A táska az asztal alatt van.', 'Сумка под столом.'],
          ['A tanár az ajtó előtt van.', 'Учитель перед дверью.'],
          ['A diák az iskolába megy.', 'Ученик идёт в школу.']
        ],
        q: 'Где находится сумка?',
        options: ['Под столом.', 'На столе.', 'За дверью.'],
        answer: 0
      },
      preparation: [
        ['A tábla az ajtó mellett van.', 'Доска рядом с дверью.', 'Mellett — «рядом с»; стоит после ajtó.'],
        ['A tanár az ajtó előtt van.', 'Учитель перед дверью.', 'Előtt — «перед»; стоит после ajtó.'],
        ['A táska az asztal alatt van.', 'Сумка находится под столом.', 'Alatt — «под»; пишется отдельно от asztal.'],
        ['A kulcs a szekrény mögött van.', 'Ключ находится за шкафом.', 'Mögött — «за, позади»; стоит после szekrény.'],
        ['A könyv az asztalon van.', 'Книга находится на столе.', 'Asztalon: суффикс -on пишется слитно, это не послелог.'],
        ['A diák az iskolába megy.', 'Ученик идёт в школу.', 'Iskolába — движение внутрь, вопрос Hová?']
      ],
      grammarTable: [
        ['az asztal mellett', 'рядом со столом', 'mellett: после существительного'],
        ['az ajtó előtt', 'перед дверью', 'előtt: после существительного'],
        ['a szekrény mögött', 'за шкафом', 'mögött: после существительного'],
        ['az asztal alatt', 'под столом', 'alatt: после существительного'],
        ['az asztalon', 'на столе', '-on: суффикс пишется слитно'],
        ['iskolában — iskolába', 'в школе — в школу', 'Hol? — Hová?']
      ]
    }
  ];

  const dialogueTranslations = {
    'Комнаты дома: где находится?': [
      'Где кровать?', 'В спальне.', 'А лампа?', 'В гостиной.'
    ],
    'Куда идём? Hová? и -ba/-be': [
      'Куда ты идёшь?', 'Я иду в магазин.', 'А куда идёт Ева?', 'Ева идёт в школу.'
    ],
    'На столе или на стуле? -on/-en/-ön': [
      'Где книга?', 'На столе.', 'А где телефон?', 'На стуле.'
    ],
    'В классе: рядом, перед, за, под': [
      'Где сумка?', 'Под столом.', 'А где доска?', 'Рядом с дверью.'
    ]
  };

  const checks = {
    'A1:16': {
      q: 'Как правильно сказать «в спальне»?',
      a: ['hálószobában', 'hálószobába', 'hálószoba'],
      ok: 0,
      why: 'На вопрос Hol? («Где?») подходит hálószobában. Hálószobába означает «в спальню» (куда?), hálószoba — просто «спальня».'
    },
    'A1:17': {
      q: 'Как сказать «Я иду в магазин»?',
      a: ['A boltba megyek.', 'A boltban vagyok.', 'A boltban megyek.'],
      ok: 0,
      why: 'Boltba — направление (куда?); megyek — я иду. Boltban — нахождение внутри магазина, а не движение к нему.'
    },
    'A1:18': {
      q: 'Как правильно сказать «на стуле»?',
      a: ['a széken', 'a székben', 'a székre'],
      ok: 0,
      why: 'Szék → széken: суффикс -en отвечает на Hol? («Где?»). Székben — внутри стула; székre — на стул (куда?).'
    },
    'A1:19': {
      q: 'Что означает «az asztal alatt»?',
      a: ['под столом', 'на столе', 'перед столом'],
      ok: 0,
      why: 'Alatt означает «под», и как послелог пишется после существительного отдельно: az asztal alatt. Asztalon означает «на столе».'
    }
  };

  const visuals = [
    {icon: '🏠', title: 'Что где находится дома?', subtitle: 'Комнаты и -ban/-ben', cards: [['🍳', 'konyhában', 'на кухне'], ['🛏️', 'hálószobában', 'в спальне'], ['🛋️', 'nappaliban', 'в гостиной']]},
    {icon: '🚶', title: 'Куда мы идём?', subtitle: 'Направление -ba/-be и Hová?', cards: [['📍', 'iskolában', 'в школе (где?)'], ['➡️', 'iskolába', 'в школу (куда?)'], ['🏪', 'boltba', 'в магазин']]},
    {icon: '📚', title: 'На разных поверхностях', subtitle: 'Суффиксы -on/-en/-ön', cards: [['📚', 'asztalon', 'на столе'], ['🪑', 'széken', 'на стуле'], ['🖼️', 'falon', 'на стене']]},
    {icon: '🏫', title: 'Где в классе?', subtitle: 'Места рядом, перед, за и под', cards: [['↔️', 'mellett', 'рядом'], ['🚪', 'előtt', 'перед'], ['⬇️', 'alatt', 'под']]}
  ];

  window.TanmuhelyA1Units17to20 = {lessons, dialogueTranslations, checks, visuals};
})();
