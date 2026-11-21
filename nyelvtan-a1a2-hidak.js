/*
 * A1–A2 tanulási hidak. Új, önálló mondatok és feladatok, nem tankönyvmásolatok.
 * A meglévő leckék végére kerülnek: a korábbi eredményazonosítók változatlanok.
 */
(() => {
  'use strict';
  const choose = (q, options, answer, why, whyRu) =>
    ({q, options, answer, why, whyRu});
  const write = (q, correct, why, whyRu) =>
    ({q, type: 'input', accept: [correct], why, whyRu});
  const topics = [
    {
      level: 'A1',
      title: 'Ki cselekszik? Alany, ige és tárgy',
      ruleHu: 'Az alany azt mutatja meg, ki vagy mi cselekszik (ki? mi?). Az ige a cselekvést nevezi meg (mit csinál?). A tárgy arra válaszol, hogy kit vagy mit érint a cselekvés (kit? mit?). A tárgyon gyakran -t rag van; ennek képzését az A2-es tárgyrag-lecke tanítja részletesen.',
      rule: 'Подлежащее (alany) отвечает на вопросы ki? mi? — кто? что? Глагол (ige) называет действие. Прямое дополнение (tárgy) отвечает на вопросы kit? mit? — кого? что? У дополнения часто есть окончание -t. Как его образовать, подробно изучим на уровне A2.',
      examples: [
        ['Anna olvas.', 'Анна читает: Anna — подлежащее, olvas — глагол.'],
        ['Anna könyvet olvas.', 'Анна читает книгу: könyvet — прямое дополнение.'],
        ['Péter almát eszik.', 'Петер ест яблоко: Péter — подлежащее, almát — дополнение.']
      ],
      table: {heads: ['Mondat / Предложение', 'Ki? / Подлежащее', 'Mit csinál? / Глагол', 'Mit? / Дополнение'], rows: [
        ['Anna könyvet olvas.', 'Anna', 'olvas', 'könyvet'],
        ['Péter almát eszik.', 'Péter', 'eszik', 'almát'],
        ['A gyerek rajzol.', 'a gyerek', 'rajzol', '—'],
        ['Éva teát iszik.', 'Éva', 'iszik', 'teát'],
        ['A tanár magyaráz.', 'a tanár', 'magyaráz', '—'],
        ['Mária levelet ír.', 'Mária', 'ír', 'levelet']
      ]},
      questions: [
        choose('„Anna könyvet olvas.” Melyik az alany?', ['könyvet', 'Anna', 'olvas'], 1,
          'Anna végzi a cselekvést: ő az alany.', 'Anna выполняет действие, поэтому это подлежащее.'),
        choose('„Péter almát eszik.” Melyik az ige?', ['almát', 'Péter', 'eszik'], 2,
          'Az eszik a cselekvést megnevező ige.', 'Eszik — глагол, обозначающий действие.'),
        choose('„Mária levelet ír.” Melyik a tárgy?', ['levelet', 'Mária', 'ír'], 0,
          'Mit ír Mária? Levelet. Ez a tárgy.', 'Что пишет Мария? Levelet — прямое дополнение.'),
        choose('Melyik kérdéssel keresheted meg az alanyt?', ['Kinek?', 'Ki?', 'Honnan?'], 1,
          'Személyre utaló alanynál: ki?', 'Вопрос к подлежащему, обозначающему человека: ki?'),
        choose('Melyik kérdéssel keresheted meg a tárgyat?', ['Hol?', 'Mikor?', 'Mit?'], 2,
          'A tárgy egyik kérdése a mit?', 'Один из вопросов к прямому дополнению — mit?'),
        choose('„A gyerek rajzol.” Van kifejezett tárgy a mondatban?', ['Nincs', 'Igen: rajzol', 'Igen: gyerek'], 0,
          'A mondatban nem szerepel tárgy.', 'В предложении нет выраженного прямого дополнения.'),
        write('Írd be az alanyt! „Éva teát iszik.”', 'Éva',
          'Éva iszik: ő a cselekvő.', 'Ева выполняет действие; подлежащее — Éva.'),
        write('Írd be az igét! „Anna könyvet olvas.”', 'olvas',
          'Az olvas a cselekvést nevezi meg.', 'Olvas обозначает действие — «читает».'),
        write('Írd be a tárgyat! „Péter almát eszik.”', 'almát',
          'Mit eszik Péter? Almát.', 'Что ест Петер? Almát.')
      ]
    },
    {
      level: 'A2',
      title: 'Birtoklás: van könyvem, nincs autóm',
      ruleHu: 'A birtoklást gyakran a van / nincs és birtokos személyjeles főnév fejezi ki: Van egy könyvem. Nincs autóm. A nekem, neked, neki, nekünk, nektek, nekik azt jelzi, ki a birtokos; sokszor elhagyható. Egyetlen birtokolt dologgal dolgozunk: könyvem, könyved, könyve... Tagadáskor a van helyén nincs áll, nem a „nem van”.',
      rule: 'Наличие выражается конструкцией van + существительное с притяжательным окончанием: Van egy könyvem. — У меня есть книга. Отсутствие: Nincs autóm. — У меня нет машины. Слова nekem, neked, neki, nekünk, nektek, nekik уточняют владельца; их можно опускать. Отрицание van — nincs, а не «nem van».',
      examples: [
        ['Van egy könyvem.', 'У меня есть книга.'],
        ['Nincs autóm.', 'У меня нет машины.'],
        ['Neked van egy biciklid?', 'У тебя есть велосипед?'],
        ['Nekünk nincs időnk.', 'У нас нет времени.']
      ],
      table: {heads: ['Kinek? / У кого?', 'Birtok / Чья книга?', 'Van / Nincs'], rows: [
        ['nekem', 'könyvem', 'Van egy könyvem.'],
        ['neked', 'könyved', 'Nincs könyved.'],
        ['neki / Önnek', 'könyve', 'Van egy könyve.'],
        ['nekünk', 'könyvünk', 'Nincs könyvünk.'],
        ['nektek', 'könyvetek', 'Van egy könyvetek.'],
        ['nekik / Önöknek', 'könyvük', 'Nincs könyvük.']
      ]},
      questions: [
        choose('Én: „___ egy könyvem.”', ['Vagyok', 'Van', 'Vannak'], 1,
          'Birtoklást a van fejezi ki: Van egy könyvem.', 'Для наличия предмета: Van egy könyvem.'),
        choose('Én: „___ autóm.” (nincs autó)', ['Nem van', 'Nincsenek', 'Nincs'], 2,
          'A van tagadó párja: nincs.', 'Отрицание единственного числа van — nincs.'),
        choose('Te: „Neked van egy ___?” (bicikli)', ['biciklid', 'biciklim', 'biciklije'], 0,
          'Te → biciklid.', 'Твой велосипед: biciklid.'),
        choose('Mi: „Nekünk nincs ___.” (idő)', ['időm', 'időnk', 'időd'], 1,
          'Nekünk → időnk.', 'Для «у нас» используется időnk.'),
        choose('Ő: „Van egy ___.” (könyv)', ['könyvem', 'könyvetek', 'könyve'], 2,
          'Egy birtokos, ő → könyve.', 'Для одного владельца он/она: könyve.'),
        choose('Ti: „___ van egy házatok.”', ['Nektek', 'Nekünk', 'Nekik'], 0,
          'Ti birtokos névmási alakja: nektek.', 'Для «у вас» (вы): nektek.'),
        choose('Ők: „Nekik nincs ___.” (könyv)', ['könyve', 'könyvem', 'könyvük'], 2,
          'Több birtokos: könyvük.', 'Для нескольких владельцев: könyvük.'),
        choose('Melyik helyes?', ['Nem van pénzem.', 'Nincs pénzem.', 'Nincsen pénzemek.'], 1,
          'Tagadó birtoklás: Nincs pénzem.', 'Правильно: Nincs pénzem — «У меня нет денег».'),
        write('Egészítsd ki! „Van egy ___.” (én, táska)', 'táskám',
          'A táska végén az a á-ra vált: táskám.', 'У слова táska конечная a становится á: táskám.'),
        write('Egészítsd ki! „Nincs ___.” (te, autó)', 'autód',
          'Te → autód.', 'Твоя машина: autód.'),
        write('Egészítsd ki! „Nekünk nincs ___.” (könyv)', 'könyvünk',
          'Nekünk → könyvünk.', 'Наша книга: könyvünk.'),
        write('Egészítsd ki! „Nekik van egy ___.” (ház)', 'házuk',
          'Ők → házuk.', 'Их дом: házuk.')
      ]
    },
    {
      level: 'A2',
      title: 'Részes eset: -nak/-nek – kinek?',
      ruleHu: 'A -nak/-nek rag sokszor arra válaszol, hogy kinek adunk, mondunk vagy mutatunk valamit. Mély hangrendű szó után általában -nak (barátnak), magas után -nek (gyereknek) áll. Szóvégi a/e esetén hosszabbodás is lehet: anya → anyának, Emese → Emesének. A személyes alakokat külön meg kell tanulni: nekem, neked, neki, nekünk, nektek, nekik.',
      rule: 'Дательный падеж -nak/-nek часто отвечает на вопрос kinek? — «кому?»: a barátnak («другу»), a gyereknek («ребёнку»). Выбор зависит от гармонии гласных. Конечные a/e удлиняются: anya → anyának, Emese → Emesének. Личные формы запоминают отдельно: nekem, neked, neki, nekünk, nektek, nekik.',
      examples: [
        ['Könyvet adok a barátomnak.', 'Я даю книгу своему другу.'],
        ['Segítek a gyereknek.', 'Я помогаю ребёнку.'],
        ['Írok a tanárnak.', 'Я пишу учителю.'],
        ['Mit mondasz nekem?', 'Что ты мне говоришь?']
      ],
      table: {heads: ['Alapszó / Слово', 'Kinek? / Кому?', 'Miért? / Почему?'], rows: [
        ['barát', 'barátnak', 'mély hangrend / задний ряд'],
        ['gyerek', 'gyereknek', 'magas hangrend / передний ряд'],
        ['tanár', 'tanárnak', 'mély hangrend / задний ряд'],
        ['testvér', 'testvérnek', 'magas hangrend / передний ряд'],
        ['anya', 'anyának', 'a → á'],
        ['Emese', 'Emesének', 'e → é']
      ]},
      questions: [
        choose('Adok egy könyvet a ___. (barát)', ['barátnak', 'barátnek', 'baráttól'], 0,
          'Barát: mély hangrend, ezért barátnak.', 'После гласной заднего ряда: barátnak.'),
        choose('Segítek a ___. (gyerek)', ['gyereknak', 'gyerekben', 'gyereknek'], 2,
          'Gyerek: magas hangrend, ezért gyereknek.', 'После гласной переднего ряда: gyereknek.'),
        choose('Írok a ___. (tanár)', ['tanárnek', 'tanárnak', 'tanárban'], 1,
          'Tanár → tanárnak.', 'Tanár — задний ряд, поэтому tanárnak.'),
        choose('Kinek mondod? A ___. (testvér)', ['testvérnek', 'testvérnak', 'testvért'], 0,
          'Testvér → testvérnek.', 'Testvér — передний ряд, поэтому testvérnek.'),
        choose('Adok egy virágot az ___. (anya)', ['anyanak', 'anyánek', 'anyának'], 2,
          'Anya → anyának: az a hosszú á lesz.', 'Конечная a удлиняется: anyának.'),
        choose('Mi az „Emese” név részes esetű alakja?', ['Emesenek', 'Emesének', 'Emesénak'], 1,
          'Emese → Emesének: e → é, utána -nek.', 'Конечная e удлиняется: Emesének.'),
        choose('Melyik kérdéshez tartozik a -nak/-nek?', ['Kinek?', 'Hol?', 'Mikor?'], 0,
          'A részes eset alapvető kérdése: kinek?', 'Основной вопрос дательного падежа: kinek?'),
        choose('Melyik jelenti azt, hogy „nekem”?', ['neki', 'nekünk', 'nekem'], 2,
          'A nekem jelentése: мне.', 'Nekem означает «мне».'),
        write('Írd le a részes esetű alakot! „barát” (kinek?)', 'barátnak',
          'Barát + nak = barátnak.', 'Прибавляем -nak: barátnak.'),
        write('Írd le a részes esetű alakot! „gyerek” (kinek?)', 'gyereknek',
          'Gyerek + nek = gyereknek.', 'Прибавляем -nek: gyereknek.'),
        write('Írd be a megfelelő alakot! „Írok az ___.” (anya; kinek?)', 'anyának',
          'Anyának: az a á-ra hosszabbodik.', 'Удлинение a → á: anyának.'),
        write('Írd be a névmást! „Segítek ___.” (te; kinek?)', 'neked',
          'A te részes esetű alakja: neked.', '«Тебе» — neked.')
      ]
    },
    {
      level: 'A2',
      title: 'Helyragok II.: -ra/-re, -on/-en/-ön, -ról/-ről',
      ruleHu: 'Ha valaminek a felületéről beszélünk, a hová? kérdésre -ra/-re, a hol? kérdésre -on/-en/-ön, a honnan? kérdésre -ról/-ről felelhet. Például: asztalra → asztalon → asztalról. Ezeket ne keverd az A1-es -ban/-ben és az A2-es -ba/-be, -ból/-ből toldalékokkal, amelyek gyakran belső teret jelölnek. Közlekedési eszközöknél is előfordul: buszra, buszon, buszról.',
      rule: 'Для поверхности или некоторых видов транспорта используются три серии окончаний: hová? (куда?) → -ra/-re; hol? (где?) → -on/-en/-ön; honnan? (откуда?) → -ról/-ről. Например: asztalra → asztalon → asztalról. Для нахождения внутри ранее изучали -ba/-be, -ban/-ben, -ból/-ből. Выбор окончания зависит от гармонии гласных.',
      examples: [
        ['Leteszem a könyvet az asztalra.', 'Я кладу книгу на стол.'],
        ['A könyv az asztalon van.', 'Книга лежит на столе.'],
        ['Leveszem a könyvet az asztalról.', 'Я беру книгу со стола.'],
        ['Felszállok a buszra.', 'Я сажусь в автобус.']
      ],
      table: {heads: ['Alapszó / Слово', 'Hová? / Куда?', 'Hol? / Где?', 'Honnan? / Откуда?'], rows: [
        ['asztal', 'asztalra', 'asztalon', 'asztalról'],
        ['szék', 'székre', 'széken', 'székről'],
        ['busz', 'buszra', 'buszon', 'buszról'],
        ['föld', 'földre', 'földön', 'földről'],
        ['polc', 'polcra', 'polcon', 'polcról'],
        ['könyv', 'könyvre', 'könyvön', 'könyvről']
      ]},
      questions: [
        choose('Hová teszed a poharat? Az ___. (asztal)', ['asztalon', 'asztalra', 'asztalról'], 1,
          'Hová? Az asztalra.', 'Направление на поверхность: asztalra.'),
        choose('Hol van a pohár? Az ___. (asztal)', ['asztalra', 'asztalon', 'asztalról'], 1,
          'Hol? Az asztalon.', 'Местонахождение на поверхности: asztalon.'),
        choose('Honnan veszed le a poharat? Az ___. (asztal)', ['asztalról', 'asztalra', 'asztalon'], 0,
          'Honnan? Az asztalról.', 'Откуда? Со стола: asztalról.'),
        choose('Hová teszed a táskát? A ___. (szék)', ['széken', 'székről', 'székre'], 2,
          'Hová? A székre.', 'Куда? На стул: székre.'),
        choose('Hol ülsz? A ___. (busz)', ['buszon', 'buszra', 'buszról'], 0,
          'Hol? A buszon.', 'Где? В автобусе: buszon.'),
        choose('Honnan szállsz le? A ___. (busz)', ['buszra', 'buszról', 'buszon'], 1,
          'Honnan? A buszról.', 'Откуда? Из автобуса: buszról.'),
        choose('Hol van a szőnyeg? A ___. (föld)', ['földre', 'földről', 'földön'], 2,
          'Hol? A földön.', 'Где? На полу: földön.'),
        choose('Melyik hármas felel meg a hová? – hol? – honnan? sorrendnek?', [
          'széken – székre – székről', 'székre – széken – székről', 'székről – széken – székre'
        ], 1,
          'Mozgás oda: székre; hely: széken; mozgás onnan: székről.',
          'Куда? székre; где? széken; откуда? székről.'),
        write('Egészítsd ki! „A könyv a ___ van.” (polc; hol?)', 'polcon',
          'Polc + on = polcon.', 'Местонахождение: polcon.'),
        write('Egészítsd ki! „A kulcsot a ___ teszem.” (polc; hová?)', 'polcra',
          'Polc + ra = polcra.', 'Направление: polcra.'),
        write('Egészítsd ki! „Leveszem a könyvet a ___.” (polc; honnan?)', 'polcról',
          'Polc + ról = polcról.', 'Откуда? С полки: polcról.'),
        write('Egészítsd ki! „A ceruza a ___ van.” (könyv; hol?)', 'könyvön',
          'Könyv + ön = könyvön.', 'Где? На книге: könyvön.')
      ]
    }
  ];
  if (!Array.isArray(window.GRAMMAR_TOPICS)) throw new Error('Hiányzik a nyelvtani tananyag.');
  window.GRAMMAR_TOPICS.push(...topics);
  window.GRAMMAR_BRIDGES_INFO = Object.freeze({
    topics: topics.length,
    a1Topics: topics.filter(t => t.level === 'A1').length,
    a2Topics: topics.filter(t => t.level === 'A2').length,
    questions: topics.reduce((n, t) => n + t.questions.length, 0)
  });
})();
