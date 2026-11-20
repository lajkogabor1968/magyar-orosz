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
