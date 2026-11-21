/*
 * A1–A2 nyelvtani bővítés orosz anyanyelvű tanulóknak.
 * Szakmai támpont: Magyar nyelv 5. (Oktatási Hivatal, 2026),
 * különösen 60–62., 98–101. és 120–128. oldal.
 * A magyarázatok, példák és feladatok önállóan készültek.
 */
(() => {
  'use strict';
  const choose = (q, options, answer, why) => ({q, options, answer, why});
  const write = (q, correct, why, other = []) =>
    ({q, type: 'input', accept: [correct, ...other], why});

  const extra = [
    {
      level: 'A1', title: 'Szótő és toldalék: hogyan épül fel egy szó?',
      ruleHu: 'A szótő hordozza az alapjelentést. A toldalék a szó végéhez kapcsolódik. A -k többes számot, a -t tárgyat, a -ban/-ben helyet, a személyrag pedig az ige alanyát jelölheti. A toldalék előtt kötőhangzó is lehet.',
      rule: 'Основа передаёт главное значение: könyv, tanul. Суффиксы добавляют грамматическое значение: könyv-ek (книги), könyv-et (книгу), tanul-ok (я учусь). Соединительная гласная перед суффиксом не является отдельным падежным окончанием.',
      examples: [['könyv → könyvek', 'книга → книги'], ['tanul → tanulok', 'учиться → я учусь'], ['kert → kertben', 'сад → в саду']],
      table: {heads: ['Szó / Слово', 'Szótő / Основа', 'Mi változott? / Что добавилось?'], rows: [
        ['házak', 'ház', 'többes szám: -k'], ['könyvet', 'könyv', 'tárgyrag: -t'], ['tanulunk', 'tanul', 'mi: -unk']
      ]},
      questions: [
        choose('Mi a „tanulunk” szó szótöve?', ['tanul', 'tanulunk', 'unk'], 0, 'A tanul- az ige szótöve; -unk az 1. személy többes számú rag.'),
        choose('Melyik szó többes számú?', ['kertben', 'könyvek', 'olvasok'], 1, 'A könyvek végén a -k többes számot jelöl.'),
        choose('Melyik szóban van tárgyrag?', ['alma', 'almában', 'almát'], 2, 'Az almát tárgyesetű; a szóvégi a á-ra változik.'),
        choose('Mit jelez a -ban/-ben a „kertben” szóhoz hasonló alakokban?', ['Helyet: hol?', 'Többes számot', 'Múlt időt'], 0, 'A -ban/-ben belső helyviszonyt fejez ki.'),
        choose('A „házak” szóban mi a többes szám jele?', ['-ak', '-k', '-z'], 1, 'A többes szám jele -k; az a kötőhangzó.'),
        write('Írd be a „könyvek” szó szótövét!', 'könyv', 'A szótő: könyv-.'),
        write('Egészítsd ki! A kert + -ben = …', 'kertben', 'A kert magas hangrendű szó: kertben.')
      ]
    },
    {
      level: 'A1', title: 'Igeragozás I. – én, te, ő, mi, ti, ők',
      ruleHu: 'Az ige személyragja megmutatja, ki cselekszik. Jelen időben, határozatlan ragozásban a „tanul” ige: tanulok, tanulsz, tanul, tanulunk, tanultok, tanulnak. A névmás gyakran elhagyható, mert a rag is jelzi a személyt.',
      rule: 'В венгерском глагол изменяется по шести лицам. Не нужно всегда говорить местоимение: tanulok уже означает «я учусь». Это неопределённое (субъектное) спряжение настоящего времени. Не путайте mi (мы) и ti (вы).',
      examples: [['Tanulok magyarul.', 'Я учу венгерский.'], ['Tanultok minden nap.', 'Вы учитесь каждый день.'], ['Ők tanulnak.', 'Они учатся.']],
      table: {heads: ['Személy / Лицо', 'tanul – jelen idő', 'Oroszul'], rows: [
        ['én', 'tanulok', 'я учусь'], ['te', 'tanulsz', 'ты учишься'], ['ő', 'tanul', 'он/она учится'],
        ['mi', 'tanulunk', 'мы учимся'], ['ti', 'tanultok', 'вы учитесь'], ['ők', 'tanulnak', 'они учатся']
      ]},
      questions: [
        choose('Én magyarul ___.', ['tanulsz', 'tanulok', 'tanulnak'], 1, 'Én → tanulok.'),
        choose('Te minden nap ___.', ['tanulsz', 'tanulunk', 'tanul'], 0, 'Te → tanulsz.'),
        choose('Mi együtt ___.', ['tanultok', 'tanulnak', 'tanulunk'], 2, 'Mi → tanulunk.'),
        choose('Ők otthon ___.', ['tanul', 'tanulnak', 'tanultok'], 1, 'Ők → tanulnak.'),
        choose('„Вы учитесь” – melyik forma?', ['tanultok', 'tanulunk', 'tanulnak'], 0, 'Ti = вы, tanultok = вы учитесь.'),
        write('Egészítsd ki! Ő most ___. (tanul)', 'tanul', 'Ő → tanul; nincs kimondott személyrag.'),
        write('Írd be az igealakot! Mi sokat ___. (tanul)', 'tanulunk', 'Mi → tanulunk.'),
        write('Írd be az igealakot! Ti itt ___. (tanul)', 'tanultok', 'Ti → tanultok.')
      ]
    },
    {
      level: 'A1', title: 'Igeragozás II. – magánhangzó-harmónia',
      ruleHu: 'A rag magánhangzója sokszor a szótőhöz illeszkedik: tanulok, beszélek, ülök. A három gyakori minta a mély, a magas ajakréses és a magas ajakkerekítéses toldalékolás. Nem minden ige ragozása teljesen szabályos.',
      rule: 'Вариант окончания зависит от гласных основы: tanul-ok (гласные заднего ряда), beszél-ek (переднего ряда), ül-ök (переднего ряда с округлением губ). Сравните также: tanultok, beszéltek, ültök. Некоторые глаголы имеют отдельные особенности.',
      examples: [['Én tanulok.', 'Я учусь.'], ['Én beszélek.', 'Я говорю.'], ['Én ülök.', 'Я сижу.']],
      table: {heads: ['Személy', 'tanul', 'beszél', 'ül'], rows: [
        ['én', 'tanulok', 'beszélek', 'ülök'], ['te', 'tanulsz', 'beszélsz', 'ülsz'],
        ['ő', 'tanul', 'beszél', 'ül'], ['mi', 'tanulunk', 'beszélünk', 'ülünk'],
        ['ti', 'tanultok', 'beszéltek', 'ültök'], ['ők', 'tanulnak', 'beszélnek', 'ülnek']
      ]},
      questions: [
        choose('Én magyarul ___. (beszél)', ['beszélök', 'beszélek', 'beszélok'], 1, 'Beszél → beszélek.'),
        choose('Én most ___. (ül)', ['ülök', 'ülek', 'ülok'], 0, 'Ül → ülök.'),
        choose('Ti itt ___. (ül)', ['ültek', 'ültök', 'ültok'], 1, 'Ti ültök.'),
        choose('Mi sokat ___. (beszél)', ['beszélunk', 'beszélünk', 'beszélönk'], 1, 'Mi beszélünk.'),
        choose('Melyik három igealak helyes?', ['tanulok, beszélek, ülök', 'tanulek, beszélok, ülök', 'tanulök, beszélek, ülek'], 0, 'A rag magánhangzója a szótőhöz illeszkedik.'),
        write('Írd be! Ők magyarul ___. (beszél)', 'beszélnek', 'Ők beszélnek.'),
        write('Írd be! Mi a padon ___. (ül)', 'ülünk', 'Mi ülünk.'),
        write('Írd be! Én minden nap ___. (tanul)', 'tanulok', 'Én tanulok.')
      ]
    },
    {
      level: 'A1', title: 'Többes szám és a névelők',
      ruleHu: 'Az egyes számú főnév előtt állhat a/az vagy egy névelő. A többes szám jele -k; sokszor kötőhangzó is kell: házak, kertek, könyvek. A szóvégi a és e gyakran megnyúlik: alma → almák, körte → körték.',
      rule: 'Артикль a/az определённый, egy неопределённый. Множественное число обычно образуется с -k, иногда с соединительной гласной: ház-ak, kert-ek. На конце слова a → á, e → é перед многими суффиксами: alma → almák.',
      examples: [['A könyv új.', 'Книга новая.'], ['Egy könyvet kérek.', 'Я прошу одну книгу.'], ['Az almák pirosak.', 'Яблоки красные.']],
      table: {heads: ['Egyes szám', 'Többes szám', 'Oroszul'], rows: [
        ['ház', 'házak', 'дом / дома'], ['kert', 'kertek', 'сад / сады'],
        ['könyv', 'könyvek', 'книга / книги'], ['alma', 'almák', 'яблоко / яблоки']
      ]},
      questions: [
        choose('___ asztal az ablaknál van.', ['A', 'Az', 'Egyet'], 1, 'Magánhangzóval kezdődő szó előtt az áll.'),
        choose('___ szék mellett állok. (konkrét szék)', ['A', 'Az', 'Egyet'], 0, 'Szék mássalhangzóval kezdődik: a szék.'),
        choose('Melyik a „kert” többes száma?', ['kertk', 'kerták', 'kertek'], 2, 'Kert → kertek.'),
        choose('Melyik a „körte” többes száma?', ['körtek', 'körték', 'körteek'], 1, 'A szóvégi e megnyúlik: körték.'),
        choose('Melyik mondat nyelvtanilag helyes?', ['A almák pirosak.', 'Az alma piros.', 'Az almák piros.'], 1, 'Az alma piros. Többes számú alany mellett a névszói állítmány is többes számú: az almák pirosak.'),
        write('Tedd többes számba! ház → …', 'házak', 'A többes szám jele -k; a kötőhangzó a.'),
        write('Tedd többes számba! alma → …', 'almák', 'Alma → almák.')
      ]
    },
    {
      level: 'A1', title: 'Tagadás és főnévi igenév: nem, -ni',
      ruleHu: 'A tagadószó a ragozott ige előtt áll: Nem tanulok. A főnévi igenév gyakori képzője a -ni: tanulni, olvasni. Más igével is használható: Szeretek olvasni. A nincs a „nem van” helyett használatos.',
      rule: 'Отрицание с глаголом: nem + личная форма (Nem dolgozom). Инфинитив чаще всего заканчивается на -ni: tanulni, olvasni. После szeretek можно использовать инфинитив: Szeretek olvasni. Отрицательная форма van — nincs.',
      examples: [['Nem tanulok ma.', 'Сегодня я не учусь.'], ['Szeretek olvasni.', 'Я люблю читать.'], ['Nincs itt a kulcs.', 'Ключа здесь нет.']],
      table: {heads: ['Állítás', 'Tagadás', 'Oroszul'], rows: [
        ['Tanulok.', 'Nem tanulok.', 'Я учусь / не учусь.'],
        ['A kulcs itt van.', 'A kulcs nincs itt.', 'Ключ здесь / ключа здесь нет.']
      ]},
      questions: [
        choose('Melyik a helyes tagadás?', ['Tanulok nem.', 'Nem tanulok.', 'Nemtanulok.'], 1, 'A nem külön szó, az ige előtt áll.'),
        choose('Melyik a „főz” főnévi igenévi alakja?', ['főzni', 'főzök', 'főztök'], 0, 'Főz → főzni.'),
        choose('Szeretek ___. (olvas)', ['olvasok', 'olvasni', 'olvas'], 1, 'Szeretek olvasni.'),
        choose('A pénztárca ___ a táskában.', ['nem van', 'van nem', 'nincs'], 2, 'A van tagadása: nincs.'),
        choose('Melyik mondat helyes?', ['Nem beszélek magyarul.', 'Beszélek nem magyarul.', 'Magyarul nem beszélni.'], 0, 'A nem a ragozott ige előtt áll.'),
        write('Tagadd az állítást! „Dolgozom.” → …', 'Nem dolgozom', 'Nem dolgozom. A tagadószó külön áll.'),
        write('Add meg a főnévi igenévet! tanul → …', 'tanulni', 'Tanul → tanulni.')
      ]
    },
    {
      level: 'A2', title: 'Az -ik végű igék: lakik, dolgozik',
      ruleHu: 'Sok -ik végű igénél az egyes szám első személyű alak hagyományosan -m végű: lakom, dolgozom. Más személyekben: laksz, lakik, lakunk, laktok, laknak. A -ik nem a többes szám jele.',
      rule: 'У ряда глаголов на -ik форма 1-го лица ед. числа традиционно оканчивается на -m: lakom, dolgozom. Формы других лиц не образуются простым добавлением -ik: laksz, lakik, lakunk, laktok, laknak. В разговорной речи есть варианты; здесь даны нейтральные учебные формы.',
      examples: [['Budapesten lakom.', 'Я живу в Будапеште.'], ['Ő a városban dolgozik.', 'Он/она работает в городе.']],
      table: {heads: ['Személy', 'lakik', 'dolgozik'], rows: [
        ['én', 'lakom', 'dolgozom'], ['te', 'laksz', 'dolgozol'], ['ő', 'lakik', 'dolgozik'],
        ['mi', 'lakunk', 'dolgozunk'], ['ti', 'laktok', 'dolgoztok'], ['ők', 'laknak', 'dolgoznak']
      ]},
      questions: [
        choose('Én Szegeden ___.', ['lakik', 'lakom', 'laksz'], 1, 'Én lakom.'),
        choose('Te hol ___?', ['laksz', 'lakok', 'lakik'], 0, 'Te laksz.'),
        choose('Ő a gyárban ___.', ['dolgozom', 'dolgoznak', 'dolgozik'], 2, 'Ő dolgozik.'),
        choose('Mi itt ___.', ['lakunk', 'lakik', 'laktok'], 0, 'Mi lakunk.'),
        choose('Ti ma sokat ___.', ['dolgoznak', 'dolgoztok', 'dolgozunk'], 1, 'Ti dolgoztok.'),
        write('Írd be! Ők a városban ___. (lakik)', 'laknak', 'Ők laknak.'),
        write('Írd be! Én hétköznap ___. (dolgozik)', 'dolgozom', 'A tankönyvi alak: dolgozom.'),
        write('Írd be! Te hétfőn ___. (dolgozik)', 'dolgozol', 'Te dolgozol.')
      ]
    },
    {
      level: 'A2', title: 'Határozott igeragozás – teljes jelen idejű sor',
      ruleHu: 'Ha a tárgy meghatározott (például a könyvet, ezt a levelet), általában határozott igeragozást használunk. Az olvas ige alakjai: olvasom, olvasod, olvassa, olvassuk, olvassátok, olvassák. A személyragokat együtt kell megtanulni a személyes névmásokkal.',
      rule: 'При определённом прямом дополнении (a könyvet, ezt a levelet) употребляется определённое спряжение. Сравните: olvasok egy könyvet (читаю какую-то книгу) и olvasom a könyvet (читаю эту книгу). Для én, te, ő, mi, ti, ők окончания разные.',
      examples: [['Olvasom a könyvet.', 'Я читаю эту книгу.'], ['Olvassátok az újságot.', 'Вы читаете газету.'], ['Írják a levelet.', 'Они пишут письмо.']],
      table: {heads: ['Személy', 'olvas – határozott', 'ír – határozott'], rows: [
        ['én', 'olvasom', 'írom'], ['te', 'olvasod', 'írod'], ['ő', 'olvassa', 'írja'],
        ['mi', 'olvassuk', 'írjuk'], ['ti', 'olvassátok', 'írjátok'], ['ők', 'olvassák', 'írják']
      ]},
      questions: [
        choose('Én ___ a könyvet.', ['olvasok', 'olvasom', 'olvasod'], 1, 'A könyvet határozott tárgy: olvasom.'),
        choose('Te ___ a levelet.', ['írja', 'írok', 'írod'], 2, 'Te írod a levelet.'),
        choose('Ő ___ az újságot.', ['olvassa', 'olvas', 'olvasok'], 0, 'Ő olvassa az újságot.'),
        choose('Mi ___ a feladatot. (ír)', ['írunk', 'írjuk', 'írják'], 1, 'Mi írjuk a feladatot.'),
        choose('Ti ___ a történetet. (olvas)', ['olvastok', 'olvassuk', 'olvassátok'], 2, 'Ti olvassátok a történetet.'),
        write('Írd be! Ők ___ a levelet. (ír)', 'írják', 'Ők írják a levelet.'),
        write('Írd be! Mi ___ az újságot. (olvas)', 'olvassuk', 'Mi olvassuk az újságot.'),
        write('Írd be! Én ___ ezt a mondatot. (ír)', 'írom', 'Én írom ezt a mondatot.')
      ]
    },
    {
      level: 'A2', title: 'Melyik ragozás? Egy könyvet vagy a könyvet?',
      ruleHu: 'Határozatlan tárgy mellett általában határozatlan, határozott tárgy mellett határozott igeragozás áll. A tárgyrag önmagában nem dönti el a ragozást: egy könyvet és a könyvet egyaránt -t ragos, mégis más igét kíván.',
      rule: 'Выбор спряжения зависит не только от винительного -t, а от определённости объекта. Сравните обычные глаголы: nézek egy filmet / nézem a filmet; írok egy levelet / írom a levelet. Оба объекта имеют окончание -t, но глаголы различаются.',
      examples: [['Nézek egy filmet.', 'Я смотрю какой-то фильм.'], ['Nézem a filmet.', 'Я смотрю этот фильм.'], ['Veszünk két almát.', 'Мы покупаем два яблока.']],
      table: {heads: ['Határozatlan tárgy', 'Határozott tárgy'], rows: [
        ['Olvasok egy könyvet.', 'Olvasom a könyvet.'], ['Nézünk egy filmet.', 'Nézzük a filmet.'],
        ['Írsz egy levelet.', 'Írod a levelet.']
      ]},
      questions: [
        choose('Én ___ egy filmet.', ['nézem', 'nézek', 'nézi'], 1, 'Egy filmet → nézek.'),
        choose('Én ___ a filmet.', ['nézem', 'nézek', 'nézi'], 0, 'A filmet → nézem.'),
        choose('Mi ___ egy levelet. (ír)', ['írjuk', 'írnak', 'írunk'], 2, 'Egy levelet → írunk.'),
        choose('Mi ___ a levelet. (ír)', ['írunk', 'írjuk', 'írják'], 1, 'A levelet → írjuk.'),
        choose('Ők ___ ezt a filmet. (néz)', ['néznek', 'nézik', 'nézünk'], 1, 'Ezt a filmet → nézik.'),
        write('Írd be! Te ___ egy újságot. (olvas)', 'olvasol', 'Te olvasol egy újságot.'),
        write('Írd be! Te ___ az újságot. (olvas)', 'olvasod', 'Te olvasod az újságot.'),
        write('Írd be! Ő ___ két könyvet. (olvas)', 'olvas', 'Két könyvet → határozatlan ragozás: olvas.')
      ]
    },
    {
      level: 'A2', title: 'Múlt idő: -t/-tt és személyragok',
      ruleHu: 'A kijelentő mód múlt idejét többnyire -t vagy -tt jelöli: tanult, olvasott. A múlt idő is ragozódik személy szerint: tanultam, tanultál, tanult, tanultunk, tanultatok, tanultak.',
      rule: 'Прошедшее время обычно содержит показатель -t/-tt. У глаголов в прошедшем времени тоже есть шесть лиц: tanultam, tanultál, tanult, tanultunk, tanultatok, tanultak. У разных основ возможны соединительные гласные: olvasott.',
      examples: [['Tegnap tanultam.', 'Вчера я учился.'], ['Ő múlt héten olvasott.', 'Он/она читал(а) на прошлой неделе.']],
      table: {heads: ['Személy', 'tanul – múlt idő', 'olvas – múlt idő, határozatlan'], rows: [
        ['én', 'tanultam', 'olvastam'], ['te', 'tanultál', 'olvastál'], ['ő', 'tanult', 'olvasott'],
        ['mi', 'tanultunk', 'olvastunk'], ['ti', 'tanultatok', 'olvastatok'], ['ők', 'tanultak', 'olvastak']
      ]},
      questions: [
        choose('Én tegnap ___. (tanul)', ['tanultam', 'tanultál', 'tanult'], 0, 'Én → tanultam.'),
        choose('Te tegnap ___. (tanul)', ['tanulnak', 'tanultál', 'tanultam'], 1, 'Te → tanultál.'),
        choose('Ő tegnap ___. (olvas)', ['olvas', 'olvastál', 'olvasott'], 2, 'Ő → olvasott.'),
        choose('Mi tegnap ___. (tanul)', ['tanultunk', 'tanultatok', 'tanultak'], 0, 'Mi → tanultunk.'),
        choose('Ők sokat ___. (olvas; múlt idő)', ['olvastunk', 'olvastak', 'olvastatok'], 1, 'Ők → olvastak.'),
        write('Egészítsd ki! Ti tegnap ___. (tanul)', 'tanultatok', 'Ti tanultatok.'),
        write('Egészítsd ki! Te tegnap ___. (olvas)', 'olvastál', 'Te olvastál.'),
        write('Egészítsd ki! Mi múlt héten ___. (olvas)', 'olvastunk', 'Mi olvastunk.')
      ]
    },
    {
      level: 'A2', title: 'Felszólító mód I. – kérés és utasítás',
      ruleHu: 'A felszólító mód alapjele -j, de az igealakban hangváltozás is lehet. Te: várj, kérj, menj. Ön: várjon, kérjen, menjen. Mi: várjunk, kérjünk, menjünk. A te alak rövidebb és hosszabb változata is helyes lehet: kérj/kérjél. A felszólító mód kérést és közös javaslatot is kifejezhet.',
      rule: 'Повелительное наклонение может выражать приказ, просьбу и совместное предложение. Важные формы: te várj, Ön várjon, mi várjunk, ti várjatok, Önök várjanak. Во 2-м лице могут быть две правильные формы: kérj / kérjél. У некоторых глаголов основа меняется: megy → menj!',
      examples: [['Várj egy percet!', 'Подожди минуту!'], ['Kérem, várjon itt!', 'Пожалуйста, подождите здесь!'], ['Menjünk haza!', 'Пойдём домой!']],
      table: {heads: ['Személy', 'vár – felszólító', 'megy – felszólító'], rows: [
        ['én', 'várjak', 'menjek'], ['te', 'várj', 'menj'], ['ő / Ön', 'várjon', 'menjen'],
        ['mi', 'várjunk', 'menjünk'], ['ti', 'várjatok', 'menjetek'], ['ők / Önök', 'várjanak', 'menjenek']
      ]},
      questions: [
        choose('___ egy percet! (te)', ['Vársz', 'Várj', 'Várok'], 1, 'Te: várj!'),
        choose('Kérem, ___ itt! (Ön)', ['várjon', 'várj', 'vársz'], 0, 'Ön: várjon!'),
        choose('___ a parkba! (mi)', ['Megyünk', 'Menjünk', 'Menjetek'], 1, 'Mi: menjünk!'),
        choose('___ haza! (ti)', ['Menjenek', 'Menjünk', 'Menjetek'], 2, 'Ti: menjetek!'),
        choose('Kérem, ___ holnap! (Önök; jön)', ['jöjjenek', 'jönnek', 'jöjjetek'], 0, 'Önök: jöjjenek!'),
        write('Írd be a felszólító alakot! Te: ___! (kér)', 'kérj', 'A kérj és a kérjél alak is helyes.', ['kérjél']),
        write('Írd be a felszólító alakot! Mi: ___! (vár)', 'várjunk', 'Várjunk!'),
        write('Írd be az udvarias felszólító alakot! Ön: ___! (megy)', 'menjen', 'Menjen!')
      ]
    },
    {
      level: 'A2', title: 'Felszólító mód II. – határozott tárggyal',
      ruleHu: 'Ha a felszólító mondatban határozott tárgy áll, határozott ragozás kell: Olvasd el a könyvet! Írd le a nevedet! Nézzük meg a filmet! A te alak néha rövid és hosszú formában is létezik: olvasd/olvassad.',
      rule: 'С определённым дополнением используется определённое спряжение повелительного наклонения: írd a levelet, olvasd a könyvet, nézzük a filmet. Не путайте olvass! (читай!) и olvasd! (читай это!). Формы 3-го лица могут совпадать с настоящим временем; контекст решает значение.',
      examples: [['Olvasd el a könyvet!', 'Прочитай книгу!'], ['Írjátok le a szavakat!', 'Запишите слова!'], ['Nézzük meg a filmet!', 'Давайте посмотрим фильм!']],
      table: {heads: ['Személy', 'ír – felszólító, határozott', 'néz – felszólító, határozott'], rows: [
        ['én', 'írjam', 'nézzem'], ['te', 'írd', 'nézd'], ['ő / Ön', 'írja', 'nézze'],
        ['mi', 'írjuk', 'nézzük'], ['ti', 'írjátok', 'nézzétek'], ['ők / Önök', 'írják', 'nézzék']
      ]},
      questions: [
        choose('___ le a nevedet! (te)', ['Írj', 'Írd', 'Írsz'], 1, 'A nevedet határozott tárgy: írd le!'),
        choose('___ el a könyvet! (te)', ['Olvasd', 'Olvass', 'Olvasol'], 0, 'A könyvet: olvasd el!'),
        choose('___ meg a filmet! (mi)', ['Nézünk', 'Nézzetek', 'Nézzük'], 2, 'Mi + a filmet: nézzük meg!'),
        choose('___ le a szavakat! (ti)', ['Írjatok', 'Írjátok', 'Írnak'], 1, 'Ti + a szavakat: írjátok le!'),
        choose('Kérem, ___ meg ezt a képet! (Ön; néz)', ['nézzen', 'nézitek', 'nézze'], 2, 'Ön + ezt a képet: nézze meg!'),
        write('Írd be! Te, ___ a levelet! (ír)', 'írd', 'A határozott felszólító alak: írd; az írjad is elfogadható.', ['írjad']),
        write('Írd be! Mi, ___ meg a képet! (néz)', 'nézzük', 'Nézzük meg a képet!'),
        write('Írd be! Ti, ___ el a történetet! (olvas)', 'olvassátok', 'Olvassátok el a történetet!')
      ]
    },
    {
      level: 'A2', title: 'Felszólító mód III. – hangváltozások és helyesírás',
      ruleHu: 'A felszólító mód -j jele az igető végén álló mássalhangzóval összeolvadhat vagy hasonulhat. Emiatt így írunk: olvas → olvass; néz → nézz; fut → fuss; lát → láss; tanít → taníts. Az alakokat szó szerint is gyakorolni kell, mert nem mindegyik ugyanazon szabály szerint változik.',
      rule: 'При образовании повелительного наклонения -j может сливаться с конечным согласным основы: olvas → olvass, néz → nézz. У глаголов на -t встречаются разные формы: fut → fuss, lát → láss, tanít → taníts. Двойные согласные и долгие гласные на письме обязательны.',
      examples: [['Olvass hangosan!', 'Читай вслух!'], ['Nézz ide!', 'Посмотри сюда!'], ['Fuss gyorsan!', 'Беги быстро!'], ['Taníts magyarul!', 'Преподавай на венгерском!']],
      table: {heads: ['Alapige', 'Felszólító alak (te)', 'Figyeld meg!'], rows: [
        ['olvas', 'olvass', 'ss'], ['néz', 'nézz', 'zz'], ['fut', 'fuss', 'ss'],
        ['lát', 'láss', 'ss'], ['tanít', 'taníts', 'ts'], ['játszik', 'játssz', 'ssz']
      ]},
      questions: [
        choose('Melyik a helyes felszólító alak? (olvas)', ['olvasj', 'olvass', 'olvas'], 1, 'Olvas → olvass!'),
        choose('Melyik a helyes felszólító alak? (néz)', ['nézz', 'nézj', 'nez'], 0, 'Néz → nézz!'),
        choose('Melyik a helyes felszólító alak? (fut)', ['futj', 'futs', 'fuss'], 2, 'Fut → fuss!'),
        choose('Melyik a helyes felszólító alak? (lát)', ['láts', 'láss', 'látj'], 1, 'Lát → láss!'),
        choose('Melyik a helyes felszólító alak? (tanít)', ['taníts', 'taníss', 'tanítj'], 0, 'Tanít → taníts!'),
        choose('Melyik a helyes felszólító alak? (játszik)', ['játsz', 'játszj', 'játssz'], 2, 'Játszik → játssz!'),
        write('Írd be! Te ___! (hoz)', 'hozz', 'Hoz → hozz; a hozzál hosszabb alak is helyes.', ['hozzál']),
        write('Írd be! Te ___! (mos)', 'moss', 'Mos → moss; a mossál hosszabb alak is helyes.', ['mossál']),
        write('Írd be! Te ___! (segít)', 'segíts', 'Segít → segíts; a segítsél hosszabb alak is helyes.', ['segítsél'])
      ]
    },
    {
      level: 'A2', title: 'Felszólító mód IV. – ne és az igekötő',
      ruleHu: 'Tiltáskor a ne szót használjuk: Ne várj! Igekötős igénél a tiltásban az igekötő rendszerint az ige mögé kerül: Írd meg! → Ne írd meg! Olvasd el! → Ne olvasd el! A nem kijelentést, a ne tiltást fejez ki.',
      rule: 'Для запрета употребляется ne, а не nem: Ne várj! У глаголов с приставкой при запрете приставка обычно стоит после формы глагола: Írd le! → Ne írd le! Сравните nem írom (я не пишу) и ne írd (не пиши).',
      examples: [['Nyisd ki az ablakot!', 'Открой окно!'], ['Ne nyisd ki az ablakot!', 'Не открывай окно!'], ['Ne menj el!', 'Не уходи!']],
      table: {heads: ['Felszólítás', 'Tiltás'], rows: [
        ['Írd le a címet!', 'Ne írd le a címet!'],
        ['Olvasd el a szöveget!', 'Ne olvasd el a szöveget!'],
        ['Menj el!', 'Ne menj el!']
      ]},
      questions: [
        choose('Melyik a helyes tiltás?', ['Nem menj!', 'Ne menj!', 'Ne megy!'], 1, 'Tiltás: ne + felszólító alak.'),
        choose('Melyik a helyes forma?', ['Ne olvasd el!', 'Ne elolvasd!', 'Nem elolvasd!'], 0, 'Tiltásban: ne olvasd el!'),
        choose('A „Ne írd meg!” melyik mondat ellentéte?', ['Írsz meg!', 'Megírsz!', 'Írd meg!'], 2, 'Felszólítás: Írd meg!; tiltás: Ne írd meg!'),
        choose('Mi fejez ki tiltást?', ['Nem dolgozom.', 'Ne dolgozz!', 'Dolgozom.'], 1, 'Ne dolgozz!'),
        choose('Melyik a helyes tagadó felszólítás?', ['Ne menj el!', 'Ne elmenj!', 'Nem menj el!'], 0, 'Ne menj el!'),
        write('Alakítsd tiltássá! „Várj!” → …', 'Ne várj', 'Ne várj! A ne várjál is helyes.', ['Ne várjál']),
        write('Alakítsd tiltássá! „Írd le!” → …', 'Ne írd le', 'Ne írd le! A ne írjad le is helyes.', ['Ne írjad le']),
        write('Alakítsd tiltássá! „Olvasd el!” → …', 'Ne olvasd el', 'Ne olvasd el! A ne olvassad el is helyes.', ['Ne olvassad el'])
      ]
    },
    {
      level: 'A2', title: 'Jel vagy rag? – múlt idő, mód, személy',
      ruleHu: 'A jel módosítja a szó jelentését: tanul-t-am → múlt idő jele -t, személyrag -am; kér-j-ek → a felszólító mód jele -j, személyrag -ek. A rag segít megjelölni a szó mondatbeli szerepét. A toldalékok szokásos sorrendje: képző + jel + rag.',
      rule: 'Различайте грамматический показатель и личное окончание: tanul-t-am — -t указывает на прошедшее время, -am на «я»; kér-j-ek — -j передаёт повелительное наклонение, -ek относится к 1-му лицу. Общий порядок суффиксов: словообразовательный суффикс → показатель → окончание.',
      examples: [['tanul + t + am → tanultam', 'я учился: прошедшее время + 1-е лицо'], ['kér + j + ek → kérjek', 'чтобы я попросил: повелительное наклонение + 1-е лицо'], ['ház + ak + ban → házakban', 'в домах: множественное число + местный падеж']],
      table: {heads: ['Szó', 'Jel / Показатель', 'Rag / Окончание'], rows: [
        ['tanultam', '-t (múlt idő)', '-am (én)'],
        ['kérjek', '-j (felszólító mód)', '-ek (én)'],
        ['házakban', '-k (többes szám)', '-ban (hol?)']
      ]},
      questions: [
        choose('Mi a múlt idő jele a „tanultam” szóban?', ['-am', '-t', '-tan'], 1, 'A múlt idő jele -t; a személyrag -am.'),
        choose('Mi a felszólító mód jele a „kérjek” szóban?', ['-j', '-ek', '-kér'], 0, 'A kér-j-ek szóban a -j a módjel.'),
        choose('A „házakban” szóban mi jelöli a többes számot?', ['-ban', '-ak', '-k'], 2, 'A többes szám jele -k.'),
        choose('Melyik toldalék a tárgyrag?', ['-t', '-j', '-bb'], 0, 'A -t a tárgy ragja.'),
        choose('Mi a szótő a „kérjünk” szóban?', ['-ünk', 'kér', '-j'], 1, 'Kér + -j + -ünk.'),
        write('Írd be a múlt idő jelét! tanul + … + am → tanultam', '-t', 'A múlt idő jele -t.', ['t']),
        write('Írd be a felszólító mód jelét! kér + … + ek → kérjek', '-j', 'A felszólító mód jele -j.', ['j'])
      ]
    }
  ];

  if (!Array.isArray(window.GRAMMAR_TOPICS)) {
    throw new Error('Hiányzik a nyelvtani alapadatok tömbje.');
  }
  // A korábbi létige-lecke nyitófeladata az igei személyragozást kérdezte;
  // helyette valóban a létigét gyakoroltatjuk. A fejezet sorszáma és pontszáma megmarad.
  const létige = window.GRAMMAR_TOPICS.find(topic =>
    topic.level === 'A1' && topic.title === 'A létige: vagyok, vagy, van');
  if (létige?.questions[0]?.q === 'Én magyarul ___ .') {
    létige.questions[0] = choose('Én most otthon ___.',
      ['vagy', 'van', 'vagyok'], 2, 'Én → vagyok. A létige helyet is kifejezhet: otthon vagyok.');
  }
  window.GRAMMAR_TOPICS.push(...extra);
  window.GRAMMAR_EXTENSION_INFO = Object.freeze({
    topics: extra.length,
    questions: extra.reduce((sum, topic) => sum + topic.questions.length, 0),
    source: 'Magyar nyelv 5., Oktatási Hivatal, 2026, 60–62., 98–101., 120–128. o.'
  });
})();
