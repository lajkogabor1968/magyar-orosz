/* Önálló A2-es nyelvtani leckék. A meglévő leckék sorrendjét megőrizzük. */
(() => {
  'use strict';
  const choose = (q, options, answer, why, whyRu) => ({q, options, answer, why, whyRu});
  const write = (q, correct, why, whyRu, other = []) =>
    ({q, type: 'input', accept: [correct, ...other], why, whyRu});
  const topics = [
    {
      level: 'A2', title: 'Igekötős igék – állítás, tagadás, felszólítás',
      ruleHu: 'A semleges állító mondatban az igekötő az ige előtt, egybeírva áll: megírom. Egyszerű tagadásban az ige után, különírva: nem írom meg. Felszólításban is az ige után áll: írd meg; tiltásban: ne írd meg. A hangsúlyozás más szórendet is létrehozhat; itt az alapmintákat tanuljuk.',
      rule: 'В нейтральном утверждении приставка стоит перед глаголом и пишется слитно: megírom. При обычном отрицании: nem írom meg. В просьбе и запрете: írd meg / ne írd meg. В других контекстах порядок слов может меняться; здесь изучаем основные модели.',
      examples: [
        ['Megírom az üzenetet.', 'Я напишу сообщение.'],
        ['Nem írom meg az üzenetet.', 'Я не напишу сообщение.'],
        ['Nyisd ki az ajtót!', 'Открой дверь!'],
        ['Ne nyisd ki az ajtót!', 'Не открывай дверь!']
      ],
      table: {heads: ['Ige / Глагол', 'Semleges állítás / Утверждение', 'Tagadás / Отрицание', 'Felszólítás / Повелит.'], rows: [
        ['megír', 'Megírom a levelet.', 'Nem írom meg a levelet.', 'Írd meg a levelet!'],
        ['kinyit', 'Kinyitom az ajtót.', 'Nem nyitom ki az ajtót.', 'Nyisd ki az ajtót!'],
        ['elmegy', 'Elmegyek.', 'Nem megyek el.', 'Menj el!']
      ]},
      questions: [
        choose('Melyik az egybeírt, semleges állító alak? (meg + írom)', ['meg írom', 'megírom', 'meg-írom'], 1, 'Az ige előtt álló igekötőt egybeírjuk az igével.', 'Приставка перед глаголом пишется слитно.'),
        choose('Egészítsd ki a tagadást! Nem ___ az ajtót. (kinyit)', ['nyitom ki', 'kinyitom', 'nyitok ki'], 0, 'Nem nyitom ki az ajtót: a tárgy határozott, az igekötő hátul áll.', 'При обычном отрицании: nem nyitom ki; az ajtót требует определённого спряжения.'),
        choose('Melyik felszólítás helyes? (elmegy, te)', ['Elmenj!', 'Menj el!', 'Elmész!'], 1, 'Felszólításban: menj el!', 'В повелительном предложении: menj el!'),
        choose('Melyik tiltás helyes? (kinyit, te, az ajtót)', ['Ne kinyisd az ajtót!', 'Nem nyisd ki az ajtót!', 'Ne nyisd ki az ajtót!'], 2, 'Tiltás: ne nyisd ki az ajtót!', 'Запрет: ne + форма повелительного наклонения + приставка.'),
        choose('Hol áll az igekötő a „Nem írom meg” mondatban?', ['Az ige előtt, egybeírva', 'Az ige után, különírva', 'A tagadószó előtt'], 1, 'A meg az írom után áll, ezért külön szó.', 'После глагола приставка пишется отдельно.'),
        choose('Melyik semleges állító mondat helyes?', ['El megyek reggel.', 'Megyek el reggel.', 'Elmegyek reggel.'], 2, 'Semleges állításban: elmegyek.', 'В нейтральном утверждении: elmegyek.'),
        write('Alakítsd át egyszerű tagadássá! „Megírom a levelet.” → …', 'Nem írom meg a levelet', 'A nem után az igekötő az ige mögé kerül.', 'После nem: írom meg.'),
        write('Egészítsd ki! „Nem ___ a buszra.” (felszállok)', 'szállok fel', 'Nem szállok fel a buszra.', 'При отрицании: nem szállok fel.'),
        write('Írd át tiltássá! „Menj el!” → …', 'Ne menj el', 'Tiltáskor ne áll az ige előtt.', 'При запрете употребляется ne.', ['Ne menjél el']),
        write('Írd le egybe! meg + írom → …', 'megírom', 'Az ige előtt álló igekötőt egybeírjuk.', 'Приставка перед глаголом пишется слитно.')
      ]
    },
    {
      level: 'A2', title: 'Rendhagyó felszólítás – egyél vagy edd?',
      ruleHu: 'Az eszik, iszik, tesz és vesz igék felszólító alakja rendhagyó. Határozatlan tárggyal: egyél egy almát, igyál vizet, tegyél egy könyvet az asztalra, vegyél egy jegyet. Határozott tárggyal: edd meg az almát, idd meg a vizet, tedd ide a könyvet, vedd meg a jegyet. A hosszabb tegező alakok is helyesek lehetnek: egyed, igyad, tegyed, vegyed.',
      rule: 'У этих глаголов повелительные формы нерегулярны. С неопределённым объектом: egyél / igyál / tegyél / vegyél. С определённым: edd / idd / tedd / vedd. Выбор зависит от дополнения, а не только от значения глагола. У определённых форм есть и более длинные варианты.',
      examples: [
        ['Egyél egy almát!', 'Съешь яблоко! (неопределённый объект)'],
        ['Edd meg az almát!', 'Съешь это яблоко!'],
        ['Igyál egy pohár vizet!', 'Выпей стакан воды!'],
        ['Idd meg a vizet!', 'Выпей эту воду!']
      ],
      table: {heads: ['Ige / Глагол', 'Te: határozatlan / Неопр.', 'Te: határozott / Опр.', 'Ön: határozatlan / Неопр.', 'Ön: határozott / Опр.'], rows: [
        ['eszik', 'egyél', 'edd', 'egyen', 'egye'],
        ['iszik', 'igyál', 'idd', 'igyon', 'igya'],
        ['tesz', 'tegyél', 'tedd', 'tegyen', 'tegye'],
        ['vesz', 'vegyél', 'vedd', 'vegyen', 'vegye']
      ]},
      questions: [
        choose('___ egy almát! (te; határozatlan)', ['Edd', 'Eszel', 'Egyél'], 2, 'Egy almát → egyél!', 'С неопределённым объектом: egyél.'),
        choose('___ meg az almát! (te; határozott)', ['Edd', 'Egyél', 'Eszed'], 0, 'Az almát → edd meg!', 'С определённым объектом: edd.'),
        choose('___ egy pohár vizet! (te; határozatlan)', ['Idd', 'Igyál', 'Iszol'], 1, 'Egy pohár vizet → igyál!', 'С неопределённым объектом: igyál.'),
        choose('___ meg a vizet! (te; határozott)', ['Igyál', 'Iszod', 'Idd'], 2, 'A vizet → idd meg!', 'С определённым объектом: idd.'),
        choose('___ egy jegyet! (te; határozatlan; vesz)', ['Vegyél', 'Vedd', 'Veszel'], 0, 'Egy jegyet → vegyél!', 'С неопределённым объектом: vegyél.'),
        choose('___ a táskádat az asztalra! (te; határozott; tesz)', ['Tegyél', 'Tedd', 'Teszed'], 1, 'A táskádat → tedd!', 'С определённым объектом: tedd.'),
        choose('Kérem, ___ egy kis vizet! (Ön; határozatlan; iszik)', ['igya', 'iszol', 'igyon'], 2, 'Ön + egy kis vizet → igyon!', 'Вежливое обращение, неопределённый объект: igyon.'),
        choose('Kérem, ___ meg a levest! (Ön; határozott; eszik)', ['egyen', 'egye', 'eszi'], 1, 'Ön + a levest → egye meg!', 'Вежливое обращение, определённый объект: egye.'),
        write('Egészítsd ki! „___ egy szendvicset!” (te; eszik)', 'Egyél', 'Egy szendvicset → egyél!', 'С неопределённым объектом: egyél.'),
        write('Egészítsd ki! „___ meg a szendvicset!” (te; eszik)', 'Edd', 'A szendvicset → edd meg! Az egyed is helyes.', 'С определённым объектом: edd; форма egyed также допустима.', ['Egyed']),
        write('Egészítsd ki! „___ meg ezt a könyvet!” (te; vesz)', 'Vedd', 'Ezt a könyvet → vedd meg! A vegyed is helyes.', 'С определённым объектом: vedd или vegyed.', ['Vegyed']),
        write('Egészítsd ki! „___ ide a székedet!” (te; tesz)', 'Tedd', 'A székedet → tedd ide! A tegyed is helyes.', 'С определённым объектом: tedd или tegyed.', ['Tegyed'])
      ]
    },
    {
      level: 'A2', title: 'Múlt idő – határozott és határozatlan tárgy',
      ruleHu: 'Múlt időben is számít, határozott-e a tárgy: olvastál egy könyvet, de olvastad a könyvet. A „tanultam/olvastam/láttam” típusú egyes szám első személyű alak mindkét ragozásban azonos; a többi személyben viszont gyakran más a végződés. Figyeld az -ál/-ad, -ott/-ta, -unk/-uk, -atok/-átok, -ak/-ák párokat.',
      rule: 'В прошедшем времени тоже нужно выбирать спряжение по определённости дополнения: olvastál egy könyvet — olvastad a könyvet. В 1-м лице единственного числа формы совпадают: olvastam. В остальных лицах окончания обычно различаются.',
      examples: [
        ['Olvastál egy könyvet?', 'Ты читал(а) какую-нибудь книгу?'],
        ['Olvastad a könyvet?', 'Ты читал(а) эту книгу?'],
        ['Mi írtunk egy levelet.', 'Мы написали письмо.'],
        ['Mi írtuk a levelet.', 'Мы писали это письмо.']
      ],
      table: {heads: ['Személy / Лицо', 'egy könyvet / Неопр.', 'a könyvet / Опр.'], rows: [
        ['én', 'olvastam', 'olvastam'], ['te', 'olvastál', 'olvastad'],
        ['ő', 'olvasott', 'olvasta'], ['mi', 'olvastunk', 'olvastuk'],
        ['ti', 'olvastatok', 'olvastátok'], ['ők', 'olvastak', 'olvasták']
      ]},
      questions: [
        choose('Te tegnap ___ egy könyvet. (olvas)', ['olvastad', 'olvasol', 'olvastál'], 2, 'Egy könyvet → olvastál.', 'Неопределённый объект: olvastál.'),
        choose('Te tegnap ___ a könyvet. (olvas)', ['olvastad', 'olvastál', 'olvasod'], 0, 'A könyvet → olvastad.', 'Определённый объект: olvastad.'),
        choose('Ő tegnap ___ egy könyvet. (olvas)', ['olvasta', 'olvasott', 'olvas'], 1, 'Egy könyvet → olvasott.', 'Неопределённый объект: olvasott.'),
        choose('Ő tegnap ___ a könyvet. (olvas)', ['olvasta', 'olvasott', 'olvasson'], 0, 'A könyvet → olvasta.', 'Определённый объект: olvasta.'),
        choose('Mi tegnap ___ a levelet. (ír)', ['írtunk', 'írták', 'írtuk'], 2, 'A levelet → írtuk.', 'Определённый объект: írtuk.'),
        choose('Ti tegnap ___ egy levelet. (ír)', ['írtátok', 'írtatok', 'írtuk'], 1, 'Egy levelet → írtatok.', 'Неопределённый объект: írtatok.'),
        choose('Ők tegnap ___ az újságot. (olvas)', ['olvasták', 'olvastak', 'olvastunk'], 0, 'Az újságot → olvasták.', 'Определённый объект: olvasták.'),
        choose('Melyik állítás igaz a múlt idejű „én” alakra?', ['Mindig -od a vége', 'Határozott és határozatlan tárggyal gyakran azonos', 'Csak határozott tárggyal használható'], 1, 'Olvastam egy könyvet. / Olvastam a könyvet.', 'В 1-м лице единственного числа формы совпадают.'),
        write('Ők ___ a levelet. (ír; múlt idő)', 'írták', 'A levelet → írták.', 'Определённый объект: írták.'),
        write('Mi ___ egy könyvet. (olvas; múlt idő)', 'olvastunk', 'Egy könyvet → olvastunk.', 'Неопределённый объект: olvastunk.'),
        write('Mi ___ a könyvet. (olvas; múlt idő)', 'olvastuk', 'A könyvet → olvastuk.', 'Определённый объект: olvastuk.'),
        write('Én tegnap ___ a filmet. (néz; múlt idő)', 'néztem', 'Én néztem: ez az alak mindkét ragozásban azonos.', 'Форма néztem совпадает в обоих типах спряжения.')
      ]
    }
  ];
  if (!Array.isArray(window.GRAMMAR_TOPICS)) throw new Error('Hiányoznak a nyelvtani leckék.');
  window.GRAMMAR_TOPICS.push(...topics);
  window.GRAMMAR_A2_DEEPENING_INFO = Object.freeze({
    topics: topics.length,
    questions: topics.reduce((total, topic) => total + topic.questions.length, 0)
  });
})();
