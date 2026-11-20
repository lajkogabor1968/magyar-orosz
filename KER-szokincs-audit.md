# Magyar–orosz Tanulóműhely – KER-szókincs audit (2026-11-18)

## Külső szakmai támpontok
- Nyelviskolák Szakmai Egyesülete (NYESZE), magyar nyelvű KER-szintleírás, hallás, olvasás, társalgás, folyamatos beszéd és írás: https://nyelviskola.hu/kozos-europai-referenciakeret-szintek
- Európa Tanács: CEFR Companion Volume, 2020: https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions
- CEFR szintleírások: https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions
- Magyar mint idegen nyelv mérése és értékelése: https://btk.kre.hu/nyelveszet/images/mpt-wk_web_2019.pdf

A KER nem határoz meg kötelező 600/1200/2000 szavas jegyzéket. Szintezéskor a kommunikatív funkció, lexikai gyakoriság, fogalom és mondattani környezet a mérvadó. Az elemszám alkalmazásfejlesztési cél, nem hivatalos megfelelőségi igazolás.

## Jelenlegi adatok (alap-adat + kiegészítés)
| Szint | Bejegyzés | Különböző címszó (kisbetűs egyezés) | Azonos címszavú többlet |
|---|---:|---:|---:|
| A1 | 600 | 580 | 20 |
| A2 | 1009 | 992 | 17 |
| B1 | 273 | 270 | 3 |
| B2 | 14 | 14 | 0 |

Megjegyzés: a különböző jelentések legitim módon ismételhetnek címszót. A fenti számok nem jelentenek automatikusan hibás duplikációt.

## Minőségellenőrzés: előszűrő, nem kézi minősítés
Sablonosnak vagy pedagógiailag kevéssé hasznosnak jelölt példamondatok száma: A1 204; A2 651; B1 147; B2 7. Ezek heurisztikus találatok: nem mind hibásak. Az „Ez egy alma.” például szabályos A1 mondat.

## Elvégzett javítás
17 egyértelműen problémás példamondat, illetve orosz fordítás javítva a data.js állományban 2026-11-18-án.

## Következő minőségi kapuk
1. Címszó szerinti jelentéskülönbségek és valódi duplikációk tételes áttekintése.
2. Példamondatok helyessége, természetessége, a címszó tényleges használata.
3. Orosz fordítások szemantikai és nyelvtani ellenőrzése.
4. Szintbesorolás élethelyzet és KER kommunikációs cél alapján (nem csak szóhossz szerint).
5. Új bejegyzések deduplikálása, és azonos elemszám ellenőrzése minden betöltési helyen.
6. A2 cél: 1200, B1 cél: 2000 csak az ellenőrzött anyag elkészülte után.

## Publikálás
A teljes forrásadat nem módosult szerkezetileg, a betöltési sorrend változatlan. A bejegyzéseket a data.js és ecl-vocab.js együtt biztosítja. A felülvizsgálat még nem teljes körű; az audit megállapításait nem szabad kész KER-minősítésként értelmezni.

## Kiegészítő besorolási módszer (NYESZE)
A szókincset a készségleírásokhoz rendeljük: A1: személyes alapadatok és alapvető mondatok; A2: rövid egyszerű üzenetek és gyakori hétköznapi cselekvések; B1: ismert témákon önálló beszámoló, indoklás és utazási helyzetek; B2: részletes érvelés, nézőpontok és előnyök–hátrányok mérlegelése. Ez nem kötelező szószám-szabvány.

## A1–A2 munkaszakasz – 2026-11-18
- Az A1-lista összesen 600 bejegyzés, változatlan.
- Az A2-lista 1009-ről 1200 bejegyzésre bővült: 191 új, négymezős magyar–orosz szó és gyakorlati kifejezés.
- Mind a 191 új elem egyedi címszót használ az A2 addigi címszavaihoz képest; az ellenőrzés nem garantálja az összes korábbi jelentésbeli duplikáció megszűnését.
- Az A1–A2 alaplistában 22 további magyar példamondat és orosz mondatfordítás javult a jelenlegi munkaszakaszban.
- A program betöltő- és főoldali számlálói ellenőrizve: A1 600, A2 1200, B1 273, B2 14, összesen 2087.
- Fontos nyitott feladat: az eredeti teljes A1–A2 állomány mondatonkénti kézi nyelvi auditja és a legitim többjelentésű címszavak elkülönítése. A 1200 darab nem jelent hivatalos KER-megfelelőségi tanúsítást.

## B1 fejlesztési kör – 2026-11-18
- **158 új B1-es bejegyzés** került a kiegészítő szókincsfájlba; a B1 elemszáma **273-ról 431-re** nőtt.
- Témák: érvelés és vélemény, nézőpontok összevetése, történetmesélés, személyes tapasztalat, tervek, együttműködés, konfliktusok, munkahely és tanulási folyamat.
- Minden új bejegyzés négy mezőt tartalmaz: magyar címszó/kifejezés, orosz jelentés, természetes magyar példamondat és annak orosz fordítása.
- Az új 158 magyar címszó sem egymást, sem a korábbi B1-es címszavak kisbetűs alakját nem ismétli.
- Ellenőrzött technikai összesítés: A1 600, A2 1200, B1 431, B2 14, összesen 2245 bejegyzés.
- A **B1 cél továbbra is 2000**, ezért még 1569 új, ellenőrzött bejegyzés szükséges; a szintet nem jelöljük teljesnek.
- Forrás: Európa Tanács KER B1 globális szintleírás https://www.coe.int/en/web/common-european-framework-reference-languages/table-%201-cefr-3.3-common-reference-levels-global-scale (érthető közlés, ismerős helyzetek, tapasztalatok, tervek és indoklás).
- Nyitott minőségellenőrzés: a korábbi sablonos B1 példamondatok és az orosz fordítások tételes felülvizsgálata.

## A1 nyelvi ellenőrzés – 1. adag (2026-11-20)

- **Átnézett tartomány:** az A1-es lista első 251 bejegyzése, azaz `A1:0`–`A1:250` (a tanulói azonosítók nullától indulnak).
- **43 javított bejegyzés:** 38 esetben a magyar példamondatot és az orosz mondatfordítást együtt, 5 esetben csak az orosz fordítást pontosítottuk. A címszavakat, a szótári jelentéseket, az elemek sorrendjét és a négymezős adatszerkezetet nem módosítottuk.
- **Cél:** a pusztán rámutató, tanulási szempontból kevésbé értékes mondatok (például „Ez a liter.”) lecserélése rövid, természetes, hétköznapi A1-es közlésekre; néhány szemantikai és megfogalmazási pontatlanság javítása.
- **Javított azonosítók:** `A1:6`, `A1:46`, `A1:50`, `A1:53`, `A1:125`, `A1:135`–`A1:137`, `A1:155`, `A1:160`–`A1:161`, `A1:164`, `A1:168`, `A1:172`–`A1:173`, `A1:176`, `A1:181`–`A1:182`, `A1:184`, `A1:189`, `A1:194`, `A1:196`, `A1:202`–`A1:206`, `A1:208`, `A1:211`, `A1:216`, `A1:218`–`A1:220`, `A1:222`, `A1:224`, `A1:228`–`A1:231`, `A1:234`, `A1:242`, `A1:245`, `A1:250`.

| Szócikk | Korábbi példamondat | Javított magyar mondat | Javított orosz fordítás |
|---|---|---|---|
| futball (`A1:125`) | Ez a futball. | Szeretem a futballt. | Я люблю футбол. |
| haj (`A1:135`) | Ez a haj. | Hosszú a hajam. | У меня длинные волосы. |
| karácsony (`A1:184`) | Ez a karácsony. | Karácsonykor együtt vagyunk. | На Рождество мы вместе. |
| liter (`A1:230`) | Ez a liter. | Egy liter tejet kérek. | Мне литр молока, пожалуйста. |
| metró (`A1:250`) | Ez a metró. | Metróval megyek. | Я еду на метро. |

**Technikai ellenőrzés:** A1 = 600, A2 = 1200, B1 = 431, B2 = 14; összesen 2245 bejegyzés. A változások csak A1-példamondatokat és -fordításokat érintenek, más szintek és tanulói azonosítók nem változtak. Az előre rögzített magyar MP3-ok egyetlen meglévő mondatkulcsát sem érintette a módosítás; a manifestben szereplő összes fájl létezik.

**Fontos korlát:** ez első körös, célzott nyelvi átnézés, **nem** teljes körű anyanyelvi lektorálás vagy hivatalos A1-minősítés. További feladat: `A1:251`–`A1:599` ellenőrzése, az első 251 bejegyzés második nyelvi ellenőrzése, majd orosz anyanyelvű próbatanulók bevonása.

## A1 nyelvi ellenőrzés – 2. adag (2026-11-20)

- **Átnézett tartomány:** `A1:251`–`A1:350` (100 további bejegyzés).
- **38 javított bejegyzés:** 37 természetesebb, pontosan lefordított magyar példamondat és egy jelentésbeli pontosítás (`nincs(en)`: a „нет (в наличии)” túl szűk, helyette „нет; отсутствует”).
- **Összesített első körös lefedettség:** 351/600 A1-es bejegyzés (58,5%); **hátralévő 249:** `A1:351`–`A1:599`.
- **Tanulói azonosítók és szólista-sorrend:** változatlanok. A korábban felvett magyar MP3-mondatok közül egy sem veszítette el a hozzá tartozó szövegkulcsot.

| Szócikk | Korábbi, kevéssé használható példa | Pontosabb magyar példa | Orosz fordítás |
|---|---|---|---|
| negyed (`A1:277`) | Ez a negyed. | Negyed óra múlva jövök. | Я приду через четверть часа. |
| nem (`A1:279`) | Nem kérek kávét. | Nem iszom kávét. | Я не пью кофе. |
| nadrág (`A1:269`) | Ez a nadrág. | Ez a nadrág kék. | Эти брюки синие. |
| ruha (`A1:340`) | Ez a ruha. | Ez a ruha piros. | Это красное платье. |
| segítség (`A1:346`) | Ez a segítség. | Segítségre van szükségem. | Мне нужна помощь. |

### Kötelező minőségi ellenőrzőlista a következő adagokhoz

1. A címszó jelentése és nyelvtani szerepe helyes; a többjelentésű szavak nincsenek félrevezetően összevonva.
2. A magyar példamondat hétköznapi, természetes, az A1-en értelmezhető élethelyzetet mutatja; az adott címszót ténylegesen használja.
3. Az orosz mondat ugyanazt jelenti, megfelelő eset- és igealakkal; a nemi, udvariassági és stiláris eltérések nem vezetnek hibás általánosításhoz.
4. A kétséges megfeleltetéseket **nem** tekintjük ellenőrzöttnek: külön felülvizsgálatot és lehetőség szerint orosz anyanyelvi kontrollt igényelnek.
5. Minden módosítás után vizsgáljuk a négymezős adatokat, az elemszámokat, a szócikkazonosítókat és az előre felvett hangok kapcsolódó szövegkulcsait.

**Állapot:** az első átnézés nem jelent végleges lektorálást. Az A1 anyagot még nem szabad bizonyítottan hibamentesnek minősíteni. Következő: `A1:351`–`A1:599` és a korábbi adagok második, szigorú ellenőrzése.

## A1 nyelvi ellenőrzés – 3. adag (2026-11-20)

- **Átnézett tartomány:** `A1:351`–`A1:599` (249 bejegyzés: 103 alaplistabeli és 146 kiegészítő).
- **66 pontosított bejegyzés:** a túlságosan sablonos vagy félreérthető példamondatokat hétköznapi közlések váltották fel; egyes orosz fordítások és jelentések is pontosabbak lettek. A változtatások teljes mezőnkénti listája az `a1-audit-2026-11-20-batch3.json` fájlban található.
- **Első körös lefedettség:** 600/600 (100%); ez **nem** egyenértékű a nyelvileg hibamentes, anyanyelvi vagy hivatalos KER szerinti lektorálással. Minden bejegyzés második ellenőrzése, a többjelentésű címszavak felülvizsgálata és orosz anyanyelvi kontroll továbbra is szükséges.
- **Megőrzött adatok:** valamennyi címszó, szócikkazonosító és sorrend változatlan. Szintenkénti elemszámok: A1 600, A2 1200, B1 431, B2 14. Az A2–B2 tételek és a tanulói eredmények tárolási kódja nem módosult.

| Szócikk | Pontosítás | Magyar példa | Orosz megfelelő |
|---|---|---|---|
| szemüveg (`A1:369`) | Hasznos hétköznapi kérdés | Hol a szemüvegem? | Где мои очки? |
| tegnap (`A1:406`) | Nemtől független múlt idejű példa | Tegnap hideg volt. | Вчера было холодно. |
| vagy (`A1:435`) | Az orosz nyelvben a jelen idejű létige rendszerint hiányzik | Te otthon vagy. | Ты дома. |
| benne (`A1:461`) | A hivatkozott tárgy a mondatban is megjelenik | A táskában van a kulcs? – Igen, benne van. | Ключ в сумке? — Да, он в ней. |
| közvetlen (`A1:576`) | A vonat itt átszállás nélkül közlekedik | Ez egy közvetlen vonat. | Это поезд без пересадок. |

**Automatikus szerkezeti ellenőrzés:** mind a 66 szócikk pontosan a dokumentált mezőiben módosult; minden sor négy nem üres szöveges mezőből áll; az összes szint szószáma és címszósorrendje egyezik a kiinduló verzióéval. A magyar MP3-manifest 57 hivatkozása létező fájlra mutat. Az ellenőrzés két, már korábbról eltérő hangszövegkulcsot mutatott (`Ez egy amerikai ember.`, `Ez egy angol ember.`): ezek a jelenlegi A1-mondatoktól eltérnek, tehát ezen két mondat új felvétel nélkül a készülék beszédszintézisére szorulhat. Régi felvételt **nem** rendeltünk hibás szöveghez.

**Következő minőségi kapu:** az A1 teljes második, szigorú nyelvi ellenőrzése, különösen az egyalakú többjelentésű szavak, a természetes A1-es mondatok, a magyar–orosz megfelelések, valamint a tényleges hangos lejátszás célzott tesztje. A2/B1/B2 bővítését addig nem kezdjük el.

## A1 második nyelvi ellenőrzés – 2026-11-20

- **Átnézett tartomány:** `A1:0`–`A1:599`, mind a 600 szócikk. A második körben **28 további pontosítás** készült az `a1-audit-2026-11-20-second-pass.json` változásnapló szerint.
- **Kiemelt szempont:** a magyarban hiányzó grammatikai nem miatt félrevezető orosz személyes mondatok, a természetellenes példák, a szó jelentésének pontossága és az egyszerű kommunikációs helyzetek.
- **Néhány célzott példa:** `A1:41` – „Bocsánat, késtem.” / „Извините за опоздание.” (nemtől független); `A1:119` – „Kártyával fizetek.” / „Я плачу картой.” (egyértelmű fizetési helyzet); `A1:415` – „A testvérem neve Anna.” / „Мою сестру зовут Анна.” (a magyar *testvér* nemsemlegességének figyelembevétele).
- **Tudatosan nem lezárt esetek:** a `nap`, `ruha`, `testvér`, `dinnye`, `földszint` és `helyjegy` szó jelentésének/használatának vizuális, tanulói vagy orosz anyanyelvű kontrollja továbbra is indokolt; részletes lista a változásnaplóban.
- **Stabilitás:** az eredeti címszó, az azonosító és a sorrend egyetlen tételnél sem változott. A1 600, A2 1200, B1 431, B2 14; az A2–B2 tartalom és a tanulói eredménykezelés változatlan.
- **Automatikus minőségi kapu:** `node magyar-orosz/verify-a1.mjs` ellenőrzi a négymezős rekordokat, a szintek elemszámát, az A1-azonosítók sorrendjének lenyomatát, valamint a magyar MP3-fájlokat. A teszt zöld, de két *korábbi* felvétel szövegkulcsa még elavult: „Ez egy amerikai ember.” és „Ez egy angol ember.” Az új mondatokhoz hangot kell újragenerálni, nem szabad a régi hangot más szöveghez hozzárendelni. A tananyag és a hanglejátszás telefonos, anyanyelvi tesztje még hátravan.
- **Hangállomány külön diagnosztika:** a manifestben hivatkozott mind az 57 MP3 fájl olvasható, a dekódolási/fejlécellenőrzés sikeres; a lejátszási hossz 0,65–2,53 másodperc. A mappában egy további, egyelőre nem hivatkozott `audio/hu/a1-005-w.mp3` fájl található. Hangos meghallgatásos ellenőrzés nélkül nem társítottuk hozzá automatikusan a feltételezett címszót.

**Szakmai korlát:** a két belső ellenőrzési kör nem igazol 100%-os nyelvi hibamentességet. Az A1-et külső orosz anyanyelvű lektorálás és valódi próbatanulói teszt nélkül továbbra sem nevezzük véglegesnek. Csak ezek után következhet A2-szintű fejlesztés.

## A2 nyelvi és pedagógiai fejlesztés – 1. adag (2026-11-20)

Az A2-fejlesztés a felhasználó új döntése alapján megkezdődött. A szint kritériuma az Európa Tanács [A2-es globális szintleírása](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-%20cefr-3.3-common-reference-levels-global-scale): ismerős hétköznapi helyzetek és gyakori kifejezések megértése, egyszerű információcsere, saját környezet, család, vásárlás, helyismeret, munka és alapvető szükségletek rövid bemutatása. Az 1200 elem fejlesztési cél, nem KER által előírt szószám.

- **Első átnézett tartomány:** `A2:0`–`A2:120` (121 bejegyzés az 1200-ból, 10,1%).
- **110 pontosított szócikk** jelentése, magyar példamondata és/vagy orosz fordítása szerepel az `a2-audit-2026-11-20-part1.json` naplóban. A többi 11 ellenőrzött bejegyzés változatlan maradt.
- **Kiinduló probléma:** 793/1200 A2-es példamondat jelöltként szerepelt egy szélesebb, sablonokat kereső előszűrőben (például „Ez a bevásárol.”, „Ő ezt mondja: »ahol«.”, „Ő divatosan dolgozik.”). Ezek közül nem mind szükségképpen hibás, de jelentős részük pedagógiailag értéktelen vagy hibás.
- **Az első adag eredménye:** a szélesebb előszűrő szerint 99-ről 3-ra csökkent a mintamondat-találatok száma az első 121 bejegyzésben. A 3 fennmaradó találat valójában értelmes, összetett mondat; az előszűrő álpozitív eredménye.
- **Szigorúbb technikai ellenőrzés:** `node magyar-orosz/verify-a2.mjs` a 600/1200/431/14 elemszámot, a négymezős adatokat, az A2-sorrendet, az első 121 szócikk egyértelmű semmitmondó sablonjait ellenőrzi. A szigorúbb mintákból az első adagban 0 maradt; **a további 1079 A2-es bejegyzésben még legalább 552 egyértelmű sablon** vár javításra. Ez nem az összes lehetséges nyelvi hiba száma.
- **Megőrzés:** címszavak, azonosítók és sorrend változatlan; az A1/B1/B2 szókincs, a korábbi tanulói eredmények és a meglévő A2-es párbeszédek feladatai nem módosultak.

| A2-szintű cél | Példamondat a javított anyagból | Orosz megfelelő |
|---|---|---|
| Lakáskeresés | Egy kis albérletet keresek a belvárosban. | Я ищу небольшую съёмную квартиру в центре города. |
| Ügyintézés | Kérem, betűzze a nevét! | Пожалуйста, назовите своё имя по буквам! |
| Közlekedés | A következő megállónál átszállunk a villamosra. | На следующей остановке мы пересядем на трамвай. |
| Vásárlás | Tíz deka sajtot kérek. | Мне сто граммов сыра, пожалуйста. |

**Kétséges vagy kontextusfüggő esetek:** `barack`/`baracklé` = őszibarack vagy sárgabarack; `asszony` családi/életkori árnyalat; `diákigazolvány` és `diákjegy` magyar ügyintézési megfelelései. Ezeket további anyanyelvi és tanulói tesztnek kell alávetni. Az A2-szintet jelenleg **nem szabad késznek vagy nyelvileg hitelesítettnek tekinteni**.

**Következő adag:** `A2:121`–`A2:240`, utána további kisebb, azonosítókat megőrző körök; párhuzamosan a tíz A2-es párbeszéd kommunikációs céljának és értékelési logikájának tesztje.

## A2 nyelvi és pedagógiai fejlesztés – 2. adag (2026-11-20)

- **Tételesen átnézett új tartomány:** `A2:121`–`A2:240` (120 bejegyzés); **105 pontosított szócikk**, 15 változatlanul hagyott, elfogadható tétel. A szó- és mondatszintű változtatásokat az `a2-audit-2026-11-20-part2.json` rögzíti.
- **Összes A2-lefedettség:** 241/1200 (20,1%), az első két adagban 215 javított bejegyzés. A további 959 elem tételes nyelvi ellenőrzése még hátra van.
- **Javított mintatípusok:** használhatatlan igemondatok („Szeretnék elindulni.” / hibás orosz példa), mesterséges metanyelvi közlések („Ezt mondom: »felébred«.”), és helytelen szójelentések (például az *erős* nemcsak „сильный”, hanem ételre „острый”).
- **Tudatos jelentéskülönbségek:** az *egész* jelenthet „teljes”-t vagy „eléggé”-t; az *elég* jelenthet „meglehetősen”-t vagy „elegendő”-t; az *esik* jelenthet „leesik”-et vagy „esik az eső”-t. Ezek külön példamondatot kaptak. A *félóra* önálló főnévként („van egy szabad félórám”) egybeírt, a puszta „fél óra” időmérték különírt használatát később nyelvtani magyarázatban is tisztázni kell.
- **Automatikus ellenőrzés:** az átdolgozott `verify-a2.mjs` az első 241 sorban 0 nyilvánvaló, önmagában semmitmondó sablont jelez. A további 959 bejegyzésben egy szigorúbb előszűrés **483 gyanús sablont** talál; ez nem a tényleges hibák teljes száma, és a korábbi, szélesebb szűrő 552 találatával nem hasonlítható közvetlenül össze.
- **Stabilitás:** A1 600, A2 1200, B1 431, B2 14. Címszó, sorrend és tanulói azonosító nem változott. Más szint, az A2-párbeszédek feladatai és a helyi eredménytárolás nem módosultak.

| Funkció | Magyar példa | Orosz megfelelő |
|---|---|---|
| Késés és következmény | Ha nem indulunk most, elkésünk. | Если мы не выйдем сейчас, мы опоздаем. |
| Udvarias vásárlás | Felpróbálhatom ezt a kabátot? | Можно примерить это пальто? |
| Időpont és indulás | A vonat öt perc múlva elindul. | Поезд отправится через пять минут. |
| Képes tevékenység | A városban sok épületet fényképezek. | Я фотографирую много зданий в городе. |

**Korlát:** a második adag sem teljes körű orosz anyanyelvi lektorálás. Külön próbatanulói ellenőrzést igényelnek a magyar igekötők, az orosz igeszemlélet, a nemjelölés és a hétköznapi orosz udvariassági formák. Következő: `A2:241`–`A2:360`.

## A2 nyelvi és pedagógiai fejlesztés – 3. adag (2026-11-20)

- **Tételesen átnézett új tartomány:** `A2:241`–`A2:360` (120 bejegyzés); **116 pontosított szócikk**, 4 változatlan, megfelelő példa. A mezőnkénti pontosításokat az `a2-audit-2026-11-20-part3.json` tartalmazza.
- **Összes A2-lefedettség:** 361/1200 (30,1%), az első három adagban összesen **331 javított bejegyzés**. A további 839 bejegyzés nyelvi átnézése hátravan.
- **Pedagógiai cél:** valós élethelyzetet bemutató rövid mondatok a család, közlekedés, vásárlás, egészségügy, munka és időpont-egyeztetés témaköréből; használhatatlan rámutató mondatok, szókimondó metapéldák és hibás elöljárószó-ragasztások helyett.
- **Tudatos jelentéskülönbségek:** `földszint` a magyar épületben utcaszint, orosz megfogalmazásban rendszerint az első emeleti szint; `hanem` tagadás utáni szembeállítás; `hozzá` és `hozzátok` személyhez, illetve címzetthez irányulás; `húszezres` húszezer **forintos** bankjegy; `halászlé` sajátos magyar paprikás halleves, nem általában minden orosz *уха*.
- **Stabilitás:** valamennyi címszó és sorrend változatlan; A1 600, A2 1200, B1 431, B2 14. A korábbi szintek, a párbeszédek feladatai, valamint a tanulói eredményekhez tartozó azonosítók és tárolási logika nem módosultak.

| Kommunikációs helyzet | Javított magyar mondat | Orosz megfelelő |
|---|---|---|
| Ellentét kifejezése | Nem teát, hanem kávét kérek. | Мне не чай, а кофе, пожалуйста. |
| Egészségügyi ügyintézés | Időpontot kérek a háziorvoshoz. | Я записываюсь на приём к семейному врачу. |
| Időpont-egyeztetés | Van szabad időpont holnapra? | Есть свободное время для записи на завтра? |
| Címzetthez irányulás | Este hozzátok megyünk vacsorára. | Вечером мы придём к вам на ужин. |
| Pénzváltás | Tudna felváltani egy húszezrest? | Можете разменять купюру в двадцать тысяч форинтов? |

**Automatikus kapu:** `node magyar-orosz/verify-a2.mjs` az első 361 szócikkben **0 egyértelmű, üres sablont** talált, és ellenőrizte a rekordokat, a szószámokat és a címszavak sorrendjét. A fennmaradó 839 bejegyzésben **397 további sablonjelölt** maradt, amelyek még nem teljes körűen ellenőrzöttek; az automatikus szűrés nem helyettesíti az anyanyelvi ellenőrzést. **Következő adag:** `A2:361`–`A2:480`.
