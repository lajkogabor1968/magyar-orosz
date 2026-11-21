// Saját készítésű, A2-es olvasott szövegértési tananyag. A feladatok nem a mintakép szövegének átiratai.
window.A2_READING_LESSONS = [
  {
    id: 'viktor-reggele',
    title: 'Viktor szerdai reggele',
    topic: 'Étkezés és napirend',
    paragraphs: [
      'Viktor egy kisvárosban él, és egy bútorüzemben dolgozik. Hétköznap hat óra húsz perckor kel fel. Reggel otthon szokott enni: kenyeret, sajtot és paradicsomot. Teát iszik, mert nem szereti a kávét. A felesége, Irina, később indul munkába, ezért hétköznap ritkán reggeliznek együtt.',
      'Szerdán Viktor észreveszi, hogy elfogyott a kenyér. Útközben bemegy egy pékségbe. Vesz egy zsemlét és egy kis joghurtot. A pékségben sokan várnak, de Viktor gyorsan fizet. A reggelit a munkahelyén, a szünetben eszi meg. Tíz órakor a kollégájával, Annával egy-egy almát esznek.',
      'Délben a munkahelyi étkezdében ebédel. Általában levest és főételt kér, de szerdán csak zöldséges rizst választ. Este Irinával együtt készítenek vacsorát. Tojást sütnek, és friss salátát esznek. Vacsora után húsz percet sétálnak a házuk körül.'
    ],
    glossary: [
      ['bútorüzem', 'мебельная фабрика'], ['elfogyott', 'закончился'],
      ['pékség', 'пекарня'], ['zsemle', 'булочка'],
      ['szünet', 'перерыв'], ['étkezde', 'столовая'],
      ['főétel', 'основное блюдо'], ['útközben', 'по дороге']
    ],
    trueFalse: [
      { text: 'Viktor fél hétkor kel fel.', answer: false, evidence: 'Hétköznap hat óra húsz perckor kel fel.' },
      { text: 'Viktor reggelente kávét iszik.', answer: false, evidence: 'Teát iszik, mert nem szereti a kávét.' },
      { text: 'Szerdán elfogyott otthon a kenyér.', answer: true, evidence: 'Szerdán Viktor észreveszi, hogy elfogyott a kenyér.' },
      { text: 'Viktor a pékségben eszi meg a reggelijét.', answer: false, evidence: 'A reggelit a munkahelyén, a szünetben eszi meg.' },
      { text: 'Tíz órakor Annával almát esznek.', answer: true, evidence: 'Tíz órakor a kollégájával, Annával egy-egy almát esznek.' },
      { text: 'Vacsora után húsz percet sétálnak.', answer: true, evidence: 'Vacsora után húsz percet sétálnak a házuk körül.' }
    ],
    multipleChoice: [
      { text: 'Miért megy Viktor szerdán a pékségbe?', options: ['Mert elfogyott a kenyér.', 'Mert ott dolgozik.', 'Mert Irinával találkozik.'], answer: 0, evidence: 'Szerdán Viktor észreveszi, hogy elfogyott a kenyér.' },
      { text: 'Hol ebédel Viktor?', options: ['A pékségben.', 'A munkahelyi étkezdében.', 'Anna lakásán.'], answer: 1, evidence: 'Délben a munkahelyi étkezdében ebédel.' },
      { text: 'Mit készítenek este?', options: ['Levest és rizst.', 'Szendvicset és joghurtot.', 'Tojást és salátát.'], answer: 2, evidence: 'Tojást sütnek, és friss salátát esznek.' }
    ],
    fill: { text: 'A reggelit a munkahelyén, a ___ eszi meg.', options: ['szünetben', 'pályaudvaron', 'kertben'], answer: 0, evidence: 'A reggelit a munkahelyén, a szünetben eszi meg.' },
    shortAnswers: [
      { text: 'Mikor kel fel Viktor hétköznap?', sample: 'Hat óra húsz perckor.', evidence: 'Hétköznap hat óra húsz perckor kel fel.' },
      { text: 'Hol eszi meg szerdán a reggelijét?', sample: 'A munkahelyén, a szünetben.', evidence: 'A reggelit a munkahelyén, a szünetben eszi meg.' }
    ],
    open: { question: 'Te mit szoktál enni és inni reggelire?', sample: 'Reggelire kenyeret és sajtot eszem, és teát iszom.' }
  },
  {
    id: 'maria-busza',
    title: 'Mária új buszmegállója',
    topic: 'Közlekedés és munka',
    paragraphs: [
      'Mária egy faluban lakik, és a közeli városban dolgozik egy könyvesboltban. Minden reggel hét óra tíz perckor indul otthonról. Általában busszal megy, és körülbelül fél óra alatt ér a munkahelyére. A buszmegálló öt perc sétára van a lakásától.',
      'Csütörtökön a szokásos busz nem érkezik meg. A megállóban egy táblán ez áll: „Útépítés miatt a járat ma másik utcából indul.” Mária nem ismeri az új megállót, ezért megkérdez egy idős férfit. A férfi megmutatja neki, merre kell mennie. Az új megálló a gyógyszertár mellett van, két utcával arrébb.',
      'Mária gyorsan odasétál, és még eléri a buszt. A szokásosnál tíz perccel később ér a könyvesboltba. Felhívja a főnökét, aki megköszöni, hogy szólt. Munka után Mária megnézi a busztársaság honlapját, hogy másnap honnan indul a busz.'
    ],
    glossary: [
      ['könyvesbolt', 'книжный магазин'], ['buszmegálló', 'автобусная остановка'],
      ['útépítés', 'дорожные работы'], ['járat', 'рейс'],
      ['gyógyszertár', 'аптека'], ['eléri a buszt', 'успевает на автобус'],
      ['főnök', 'начальник'], ['honlap', 'сайт']
    ],
    trueFalse: [
      { text: 'Mária könyvesboltban dolgozik.', answer: true, evidence: 'Mária egy faluban lakik, és a közeli városban dolgozik egy könyvesboltban.' },
      { text: 'Mária általában autóval jár munkába.', answer: false, evidence: 'Általában busszal megy, és körülbelül fél óra alatt ér a munkahelyére.' },
      { text: 'Csütörtökön a busz a szokásos helyről indul.', answer: false, evidence: 'Útépítés miatt a járat ma másik utcából indul.' },
      { text: 'Mária egy férfitól kér segítséget.', answer: true, evidence: 'Mária nem ismeri az új megállót, ezért megkérdez egy idős férfit.' },
      { text: 'Az új megálló a gyógyszertár mellett van.', answer: true, evidence: 'Az új megálló a gyógyszertár mellett van, két utcával arrébb.' },
      { text: 'Mária a szokásos időben ér a könyvesboltba.', answer: false, evidence: 'A szokásosnál tíz perccel később ér a könyvesboltba.' }
    ],
    multipleChoice: [
      { text: 'Miért változott meg a busz indulási helye?', options: ['Útépítés miatt.', 'Ünnepnap miatt.', 'Rossz idő miatt.'], answer: 0, evidence: 'Útépítés miatt a járat ma másik utcából indul.' },
      { text: 'Mennyivel később ér Mária a munkahelyére?', options: ['Öt perccel.', 'Tíz perccel.', 'Harminc perccel.'], answer: 1, evidence: 'A szokásosnál tíz perccel később ér a könyvesboltba.' },
      { text: 'Mikor nézi meg Mária a busztársaság honlapját?', options: ['Indulás előtt.', 'Ebédszünetben.', 'Munka után.'], answer: 2, evidence: 'Munka után Mária megnézi a busztársaság honlapját, hogy másnap honnan indul a busz.' }
    ],
    fill: { text: 'A buszmegálló öt perc ___ van a lakásától.', options: ['sétára', 'vonattal', 'ebédre'], answer: 0, evidence: 'A buszmegálló öt perc sétára van a lakásától.' },
    shortAnswers: [
      { text: 'Hol van az új buszmegálló?', sample: 'A gyógyszertár mellett.', evidence: 'Az új megálló a gyógyszertár mellett van, két utcával arrébb.' },
      { text: 'Kit hív fel Mária, amikor később érkezik?', sample: 'A főnökét.', evidence: 'Felhívja a főnökét, aki megköszöni, hogy szólt.' }
    ],
    open: { question: 'Te hogyan jársz munkába vagy iskolába?', sample: 'Általában busszal járok munkába. Az út húsz percig tart.' }
  },
  {
    id: 'szombati-bevasarlas',
    title: 'Bevásárlás a vendégek előtt',
    topic: 'Vásárlás és vendégség',
    paragraphs: [
      'Zsófi és Anton szombaton vendégeket várnak. Két barátjuk jön hozzájuk délután négy órára. Zsófi gyümölcssalátát szeretne készíteni, Anton pedig melegszendvicseket. Péntek este listát írnak: alma, banán, joghurt, kenyér, sajt és paradicsom.',
      'Szombat délelőtt a közeli boltba mennek. Először a gyümölcsöket keresik. Az alma a bejárat mellett van, de banánt nem találnak. Az eladó azt mondja, hogy a banán délután érkezik. Zsófi ezért körtét vesz helyette. Anton két csomag sajtot választ, mert a vendégek nagyon szeretik a sajtos szendvicset.',
      'A pénztárnál észreveszik, hogy otthon maradt a vászontáska. Húsz forintért vesznek egy papírtáskát. Bankkártyával fizetnek, majd hazamennek. Délután háromkor közösen elkészítik az ételeket. A vendégek pontosan négykor érkeznek.'
    ],
    glossary: [
      ['vendég', 'гость'], ['gyümölcssaláta', 'фруктовый салат'],
      ['melegszendvics', 'горячий бутерброд'], ['bejárat', 'вход'],
      ['helyette', 'вместо него'], ['vászontáska', 'тканевая сумка'],
      ['papírtáska', 'бумажный пакет'], ['pénztár', 'касса']
    ],
    trueFalse: [
      { text: 'Zsófi és Anton két vendéget várnak.', answer: true, evidence: 'Két barátjuk jön hozzájuk délután négy órára.' },
      { text: 'Anton gyümölcssalátát szeretne készíteni.', answer: false, evidence: 'Zsófi gyümölcssalátát szeretne készíteni, Anton pedig melegszendvicseket.' },
      { text: 'A boltban találnak banánt.', answer: false, evidence: 'Az alma a bejárat mellett van, de banánt nem találnak.' },
      { text: 'A banán csak délután érkezik.', answer: true, evidence: 'Az eladó azt mondja, hogy a banán délután érkezik.' },
      { text: 'Zsófi és Anton magukkal hozták a vászontáskát.', answer: false, evidence: 'A pénztárnál észreveszik, hogy otthon maradt a vászontáska.' },
      { text: 'Bankkártyával fizetnek.', answer: true, evidence: 'Bankkártyával fizetnek, majd hazamennek.' }
    ],
    multipleChoice: [
      { text: 'Mit vesz Zsófi banán helyett?', options: ['Körtét.', 'Narancsot.', 'Epret.'], answer: 0, evidence: 'Zsófi ezért körtét vesz helyette.' },
      { text: 'Miért vesznek papírtáskát?', options: ['Mert ajándékot csomagolnak.', 'Mert otthon maradt a vászontáska.', 'Mert a papírtáska ingyenes.'], answer: 1, evidence: 'A pénztárnál észreveszik, hogy otthon maradt a vászontáska.' },
      { text: 'Mikor érkeznek a vendégek?', options: ['Délben.', 'Háromkor.', 'Négykor.'], answer: 2, evidence: 'A vendégek pontosan négykor érkeznek.' }
    ],
    fill: { text: 'Az alma a ___ mellett van.', options: ['bejárat', 'pénztár', 'parkoló'], answer: 0, evidence: 'Az alma a bejárat mellett van, de banánt nem találnak.' },
    shortAnswers: [
      { text: 'Mit szeretne készíteni Anton?', sample: 'Melegszendvicseket.', evidence: 'Zsófi gyümölcssalátát szeretne készíteni, Anton pedig melegszendvicseket.' },
      { text: 'Miért vesznek papírtáskát?', sample: 'Mert otthon maradt a vászontáska.', evidence: 'A pénztárnál észreveszik, hogy otthon maradt a vászontáska.' }
    ],
    open: { question: 'Mit vásárolsz, ha két barátod jön hozzád?', sample: 'Kenyeret, sajtot és gyümölcsöt vásárolok. Szendvicset készítek.' }
  },
  {
    id: 'kozos-delutan',
    title: 'Új szomszédok, közös délután',
    topic: 'Lakóhely és társas kapcsolatok',
    paragraphs: [
      'Olga két hete költözött egy szegedi társasházba. A szomszédai kedvesek, de még nem ismer mindenkit. Pénteken találkozik a lépcsőházban Évával, aki a második emeleten lakik. Éva meghívja őt a közös udvarba szombat délutánra.',
      'Szombaton négy szomszéd találkozik az udvaron. Éva limonádét hoz, Tamás szendvicseket készít, Olga pedig almás süteményt süt. A gyerekek labdáznak, a felnőttek pedig beszélgetnek. Olga elmeséli, hogy nemrég kezdett magyarul tanulni. Éva lassabban beszél hozzá, és néha segít egy-egy szóval.',
      'Öt óra körül elered az eső. A szomszédok gyorsan beviszik az ételt a lépcsőházba. Tamás azt javasolja, hogy jövő héten a közös teremben találkozzanak. Olga örül, mert szeretne jobban megismerkedni velük. Hazafelé Éva megadja neki a telefonszámát.'
    ],
    glossary: [
      ['társasház', 'многоквартирный дом'], ['szomszéd', 'сосед'],
      ['lépcsőház', 'подъезд'], ['meghív', 'приглашать'],
      ['közös udvar', 'общий двор'], ['almás sütemény', 'яблочный пирог'],
      ['elered az eső', 'начинается дождь'], ['közös terem', 'общее помещение']
    ],
    trueFalse: [
      { text: 'Olga két hete költözött a házba.', answer: true, evidence: 'Olga két hete költözött egy szegedi társasházba.' },
      { text: 'Éva az első emeleten lakik.', answer: false, evidence: 'Pénteken találkozik a lépcsőházban Évával, aki a második emeleten lakik.' },
      { text: 'Olga limonádét hoz a találkozóra.', answer: false, evidence: 'Éva limonádét hoz, Tamás szendvicseket készít, Olga pedig almás süteményt süt.' },
      { text: 'Éva lassabban beszél Olgához.', answer: true, evidence: 'Éva lassabban beszél hozzá, és néha segít egy-egy szóval.' },
      { text: 'Öt óra körül esni kezd.', answer: true, evidence: 'Öt óra körül elered az eső.' },
      { text: 'Tamás azt javasolja, hogy jövő héten is az udvaron találkozzanak.', answer: false, evidence: 'Tamás azt javasolja, hogy jövő héten a közös teremben találkozzanak.' }
    ],
    multipleChoice: [
      { text: 'Hol találkoznak szombaton a szomszédok?', options: ['A közös udvaron.', 'Egy étteremben.', 'A buszmegállóban.'], answer: 0, evidence: 'Szombaton négy szomszéd találkozik az udvaron.' },
      { text: 'Mit készít Olga?', options: ['Szendvicset.', 'Almás süteményt.', 'Limonádét.'], answer: 1, evidence: 'Éva limonádét hoz, Tamás szendvicseket készít, Olga pedig almás süteményt süt.' },
      { text: 'Miért örül Olga a következő találkozónak?', options: ['Mert új állást keres.', 'Mert elutazhat.', 'Mert jobban megismerheti a szomszédokat.'], answer: 2, evidence: 'Olga örül, mert szeretne jobban megismerkedni velük.' }
    ],
    fill: { text: 'Hazafelé Éva megadja Olgának a ___.', options: ['telefonszámát', 'lakáskulcsát', 'könyvét'], answer: 0, evidence: 'Hazafelé Éva megadja neki a telefonszámát.' },
    shortAnswers: [
      { text: 'Melyik emeleten lakik Éva?', sample: 'A második emeleten.', evidence: 'Pénteken találkozik a lépcsőházban Évával, aki a második emeleten lakik.' },
      { text: 'Hogyan segít Éva Olgának a beszélgetésben?', sample: 'Lassabban beszél, és néha egy-egy szóval segít.', evidence: 'Éva lassabban beszél hozzá, és néha segít egy-egy szóval.' }
    ],
    open: { question: 'Mit mondasz, amikor új szomszéddal találkozol?', sample: 'Jó napot! Olga vagyok, most költöztem ide. Örülök, hogy találkoztunk.' }
  }
];

// Eredeti rövid üzenetek: témacím-párosítás két fölösleges címmel.
window.A2_HEADING_MATCHING = {
  title: 'Hat rövid hír a városból',
  headings: [
    ['pool', 'Családi sportprogram'],
    ['garden', 'Közös kertészkedés'],
    ['housing', 'Új lakás keresése'],
    ['library', 'Könyvtári program'],
    ['bread', 'Friss pékáru'],
    ['music', 'Zenei előadás'],
    ['bus', 'Megváltozott buszmegálló'],
    ['language', 'Magyar nyelvgyakorlás']
  ],
  notices: [
    { text: 'A helyi könyvtárban péntek délután felolvasás lesz. A gyerekek elhozhatják a kedvenc könyvüket is.', answer: 'library' },
    { text: 'A 6-os busz holnap nem áll meg a főtéren. Az utasok a következő utcában szállhatnak fel.', answer: 'bus' },
    { text: 'Az uszodában vasárnap délelőtt családi úszás lesz. A kisebb gyerekeknek külön medencét készítenek.', answer: 'pool' },
    { text: 'A pékség pénteken reggel hatkor nyit. Friss rozskenyeret és túrós péksüteményt is lehet vásárolni.', answer: 'bread' },
    { text: 'A parkban szombaton közösen virágokat ültetnek a lakók. Aki szeretne segíteni, hozzon kis lapátot és kesztyűt!', answer: 'garden' },
    { text: 'Kedden este kezdődik a kezdő magyar beszélgetőcsoport. Rövid bemutatkozásokat és bolti párbeszédeket gyakorolnak.', answer: 'language' }
  ],
  glossary: [
    ['felolvasás', 'чтение вслух'],
    ['főtér', 'центральная площадь'],
    ['medence', 'бассейн'],
    ['rozskenyér', 'ржаной хлеб'],
    ['ültetnek', 'сажают'],
    ['kesztyű', 'перчатки']
  ]
};
