/*
 * A2-es folytatás: három eredeti, lépésről lépésre tanítható nyelvtani egység.
 * A már közzétett A1–A2-fejezetek sorrendjét és az eredménykulcsokat megőrzi.
 */
(() => {
  'use strict';
  const choose = (q, options, answer, why, whyRu) =>
    ({q, options, answer, why, whyRu});
  const write = (q, correct, why, whyRu, other = []) =>
    ({q, type: 'input', accept: [correct, ...other], why, whyRu});
  const topics = [
    {
      level: 'A2',
      title: 'Jövő idő – fog + főnévi igenév',
      ruleHu: 'A jövőt magyarul jelen idejű igével és időhatározóval is kifejezhetjük: Holnap tanulok. A fog segédigével a főnévi igenév változatlan marad, a fog pedig személy szerint ragozódik: tanulni fogok, tanulni fogsz, tanulni fog. Határozott tárgynál a fog határozott ragozású: olvasni fogom a könyvet. A létige jövő ideje: leszek, leszel, lesz...',
      rule: 'Будущее время можно передать настоящим временем с указанием будущего: Holnap tanulok. Другой способ — инфинитив и изменяемый вспомогательный глагол fog: tanulni fogok. При определённом прямом дополнении: olvasni fogom a könyvet. Будущее время глагола lenni выражает lesz: leszek, leszel, lesz...',
      examples: [
        ['Holnap magyarul tanulok.', 'Завтра я буду заниматься венгерским.'],
        ['Holnap magyarul tanulni fogok.', 'Завтра я буду заниматься венгерским.'],
        ['Olvasni fogom a könyvet.', 'Я буду читать эту книгу.'],
        ['Hétvégén otthon leszek.', 'В выходные я буду дома.']
      ],
      table: {heads: ['Személy / Лицо', 'Tanulni fog… / Без объекта', 'Olvasni fog… a könyvet / С опр. объектом'], rows: [
        ['én', 'tanulni fogok', 'olvasni fogom'],
        ['te', 'tanulni fogsz', 'olvasni fogod'],
        ['ő / Ön', 'tanulni fog', 'olvasni fogja'],
        ['mi', 'tanulni fogunk', 'olvasni fogjuk'],
        ['ti', 'tanulni fogtok', 'olvasni fogjátok'],
        ['ők / Önök', 'tanulni fognak', 'olvasni fogják']
      ]},
      questions: [
        choose('Én holnap ___. (tanul; fog)', ['tanulni fogok', 'tanulok fogni', 'fogok tanultam'], 0,
          'Én: tanulni fogok. A fog ragozódik, a tanulni változatlan.', 'Для én: tanulni fogok; изменяется только fog.'),
        choose('Te holnap ___. (dolgozik; fog)', ['dolgozni fogok', 'dolgozni fogsz', 'dolgozol fog'], 1,
          'Te → fogsz; dolgozik → dolgozni.', 'Для te: dolgozni fogsz.'),
        choose('Ő holnap ___ egy újságot. (olvas; fog)', ['olvasni fogja', 'olvasni fog', 'olvasott fog'], 1,
          'Egy újságot: határozatlan tárgy, ezért olvasni fog.', 'Egy újságot — неопределённый объект, поэтому olvasni fog.'),
        choose('Ő holnap ___ az újságot. (olvas; fog)', ['olvasni fogja', 'olvasni fog', 'olvasni fogok'], 0,
          'Az újságot: határozott tárgy, ezért fogja.', 'Az újságot — определённый объект, поэтому fogja.'),
        choose('Mi holnap ___ a filmet. (néz; fog)', ['nézni fogunk', 'nézni fogjuk', 'nézzük fogni'], 1,
          'A filmet határozott tárgy; mi → fogjuk.', 'С определённым объектом a filmet: nézni fogjuk.'),
        choose('Ti holnap ___ egy filmet. (néz; fog)', ['nézni fogjátok', 'nézni fogunk', 'nézni fogtok'], 2,
          'Egy filmet határozatlan; ti → fogtok.', 'С неопределённым объектом: nézni fogtok.'),
        choose('Melyik a lenni ige saját jövő idejű alakja (én)?', ['vagyok', 'leszek', 'lesz'], 1,
          'A lenni jövő idejű alakja: én leszek. Időhatározóval a jelen idő is kifejezhet jövőt.', 'Собственная будущая форма lenni для én — leszek; настоящее время с holnap тоже может обозначать будущее.'),
        choose('Melyik mondat utal jelen idejű igealakkal a jövőre?', ['Tegnap utaztam.', 'Éppen most utazom.', 'Holnap utazom.'], 2,
          'A holnap időhatározó jelzi a jövőt, az utazom alak jelen idejű.', 'Holnap указывает на будущее, хотя utazom стоит в настоящем времени.'),
        write('Egészítsd ki! „Én holnap ___.” (főz + fog)', 'főzni fogok',
          'Főzni + fogok: a fog az én személyhez igazodik.', 'főzni — инфинитив; fogok — форма для én.'),
        write('Egészítsd ki! „Te holnap ___ a levelet.” (ír + fog)', 'írni fogod',
          'A levelet határozott tárgy, ezért fogod.', 'A levelet — определённый объект; форма fogod.'),
        write('Egészítsd ki! „Ők jövő héten ___.” (utazik + fog)', 'utazni fognak',
          'Ők → fognak; az ige főnévi igeneve utazni.', 'Для ők: utazni fognak.'),
        write('Egészítsd ki! „Mi holnap otthon ___.” (a lesz ragozása, mi)', 'leszünk',
          'A lesz ige mi alakja: leszünk.', 'Форма lesz для mi — leszünk.')
      ]
    },
    {
      level: 'A2',
      title: 'Kell és a személyragos főnévi igenév',
      ruleHu: 'Általános szükségességnél egyszerű főnévi igenév áll: Itt várni kell. Ha megmondjuk, kinek kell valamit csinálnia, a főnévi igenév személyragot kap: nekem tanulnom kell, neked tanulnod kell, neki tanulnia kell. A kell ilyenkor nem ragozódik személyenként. A nekem, neked stb. sokszor elhagyható, mert a személyrag elárulja, kiről van szó.',
      rule: 'Для общей необходимости используется обычный инфинитив: Itt várni kell. Если указано, кому нужно действовать, у инфинитива появляется личное окончание: nekem tanulnom kell, neked tanulnod kell, neki tanulnia kell. Слово kell при этом не спрягается по лицам. Местоимение nekem/neked часто можно опустить.',
      examples: [
        ['Itt várni kell.', 'Здесь нужно ждать. (общее правило)'],
        ['Ma dolgoznom kell.', 'Сегодня мне нужно работать.'],
        ['Holnap pihenned kell.', 'Завтра тебе нужно отдохнуть.'],
        ['Nekünk időben indulnunk kell.', 'Нам нужно вовремя выйти.']
      ],
      table: {heads: ['Kinek? / Кому?', 'tanul… kell', 'beszél… kell'], rows: [
        ['nekem', 'tanulnom', 'beszélnem'],
        ['neked', 'tanulnod', 'beszélned'],
        ['neki / Önnek', 'tanulnia', 'beszélnie'],
        ['nekünk', 'tanulnunk', 'beszélnünk'],
        ['nektek', 'tanulnotok', 'beszélnetek'],
        ['nekik / Önöknek', 'tanulniuk', 'beszélniük']
      ]},
      questions: [
        choose('Nekem ma ___ kell. (tanul)', ['tanulnod', 'tanulnom', 'tanulniuk'], 1,
          'Nekem → tanulnom kell.', 'Для nekem (мне): tanulnom kell.'),
        choose('Neked ma ___ kell. (beszél)', ['beszélned', 'beszélnem', 'beszélniük'], 0,
          'Neked → beszélned kell.', 'Для neked (тебе): beszélned kell.'),
        choose('Neki holnap ___ kell. (tanul)', ['tanulnom', 'tanulnia', 'tanulnunk'], 1,
          'Neki → tanulnia kell.', 'Для neki (ему/ей): tanulnia kell.'),
        choose('Nekünk hétfőn ___ kell. (dolgozik)', ['dolgoznunk', 'dolgoznom', 'dolgozniuk'], 0,
          'Nekünk → dolgoznunk kell.', 'Для nekünk (нам): dolgoznunk kell.'),
        choose('Nektek most ___ kell. (vár)', ['várnotok', 'várnunk', 'várniuk'], 0,
          'Nektek → várnotok kell.', 'Для nektek (вам, мн. ч.): várnotok kell.'),
        choose('Nekik ma ___ kell. (beszél)', ['beszélnie', 'beszélnünk', 'beszélniük'], 2,
          'Nekik → beszélniük kell.', 'Для nekik (им): beszélniük kell.'),
        choose('Általános szabály: „Itt ___ kell.” (vár)', ['várnom', 'várni', 'várnotok'], 1,
          'Nincs megnevezett cselekvő: várni kell.', 'Без указания лица используется обычный инфинитив: várni kell.'),
        choose('Mi változik a „Nekem tanulnom kell” mondatban?', [
          'A kell személy szerint ragozódik.',
          'A tanulni főnévi igenév személyragot kap.',
          'A nekem a múlt időt jelöli.'
        ], 1,
          'A tanulni helyett tanulnom áll; a kell változatlan.', 'Личное окончание получает инфинитив tanulni → tanulnom.'),
        write('Egészítsd ki! „Ma ___ kell.” (én, olvas)', 'olvasnom',
          'Az én személy: olvasnom.', 'Для «мне»: olvasnom.'),
        write('Egészítsd ki! „Holnap ___ kell.” (te, főz)', 'főznöd',
          'A te személy: főznöd.', 'Для «тебе»: főznöd.'),
        write('Egészítsd ki! „Nekünk ___ kell.” (tanul)', 'tanulnunk',
          'A nekünk személyhez tanulnunk tartozik.', 'Для «нам»: tanulnunk.'),
        write('Egészítsd ki! „Neki ___ kell.” (olvas)', 'olvasnia',
          'A neki személyhez olvasnia tartozik.', 'Для «ему/ей»: olvasnia.')
      ]
    },
    {
      level: 'A2',
      title: 'Birtokos személyjelek – könyvem, könyved, könyve',
      ruleHu: 'A magyarban a birtokolt főnév végén megmutatjuk, kié a dolog: könyvem, könyved, könyve, könyvünk, könyvetek, könyvük. A személyes névmás elhagyható: Ez a könyvem. A birtokos szerkezetben az ő névmás egyes vagy többes számú birtokosra is utalhat; a toldalék különböztet: az ő könyve (egy birtokos), az ő könyvük (több birtokos). Ez a lecke egy birtokolt dolog alakjait tanítja.',
      rule: 'Принадлежность выражается личным притяжательным окончанием у существительного: könyvem (моя книга), könyved (твоя), könyve (его/её), könyvünk (наша), könyvetek (ваша), könyvük (их). Местоимение можно опустить. Форма az ő употребляется и для «его/её», и для «их»; число владельцев показывает окончание существительного. Здесь рассматривается один предмет.',
      examples: [
        ['Ez az én könyvem.', 'Это моя книга.'],
        ['Hol van a kulcsod?', 'Где твой ключ?'],
        ['Ez a mi házunk.', 'Это наш дом.'],
        ['Ez az ő könyvük.', 'Это их книга.']
      ],
      table: {heads: ['Kié? / Чьё?', 'könyv / книга', 'ház / дом'], rows: [
        ['én', 'könyvem', 'házam'],
        ['te', 'könyved', 'házad'],
        ['ő / Ön', 'könyve', 'háza'],
        ['mi', 'könyvünk', 'házunk'],
        ['ti', 'könyvetek', 'házatok'],
        ['ők', 'könyvük', 'házuk']
      ]},
      questions: [
        choose('Ez az én ___. (könyv)', ['könyved', 'könyvem', 'könyve'], 1,
          'Én → könyvem.', 'Моя книга: könyvem.'),
        choose('Ez a te ___. (ház)', ['házad', 'házam', 'háza'], 0,
          'Te → házad.', 'Твой дом: házad.'),
        choose('Ez az ő ___. (könyv; egy birtokos)', ['könyvünk', 'könyve', 'könyvük'], 1,
          'Egy birtokos: az ő könyve.', 'Один владелец: az ő könyve.'),
        choose('Ez a mi ___. (könyv)', ['könyvünk', 'könyvük', 'könyvetek'], 0,
          'Mi → könyvünk.', 'Наша книга: könyvünk.'),
        choose('Ez a ti ___. (ház)', ['házunk', 'házuk', 'házatok'], 2,
          'Ti → házatok.', 'Ваш дом (вы, мн. ч.): házatok.'),
        choose('Ez az ő ___. (könyv; több birtokos)', ['könyve', 'könyvetek', 'könyvük'], 2,
          'Több birtokos: az ő könyvük.', 'Несколько владельцев: az ő könyvük.'),
        choose('Melyik mondat helyes?', ['Ez a én házam.', 'Ez az én házam.', 'Ez az én házad.'], 1,
          'Az én házam: az névelő és én → házam.', 'Правильно: az én házam (мой дом).'),
        choose('Mit jelent az „az ő házuk”?', ['az ő háza, egy birtokosé', 'a mi házunk', 'a ház több birtokosé'], 2,
          'Házuk: több birtokos egy háza.', 'Házuk: дом принадлежит нескольким людям.'),
        write('Egészítsd ki! „Ez az én ___.” (ház)', 'házam',
          'Az én házam.', 'Мой дом: házam.'),
        write('Egészítsd ki! „Ez a te ___.” (könyv)', 'könyved',
          'A te könyved.', 'Твоя книга: könyved.'),
        write('Egészítsd ki! „Ez a mi ___.” (ház)', 'házunk',
          'A mi házunk.', 'Наш дом: házunk.'),
        write('Egészítsd ki! „Ez az ő ___.” (ház; ők)', 'házuk',
          'Az ő házuk: többes számú birtokos.', 'Их дом: házuk.')
      ]
    }
  ];
  if (!Array.isArray(window.GRAMMAR_TOPICS)) {
    throw new Error('Hiányoznak a nyelvtani leckék.');
  }
  window.GRAMMAR_TOPICS.push(...topics);
  window.GRAMMAR_A2_CONTINUATION_INFO = Object.freeze({
    topics: topics.length,
    questions: topics.reduce((total, topic) => total + topic.questions.length, 0)
  });
})();
