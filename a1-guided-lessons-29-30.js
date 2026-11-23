/* A1 lessons 29–30: finding transport and describing simple discomfort.
   Append only: historical A1:0–27 and all A2 learning keys are unchanged. */
(() => {
 'use strict';
 const lessons=[
  {
   title:'На улице: где остановка?',
   // Eight new core items and two previously learnt review words. Five further
   // transport words appear as optional cards after the ten taught core cards.
   words:['buszmegálló','jobbra','balra','közel','messze','gyalog','busz','jegy','bolt','van'],
   examples:{
    buszmegálló:['Hol van a buszmegálló?','Где автобусная остановка?'],
    busz:['Ez egy busz.','Это автобус.'],
    villamos:['Ez egy villamos.','Это трамвай.'],
    vonat:['Ez egy vonat.','Это поезд.'],
    jegy:['Kérek egy jegyet.','Мне один билет, пожалуйста.'],
    buszjegy:['Buszjegyet kérek.','Мне билет на автобус, пожалуйста.'],
    gyalog:['Gyalog megyek.','Я иду пешком.'],
    balra:['A buszmegálló balra van.','Автобусная остановка слева.'],
    jobbra:['A buszmegálló jobbra van.','Автобусная остановка справа.'],
    közel:['A buszmegálló közel van.','Автобусная остановка находится недалеко.'],
    egyenesen:['Egyenesen megyek.','Я иду прямо.'],
    állomás:['Az állomás közel van.','Станция находится недалеко.'],
    messze:['Az állomás messze van.','Станция находится далеко.'],
    bolt:['A bolt közel van.','Магазин находится недалеко.'],
    van:['A buszmegálló jobbra van.','Автобусная остановка справа.']
   },
   extra:[
    ['Elnézést!','Извините!','Elnézést! Hol van a buszmegálló?','Извините! Где автобусная остановка?'],
    ['Messze van?','Это далеко?','Messze van a buszmegálló?','Автобусная остановка далеко?'],
    ['Hol van a buszmegálló?','Где автобусная остановка?','Hol van a buszmegálló?','Где автобусная остановка?'],
    ['Buszjegyet kérek.','Мне билет на автобус, пожалуйста.','Buszjegyet kérek.','Мне билет на автобус, пожалуйста.'],
    ['villamos','трамвай','Ez egy villamos.','Это трамвай.'],
    ['vonat','поезд','Ez egy vonat.','Это поезд.'],
    ['buszjegy','автобусный билет','Buszjegyet kérek.','Мне билет на автобус, пожалуйста.'],
    ['egyenesen','прямо','Egyenesen megyek.','Я иду прямо.'],
    ['állomás','станция','Az állomás közel van.','Станция находится недалеко.']
   ],
   grammar:[
    'Узнаём дорогу: hol? balra / jobbra / közel',
    'Мы уже знаем вопрос Hol van ...? — «Где находится ...?». Теперь учимся находить остановку. Hol van a buszmegálló? — «Где автобусная остановка?». A buszmegálló jobbra van. — «Автобусная остановка справа». Balra — «налево / слева»; jobbra — «направо / справа». В ответе о местонахождении: balra van, jobbra van. Egyenesen — «прямо»: Egyenesen megyek. — «Я иду прямо». Közel van — «находится недалеко»; messze van — «находится далеко». Не путайте közel («близко») и messze («далеко»). Gyalog — «пешком»: Gyalog megyek. — «Я иду пешком». Busz — автобус, villamos — трамвай, vonat — поезд. Buszmegálló — автобусная остановка, állomás — станция. Перед гласным звуком нужен артикль az: az állomás; перед согласным — a: a busz. Jegy — «билет», buszjegy — «билет на автобус». При просьбе о билете используется уже знакомый винительный падеж: jegy → jegyet, buszjegy → buszjegyet. Buszjegyet kérek. — «Мне билет на автобус, пожалуйста». Для первого разговора достаточно простых вопросов и ответов; форму повелительного наклонения пока не изучаем.',
    'Hol van a buszmegálló? — Jobbra van. / Messze van? — Nem, közel van. / Buszjegyet kérek.'
   ],
   dialogue:[
    'Elnézést! Hol van a buszmegálló?',
    'A buszmegálló jobbra van.',
    'Messze van?',
    'Nem, közel van.',
    'Gyalog megyek.',
    'Rendben.'
   ],
   composition:[
    'Мой простой маршрут',
    'Напишите пять разных коротких предложений по пройденным образцам: один вопрос о местонахождении, два указания места, одно предложение о пешем пути и одну просьбу о билете. Можно придумать ситуацию.',
    'Hol van a buszmegálló? / A buszmegálló jobbra van. / Az állomás közel van. / Gyalog megyek. / Buszjegyet kérek.'
   ],
   min:5,
   reading:{
    lines:[
     ['Ez egy busz.','Это автобус.'],
     ['Ez egy villamos.','Это трамвай.'],
     ['Ez egy vonat.','Это поезд.'],
     ['A buszmegálló jobbra van.','Автобусная остановка справа.'],
     ['A buszmegálló közel van.','Автобусная остановка находится недалеко.'],
     ['Anna gyalog megy.','Анна идёт пешком.']
    ],
    q:'Где находится автобусная остановка?',
    options:['Справа.','Слева.','Далеко.'],answer:0
   },
   preparation:[
    ['Hol van a buszmegálló?','Где автобусная остановка?','Hol — где; buszmegálló — автобусная остановка.'],
    ['A buszmegálló jobbra van.','Остановка справа.','Jobbra — справа или направо; van — находится.'],
    ['A buszmegálló balra van.','Остановка слева.','Balra — слева или налево; не путайте с jobbra.'],
    ['Messze van?','Это далеко?','Messze — далеко. Можно ответить: Nem, közel van.'],
    ['Gyalog megyek.','Я иду пешком.','Gyalog — пешком; megyek — я иду.'],
    ['Buszjegyet kérek.','Мне билет на автобус, пожалуйста.','Buszjegy → buszjegyet: винительный падеж с соединительным e.']
   ],
   grammarTable:[
    ['Hol van a buszmegálló?','Где автобусная остановка?','hol? — где?'],
    ['A buszmegálló jobbra van.','Автобусная остановка справа.','jobbra — справа / направо'],
    ['A buszmegálló balra van.','Автобусная остановка слева.','balra — слева / налево'],
    ['Egyenesen megyek.','Я иду прямо.','egyenesen — прямо'],
    ['Közel van.','Это недалеко.','közel — близко'],
    ['Messze van.','Это далеко.','messze — далеко'],
    ['Gyalog megyek.','Я иду пешком.','gyalog — пешком'],
    ['Jegy → jegyet','билет → билет (винительный падеж)','-et после согласного в этом слове']
   ]
  },
  {
   title:'Как самочувствие? Fáj a fejem.',
   // Eight new core items and two familiar review words; other health
   // expressions stay available as optional reading/speaking references.
   words:['beteg','fáj','fáj a fejem','fáj a torkom','fáradt','gyógyszertár','nem értem','időpont','orvos','nem'],
   examples:{
    beteg:['Péter beteg.','Петер болен.'],
    fáj:['Fáj a fejem.','У меня болит голова.'],
    fej:['A fejem fáj.','У меня болит голова.'],
    'fáj a fejem':['Fáj a fejem.','У меня болит голова.'],
    'fáj a torkom':['Fáj a torkom.','У меня болит горло.'],
    fáradt:['Anna fáradt.','Анна устала.'],
    gyógyszertár:['Hol van a gyógyszertár?','Где аптека?'],
    gyógyszer:['Ez egy gyógyszer.','Это лекарство.'],
    segítség:['Segítség!','Помогите!'],
    'nem értem':['Nem értem.','Я не понимаю.'],
    időpont:['Időpontot kérek.','Я хотел(а) бы записаться на приём.'],
    'időpontot kér':['Időpontot kérek.','Я хочу записаться на приём.'],
    orvos:['Ez egy orvos.','Это врач.'],
    nem:['Nem vagyok jól.','Мне нехорошо.']
   },
   senses:{'fáj':['болит','Fáj a fejem.','У меня болит голова.']},
   extra:[
    ['Nem vagyok jól.','Мне нехорошо.','Nem vagyok jól.','Мне нехорошо.'],
    ['beteg','больной; болен','Péter beteg.','Петер болен.'],
    ['fáj','болит','Fáj a fejem.','У меня болит голова.'],
    ['fáj a fejem','у меня болит голова','Fáj a fejem.','У меня болит голова.'],
    ['fáj a torkom','у меня болит горло','Fáj a torkom.','У меня болит горло.'],
    ['Mi a baj?','Что случилось? В чём дело?','Mi a baj?','Что случилось?'],
    ['Beteg vagyok.','Я болен / больна.','Beteg vagyok.','Я болен / больна.'],
    ['fej','голова','A fejem fáj.','У меня болит голова.'],
    ['gyógyszer','лекарство','Ez egy gyógyszer.','Это лекарство.'],
    ['gyógyszertár','аптека','Hol van a gyógyszertár?','Где аптека?'],
    ['nem értem','я не понимаю','Nem értem.','Я не понимаю.'],
    ['időpont','назначенное время','Időpontot kérek.','Я хотел(а) бы записаться на приём.'],
    ['segítség','помощь','Segítség!','Помогите!'],
    ['időpontot kér','записывается на приём','Időpontot kérek.','Я хочу записаться на приём.']
   ],
   grammar:[
    'Самочувствие: beteg vagyok и fáj a fejem',
    'Когда вас спрашивают Hogy vagy? — «Как дела? Как себя чувствуешь?», можно ответить Jól vagyok. — «Я чувствую себя хорошо» или Nem vagyok jól. — «Мне нехорошо». Beteg vagyok. — «Я болен / больна»; Anna beteg. — «Анна больна». В третьем лице с существительным или прилагательным в настоящем времени связка van обычно отсутствует: Péter beteg., но для местонахождения она нужна: A gyógyszertár közel van. — «Аптека недалеко». Фраза Fáj a fejem. означает «У меня болит голова»; буквально «Болит моя голова». Fej — «голова», fejem — «моя голова», суффикс -em обозначает принадлежность. Fáj a torkom. — «У меня болит горло». Torok — «горло»; в форме torkom один гласный o исчезает: torok → torkom. Форма fáj здесь третьего лица единственного числа: болит голова или горло; это не форма «я болею». Gyógyszertár — аптека, gyógyszer — лекарство, segítség — помощь. Nem értem. — «Я не понимаю», когда вам нужно повторное объяснение. Időpont — назначенное время; Időpontot kérek. — «Я хотел(а) бы записаться на приём». На этом этапе изучаем только простые фразы о самочувствии и просьбы о помощи: это языковая практика, а не медицинский совет.',
    'Jól vagyok. — Nem vagyok jól. / Beteg vagyok. — Péter beteg. / Fáj a fejem. — Fáj a torkom.'
   ],
   dialogue:[
    'Szia! Hogy vagy?',
    'Nem vagyok jól.',
    'Mi a baj?',
    'Fáj a fejem.',
    'Hol van a gyógyszertár?',
    'A gyógyszertár közel van.'
   ],
   composition:[
    'Пять фраз о самочувствии',
    'Напишите пять разных коротких предложений о вымышленных людях и самочувствии по пройденным образцам. Не нужно сообщать настоящие медицинские сведения.',
    'Anna fáradt. / Péter beteg. / Nem vagyok jól. / Fáj a fejem. / A gyógyszertár közel van.'
   ],
   min:5,
   reading:{
    lines:[
     ['Anna fáradt.','Анна устала.'],
     ['Péter beteg.','Петер болен.'],
     ['Nem vagyok jól.','Мне нехорошо.'],
     ['Fáj a fejem.','У меня болит голова.'],
     ['Fáj a torkom.','У меня болит горло.'],
     ['A gyógyszertár közel van.','Аптека находится недалеко.']
    ],
    q:'Кто болен?',options:['Петер.','Анна.','Никто.'],answer:0
   },
   preparation:[
    ['Szia! Hogy vagy?','Привет! Как дела?','Знакомый вопрос о самочувствии из первых уроков.'],
    ['Nem vagyok jól.','Мне нехорошо.','Nem — отрицание; jól — хорошо; vagyok — я (есть).'],
    ['Mi a baj?','Что случилось?','Готовый вопрос о проблеме или самочувствии.'],
    ['Fáj a fejem.','У меня болит голова.','Fej → fejem: «моя голова»; fáj — болит.'],
    ['Fáj a torkom.','У меня болит горло.','Torok → torkom: «моё горло», выпадает одна o.'],
    ['Hol van a gyógyszertár?','Где аптека?','Gyógyszertár — аптека; hol van? — где находится?']
   ],
   grammarTable:[
    ['Jól vagyok.','Я чувствую себя хорошо.','jól — хорошо'],
    ['Nem vagyok jól.','Мне нехорошо.','nem — отрицание'],
    ['Beteg vagyok.','Я болен / больна.','én → vagyok'],
    ['Péter beteg.','Петер болен.','в третьем лице связка отсутствует'],
    ['Fáj a fejem.','У меня болит голова.','fej → fejem: моя голова'],
    ['Fáj a torkom.','У меня болит горло.','torok → torkom: моё горло'],
    ['Hol van a gyógyszertár?','Где аптека?','hol van? — где находится?'],
    ['Időpontot kérek.','Я хотел(а) бы записаться на приём.','időpont → időpontot: объект просьбы']
   ]
  }
 ];
 const dialogueTranslations={
  'На улице: где остановка?':[
   'Извините! Где автобусная остановка?',
   'Автобусная остановка справа.',
   'Это далеко?',
   'Нет, недалеко.',
   'Я иду пешком.',
   'Хорошо.'
  ],
  'Как самочувствие? Fáj a fejem.':[
   'Привет! Как дела?',
   'Мне нехорошо.',
   'Что случилось?',
   'У меня болит голова.',
   'Где аптека?',
   'Аптека находится недалеко.'
  ]
 };
 const checks={
  'A1:28':{
   q:'Как спросить «Где автобусная остановка?»',
   a:['Hol van a buszmegálló?','Hány buszmegálló van?','Ki van a buszmegállóban?'],ok:0,
   why:'Hol van ...? означает «Где находится ...?». Buszmegálló — автобусная остановка. Hány? спрашивает о количестве, Ki? — о человеке, поэтому другие ответы не подходят.'
  },
  'A1:29':{
   q:'Как сказать «У меня болит голова»?',
   a:['Fáj a fejem.','Fáj a fej.','Én fáj a fejem.'],ok:0,
   why:'Fáj a fejem. — правильная готовая фраза. Fej → fejem означает «моя голова», а fáj уже относится к голове в третьем лице; лишнее én и форма без -em здесь неверны.'
  }
 };
 const visuals=[
  {icon:'🚌',title:'Ищем остановку',subtitle:'Где? Справа? Пешком?',cards:[['🚌','buszmegálló','автобусная остановка'],['➡️','jobbra','справа / направо'],['🚶','gyalog','пешком']]},
  {icon:'🩺',title:'Как себя чувствуем?',subtitle:'Простые фразы, чтобы сообщить о самочувствии',cards:[['🙂','Nem vagyok jól.','Мне нехорошо.'],['💬','Fáj a fejem.','У меня болит голова.'],['🏥','gyógyszertár','аптека']]}
 ];
 window.TanmuhelyA1Units29to30={lessons,dialogueTranslations,checks,visuals};
})();
