/*
 * A2 – három további, önállóan szerkesztett nyelvtani tanegység.
 * Csak új A2-témákat fűz a korábbiak végéhez; a mentett eredményindexek maradnak.
 */
(() => {
  'use strict';
  const choose = (q, options, answer, why, whyRu) => ({q, options, answer, why, whyRu});
  const write = (q, correct, why, whyRu) =>
    ({q, type: 'input', accept: [correct], why, whyRu});
  const topics = [
    {
      level: 'A2',
      title: 'Társ és eszköz: -val/-vel',
      ruleHu: 'A kivel? és mivel? kérdésre gyakran -val/-vel raggal válaszolunk. Magánhangzó után a v megmarad: ceruza → ceruzával. Mássalhangzó után a v a szóvégi mássalhangzóhoz hasonul: barát → baráttal, kéz → kézzel, busz → busszal. A szóvégi a/e ilyenkor megnyúlik. A -val/-vel társra vagy eszközre is utalhat.',
      rule: 'Окончание -val/-vel отвечает на вопросы kivel? («с кем?») и mivel? («чем?»). После гласной v сохраняется: ceruza → ceruzával. После согласной v полностью уподобляется последнему согласному: barát → baráttal, kéz → kézzel, busz → busszal. Конечная a/e перед суффиксом удлиняется.',
      examples: [
        ['Ceruzával írok.', 'Я пишу карандашом.'],
        ['A barátommal megyek moziba.', 'Я иду в кино с другом.'],
        ['Busszal járok dolgozni.', 'Я езжу на работу на автобусе.'],
        ['Péterrel beszélek.', 'Я разговариваю с Петером.']
      ],
      table: {heads: ['Alapszó / Слово', 'Kivel? Mivel? / С кем? Чем?', 'Figyeld! / Обрати внимание'], rows: [
        ['ceruza', 'ceruzával', 'a → á, v megmarad / v сохраняется'],
        ['barát', 'baráttal', 't → tt'],
        ['kéz', 'kézzel', 'z → zz'],
        ['busz', 'busszal', 'sz → ssz'],
        ['Péter', 'Péterrel', 'r → rr'],
        ['asztal', 'asztallal', 'l → ll']
      ]},
      questions: [
        choose('Mivel írsz? ___ . (ceruza)', ['Ceruzával', 'Ceruzának', 'Ceruzán'], 0,
          'Magánhangzó után a v megmarad: ceruzával.', 'После гласной v сохраняется: ceruzával.'),
        choose('Kivel mész moziba? A ___. (barátom)', ['barátomval', 'barátommal', 'barátomnak'], 1,
          'A barátom végén m áll, ezért barátommal.', 'После конечного m пишем mm: barátommal.'),
        choose('Mivel mész dolgozni? ___. (busz)', ['buszval', 'buszhoz', 'busszal'], 2,
          'Busz + val → busszal, a sz kettőződik.', 'После sz пишем ssz: busszal.'),
        choose('Kivel beszélsz? ___. (Péter)', ['Péterrel', 'Pétervel', 'Péternek'], 0,
          'Péter → Péterrel: a r megkettőződik.', 'После r пишем rr: Péterrel.'),
        choose('Mivel mosol kezet? ___. (víz)', ['vízvel', 'vízzel', 'vízre'], 1,
          'A víz végén z van: vízzel.', 'После z пишем zz: vízzel.'),
        choose('Melyik raggal válaszolunk a „kivel?” kérdésre?', ['-ból/-ből', '-hoz/-hez/-höz', '-val/-vel'], 2,
          'A kivel? társra kérdez; -val/-vel.', '«С кем?» — kivel?; используется -val/-vel.'),
        choose('Melyik mondat helyes?', ['A tanárral beszélek.', 'A tanárval beszélek.', 'A tanárrall beszélek.'], 0,
          'A tanár → tanárral a -val/-vel raggal.', 'Tanár + -val → tanárral («с учителем»).'),
        choose('Hogyan írjuk: asztal + -val?', ['asztalval', 'asztallal', 'asztalnal'], 1,
          'Az l és a v hasonulásából ll lesz: asztallal.', 'Конечная l удваивается: asztallal.'),
        write('Írd be a teljes ragos szót! „Egy ___ írok.” (ceruza; mivel?)', 'ceruzával',
          'Ceruza → ceruzával; a → á.', 'Конечная a удлиняется: ceruzával.'),
        write('Írd be a teljes alakot! „___ utazom.” (busz; mivel?)', 'busszal',
          'Busz + -val = busszal.', 'Слово busz принимает форму busszal.'),
        write('Írd be a teljes alakot! „A ___ találkozom.” (barát; kivel?)', 'baráttal',
          'Barát + -val = baráttal.', 'Конечная t удваивается: baráttal.'),
        write('Írd be a teljes alakot! „___ beszélek.” (Péter; kivel?)', 'Péterrel',
          'Péter + -vel = Péterrel.', 'Конечная r удваивается: Péterrel.')
      ]
    },
    {
      level: 'A2',
      title: 'Helyragok III.: -hoz/-hez/-höz, -nál/-nél, -tól/-től',
      ruleHu: 'Ha valakihez vagy valami mellé megyünk, a hová? kérdésre -hoz/-hez/-höz ragot használhatunk: az orvoshoz. Ha ott vagyunk valakinél vagy valami mellett, gyakran -nál/-nél kell: az orvosnál. Ha onnan jövünk, -tól/-től a megfelelő: az orvostól. A toldalék hangrend szerint illeszkedik, és a szóvégi a/e itt is megnyúlik: iskola → iskolához.',
      rule: 'Эти окончания выражают направление к человеку или месту (hová? → -hoz/-hez/-höz), нахождение у человека или рядом с местом (hol? → -nál/-nél), движение от него (honnan? → -tól/-től). Например: az orvoshoz — az orvosnál — az orvostól. Выбирайте вариант по гармонии гласных; конечные a/e удлиняются.',
      examples: [
        ['Az orvoshoz megyek.', 'Я иду к врачу.'],
        ['Az orvosnál vagyok.', 'Я у врача.'],
        ['Az orvostól jövök.', 'Я иду от врача.'],
        ['A boltnál várok rád.', 'Я жду тебя у магазина.']
      ],
      table: {heads: ['Alapszó / Слово', 'Hová? / Куда?', 'Hol? / Где?', 'Honnan? / Откуда?'], rows: [
        ['orvos', 'orvoshoz', 'orvosnál', 'orvostól'],
        ['gyerek', 'gyerekhez', 'gyereknél', 'gyerektől'],
        ['könyv', 'könyvhöz', 'könyvnél', 'könyvtől'],
        ['iskola', 'iskolához', 'iskolánál', 'iskolától'],
        ['bolt', 'bolthoz', 'boltnál', 'bolttól'],
        ['szék', 'székhez', 'széknél', 'széktől']
      ]},
      questions: [
        choose('Hová mész? Az ___. (orvos)', ['orvosnál', 'orvoshoz', 'orvostól'], 1,
          'Hová? Az orvoshoz.', 'Направление к врачу: orvoshoz.'),
        choose('Hol vagy? Az ___. (orvos)', ['orvosnál', 'orvoshoz', 'orvostól'], 0,
          'Hol? Az orvosnál.', 'Местонахождение у врача: orvosnál.'),
        choose('Honnan jössz? Az ___. (orvos)', ['orvoshoz', 'orvosnál', 'orvostól'], 2,
          'Honnan? Az orvostól.', 'Откуда? От врача: orvostól.'),
        choose('Hol vársz rám? A ___. (bolt)', ['bolthoz', 'boltnál', 'bolttól'], 1,
          'A bolt mellett: a boltnál.', 'Где? У магазина: boltnál.'),
        choose('Hová megy a gyerek? Az ___. (iskola; az épülethez, nem be)', ['iskolához', 'iskolában', 'iskolától'], 0,
          'Az épülethez megy: iskolához.', 'К зданию школы, не внутрь: iskolához.'),
        choose('A „könyv” szóhoz melyik -hoz/-hez/-höz változat illik?', ['könyvhez', 'könyvhoz', 'könyvhöz'], 2,
          'A könyv ö hangja miatt -höz illik: könyvhöz.', 'После ö используется -höz: könyvhöz.'),
        choose('Honnan indulunk? A ___. (bolt)', ['boltnál', 'bolttól', 'bolthoz'], 1,
          'A bolt irányából indulunk: a bolttól.', 'От магазина: bolttól.'),
        choose('Melyik sor felel meg a hová? – hol? – honnan? sorrendnek?', [
          'gyerekhez – gyereknél – gyerektől',
          'gyereknél – gyerekhez – gyerektől',
          'gyerektől – gyereknél – gyerekhez'
        ], 0,
          'Mozgás valakihez: -hez; ott: -nél; onnan: -től.',
          'К человеку: -hez; у него: -nél; от него: -től.'),
        write('Írd be a teljes alakot! „A ___ megyek.” (bolt; hová?)', 'bolthoz',
          'Bolthoz: a hová? kérdésre.', 'Направление к магазину: bolthoz.'),
        write('Írd be a teljes alakot! „A ___ állok.” (szék; hol?)', 'széknél',
          'A szék mellett: széknél.', 'У стула: széknél.'),
        write('Írd be a teljes alakot! „Az ___ indulok.” (iskola; honnan?)', 'iskolától',
          'Iskola → iskolától: az a á-ra hosszabbodik.', 'От школы: iskolától; a становится á.'),
        write('Írd be a teljes alakot! „A ceruzát a ___ teszem.” (könyv; mellé)', 'könyvhöz',
          'A könyv mellé teszem: könyvhöz.', 'К книге, рядом с ней: könyvhöz.')
      ]
    },
    {
      level: 'A2',
      title: 'Melléknevek fokozása: -bb és mint',
      ruleHu: 'Ha két dolgot összehasonlítunk, a melléknév középfokát használjuk: gyors → gyorsabb, olcsó → olcsóbb. A második összehasonlított dolgot a mint szó vezeti be: A busz gyorsabb, mint a bicikli. Egyes tövek megváltoznak: szép → szebb, jó → jobb, nagy → nagyobb, kicsi → kisebb. A leg- előtag már a felsőfokot jelöli, ebben a leckében a középfokot gyakoroljuk.',
      rule: 'При сравнении двух предметов используется сравнительная степень прилагательного: gyorsabb («быстрее»), olcsóbb («дешевле»). Слово mint означает «чем»: A busz gyorsabb, mint a bicikli. Некоторые формы требуют запоминания: szép → szebb, jó → jobb, nagy → nagyobb, kicsi → kisebb. Приставка leg- образует превосходную степень; здесь изучаем сравнительную.',
      examples: [
        ['A busz gyorsabb, mint a bicikli.', 'Автобус быстрее велосипеда.'],
        ['Ez a kabát drágább, mint az a póló.', 'Эта куртка дороже той футболки.'],
        ['Ez a szoba nagyobb, mint az a szoba.', 'Эта комната больше той комнаты.'],
        ['Ez a feladat könnyebb, mint az előző.', 'Это задание легче предыдущего.']
      ],
      table: {heads: ['Alapfok / Положительная', 'Középfok / Сравнительная', 'Oroszul / По-русски'], rows: [
        ['nagy', 'nagyobb', 'большой → больше'],
        ['szép', 'szebb', 'красивый → красивее'],
        ['jó', 'jobb', 'хороший → лучше'],
        ['olcsó', 'olcsóbb', 'дешёвый → дешевле'],
        ['gyors', 'gyorsabb', 'быстрый → быстрее'],
        ['kicsi', 'kisebb', 'маленький → меньше']
      ]},
      questions: [
        choose('Mi a „nagy” középfoka?', ['nagyb', 'nagyobb', 'legnagyobb'], 1,
          'Nagy → nagyobb; a legnagyobb felsőfok.', 'Сравнительная степень: nagyobb. Legnagyobb — превосходная.'),
        choose('Mi a „szép” középfoka?', ['szebb', 'szépebb', 'legszebb'], 0,
          'A szép középfoka szebb.', 'Правильная форма: szebb.'),
        choose('Ez a táska ___, mint az a táska. (olcsó)', ['olcsó', 'olcsón', 'olcsóbb'], 2,
          'Összehasonlításban: olcsóbb, mint.', 'При сравнении: olcsóbb, mint.'),
        choose('A busz ___, mint a bicikli. (gyors)', ['gyorsabb', 'gyorsan', 'leggyorsabb'], 0,
          'Gyors → gyorsabb; a mint két dolgot hasonlít össze.', 'Gyorsabb — «быстрее».'),
        choose('Mi a „jó” középfoka?', ['jóbb', 'jobb', 'legjobb'], 1,
          'Jó → jobb: rövid o, nem hosszú ó.', 'Неправильная форма jóbb; правильно jobb.'),
        choose('Mi a „kicsi” középfoka?', ['kicsibb', 'kicsiebb', 'kisebb'], 2,
          'A kicsi középfoka: kisebb.', 'Нужно запомнить форму kisebb.'),
        choose('Melyik szó fejezi ki, hogy „чем” az összehasonlításban?', ['mint', 'mert', 'amikor'], 0,
          'A két dolgot a mint köti össze.', 'При сравнении двух предметов используется mint («чем»).'),
        choose('Melyik mondat tartalmaz középfokot?', [
          'Ez a kabát a legdrágább.',
          'Ez a kabát drágább, mint az a póló.',
          'Ez a kabát drága.'
        ], 1,
          'Drágább: középfok, legdrágább: felsőfok, drága: alapfok.',
          'Drágább — сравнительная, legdrágább — превосходная, drága — положительная степень.'),
        write('Írd be a középfokot! „Ez a ház ___.” (nagy)', 'nagyobb',
          'Nagy → nagyobb.', 'Больше: nagyobb.'),
        write('Írd be a középfokot! „Ez az út ___.” (hosszú)', 'hosszabb',
          'Hosszú → hosszabb.', 'Длиннее: hosszabb.'),
        write('Írd be a középfokot! „Ez a feladat ___.” (könnyű)', 'könnyebb',
          'Könnyű → könnyebb.', 'Легче: könnyebb.'),
        write('Írd be a középfokot! „Ez a könyv ___.” (jó)', 'jobb',
          'Jó → jobb.', 'Лучше: jobb.')
      ]
    }
  ];
  if (!Array.isArray(window.GRAMMAR_TOPICS)) throw new Error('A nyelvtani témák még nincsenek betöltve.');
  window.GRAMMAR_TOPICS.push(...topics);
  window.GRAMMAR_A2_NEXT_INFO = Object.freeze({
    topics: topics.length,
    questions: topics.reduce((n, t) => n + t.questions.length, 0)
  });
})();
