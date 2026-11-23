/* A1 9–12: new guided units. Existing lesson IDs and saved results stay intact. */
(() => {
  'use strict';
  const lessons = [
    {
      title: 'Имя, профессия и адрес',
      words: ['hív', 'cím', 'utca', 'város', 'lakik', 'diák', 'tanár', 'én', 'te', 'budapesti'],
      supplemental: [["hív","звать; называть","Hogy hívnak?","Как тебя зовут?"],["cím","адрес","Mi a címed?","Какой у тебя адрес?"]],
      extra: [
        ['név', 'имя; название', 'Mi a neved?', 'Как тебя зовут? (Буквально: «Какое твоё имя?»)'],
        ['nevem', 'моё имя', 'A nevem Anna.', 'Меня зовут Анна.'],
        ['Hogy hívnak?', 'Как тебя зовут?', 'Szia! Hogy hívnak?', 'Привет! Как тебя зовут?'],
        ['lakom', 'я живу', 'Budapesten lakom.', 'Я живу в Будапеште.'],
        ['laksz', 'ты живёшь', 'Hol laksz?', 'Где ты живёшь?'],
        ['Budapesten', 'в Будапеште', 'Budapesten lakom.', 'Я живу в Будапеште.']
      ],
      grammar: [
        'Как представиться: nevem, vagyok, lakom — Bemutatkozás',
        'A nevem Anna. — «Меня зовут Анна» (буквально «Моё имя — Анна»). Слово név («имя») в форме nevem («моё имя») меняет долгую é на короткую e. Сравните: Mi a neved? — «Как тебя зовут?»; Hogy hívnak? — обычный разговорный вопрос с тем же значением. В третьем лице, когда мы говорим, кто человек, глагол «быть» в настоящем времени обычно отсутствует: Péter tanár. — «Петер — учитель». Но с «я» и «ты» он нужен: Diák vagyok. — «Я ученик / студент»; Tanár vagy. — «Ты учитель». Место жительства спрашиваем Hol laksz? и отвечаем Budapesten lakom. Здесь -sz означает «ты», а -om — «я» в формах глагола lakik. Название города Budapesten пока запоминаем как готовую форму; другие названия получают разные местные окончания. Настоящий домашний адрес для учебного задания сообщать не нужно.',
        'Hogy hívnak? — A nevem Anna. / Hol laksz? — Budapesten lakom. / Diák vagyok.'
      ],
      dialogue: [
        'Szia! Hogy hívnak?',
        'Péter vagyok. És te?',
        'Anna vagyok. Hol laksz?',
        'Budapesten lakom.'
      ],
      composition: [
        'Рассказываю о себе',
        'Напишите четыре разных коротких предложения: как вас зовут, где вы живёте, кто вы по профессии или учёбе, и один вопрос собеседнику. Можно использовать вымышленные данные; настоящий адрес не требуется.',
        'A nevem Anna. / Budapesten lakom. / Diák vagyok. / Hol laksz?'
      ],
      min: 4,
      reading: {
        lines: [
          ['A nevem Anna.', 'Меня зовут Анна.'],
          ['Diák vagyok.', 'Я студентка.'],
          ['Budapesten lakom.', 'Я живу в Будапеште.'],
          ['Péter tanár.', 'Петер — учитель.']
        ],
        q: 'Кем является Анна?',
        options: ['Студенткой.', 'Учительницей.', 'Врачом.'],
        answer: 0
      },
      preparation: [
        ['Hogy hívnak?', 'Как тебя зовут?', 'Разговорная формула. Нельзя переводить hívnak здесь по отдельным словам.'],
        ['A nevem Anna.', 'Меня зовут Анна.', 'név → nevem: «моё имя»; в третьем лице связку «есть» не ставим.'],
        ['Diák vagyok.', 'Я ученик / ученица, студент / студентка.', 'vagyok — форма «я есть»; в русском настоящем времени связка обычно отсутствует.'],
        ['Hol laksz?', 'Где ты живёшь?', 'Hol — где; laksz — ты живёшь.'],
        ['Budapesten lakom.', 'Я живу в Будапеште.', 'lakom — я живу; Budapesten — в Будапеште.']
      ],
      grammarTable: [
        ['A nevem Anna.', 'Меня зовут Анна.', 'név → nevem: моё имя'],
        ['Mi a neved?', 'Как тебя зовут?', 'név → neved: твоё имя'],
        ['Diák vagyok.', 'Я студент / студентка.', 'én → vagyok'],
        ['Tanár vagy.', 'Ты учитель.', 'te → vagy'],
        ['Hol laksz? — Budapesten lakom.', 'Где ты живёшь? — В Будапеште.', 'lakik → laksz / lakom']
      ]
    },
    {
      title: 'Страны и языки',
      words: ['Magyarország', 'Franciaország', 'Németország', 'Olaszország', 'ország', 'nyelv', 'magyar', 'angol', 'francia', 'német', 'beszél'],
      extra: [
        ['Oroszország', 'Россия', 'Ez Oroszország.', 'Это Россия.'],
        ['orosz', 'русский; русская', 'Anna orosz.', 'Анна — русская.'],
        ['magyarul', 'по-венгерски', 'Magyarul beszélek.', 'Я говорю по-венгерски.'],
        ['oroszul', 'по-русски', 'Oroszul beszélek.', 'Я говорю по-русски.'],
        ['angolul', 'по-английски', 'Angolul beszélsz?', 'Ты говоришь по-английски?'],
        ['németül', 'по-немецки', 'Péter németül beszél.', 'Петер говорит по-немецки.'],
        ['franciául', 'по-французски', 'Anna franciául beszél.', 'Анна говорит по-французски.'],
        ['beszélek', 'я говорю', 'Magyarul beszélek.', 'Я говорю по-венгерски.'],
        ['beszélsz', 'ты говоришь', 'Beszélsz magyarul?', 'Ты говоришь по-венгерски?']
      ],
      grammar: [
        'Национальность и язык: magyar — magyarul',
        'Различайте страну, национальность и язык: Magyarország — «Венгрия», magyar — «венгр / венгерка» или «венгерский», magyarul — «по-венгерски». Так же: orosz → oroszul (по-русски), angol → angolul (по-английски), német → németül (по-немецки), francia → franciául (по-французски). Название языка в ответе на вопрос «На каком языке?» обычно имеет окончание -ul/-ül, но конкретные формы надо запомнить; нельзя механически приписывать -ul ко всем названиям. Сравните: Anna orosz. — «Анна — русская» и Anna oroszul beszél. — «Анна говорит по-русски». Я говорю — beszélek, ты говоришь — beszélsz, он/она говорит — beszél. Вопрос Beszélsz magyarul? — «Ты говоришь по-венгерски?»; короткий ответ Igen, egy kicsit. — «Да, немного».',
        'Ő magyar. / Magyarul beszélek. / Beszélsz oroszul? — Igen, egy kicsit.'
      ],
      dialogue: [
        'Szia! Magyar vagy?',
        'Igen, magyar vagyok.',
        'Beszélsz oroszul?',
        'Igen, egy kicsit. És te?',
        'Orosz vagyok. Magyarul beszélek.'
      ],
      composition: [
        'На каких языках мы говорим?',
        'Напишите четыре короткие фразы о стране, национальности или языках: два утверждения о себе и два о другом человеке. Можно придумать персонажей.',
        'Magyar vagyok. / Magyarul beszélek. / Anna orosz. / Péter németül beszél.'
      ],
      min: 4,
      reading: {
        lines: [
          ['Anna orosz.', 'Анна — русская.'],
          ['Magyarul beszél.', 'Она говорит по-венгерски.'],
          ['Péter magyar.', 'Петер — венгр.'],
          ['Oroszul beszél.', 'Он говорит по-русски.']
        ],
        q: 'На каком языке говорит Петер?',
        options: ['По-русски.', 'По-французски.', 'По-немецки.'],
        answer: 0
      },
      preparation: [
        ['Ez Magyarország.', 'Это Венгрия.', 'Magyarország — название страны.'],
        ['Anna orosz.', 'Анна — русская.', 'Orosz — национальность. Глагол «есть» в третьем лице не добавляем.'],
        ['Magyarul beszélek.', 'Я говорю по-венгерски.', 'Magyar → magyarul: название языка в значении «по-венгерски».'],
        ['Beszélsz oroszul?', 'Ты говоришь по-русски?', 'Beszélsz — говоришь (ты); oroszul — по-русски.'],
        ['Péter németül beszél.', 'Петер говорит по-немецки.', 'Német → németül: используем -ül; beszél — говорит.']
      ],
      grammarTable: [
        ['Magyarország · magyar · magyarul', 'Венгрия · венгр / венгерка · по-венгерски', 'magyar → magyarul'],
        ['Oroszország · orosz · oroszul', 'Россия · русский / русская · по-русски', 'orosz → oroszul'],
        ['angol → angolul', 'английский → по-английски', '-ul'],
        ['német → németül', 'немецкий → по-немецки', '-ül'],
        ['francia → franciául', 'французский → по-французски', 'Дополнительная á в форме franciául'],
        ['beszélek · beszélsz · beszél', 'я говорю · ты говоришь · он/она говорит', 'én · te · ő']
      ]
    },
    {
      title: 'Считаем от одного до десяти',
      words: ['egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc', 'tíz', 'szám', 'alma', 'szék'],
      examples: {szék: ['Ez egy szék.', 'Это стул.']},
      extra: [
        ['egy', 'один; одна; одно', 'Egy alma van itt.', 'Здесь одно яблоко.'],
        ['kettő', 'два (самостоятельная форма)', 'Egy, kettő, három!', 'Раз, два, три!'],
        ['három', 'три', 'Három szék van itt.', 'Здесь три стула.'],
        ['négy', 'четыре', 'Négy alma van itt.', 'Здесь четыре яблока.'],
        ['öt', 'пять', 'Öt diák tanul.', 'Пять учеников учатся.'],
        ['hat', 'шесть', 'Hat szék van itt.', 'Здесь шесть стульев.'],
        ['hét', 'семь (также «неделя» в другом контексте)', 'Hét nap van egy héten.', 'В неделе семь дней.'],
        ['nyolc', 'восемь', 'Nyolc alma van itt.', 'Здесь восемь яблок.'],
        ['kilenc', 'девять', 'Kilenc diák tanul.', 'Девять учеников учатся.'],
        ['tíz', 'десять', 'Tíz szék van itt.', 'Здесь десять стульев.'],
        ['két', 'два (перед существительным)', 'Két alma van itt.', 'Здесь два яблока.'],
        ['Hány?', 'сколько?', 'Hány alma van itt?', 'Сколько здесь яблок?']
      ],
      grammar: [
        'Числа 1–10: kettő или két? — Számnevek',
        'Учимся считать: egy, kettő, három, négy, öt, hat, hét, nyolc, kilenc, tíz. Важнейшее правило: самостоятельно «два» — kettő (например, в счёте), но перед существительным обычно употребляется két: két alma — «два яблока». После числительного венгерское существительное остаётся в форме единственного числа: három szék (буквально «три стул»), а не *három székek. Поэтому скажем Három szék van itt. — «Здесь три стула». Вопрос «Сколько?» — Hány?: Hány alma van itt? — «Сколько здесь яблок?» Число egy перед существительным также бывает неопределённым артиклем: egy alma — «одно яблоко / какое-то яблоко». У слова hét есть два значения, различимые по контексту: «семь» и «неделя».',
        'Egy, kettő, három! / Két alma van itt. / Hány szék van itt? — Három szék.'
      ],
      dialogue: [
        'Hány alma van itt?',
        'Két alma van itt.',
        'És hány szék?',
        'Három szék van itt.'
      ],
      composition: [
        'Сколько предметов вокруг?',
        'Напишите четыре разных простых предложения с числами от одного до десяти. После числа используйте существительное в единственном числе.',
        'Két alma van itt. / Három szék van itt. / Öt diák tanul. / Tíz szék van itt.'
      ],
      min: 4,
      reading: {
        lines: [
          ['Ez egy szoba.', 'Это комната.'],
          ['Három szék van itt.', 'Здесь три стула.'],
          ['Két alma van az asztalon.', 'На столе два яблока.'],
          ['Öt diák van a szobában.', 'В комнате пять учеников.']
        ],
        q: 'Сколько стульев в комнате?',
        options: ['Три.', 'Два.', 'Пять.'],
        answer: 0
      },
      preparation: [
        ['Egy, kettő, három!', 'Раз, два, три!', 'Kettő — самостоятельная форма «два» при счёте.'],
        ['Hány alma van itt?', 'Сколько здесь яблок?', 'Hány? — сколько? После него обычно употребляется единственное число.'],
        ['Két alma van itt.', 'Здесь два яблока.', 'Перед существительным kettő обычно превращается в két.'],
        ['Három szék van itt.', 'Здесь три стула.', 'Szék, а не székek: после числительных существительное стоит в единственном числе.']
      ],
      grammarTable: [
        ['egy alma', 'одно яблоко', 'egy + существительное ед. ч.'],
        ['kettő — két alma', 'два — два яблока', 'kettő отдельно, két перед существительным'],
        ['három szék', 'три стула', 'Не *három székek'],
        ['hét nap', 'семь дней', 'hét = семь; szék/nap в ед. ч.'],
        ['Hány diák van itt?', 'Сколько здесь учеников?', 'hány + существительное ед. ч.']
      ]
    },
    {
      title: 'Числа 11–20 и рассказ о себе',
      words: ['tizenegy', 'tizenkettő', 'tizenhárom', 'tizennégy', 'tizenöt', 'tizenhat', 'tizenhét', 'tizennyolc', 'tizenkilenc', 'húsz', 'éves', 'lakik', 'diák', 'magyar', 'beszél'],
      extra: [
        ['tizenegy', 'одиннадцать', 'Tizenegy diák van itt.', 'Здесь одиннадцать учеников.'],
        ['tizenkettő', 'двенадцать (самостоятельная форма)', 'Hány diák? Tizenkettő.', 'Сколько учеников? Двенадцать.'],
        ['tizenhárom', 'тринадцать', 'Tizenhárom szék van itt.', 'Здесь тринадцать стульев.'],
        ['tizennégy', 'четырнадцать', 'Tizennégy diák tanul.', 'Четырнадцать учеников учатся.'],
        ['tizenöt', 'пятнадцать', 'Tizenöt alma van itt.', 'Здесь пятнадцать яблок.'],
        ['tizenhat', 'шестнадцать', 'Tizenhat szék van itt.', 'Здесь шестнадцать стульев.'],
        ['tizenhét', 'семнадцать', 'Tizenhét diák tanul.', 'Семнадцать учеников учатся.'],
        ['tizennyolc', 'восемнадцать', 'Tizennyolc szék van itt.', 'Здесь восемнадцать стульев.'],
        ['tizenkilenc', 'девятнадцать', 'Tizenkilenc alma van itt.', 'Здесь девятнадцать яблок.'],
        ['húsz', 'двадцать', 'Húsz perc.', 'Двадцать минут.'],
        ['tizenkét', 'двенадцать (перед существительным)', 'Tizenkét diák van itt.', 'Здесь двенадцать учеников.'],
        ['Hány éves vagy?', 'Сколько тебе лет?', 'Hány éves vagy?', 'Сколько тебе лет?'],
        ['vagyok', 'я есть; я являюсь', '18 éves vagyok.', 'Мне восемнадцать лет.']
      ],
      grammar: [
        'Числа 11–20 и возраст: Hány éves vagy?',
        'Числа 11–19 образуют последовательность tizenegy, tizenkettő, tizenhárom, tizennégy, tizenöt, tizenhat, tizenhét, tizennyolc, tizenkilenc. Двадцать — húsz. Сравните две формы числа 12: самостоятельное tizenkettő, но перед существительным обычно tizenkét: tizenkét diák — «двенадцать учеников». Спрашивая возраст, говорим Hány éves vagy? — «Сколько тебе лет?» и отвечаем 18 éves vagyok. — «Мне 18 лет». В венгерском здесь используется глагол «быть», а не конструкция «мне ... лет»: vagyok (я), vagy (ты). О другом человеке: Anna 18 éves. — «Анне 18 лет»; в третьем лице настоящего времени связка обычно отсутствует. С числами по-прежнему используем существительное в единственном числе. Повторяем представление: A nevem Anna. Budapesten lakom. Magyarul beszélek.',
        'Hány éves vagy? — 18 éves vagyok. / Anna 18 éves. / Tizenkét diák tanul.'
      ],
      dialogue: [
        'Szia! Hány éves vagy?',
        '20 éves vagyok. És te?',
        '18 éves vagyok. Hol laksz?',
        'Budapesten lakom.',
        'Beszélsz oroszul?',
        'Igen, egy kicsit.'
      ],
      composition: [
        'Моя короткая анкета',
        'Напишите пять разных коротких предложений: имя, возраст, место жительства, язык и один вопрос новому знакомому. Данные разрешается придумать.',
        'A nevem Anna. / 18 éves vagyok. / Budapesten lakom. / Magyarul beszélek. / Hány éves vagy?'
      ],
      min: 5,
      reading: {
        lines: [
          ['Anna 18 éves.', 'Анне восемнадцать лет.'],
          ['Budapesten lakik.', 'Она живёт в Будапеште.'],
          ['Magyarul tanul.', 'Она изучает венгерский язык.'],
          ['Péter 20 éves.', 'Петеру двадцать лет.'],
          ['Péter tanár.', 'Петер — учитель.'],
          ['Oroszul beszél.', 'Он говорит по-русски.']
        ],
        q: 'Сколько лет Анне?',
        options: ['18 лет.', '20 лет.', '12 лет.'],
        answer: 0
      },
      preparation: [
        ['Hány éves vagy?', 'Сколько тебе лет?', 'Hány — сколько; éves — летний / в возрасте ... лет; vagy — ты есть.'],
        ['18 éves vagyok.', 'Мне 18 лет.', 'По-венгерски: «Я являюсь 18-летним». Здесь vagyok, а не vagy.'],
        ['Anna 18 éves.', 'Анне 18 лет.', 'В третьем лице настоящего времени нет отдельного van в этой конструкции.'],
        ['Tizenkét diák tanul.', 'Двенадцать учеников учатся.', 'Перед существительным употребляется tizenkét, а не tizenkettő.'],
        ['A nevem Anna.', 'Меня зовут Анна.', 'Повторение урока 9: nevem — моё имя.'],
        ['Magyarul beszélek.', 'Я говорю по-венгерски.', 'Повторение урока 10: magyarul — по-венгерски; beszélek — я говорю.']
      ],
      grammarTable: [
        ['tizenegy · tizenkettő · tizenhárom', '11 · 12 · 13', 'tizen- + числительное'],
        ['tizennégy · tizenöt · tizenhat', '14 · 15 · 16', 'tizen- + числительное'],
        ['tizenhét · tizennyolc · tizenkilenc · húsz', '17 · 18 · 19 · 20', 'húsz = двадцать'],
        ['tizenkettő — tizenkét diák', 'двенадцать — двенадцать учеников', 'Перед существительным: tizenkét'],
        ['18 éves vagyok.', 'Мне 18 лет.', 'én → vagyok'],
        ['Anna 18 éves.', 'Анне 18 лет.', 'ő → без связки в настоящем времени']
      ]
    }
  ];

  const dialogueTranslations = {
    'Имя, профессия и адрес': [
      'Привет! Как тебя зовут?',
      'Я Петер. А ты?',
      'Я Анна. Где ты живёшь?',
      'Я живу в Будапеште.'
    ],
    'Страны и языки': [
      'Привет! Ты венгр / венгерка?',
      'Да, я венгр.',
      'Ты говоришь по-русски?',
      'Да, немного. А ты?',
      'Я русская. Я говорю по-венгерски.'
    ],
    'Считаем от одного до десяти': [
      'Сколько здесь яблок?',
      'Здесь два яблока.',
      'А сколько стульев?',
      'Здесь три стула.'
    ],
    'Числа 11–20 и рассказ о себе': [
      'Привет! Сколько тебе лет?',
      'Мне 20 лет. А тебе?',
      'Мне 18 лет. Где ты живёшь?',
      'Я живу в Будапеште.',
      'Ты говоришь по-русски?',
      'Да, немного.'
    ]
  };

  const checks = {
    'A1:8': {
      q: 'Как сказать «Я живу в Будапеште»?',
      a: ['Budapesten lakom.', 'Budapesten laksz.', 'Budapesten lakik.'],
      ok: 0,
      why: 'Lakom — «я живу»; laksz — «ты живёшь»; lakik — «он/она живёт». Budapesten — «в Будапеште».'
    },
    'A1:9': {
      q: 'Как сказать «Я говорю по-русски»?',
      a: ['Oroszul beszélek.', 'Orosz vagyok.', 'Oroszul beszélsz.'],
      ok: 0,
      why: 'Oroszul — «по-русски», beszélek — «я говорю». Orosz vagyok означает национальность, а beszélsz — «ты говоришь».'
    },
    'A1:10': {
      q: 'Как правильно сказать «три яблока»?',
      a: ['Három alma.', 'Három almák.', 'Két alma.'],
      ok: 0,
      why: 'После числительного существительное обычно стоит в единственном числе: három alma. Almák — множественное число, két — «два».'
    },
    'A1:11': {
      q: 'Как спросить «Сколько тебе лет?»?',
      a: ['Hány éves vagy?', 'Hol laksz?', 'Hogy hívnak?'],
      ok: 0,
      why: 'Hány éves vagy? — возраст; Hol laksz? — место жительства; Hogy hívnak? — имя.'
    }
  };

  const visuals = [
    {icon: '🪪', title: 'Я могу представиться', subtitle: 'Имя, профессия и место жительства', cards: [['🗣️', 'A nevem Anna.', 'Меня зовут Анна.'], ['🎓', 'Diák vagyok.', 'Я студент / студентка.'], ['🏙️', 'Budapesten lakom.', 'Я живу в Будапеште.']]},
    {icon: '🌍', title: 'Языки мира', subtitle: 'Страна, национальность, язык', cards: [['🇭🇺', 'magyarul', 'по-венгерски'], ['🇷🇺', 'oroszul', 'по-русски'], ['💬', 'Beszélsz magyarul?', 'Ты говоришь по-венгерски?']]},
    {icon: '🔢', title: 'Сколько предметов?', subtitle: 'Числа 1–10 и правило единственного числа', cards: [['1️⃣', 'egy', 'один'], ['2️⃣', 'kettő → két', 'два → два (перед словом)'], ['3️⃣', 'három alma', 'три яблока']]},
    {icon: '🎂', title: 'Возраст и знакомство', subtitle: 'Числа 11–20 в живом разговоре', cards: [['🔢', 'tizenkettő', 'двенадцать'], ['🎂', '18 éves vagyok.', 'Мне 18 лет.'], ['👋', 'Hány éves vagy?', 'Сколько тебе лет?']]}
  ];

  window.TanmuhelyA1Continuation = {lessons, dialogueTranslations, checks, visuals};
})();
