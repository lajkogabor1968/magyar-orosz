/* Подробная русская обратная связь к 40 исходным заданиям A1–A2.
   Соответствие по неизменным названиям тем и индексам вопросов.
   Не меняет ключи, последовательность, оценки и ранее сохранённые результаты. */
(() => {
  'use strict';
  const notes = {
    'A magyar magánhangzók': [
      'kór означает «болезнь», а kor — «возраст». Долгая гласная ó меняет значение слова.',
      'ő — долгий гласный звук, ö — краткий. Знак двойного ударения показывает долготу.',
      'В слове víz («вода») пишется долгая í; написание viz неверно.',
      'В венгерских словах ударение обычно падает на первый слог.',
      'Пара ü–ű состоит из краткого и долгого гласного. Это разные буквы.'
    ],
    'A létige: vagyok, vagy, van': [
      'С местоимением én («я») глагол lenni принимает форму vagyok: Én otthon vagyok — «Я дома».',
      'После te («ты») используется vagy: Te diák vagy — «Ты ученик».',
      'В настоящем времени перед существительным-профессией в 3-м лице единственного числа глагол-связка опускается: Ő orvos — «Он/она врач».',
      'После mi («мы») нужна форма vagyunk: Mi otthon vagyunk — «Мы дома».',
      'Подлежащее A könyvek («книги») стоит во множественном числе, поэтому нужна форма vannak: A könyvek az asztalon vannak.'
    ],
    'Határozatlan igeragozás – jelen idő': [
      'С én («я») глагол beszél в неопределённом спряжении имеет форму beszélek: Én magyarul beszélek.',
      'Со вторым лицом te («ты») глагол olvas имеет форму olvasol: Te sokat olvasol.',
      'С mi («мы») используется окончание -unk: Mi ma otthon tanulunk.',
      'С ő («он/она») в настоящем времени используется форма főz без личного окончания: Ő minden nap főz.',
      'Для ők («они») форма глагола tanul — tanulnak: Ők az iskolában tanulnak.'
    ],
    'Magánhangzó-harmónia: -ban/-ben': [
      'На вопрос Hol? («Где?») слово szoba получает суффикс -ban, а конечная a удлиняется до á: szobában.',
      'У слова terem гласные переднего ряда, поэтому суффикс места — -ben: teremben.',
      'У слова bolt гласная заднего ряда o; выбираем -ban: boltban.',
      'У слова kert гласная переднего ряда e; выбираем -ben: kertben.',
      'У слова könyv гласная переднего ряда ö; выбираем -ben: könyvben.'
    ],
    'Tárgyrag: -t': [
      'Существительное alma в винительном падеже имеет форму almát: перед -t конечная a удлиняется до á.',
      'Слово könyv получает соединительную гласную e и показатель винительного падежа -t: könyvet.',
      'После egy pohár («стакан») напиток указывается в винительном падеже: egy pohár vizet. Обратите внимание: víz → vizet.',
      'Существительное barát в винительном падеже имеет форму barátot; используется соединительная гласная o.',
      'После látok («я вижу») требуется винительный падеж: autó → autót.'
    ],
    'Határozott és határozatlan ragozás': [
      'Сочетание egy könyvet («одну/какую-то книгу») обозначает неопределённое дополнение, поэтому: Én olvasok egy könyvet.',
      'A könyvet («эту/определённую книгу») — определённое дополнение, поэтому нужна форма olvasom: Én olvasom a könyvet.',
      'Дополнение az újságot является определённым, поэтому в 3-м лице употребляется olvassa: Ő olvassa az újságot.',
      'С определённым дополнением a filmet в 1-м лице множественного числа нужна форма nézzük: Mi nézzük a filmet.',
      'Указательное местоимение ezt делает дополнение определённым: Te írod ezt a levelet?'
    ],
    'Hová? Hol? Honnan?': [
      'Hová? означает «Куда?». Направление внутрь школы: iskolába; начальная форма — iskola.',
      'Hol? означает «Где?». Местонахождение внутри школы: iskolában.',
      'Honnan? означает «Откуда?». Движение из школы: iskolából.',
      'При вопросе Hová? («Куда?») для направления внутрь сумки используется táskába.',
      'При вопросе Hol? («Где?») для местонахождения внутри кармана используется zsebben.'
    ],
    'A múlt idő alapjai': [
      'С én («я») глагол tanul в прошедшем времени имеет форму tanultam: Én tegnap sokat tanultam.',
      'С te («ты») глагол csinál в прошедшем времени имеет форму csináltál: Te tegnap mit csináltál?',
      'Прошедшая форма глагола lenni («быть») для mi («мы») — voltunk: Mi tegnap otthon voltunk.',
      'В 3-м лице единственного числа прошедшая форма érkezik — érkezett: Ő tegnap későn érkezett.',
      'С én («я») прошедшая форма néz — néztem: Én tegnap néztem egy filmet.'
    ]
  };
  if(!Array.isArray(window.GRAMMAR_TOPICS)) throw new Error('Темы грамматики не загружены.');
  let applied=0;
  for(const [title,explanations] of Object.entries(notes)) {
    const topic=window.GRAMMAR_TOPICS.find(t=>t.title===title&&['A1','A2'].includes(t.level));
    if(!topic||topic.questions.length!==explanations.length)
      throw new Error('Несовпадение вопросов и объяснений: '+title);
    topic.questions.forEach((q,i)=>{q.whyRu=explanations[i];applied++});
  }
  window.GRAMMAR_RUSSIAN_FEEDBACK_INFO=Object.freeze({topics:Object.keys(notes).length,questions:applied});
})();
