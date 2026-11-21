/*
 * Tankönyvszerű, magyar–orosz magyarázó oldalak az A1–A2 leckékhez.
 * A lépések, kidolgozott mintafeladatok és hibamegelőző tanácsok eredetiek.
 * A témákhoz címmel kapcsolódnak; nem változtatják meg a feladatsorrendet.
 */
(() => {
  'use strict';
  const chapters = [];
  const teach = (title, goalHu, goalRu, steps, worked, pitfall) =>
    chapters.push({title, goalHu, goalRu,
      steps: steps.map(([hu, ru, exampleHu, exampleRu]) => ({hu, ru, exampleHu, exampleRu})),
      worked: {question: worked[0], answer: worked[1], whyHu: worked[2], whyRu: worked[3]},
      pitfall: {hu: pitfall[0], ru: pitfall[1]}});

  // A1 – az alapok: a tanuló nemcsak szabályt, hanem levezetett mintát is kap.
  teach('A magyar magánhangzók',
    'A lecke végére felismered a rövid és hosszú magánhangzókat.',
    'После урока ты сможешь различать короткие и долгие гласные.', [
      ['A magánhangzó hosszúsága megváltoztathatja a szó jelentését.',
        'Долгота гласного может изменить значение слова.', 'kor – kór', 'возраст – болезнь'],
      ['Az ékezet a betű része. Olvasáskor és íráskor is figyelj rá. A szóhangsúly rendszerint az első szótagon van.',
        'Знак долготы — часть буквы. Ударение обычно на первом слоге.', 'tűz (helyes) – tüz (hibás)', 'tűz — правильное написание «огонь»; tüz — орфографическая ошибка']
    ], ['Melyik szó jelenti azt, hogy „болезнь”: kor vagy kór?', 'kór',
      'A hosszú ó miatt más szó és más jelentés keletkezik.',
      'Долгая ó меняет значение: kór означает «болезнь».'],
    ['A hosszú ő és ű nem helyettesíthető ö-vel és ü-vel.',
      'Не заменяй ő и ű буквами ö и ü.']);

  teach('A létige: vagyok, vagy, van',
    'Megtanulod a „lenni” jelen idejű alakjait és a fontos kivételt.',
    'Ты изучишь формы глагола «быть» и важное исключение.', [
      ['Ha azt mondjuk meg, hol van valaki, használjuk a létigét: vagyok, vagy, van, vagyunk, vagytok, vannak.',
        'Когда говорим о местонахождении, используем формы vagyok, vagy, van и другие.', 'Én otthon vagyok. Ő a boltban van.', 'Я дома. Он/она в магазине.'],
      ['Ha a harmadik személyben azt mondjuk, ki vagy milyen valaki, jelen időben elmarad a van.',
        'В 3-м лице настоящего времени перед профессией или качеством van обычно нет.', 'Ő tanár. Ők fáradtak.', 'Он/она учитель. Они устали.']
    ], ['Egészítsd ki! „Mi otthon ___.”', 'vagyunk',
      'A mi névmáshoz a vagyunk tartozik.', 'Для mi (мы) используется vagyunk.'],
    ['Ne mondd: „Ő tanár van.” Helyesen: „Ő tanár.”',
      'Не говори «Ő tanár van». Правильно: «Ő tanár».']);

  teach('Határozatlan igeragozás – jelen idő',
    'Megtanulod, hogyan fejezi ki az igerag a cselekvő személyét.',
    'Ты научишься узнавать лицо по окончанию глагола.', [
      ['Először keresd meg az igetövet: tanul. Ezután kapja meg a személyragot.',
        'Сначала найди основу tanul. Затем добавь личное окончание.', 'tanul + ok = tanulok', 'Я учусь.'],
      ['A személy névmása gyakran elhagyható, mert a ragból már kiderül.',
        'Личное местоимение часто можно опустить: лицо понятно по окончанию.', 'Tanulunk. = Mi tanulunk.', 'Мы учимся.']
    ], ['Egészítsd ki! „Ők magyarul ___.” (tanul)', 'tanulnak',
      'Az ők harmadik személyű többes szám, ezért -nak a végződés.',
      'Для ők (они) используем окончание -nak.'],
    ['Az „én tanul” nem jó: én tanulok.', 'Не смешивай лица: én tanulok.']);

  teach('Magánhangzó-harmónia: -ban/-ben',
    'El tudod dönteni, mikor -ban, és mikor -ben kerül a szó végére.',
    'Ты сможешь выбрать -ban или -ben.', [
      ['A -ban/-ben azt jelenti, hogy valami valaminek a belsejében van.',
        'Окончание -ban/-ben обозначает местонахождение внутри чего-либо.', 'A boltban vagyok.', 'Я в магазине.'],
      ['A mély hangrendű szavakhoz -ban, a magas hangrendűekhez rendszerint -ben járul.',
        'После гласных заднего ряда обычно -ban, после переднего ряда — -ben.', 'házban, de kertben', 'в доме, но в саду']
    ], ['Hogyan egészíted ki? „A terem___ tanulok.”', 'teremben',
      'A terem e hangokat tartalmaz, ezért -ben kapcsolódik hozzá.',
      'В слове terem гласные переднего ряда, поэтому -ben.'],
    ['Ne keverd a hol? (-ban/-ben) és a hová? (-ba/-be) kérdést.',
      'Не путай «где?» (-ban/-ben) и «куда?» (-ba/-be).']);

  teach('Szótő és toldalék: hogyan épül fel egy szó?',
    'Megtanulod felismerni a szótövet és a hozzá kapcsolódó toldalékot.',
    'Ты научишься находить основу слова и его суффиксы.', [
      ['A szótő az alapjelentés hordozója. A toldalék új nyelvtani információt ad.',
        'Основа передаёт значение, окончание добавляет грамматическую информацию.', 'kert + ben = kertben', 'сад + «внутри» = в саду'],
      ['A többes szám jele -k. Előtte kötőhangzó is állhat.',
        'Показатель множественного числа — -k; перед ним бывает соединительная гласная.', 'ház + a + k = házak', 'дома']
    ], ['Mi a szótő a „könyveket” szóban?', 'könyv',
      'A könyv az alap, a -k többes számot, a -t tárgyat jelöl.',
      'Основа könyv; -k указывает на множественное число, -t на винительный падеж.'],
    ['A „házak” szóban a többes szám jele nem -ak, hanem -k.',
      'В házak показатель множественного числа -k, не -ak.']);

  teach('Igeragozás I. – én, te, ő, mi, ti, ők',
    'Hat személyt és a hozzájuk tartozó alapalakokat tanulod meg.',
    'Ты изучишь шесть лиц и соответствующие формы глагола.', [
      ['Az egyes szám három személye: én, te, ő. Figyeld: tanulok, tanulsz, tanul.',
        'Три лица единственного числа: én, te, ő.', 'Én tanulok. Te tanulsz. Ő tanul.', 'Я учусь. Ты учишься. Он/она учится.'],
      ['A többes szám három személye: mi, ti, ők. Figyeld: tanulunk, tanultok, tanulnak.',
        'Три лица множественного числа: mi, ti, ők.', 'Mi tanulunk. Ti tanultok. Ők tanulnak.', 'Мы учимся. Вы учитесь. Они учатся.']
    ], ['Melyik alak illik ide? „Ti sokat ___.”', 'tanultok',
      'A ti névmáshoz a tanultok alak tartozik.', 'Для ti (вы) форма tanultok.'],
    ['A mi (мы) és a ti (вы) különböző személy.',
      'Не путай mi (мы) и ti (вы).']);

  teach('Igeragozás II. – magánhangzó-harmónia',
    'Megérted, miért lesz tanulok, beszélek és ülök.',
    'Ты поймёшь разницу между окончаниями -ok, -ek и -ök.', [
      ['Az én személyragja több változatban fordul elő. A tő magánhangzói segítenek a választásban.',
        'У окончания 1-го лица есть варианты; выбор зависит от гласных основы.', 'tanulok – beszélek – ülök', 'я учусь – говорю – сижу'],
      ['A többes számban is figyelni kell az illeszkedésre.',
        'Гармония гласных действует и во множественном числе.', 'tanulunk – beszélünk – ülünk', 'мы учимся – говорим – сидим']
    ], ['Hogyan mondod? „Mi ___.” (beszél)', 'beszélünk',
      'A beszél magas hangrendű, ezért -ünk a végződés.',
      'После основы beszél используется -ünk.'],
    ['Nem helyes: beszélok, ülok. Helyesen: beszélek, ülök.',
      'Не говори beszélok или ülok.']);

  teach('Többes szám és a névelők',
    'Megtanulod a főnevek többes számát és a névelők használatát.',
    'Ты изучишь множественное число существительных и артикли.', [
      ['A -k jelöli a többes számot; a szóvégi a és e sokszor á-ra és é-re változik.',
        'Множественное число образуется с -k; конечные a/e часто удлиняются.', 'alma → almák; körte → körték', 'яблоко → яблоки; груша → груши'],
      ['Az a/az határozott, az egy határozatlan névelő. A következő szó kezdőhangja dönti el, hogy a vagy az.',
        'a/az — определённый артикль, egy — неопределённый. Перед гласным используется az.', 'a könyv; az alma; egy könyv', 'книга (определённая); яблоко (определённое); какая-то книга']
    ], ['Mi az „alma” többes száma?', 'almák',
      'A szóvégi a megnyúlik, majd hozzákapcsolódik a -k.',
      'Конечная a становится á, затем добавляется -k.'],
    ['Nem „a alma”, hanem „az alma”.', 'Правильно az alma, не a alma.']);

  teach('Tagadás és főnévi igenév: nem, -ni',
    'El tudsz különíteni egy tagadó mondatot és egy főnévi igenevet.',
    'Ты научишься строить отрицание и употреблять инфинитив.', [
      ['A nem általában a ragozott ige előtt áll. Nem írjuk egybe az igével.',
        'Частица nem обычно стоит перед личной формой глагола и пишется отдельно.', 'Nem tanulok ma.', 'Сегодня я не учусь.'],
      ['A főnévi igenév alakja többnyire -ni végű. Gyakran áll egy másik ige után.',
        'Инфинитив обычно оканчивается на -ni и часто стоит после другого глагола.', 'Szeretek olvasni.', 'Я люблю читать.']
    ], ['Mi illik ide? „Szeretek ___.” (főz)', 'főzni',
      'A szeretek után főnévi igenév áll: főzni.',
      'После szeretek употребляем инфинитив főzni.'],
    ['A „nem van” helyett a „nincs” alakot használjuk.',
      'Для отрицания van обычно используется nincs.']);

  // A2 – esetragok, ragozási rendszerek és múlt idő.
  teach('Tárgyrag: -t',
    'Megtanulod felismerni a mondat tárgyát és hozzátenni a -t ragot.',
    'Ты научишься распознавать прямое дополнение и использовать винительный падеж.', [
      ['Kérdezd meg: kit? mit? A válasz gyakran -t tárgyragot kap.',
        'Задай вопросы «кого? что?». Дополнение обычно имеет окончание -t.', 'Olvasok egy könyvet.', 'Я читаю книгу.'],
      ['A tárgyrag előtt kötőhangzó is állhat; a szóvégi a/e sokszor á/é lesz.',
        'Перед -t бывает соединительная гласная; конечная a часто становится á.', 'könyv → könyvet; alma → almát', 'книга → книгу; яблоко → яблоко (вин. п.)']
    ], ['Melyik alak kerül ide? „Látok egy ___.” (kutya)', 'kutyát',
      'A kutya szó végén az a á-ra változik, majd -t kapcsolódik hozzá.',
      'Конечная a удлиняется: kutya → kutyát.'],
    ['A tárgyrag nem ugyanaz, mint a határozott ragozás. Egy almát és az almát is -t ragos.',
      'Наличие -t само по себе не определяет тип спряжения.']);

  teach('Határozott és határozatlan ragozás',
    'Megérted a magyar igék két ragozásának alapvető különbségét.',
    'Ты поймёшь различие между субъектным и объектным спряжением.', [
      ['Ha nem nevezünk meg konkrét, meghatározott tárgyat, általában határozatlan ragozást használunk.',
        'При неопределённом прямом дополнении обычно используется субъектное спряжение.', 'Olvasok egy könyvet.', 'Я читаю какую-то книгу.'],
      ['Ha egy konkrét, határozott tárgyról beszélünk, határozott ragozás kell.',
        'При определённом объекте используется объектное спряжение.', 'Olvasom a könyvet.', 'Я читаю определённую книгу.']
    ], ['Mit mondasz? „Én ___ a levelet.” (ír)', 'írom',
      'Az a levelet határozott tárgy, ezért írom.',
      'a levelet — определённый объект, поэтому írom.'],
    ['Nem elég a -t ragot keresni: egy levelet → írok, a levelet → írom.',
      'Смотри на определённость дополнения, а не только на -t.']);

  teach('Hová? Hol? Honnan?',
    'Három irányt különböztetsz meg: bemozgás, helyben levés, kijövetel.',
    'Ты различишь «куда?», «где?» и «откуда?».', [
      ['A hová? kérdés mozgás irányát jelöli. Belső hely esetén -ba/-be a rag.',
        'На вопрос «куда?» (внутрь) отвечает -ba/-be.', 'Bemegyek a boltba.', 'Я вхожу в магазин.'],
      ['A hol? -ban/-ben, a honnan? -ból/-ből raggal fejezhető ki.',
        '«Где?» — -ban/-ben; «откуда?» — -ból/-ből.', 'A boltban vagyok. Kijövök a boltból.', 'Я в магазине. Я выхожу из магазина.']
    ], ['Egészítsd ki! „Az ___ jövök.” (iskola)', 'iskolából',
      'A honnan? kérdéshez az iskola + -ból alak tartozik; az a megnyúlik.',
      'Для «из школы» употребляется iskolából.'],
    ['A boltba megyek, de a boltban vagyok.',
      'Не путай направление -ba и местонахождение -ban.']);

  teach('A múlt idő alapjai',
    'Megismered a magyar múlt idő jelét és gyakori alakjait.',
    'Ты изучишь основные формы венгерского прошедшего времени.', [
      ['A múlt időt gyakran -t vagy -tt jelöli. A személyrag ezután következik.',
        'Прошедшее время обычно образуется с -t/-tt, затем идёт личное окончание.', 'tanul → tanultam', 'учиться → я учился(ась)'],
      ['Nem minden ige ugyanolyan: a harmadik személyben lehet -t vagy -ott/-ett/-ött.',
        'У разных основ встречаются разные формы 3-го лица.', 'Ő tanult. Ő olvasott.', 'Он/она учился(ась). Он/она читал(а).']
    ], ['Mi illik ide? „Tegnap ő sokat ___.” (olvas)', 'olvasott',
      'Az olvas ige harmadik személyű múlt idejű alakja olvasott.',
      'В 3-м лице прошедшего времени: olvasott.'],
    ['A tanult és az olvasott egyaránt múlt idő, pedig más a végük.',
      'Не добавляй механически -t ко всем глаголам.']);

  teach('Az -ik végű igék: lakik, dolgozik',
    'Megtanulod az -ik végű igék gyakori jelen idejű alakjait.',
    'Ты освоишь основные формы глаголов на -ik.', [
      ['A szótári lakik alakban az -ik nem többes szám. Egyes szám harmadik személy.',
        'В форме lakik окончание -ik относится к 3-му лицу единственного числа.', 'Ő Budapesten lakik.', 'Он/она живёт в Будапеште.'],
      ['Az én személyben tanuljuk a lakom, dolgozom mintát; többes számban lakunk, dolgozunk.',
        'Запомни традиционные формы 1-го лица lakom, dolgozom и множественного lakunk, dolgozunk.', 'Én itt lakom. Mi itt dolgozunk.', 'Я живу здесь. Мы работаем здесь.']
    ], ['Egészítsd ki! „Én egy gyárban ___.”', 'dolgozom',
      'Az én személyhez a dolgozom tanult alak illik.',
      'Для én используется форма dolgozom.'],
    ['Ne a harmadik személyű dolgozik alakot használd én mellett.',
      'Не говори én dolgozik.']);

  teach('Határozott igeragozás – teljes jelen idejű sor',
    'A határozott ragozást mind a hat személyben megtanulod.',
    'Ты выучишь все шесть форм объектного спряжения.', [
      ['Keresd meg a konkrét tárgyat: a könyvet. Ez kiválasztja a határozott ragozást.',
        'Найди определённое дополнение a könyvet: оно требует объектного спряжения.', 'Én olvasom a könyvet.', 'Я читаю эту книгу.'],
      ['Most lépj tovább személyről személyre: olvasom, olvasod, olvassa, olvassuk, olvassátok, olvassák.',
        'Сравни все шесть личных форм: olvasom, olvasod, olvassa, olvassuk, olvassátok, olvassák.', 'Ti olvassátok a könyvet.', 'Вы читаете эту книгу.']
    ], ['Egészítsd ki! „Ők ___ a levelet.” (ír)', 'írják',
      'Ők + határozott tárgy → írják.',
      '3-е лицо множественного числа с определённым объектом: írják.'],
    ['Az „ő olvas” és az „ő olvassa” különbözik: az utóbbi határozott tárgyhoz illik.',
      'Не путай olvas и olvassa.']);

  teach('Melyik ragozás? Egy könyvet vagy a könyvet?',
    'A névelő alapján gyorsan döntesz a megfelelő igealak mellett.',
    'Ты научишься выбирать спряжение по артиклю.', [
      ['Egy könyvet: nem egy meghatározott könyvről beszélünk. Ez a határozatlan minta.',
        'Egy könyvet указывает на неопределённый предмет.', 'Írok egy levelet.', 'Я пишу какое-то письмо.'],
      ['A könyvet és ezt a könyvet: meghatározott tárgy. Ez a határozott minta.',
        'A könyvet и ezt a könyvet требуют объектного спряжения.', 'Írom ezt a levelet.', 'Я пишу именно это письмо.']
    ], ['Mi illik ide? „Mi ___ ezt a feladatot.” (megold)', 'megoldjuk',
      'Ezt a feladatot határozott tárgy; mi → megoldjuk.',
      'ezt a feladatot — определённый объект; mi → megoldjuk.'],
    ['A névelő mellett a mutató névmásra is figyelj: ezt, azt.',
      'Определённость показывают также ezt, azt.']);

  teach('Múlt idő: -t/-tt és személyragok',
    'Az egyszerű múlt időt hat személyben is ki tudod fejezni.',
    'Ты сможешь спрягать глаголы в прошедшем времени по шести лицам.', [
      ['A tanul igével tanuljuk meg a sort: tanultam, tanultál, tanult, tanultunk, tanultatok, tanultak.',
        'Выучи формы tanul прошедшего времени для всех шести лиц.', 'Mi tegnap tanultunk.', 'Мы вчера учились.'],
      ['Más igénél a végződés változhat, de a személyek ugyanazok.',
        'У других глаголов форма основы может отличаться.', 'Ő olvasott. Ők olvastak.', 'Он/она читал(а). Они читали.']
    ], ['Egészítsd ki! „Ti tegnap ___.” (tanul)', 'tanultatok',
      'Ti → tanultatok. Ez múlt idő és többes szám második személy.',
      'Для ti во прошедшем времени: tanultatok.'],
    ['Ne keverd az ő tanult és az ők tanultak alakot.',
      'Различай ő tanult и ők tanultak.']);

  // A2 – felszólító mód. A képleteket a feltöltött orosz nyelvű
  // „Венгерская грамматика в таблицах и схемах” (2021) alapján ellenőriztük.
  teach('Felszólító mód I. – kérés és utasítás',
    'Hat személyben tudsz kérést vagy felszólítást alkotni.',
    'Ты научишься строить формы повелительного наклонения.', [
      ['A felszólító mód alapjele -j, de a tő alakja változhat. Te: várj; Ön: várjon.',
        'Основной показатель повелительного наклонения -j; форма зависит от лица.', 'Várj itt! Kérem, várjon itt!', 'Подожди здесь! Пожалуйста, подождите здесь!'],
      ['Közös javaslatnál mi alakot használunk: várjunk, menjünk. A te alak néha hosszabb is lehet.',
        'Для совместного предложения используем mi: várjunk, menjünk. В форме te возможны краткий и полный варианты.', 'Menjünk haza! Kérj / kérjél segítséget!', 'Пойдём домой! Попроси о помощи!']
    ], ['Egészítsd ki! „Kérem, ___ itt!” (Ön, vár)', 'várjon',
      'Az udvarias Ön megszólításhoz a harmadik személyű várjon alak tartozik.',
      'Вежливое Ön соответствует форме várjon.'],
    ['Az Ön nem a ti névmás ragozását kapja: Ön várjon, ti várjatok.',
      'Ön várjon — вежливая форма; ti várjatok — множественное число.']);

  teach('Felszólító mód II. – határozott tárggyal',
    'Megtanulod a felszólító mód határozott ragozását.',
    'Ты освоишь повелительные формы с определённым дополнением.', [
      ['Először döntsd el, van-e határozott tárgy. A könyvet → határozott.',
        'Сначала определи тип дополнения: a könyvet — определённое.', 'Olvasd el a könyvet!', 'Прочитай эту книгу!'],
      ['A te alak lehet rövid (-d) vagy hosszú (-jad/-jed), a mi alak gyakran -juk/-jük.',
        'В форме te есть краткий и полный варианты; для mi часто -juk/-jük.', 'Írd / írjad le! Nézzük meg!', 'Запиши! Давайте посмотрим это!']
    ], ['Egészítsd ki! „Ti ___ el a mesét!” (olvas)', 'olvassátok',
      'A mesét határozott tárgy, ti → olvassátok.',
      'Определённое дополнение + ti: olvassátok.'],
    ['Az „olvass” általános felszólítás, az „olvasd” meghatározott tárgyhoz illik.',
      'Olvass — без определённого объекта; olvasd — с определённым.']);

  teach('Felszólító mód III. – hangváltozások és helyesírás',
    'Megtanulod, miért változik a tő a felszólító alakban.',
    'Ты поймёшь, почему изменяется написание основы.', [
      ['Az s, sz, z végű igékben a -j hangja hasonul. Írásban a hosszú mássalhangzó is megjelenik.',
        'После s, sz, z показатель -j ассимилируется; на письме появляются удвоенные согласные.', 'olvas → olvass; néz → nézz', 'читай!; смотри!'],
      ['A t végű igéknél két gyakori minta van: fut → fuss, de tanít → taníts.',
        'У глаголов на -t бывают разные модели: fut → fuss, tanít → taníts.', 'Fuss! Taníts!', 'Беги! Преподавай!']
    ], ['Melyik alak helyes? „___ ide!” (néz, te)', 'Nézz',
      'A néz végén z van; felszólításban zz lesz.',
      'Для néz получается nézz с удвоенным z.'],
    ['Ne írd: olvasj vagy nézj. Helyesen: olvass, nézz.',
      'Не пиши olvasj или nézj.']);

  teach('Felszólító mód IV. – ne és az igekötő',
    'Meg tudod különböztetni a felszólítást és a tiltást.',
    'Ты научишься различать просьбу и запрет.', [
      ['Kijelentés tagadására nem, tiltásra ne szolgál.',
        'Nem отрицает утверждение, ne выражает запрет.', 'Nem megyek. Ne menj!', 'Я не иду. Не ходи!'],
      ['Felszólításban és tiltásban az igekötő rendszerint az ige mögött áll.',
        'В приказе и запрете приставка обычно стоит после глагола.', 'Írd le! Ne írd le!', 'Запиши! Не записывай!']
    ], ['Hogyan tiltanád? „Nyisd ki az ablakot!”', 'Ne nyisd ki az ablakot!',
      'A ne az ige elé kerül, a ki az ige után marad.',
      'Поставь ne перед глаголом, ki остаётся после него.'],
    ['A tiltásban „ne”, nem „nem”: Ne menj el!',
      'Для запрета используй ne, не nem.']);

  teach('Jel vagy rag? – múlt idő, mód, személy',
    'Megtanulod felismerni a szóban a múltidő- és módjelet, illetve a személyragot.',
    'Ты научишься различать показатель времени, наклонения и личное окончание.', [
      ['A tanultam alakban a -t a múlt idő jele, az -am a személyrag.',
        'В tanultam показатель -t означает прошедшее время, -am — 1-е лицо.', 'tanul + t + am = tanultam', 'я учился(ась)'],
      ['A kérjek alakban -j jelöli a felszólító módot, -ek a személyt.',
        'В kérjek показатель -j обозначает наклонение, -ek указывает на лицо.', 'kér + j + ek = kérjek', 'чтобы я попросил(а)']
    ], ['Mi a jel és mi a rag a „kérjünk” szóban?', 'jel: -j; személyrag: -ünk',
      'Előbb a kér tő, aztán a -j módjel, végül a -ünk rag áll.',
      'Основа kér + показатель -j + личное окончание -ünk.'],
    ['A -j nem személyrag, hanem módjel.',
      'Не считай -j личным окончанием.']);

  // Az új A2-leckék tankönyvi kísérői.
  teach('Igekötős igék – állítás, tagadás, felszólítás',
    'Megérted az igekötő helyét négy alapvető mondatmintában.',
    'Ты освоишь четыре основные модели положения приставки.', [
      ['Semleges állítás: igekötő + ige, egybeírva. Keresd először az igekötőt.',
        'Нейтральное утверждение: приставка перед глаголом, пишется слитно.', 'Megírom a levelet.', 'Я напишу письмо.'],
      ['Egyszerű tagadás: nem + ige + igekötő, különírva.',
        'Обычное отрицание: nem + глагол + отдельная приставка.', 'Nem írom meg a levelet.', 'Я не напишу письмо.'],
      ['Felszólítás: ige + igekötő. Tiltás: ne + ige + igekötő.',
        'Повелительное предложение: глагол + приставка; запрет: ne + глагол + приставка.', 'Írd meg! Ne írd meg!', 'Напиши! Не пиши!']
    ], ['Alakítsd át! „Kinyitom az ajtót.” (tagadás)', 'Nem nyitom ki az ajtót.',
      'Az igekötő az ige mögé kerül, és különírjuk.',
      'После отрицания приставка переносится за глагол и пишется отдельно.'],
    ['Az egyszerű alapmintát tanuljuk; kiemeléskor és különleges szórendben lehet eltérés.',
      'Это основные модели. При логическом выделении возможен другой порядок.']);

  teach('Rendhagyó felszólítás – egyél vagy edd?',
    'A különleges tövű igék kétféle felszólító alakját alkalmazod.',
    'Ты научишься выбирать нерегулярные формы по типу дополнения.', [
      ['A határozatlan tárgy mellé egyél, igyál, tegyél, vegyél kerül.',
        'С неопределённым дополнением: egyél, igyál, tegyél, vegyél.', 'Egyél egy almát! Igyál vizet!', 'Съешь яблоко! Выпей воды!'],
      ['A határozott tárgy mellett edd, idd, tedd, vedd szükséges.',
        'С определённым дополнением: edd, idd, tedd, vedd.', 'Edd meg az almát! Idd meg a vizet!', 'Съешь это яблоко! Выпей эту воду!'],
      ['Az Ön megszólításhoz egyen/egye, igyon/igya stb. tartozik; a tárgy itt is dönt.',
        'Для вежливого Ön: egyen/egye, igyon/igya; тип зависит от дополнения.', 'Kérem, igyon vizet! Kérem, igya meg a vizet!', 'Пожалуйста, выпейте воды! Выпейте эту воду!']
    ], ['Melyik a helyes? „___ meg a szendvicset!” (te, eszik)', 'Edd',
      'A szendvicset határozott tárgy, ezért edd meg.',
      'a szendvicset — определённый объект; требуется edd.'],
    ['Az edd és az egyél nem szabadon felcserélhető: a tárgy határozottsága számít.',
      'Не заменяй edd на egyél без проверки дополнения.']);

  teach('Múlt idő – határozott és határozatlan tárgy',
    'Múlt időben is kiválasztod a megfelelő ragozási sort.',
    'Ты научишься выбирать спряжение и в прошедшем времени.', [
      ['Egy könyvet: határozatlan sor. Például te olvastál, ő olvasott.',
        'С неопределённым дополнением: te olvastál, ő olvasott.', 'Te olvastál egy könyvet.', 'Ты читал(а) какую-то книгу.'],
      ['A könyvet: határozott sor. Például te olvastad, ő olvasta.',
        'С определённым дополнением: te olvastad, ő olvasta.', 'Te olvastad a könyvet.', 'Ты читал(а) эту книгу.'],
      ['Az én alak mindkét sorban azonos. Ez nem hiba: mindkétszer olvastam.',
        'В 1-м лице единственного числа формы совпадают: olvastam.', 'Olvastam egy könyvet. Olvastam a könyvet.', 'Я читал(а) какую-то книгу. Я читал(а) эту книгу.']
    ], ['Egészítsd ki! „Mi tegnap ___ a levelet.” (ír)', 'írtuk',
      'Mi + határozott tárgy + múlt idő → írtuk.',
      'Мы + определённый объект + прошедшее время → írtuk.'],
    ['A „te olvastál” és a „te olvastad” nem ugyanarra a tárgyra utal.',
      'Не путай olvastál (неопределённое) и olvastad (определённое).']);

  // A2 – a könyv jövőidő-, személyragos főnévi igenév- és birtokos
  // táblázatainak rendszerét ellenőriztük; az itt következő magyarázatok,
  // példák és mintafeladatok önállóan szerkesztett tananyagok.
  teach('Jövő idő – fog + főnévi igenév',
    'Jövő időben is biztosan ki tudod választani az ige alakját és a megfelelő ragozást.',
    'Ты научишься выражать будущее и выбирать спряжение глагола fog.', [
      ['A holnap vagy a jövő héten szó mellett jelen idővel is utalhatunk jövőre.',
        'Слово holnap или jövő héten позволяет использовать настоящее время для будущего.', 'Holnap dolgozom.', 'Завтра я буду работать.'],
      ['A fog segédige a személy szerint változik. A főnévi igenév nem ragozódik: tanulni fogok, tanulni fogsz. Határozott tárggyal: olvasni fogom.',
        'Изменяется fog, инфинитив остаётся неизменным. При определённом объекте: fogom/fogod/fogja и т. д.', 'Olvasni fogok egy könyvet. Olvasni fogom a könyvet.', 'Я буду читать какую-то книгу. Я буду читать эту книгу.'],
      ['A létige jövő idejében külön alakot tanulunk: leszek, leszel, lesz.',
        'У глагола lenni особая будущая форма: leszek, leszel, lesz.', 'Holnap otthon leszek.', 'Завтра я буду дома.']
    ], ['Egészítsd ki! „Ti holnap ___ a könyvet.” (olvas; fog)', 'olvasni fogjátok',
      'A könyvet határozott tárgy, a ti személyhez a fogjátok tartozik.',
      'Определённый объект a könyvet требует формы fogjátok для ti.'],
    ['A „tanulni fogok” és a „fogok tanulni” is helyes lehet; a „tanulok fog” hibás. A főige főnévi igenévben áll.',
      'Возможны tanulni fogok и fogok tanulni; неверно tanulok fog. Основной глагол — в инфинитиве.']);

  teach('Kell és a személyragos főnévi igenév',
    'Megérted a különbséget az általános „várni kell” és a személyes „várnom kell” között.',
    'Ты научишься различать «нужно ждать» вообще и «мне нужно ждать».', [
      ['Az általános szükségességhez egyszerű főnévi igenevet használunk.',
        'Если речь не о конкретном человеке, используем обычный инфинитив.', 'Itt várni kell.', 'Здесь нужно ждать.'],
      ['A nekem, neked és a többi személy mellett a főnévi igenév személyragot kap. A kell nem változik.',
        'Если указано лицо, окончание получает инфинитив, а kell не меняется.', 'Nekem tanulnom kell. Neked tanulnod kell.', 'Мне нужно учиться. Тебе нужно учиться.'],
      ['A névmás elhagyható: a tanulnunk végéből már tudjuk, hogy „nekünk”.',
        'Местоимение необязательно: окончание -nunk уже указывает на «нам».', 'Holnap tanulnunk kell.', 'Завтра нам нужно учиться.']
    ], ['Egészítsd ki! „Nektek ___ kell.” (beszél)', 'beszélnetek',
      'A nektek (ti) személyhez a -netek alak kapcsolódik: beszélnetek.',
      'Для nektek (вам, мн. ч.) нужна форма beszélnetek.'],
    ['A tanulni kell az általános alapszerkezet, a tanulnom kell pedig egyértelműen megmutatja: nekem kell tanulnom.',
      'Tanulni kell выражает общую необходимость, а личная форма tanulnom kell явно указывает на «мне».']);

  teach('Birtokos személyjelek – könyvem, könyved, könyve',
    'Egy birtokolt dolgot mind a hat személyhez hozzá tudsz rendelni.',
    'Ты научишься обозначать принадлежность одного предмета шести лицам.', [
      ['A birtokolt főnév kap személyjelet, nem a birtokos névmás. Először a könyv tövét figyeld.',
        'Притяжательное окончание получает существительное, не местоимение.', 'a könyvem – a könyved – a könyve', 'моя книга – твоя книга – его/её книга'],
      ['Többes számú birtokosnál más alak kell: könyvünk, könyvetek, könyvük. Itt továbbra is egy könyvről beszélünk.',
        'При нескольких владельцах меняется окончание. Речь всё ещё об одной книге.', 'a könyvünk – a könyvetek – a könyvük', 'наша книга – ваша книга – их книга'],
      ['Az én, te, ő névmás elhagyható; a személyjel akkor is megmarad.',
        'Местоимение можно опустить, но притяжательное окончание сохраняется.', 'Ez a könyvem. Hol van a könyved?', 'Это моя книга. Где твоя книга?']
    ], ['Hogyan mondod? „A mi ___.” (könyv)', 'könyvünk',
      'A mi többes szám első személy, ezért a könyvünk alakot használjuk.',
      'Для mi (мы) нужна форма könyvünk.'],
    ['Az „az ő könyve” egy, az „az ő könyvük” több birtokosra utal. Az ő névmás mindkettőben változatlan.',
      'Az ő könyve — его/её книга; az ő könyvük — их книга. Местоимение ő не меняется.']);

  // Az eredetileg csak rövid szabályt és tesztet tartalmazó nyolc A1–A2
  // leckéhez saját ragozási/szóalaktani táblázatot is szerkesztünk.
  // Ez a táblázatos, összehasonlító szemlélet a feltöltött orosz nyelvű
  // nyelvtankönyv szerkezetéből indul ki; sem a szöveg, sem a táblázat másolat.
  const baseTables = {
    'A magyar magánhangzók': {heads: ['Rövid / Краткий', 'Hosszú / Долгий', 'Szópéldák / Примеры'], rows: [
      ['a', 'á', 'kap – kár'], ['e', 'é', 'kert – kép'], ['i', 'í', 'cipő – híd'],
      ['o', 'ó', 'kor – kór'], ['ö', 'ő', 'öröm – ősz'], ['u', 'ú', 'kutya – út'],
      ['ü', 'ű', 'üveg – tűz']
    ]},
    'A létige: vagyok, vagy, van': {heads: ['Személy / Лицо', 'lenni – jelen idő', 'Oroszul / По-русски'], rows: [
      ['én', 'vagyok', 'я есть / нахожусь'], ['te', 'vagy', 'ты есть / находишься'],
      ['ő', 'van', 'он/она находится'], ['mi', 'vagyunk', 'мы находимся'],
      ['ti', 'vagytok', 'вы находитесь'], ['ők', 'vannak', 'они находятся']
    ]},
    'Határozatlan igeragozás – jelen idő': {heads: ['Személy / Лицо', 'tanul', 'beszél'], rows: [
      ['én', 'tanulok', 'beszélek'], ['te', 'tanulsz', 'beszélsz'],
      ['ő', 'tanul', 'beszél'], ['mi', 'tanulunk', 'beszélünk'],
      ['ti', 'tanultok', 'beszéltek'], ['ők', 'tanulnak', 'beszélnek']
    ]},
    'Magánhangzó-harmónia: -ban/-ben': {heads: ['Alapszó / Основа', 'Hely: hol? / Где?', 'Rag / Окончание'], rows: [
      ['ház', 'házban', '-ban'], ['kert', 'kertben', '-ben'],
      ['szoba', 'szobában', '-ban'], ['terem', 'teremben', '-ben']
    ]},
    'Tárgyrag: -t': {heads: ['Alapszó / Основа', 'Tárgyeset / Винительный', 'Mi történik? / Изменение'], rows: [
      ['alma', 'almát', 'a → á + t'], ['körte', 'körtét', 'e → é + t'],
      ['könyv', 'könyvet', 'kötőhangzó + t'], ['víz', 'vizet', 'í → i, kötőhangzó + t'],
      ['busz', 'buszt', '+ t']
    ]},
    'Határozott és határozatlan ragozás': {heads: ['Személy / Лицо', 'Határozatlan / Неопр.', 'Határozott / Опр.'], rows: [
      ['én', 'olvasok', 'olvasom'], ['te', 'olvasol', 'olvasod'],
      ['ő', 'olvas', 'olvassa'], ['mi', 'olvasunk', 'olvassuk'],
      ['ti', 'olvastok', 'olvassátok'], ['ők', 'olvasnak', 'olvassák']
    ]},
    'Hová? Hol? Honnan?': {heads: ['Alapszó', 'Hová? / Куда?', 'Hol? / Где?', 'Honnan? / Откуда?'], rows: [
      ['iskola', 'iskolába', 'iskolában', 'iskolából'],
      ['bolt', 'boltba', 'boltban', 'boltból'],
      ['szoba', 'szobába', 'szobában', 'szobából'],
      ['kert', 'kertbe', 'kertben', 'kertből']
    ]},
    'A múlt idő alapjai': {heads: ['Személy / Лицо', 'tanul – múlt idő', 'olvas – múlt idő'], rows: [
      ['én', 'tanultam', 'olvastam'], ['te', 'tanultál', 'olvastál'],
      ['ő', 'tanult', 'olvasott'], ['mi', 'tanultunk', 'olvastunk'],
      ['ti', 'tanultatok', 'olvastatok'], ['ők', 'tanultak', 'olvastak']
    ]}
  };
  if (!Array.isArray(window.GRAMMAR_TOPICS)) throw new Error('A nyelvtani leckék még nincsenek betöltve.');
  const assigned = new Set();
  for (const chapter of chapters) {
    const topic = window.GRAMMAR_TOPICS.find(t => t.title === chapter.title && ['A1', 'A2'].includes(t.level));
    if (!topic) throw new Error(`Hiányzik a tankönyvi lecke: ${chapter.title}`);
    if (assigned.has(topic.title)) throw new Error(`Ismétlődő tankönyvi lecke: ${chapter.title}`);
    topic.lesson = chapter;
    if (!topic.table && baseTables[topic.title]) topic.table = baseTables[topic.title];
    assigned.add(topic.title);
  }
  const a1a2 = window.GRAMMAR_TOPICS.filter(t => t.level === 'A1' || t.level === 'A2');
  if (a1a2.some(t => !t.lesson)) throw new Error('Minden A1–A2 nyelvtani leckéhez tananyagot kell készíteni.');
  window.GRAMMAR_TEXTBOOK_INFO = Object.freeze({chapters: chapters.length});
})();
