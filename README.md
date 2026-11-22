# Magyar–orosz Tanulóműhely

Statikus, telepítést nem igénylő, mobilon és számítógépen használható magyar–orosz szókincsgyakorló alkalmazás.

## Tartalom

- **A1:** 600 szócikk
- **A2:** 1200 szócikk
- **B1:** 431 szócikk
- **B2:** 14 szócikk
- Összesen: **2245** szócikk (a `data.js` alaplistája és az `ecl-vocab.js` kiegészítése együtt).
- Minden bejegyzés négy mezőből áll: magyar szó/kifejezés, orosz jelentés, magyar példamondat, orosz mondatfordítás. Az eredeti listát időközben bővítettük és nyelvileg javítjuk.

## Gyakorlási módok

1. Kereshető, lapozható négyoszlopos szólista, kedvencek és felolvasás.
2. Magyar–orosz tanulókártyák, választhatóan szavakkal vagy mondatokkal.
3. Feleletválasztós szóteszt és magyar mondat orosz jelentésének kiválasztása, normál esetben legfeljebb 10 kérdéses fordulók.
4. A1-es napi gyakorlás: öt szó, öt mondat és három önállóan megjelölt beszédgyakorlási mondat.
5. Hibás vagy esedékes szavak és mondatok ismétlése, gyakorlási javaslatok, helyi pontszám és fejlődési visszajelzés.

A böngésző a megjelölt szavakat és eredményeket helyben (`localStorage`) tárolja. Nincs bejelentkezés és nincs központi tanulói adatgyűjtés. A magyar felolvasás az elérhető, előre elkészített MP3-hangot részesíti előnyben, egyébként a készülék beszédszintézisére támaszkodik; nem minden eszköz biztosít magyar hangot. A beszédgyakorlás önjelölés, **nem automatikus kiejtésminősítés**.

### A1–A2: kizárólag Gábor hangja – elkülönített próbamód

Az `a1.html?voice=gabor` és `a2.html?voice=gabor` címeken elérhető egy tesztmód, amely **csak Gábor külön jóváhagyott, helyben tárolt hangfájljait** engedi lejátszani. Más személy hangja, a régi A1-es MP3-ak, a külső próbahang-URL-ek és a készülék beszédszintézise ebben a módban nem használható. Hiányzó vagy hibás felvételnél egyértelmű, kétnyelvű üzenet jelenik meg, nem indul el idegen hang. A szereplők neve szövegesen látszódhat, de a felolvasott mondatnak nem része.

Az engedélyezett hangok jegyzéke (`audio/dialogue-manifest.js` → `TanuloApprovedGaborManifest`) jelenleg szándékosan **üres**: még nincs olyan Gábor-hangból készült felvétel, amelynek eredetét és tartalmát ellenőriztük, és amelynek közzétételét jóváhagyták. Később kizárólag az `audio/gabor/a1/` és `audio/gabor/a2/` alatti jóváhagyott, generált MP3/WAV/OGG kerülhet a jegyzékbe. Az eredeti hangmintát nem tesszük a nyilvános GitHub-repozitóriumba. A jelenleg használt normál felolvasás és minden korábbi tanulói eredmény változatlan marad, amíg a saját hangok elkészülnek.

Hangbiztonsági szerkezeti ellenőrzés: `node magyar-orosz/verify-gabor-voice.mjs`. A hangminőség és a tényleges Android-lejátszás később külön, valódi hangfájlokkal ellenőrizendő.

### A1–A2 – Bővített nyelvtani tananyag

Az [orosz magyarázatú nyelvtani modul](nyelvtan.html) jelenleg összesen **43 témakört és 340 feladatot** tartalmaz; ebből **A1: 10 témakör, 66 feladat**, **A2: 25 témakör, 234 feladat**, **B1–B2: 8 témakör, 40 feladat**. A 2026. november 22-i folytatás három új A2-es nyelvtani fejezettel és 36 saját készítésű feladattal bővült. A korábbi B1–B2 kérdéssorok és a mentett eredményazonosítók változatlanok.

- **A1:** szótő és toldalék, jelen idejű határozatlan igeragozás mind a hat személyben, mély/magas hangrendű igei személyragok, névelők és többes szám, tagadás és főnévi igenév.
- **A2:** -ik végű igék, teljes jelen idejű határozott ragozás, határozott és határozatlan tárgy megkülönböztetése, múlt idejű személyragok, valamint a **felszólító mód** (személyek, határozott tárgy, hangváltozások, tiltás és igekötő). Eddigi bővítések: **igekötős igék állításban, tagadásban és felszólításban; rendhagyó felszólító alakok (egyél/edd, igyál/idd, tegyél/tedd, vegyél/vedd); határozott és határozatlan múlt idejű ragozás**. A folytatás: **jövő idő (fog + főnévi igenév, jelen idejű jövő és lesz), szükségesség (kell + személyragos főnévi igenév), birtokos személyjelek egy birtokolt dolog mellett**.
- **Tankönyvi tanulási mód:** mind a **35 A1–A2 nyelvtani fejezet** külön, tanulható magyar–orosz tankönyvi oldalt kapott. Minden oldal tartalmaz tanulási célt, több lépéses kétnyelvű tanítást, magyar–orosz példamondatokat, saját ragozási vagy szóalaktani táblázatot, egy teljesen kidolgozott mintafeladatot és a jellemző hibákat. A tanuló ezek után léphet a gyakorláshoz, majd visszatérhet a magyarázathoz. A friss A2-es feladatok visszajelzése **orosz nyelven is** megjelenik.
- A feladatok magyar összefoglalót, orosz nyelvű magyarázatot, kétnyelvű példákat, ragozási táblázatot és vegyes **feleletválasztós/beírásos** ellenőrzést kapnak. Az ékezetek számítanak. A korábbi nyelvtani pontszámok helyi tárolókulcsa és a fejezetek régi sorrendje megmaradt; az eredmények továbbra is a böngészőben tárolódnak.
- **Orosz cím és feladatutasítás A1–B2-ig:** mind a **43 témakör** magyar címe mellett orosz fordítás szerepel, és mind a **340 feladathoz** orosz nyelvű, a konkrét témakörhöz illő utasítás tartozik. A feleletválasztós és beírásos kérdések önállóan is ellenőrizhetők. Az új címek és utasítások meglétét szerkezeti teszt vizsgálja.
- **Egymásra épülés:** mind a **25 A2-es témakör** kétnyelvű, kattintható előismereti kapcsolatokkal érhető el (**44 kapcsolat**). A tanulási folyamatot a [nyelvtani átmenet ellenőrzési jegyzőkönyve](A1-A2-TANULASI-HIDAK.md) rögzíti.
- **2026. november 22-i A2-bővítés:** társ és eszköz -val/-vel raggal (a teljes hasonulás helyesírásával), a valakihez–valakinél–valakitől helyragok, valamint a melléknevek középfoka -bb és mint szerkezettel, szebb, jobb, nagyobb, kisebb alakokkal. Mindháromhoz hat soros nyelvtani táblázat, részletes magyar–orosz magyarázat, kidolgozott mintafeladat, 8 feleletválasztós és 4 beírásos gyakorlat tartozik.

Szakmai kiindulópont: **Magyar nyelv 5.**, Oktatási Hivatal, 2026, különösen a hangrend, toldalékolás, szóelemek, igei személyragok, idő- és módjelek, valamint a felszólítás helyesírása (60–62., 98–101., 120–128. oldal). A tankönyv kommunikációs fejezeteit nem használtuk; a magyarázatok, mondatok és feladatok **nem a tankönyvi szövegek másolatai**. Az A2-es felszólító alakokat és orosz magyarázatokat anyanyelvű lektorral is ellenőriztetni kell széles körű, fizetős kiadás előtt.

A nyelvtani tankönyvi rész elsődleges mintája a felhasználó által feltöltött **Н. Н. Колпакова – Д. Доловаи – Ч. И. Надь: Венгерская грамматика в таблицах и схемах** (КАРО, 2021; 320 oldal). Különösen a határozatlan/határozott ragozás, a felszólító mód, a múlt idő, valamint a jövő idő (58–59. oldal), a személyragos főnévi igenév (72–76. oldal) és a birtokos személyjelek (135–143. oldal) rendszerezését vettük figyelembe. Kiegészítő összehasonlító forrás: **Salga Attila: A magyar nyelv az orosz nyelv tükrében** (Tankönyvkiadó, 1984), 51–54. oldal. A Tanulóműhely **saját magyarázatokat, példákat, táblázatokat és feladatokat** használ, a könyvek oldalait vagy táblázatait nem másolja. A jelenlegi A1–A2 tananyag még szakmai és orosz anyanyelvű lektorálásra vár.

**Nyelvtani minőségjavítás:** A magyar helyesírás szabályai (AkH.) 44. pontja alapján a beírásos felszólító feladatok a köznyelvben helyes rövid és hosszabb alakokat is elfogadják (pl. `kérj`/`kérjél`, `írd`/`írjad`), és javításkor az összes elfogadott alak megjelenik. A feleletválasztós lehetőségek minden próbálkozásnál kevert sorrendben jelennek meg, így nem tanulható meg egy állandó helyesválasz-pozíció. Egy korábbi létige-feladatot a témához igazítottunk. A nyelvtani modul korábbi helyi pontszámainak kulcsai és a fejezetek régi indexei megmaradtak. Hivatalos szabályforrás: [AkH. 44. pont](https://helyesiras.mta.hu/helyesiras/default/akh).

Szerkezeti ellenőrzés: `node magyar-orosz/verify-nyelvtan.mjs`. A tanulói nézet böngészős ellenőrzéséhez: `node magyar-orosz/verify-nyelvtan-browser.mjs` (Playwright és futtatható Chromium szükséges). A korábbi kontrasztív modul és saját pontszámai a külön [korábbi nyelvtani oldalon](kontrasztiv-nyelvtan.html) továbbra is elérhetők.

### A1–A2 – Kiegészítő videós gyakorlás

Az A1-es és A2-es menüből külső hivatkozással elérhető az [Ilona Bulik-féle YouTube-csatorna](https://www.youtube.com/@ilonabulik955), amely magyar nyelvű tanulóvideókat is tartalmaz, orosz nyelvű közönség számára. A videók külső tartalmak, nem részei a saját feladatbanknak; szintjüket egyenként még nem minősítettük, a tanuló a számára megfelelő részt választhatja. A link új lapon nyílik meg. Videót nem másolunk, nem tárolunk és nem használunk fel sajátként.

### A2 – Önálló olvasott szövegértés

Az [A2-es olvasásmodul](a2-olvasas.html) négy teljesen saját készítésű, rövid, hétköznapi történettel bővíti a tananyagot: reggeli szokások, munkába járás, bevásárlás és szomszédi kapcsolatok. A korábban kapott tankönyvi kép kizárólag a **feladattípusok mintája** volt; a történetek és a megoldókulcsok nem annak másolatai vagy átírásai.

Minden olvasmányhoz 6 igaz–hamis állítás, 3 feleletválasztós kérdés, 1 mondatkiegészítés, magyar–orosz szószedet, 2 rövid, szöveg alapján megválaszolandó kérdés és 1 saját mondatos válasz tartozik. A 40 automatikusan ellenőrizhető kérdésnél a javítás visszakereshető bizonyító mondatot mutat. Emellett 6 teljesen új rövid üzenetet 8 témacímhez kell párosítani; 2 cím fölösleges. Az önálló szövegalkotás és rövid válasz nem kap gépi pontszámot, helyette mintaválasz látható. Az elért legjobb pontszámokat külön, új böngészős kulcsok alatt tároljuk, a meglévő eredményekhez nem nyúlunk.

Automatikus szerkezeti teszt: `node magyar-orosz/verify-a2-olvasas.mjs`. A szövegeket továbbra is ajánlott tanári és orosz anyanyelvű lektorral ellenőrizni tanulói kiadás előtt.


### A2 – Íráskészség gyakorlása

Az [A2-es írásmodul](a2-iras.html) négy önálló, hétköznapi íráshelyzetet kínál: üzenet a szomszédnak, tanfolyami bejegyzés, munkahelyi üzenet és baráti meghívás. A tanuló kb. 50 szót ír, négy tartalmi pont alapján dolgozik, láthatja a szószámot, és saját maga ellenőrizheti a feladat teljesítését. A program a magyar szöveget nem pontozza automatikusan, nem tárolja és nem küldi el; mintamegoldást ad az összehasonlításhoz. A feladatok tartalma nem a mintaként kapott ECL-feladatlapok átirata. Automatikus ellenőrzés: `node magyar-orosz/verify-a2-iras.mjs`.

### B1 – Ügyintézés Magyarországon (B2-es folytatással)

A [gyakorlati párbeszédmodulban](ecl.html?lesson=18) kilenc, orosz anyanyelvű magyarországi munkavállalóknak készült **B1-es** helyzet található. **Az A2-es tananyagból a részletes ügyintézést kivettük; a B2-es szintű, összetettebb feladatok később készülnek el.** A leckék egyszerűbb, beszédközpontú B1-es belépőhelyzetek:

1. **Adóazonosító jel (NAV):** nyomtatványról, iratokról és segítségről kérdezni.
2. **Tartózkodási ügy (OIF):** érvényességi időt, ügytípust és hivatalos információt tisztázni.
3. **TAJ és egészségbiztosítás (NEAK):** munkáltatónál érdeklődni és az ellátási jogosultság ellenőrzéséről kérdezni.
4. **Kormányablak:** időpontfoglalás, 1818-as ügyfélvonal, hivatal- és ügytípuskeresés.
5. **Szálláshely-változás (OIF):** költözés után elektronikus bejelentés és igazolás. Ez nem azonos minden külföldi személy lakcímkártya-ügyintézésével.
6. **Háziorvos:** telefonos időpontkérés, tünetek elmondása és szükséges iratok.
7. **Munkaszerződés:** alapbér, munkakör, próbaidő, a szerződés átolvasása.
8. **Bérjegyzék:** bruttó és nettó bér, levonások, túlóra, eltérések tisztázása.
9. **Bankszámlanyitás:** szükséges okmányok, azonosítás, számlacsomagok és díjak.

Mind a kilenc lecke magyar párbeszédet, kapcsolható orosz mondatfordításokat, nyitható kétnyelvű szószedetet, három szövegértési és egy nyelvtani feladatot, hallott szövegértést, szóbeli feladatot, két nyelven megfogalmazott óvatossági megjegyzést és hivatalos forráslinkeket tartalmaz. A hivatali szabályok változhatnak, és az egyes külföldi állampolgárok helyzete eltérő lehet: **a tananyag nyelvgyakorlás, nem személyre szabott jogi, pénzügyi vagy társadalombiztosítási tanácsadás**. A korábbi 17 ECL-lecke és a tanulói pontszámok érintetlenek. A korábbi hat ügyintézési lecke azonosítója és tartalma is megmaradt, csak a szintbesorolása változott B1-re.

Automatikus ellenőrzés: `node magyar-orosz/verify-ugyintezes.mjs`. A magyar–orosz fordításokat a nyilvános kiadás előtt orosz anyanyelvű lektorral is érdemes átnézetni.

A feleletválasztós tesztben azonos magyar címszóhoz vagy példamondathoz tartozó másik helyes orosz fordítást a program már nem kínál fel hibás válaszként. Ez nem pótolja a szemantikailag egyenértékű, de eltérően megfogalmazott fordítások nyelvi ellenőrzését. Automatikus regressziós teszt: `node magyar-orosz/verify-quiz-options.mjs`.

## Indítás

A teljes `magyar-orosz` mappát (az audiofájlokkal és a modulokkal együtt) kell kiszolgálni. A `index.html`-t egyszerű webszerverrel vagy a GitHub Pages-en lehet megnyitni.

## GitHub Pages – meglévő alkalmazás

Az alkalmazás a `lajkogabor1968/abece-kaland` GitHub-repozitórium `magyar-orosz/` mappájában él. A meglévő nyilvános cím:

https://lajkogabor1968.github.io/abece-kaland/magyar-orosz/

A fejlesztés **nem hoz létre külön alkalmazást vagy repositoryt**. A tanulói adatok az egyes böngészőkben maradnak.

Az Android/Play Áruház és a fenntartható bevétel felé vezető, külön minőségi kapukat tartalmazó terv: [`FEJLESZTESI-UTITERV.md`](FEJLESZTESI-UTITERV.md). **Jelenleg még nincs telepíthető Android-alkalmazás vagy fizetési funkció.**

## Tanári ellenőrzés

A szókincs részben az eredeti, felhasználó által megadott Excel-fájlból származik, de azóta bővült, és nyelvi ellenőrzés alatt áll. A javítások nyilvántartását a `KER-szokincs-audit.md` tartalmazza. A változtatások során a szócikkek sorrendjét meg kell őrizni, mert az eredmények helyi azonosítói a szintből és a sorszámból képződnek. Teljes körű, orosz anyanyelvű lektorálás még nem történt.

Automatikus A1-adatellenőrzés a teljes repository gyökeréből: `node magyar-orosz/verify-a1.mjs`. Ez a szószámokat, a rekordok szerkezetét, a tanulói azonosítók állandóságát és a magyar MP3-hivatkozásokat vizsgálja. A tényleges nyelvi pontosságot és a telefonos hangélményt nem tudja tanúsítani.

Az A2 szókincs **mind az 1200 bejegyzésének első körös, tételes nyelvi felülvizsgálata** 2026-11-21-én lezárult (10 adag, összesen 931 javított szócikk). A2:912-nél egy bizonyított címszó-helyesírási hibát is javítottunk (`vegetariánus` → `vegetáriánus`), változatlan szócikkindexszel. Az A2 szerkezeti és sablon-ellenőrzése: `node magyar-orosz/verify-a2.mjs`. Az első kör teljesítése **nem** jelent kész, orosz anyanyelvű lektorálással hitelesített szókincset: a második, keresztellenőrző nyelvi kör, a hanganyag és a tanulói próba még szükséges.

## Magyar nyelvű felolvasás
A szólistában a hangszóró a magyar szót, a beszéd ikon a magyar példamondatot olvassa fel. A mondatgyakorlás magyar mondatot és magyar hangot használ; a válaszlehetőségek orosz fordítások. A tanulókártyákon a „Magyar kiejtés” gomb mindig a magyar oldalt olvassa fel, még akkor is, ha az orosz fordítás látható. Az `audio/hu-manifest.js` jelenleg 57 magyar hangfájlra hivatkozik; a többi kifejezés a készülék beszédszintézisét igényelheti.

## 2026. november 22. – pontozás és A1-es tanulási út

A kiegészítő szövegértési és nyelvtani modul válaszkeverése valódi Fisher–Yates-keverést használ. A vezetett leckék mini-szövegértési válaszai is változó sorrendben jelennek meg úgy, hogy a helyes megoldás azonosítója megmarad. Az A2-es múlt idejű feladat kétértelmű mondatát pontosítottuk; a nyelvtani eredményjelző szintenként számol, a korábbi eredménykulcsok módosítása nélkül.

Regressziós teszt: `node magyar-orosz/verify-quiz-integrity.mjs`. A vezetett leckék teljes szókincslefedettségét a `node magyar-orosz/verify-guided-coverage.mjs` méri. A **20 A1-es vezetett lecke** jelenleg az 580 különböző A1-szótári címszóból 135-öt tanít közvetlenül (23,3%); az alkalmazás többi modulja ennél több szót kínál. A széles körű kiadás előtti pedagógiai és technikai feltételek: [`A1-KIADASI-MINOSEGI-KAPUK.md`](A1-KIADASI-MINOSEGI-KAPUK.md).

### Új A1-es vezetett leckék (9–12.)

A meglevő nyolc lecke sorrendjét és mentett pontjait megtartva négy új, hatlépéses lecke készült: **név, foglalkozás és lakóhely**; **országok és nyelvek**; **számok 1–10**; **számok 11–20 és bemutatkozás**. Mindegyikhez kétnyelvű szókártyák, orosz nyelvű nyelvtani magyarázat, saját példatábla, párbeszéd, rövid olvasmány és ellenőrzőkérdés, írásos gyakorlat, valamint külön teszt tartozik. A nyelvtani és olvasmánykérdések válaszai a helyes megoldás megőrzésével keverednek. A személyes adatoknál fiktív nevet és lakóhelyet is szabad használni, valós címet nem kérünk.

Az új leckék külön tartalomfájlban találhatók: `a1-guided-lessons-next.js`. Szerkezeti teszt: `node magyar-orosz/verify-a1-guided-extension.mjs`. A magyar–orosz fordítások és a tényleges készülékhangok orosz anyanyelvi és eszközös próbája továbbra is szükséges a széles körű kiadás előtt.

### Új A1-es vezetett leckék (13–16.)

Újabb négy leckével folytatódik az A1-es út: **rokonok és családi kapcsolatok** (húgom, öcsém, nővérem, nagymamám), **foglalkozás és munkahely** (tanár vagyok, dolgozom/dolgozol/dolgozik), **tulajdonságok** (kedves tanár / a tanár kedves, nem, nagyon), valamint **egyszerű birtoklás és hiány** (könyvem/könyved, táskám/táskád, van/nincs). Mindegyik orosz nyelvű nyelvtani magyarázatot, példatáblázatot, kétnyelvű szókártyákat, párbeszédet, rövid olvasmányt, önálló írásfeladatot és javítással kísért ellenőrzést tartalmaz. A 3. családlecke ismétlése helyett új, magyarázott alakokat vezetünk be.

Az új tartalom külön fájlban marad: `a1-guided-lessons-13-16.js`, így a megelőző leckék és az eredmények kulcsai változatlanok. Szerkezeti és tananyagintegrációs ellenőrzés: `node magyar-orosz/verify-a1-units-13-16.mjs`. Az A1-es szint még nem teljes, az anyanyelvi lektorálás és a valós tanulói próba továbbra is minőségi kapu.

### Új A1-es vezetett leckék (17–20.)

Az újabb négy lecke az **otthoni helyiségek** neveit és -ban/-ben alakjait, a **hely és irány** különbségét (*hol? — hová?*, *iskolában — iskolába*), a **felszíni helyragokat** (*asztalon, széken, földön*), valamint a **különírt helyviszonyjelölő szavakat** (*mellett, előtt, mögött, alatt*) tanítja. A feladatok otthoni és iskolai helyzeteket követnek, és minden új szerkezethez orosz nyelvű magyarázat, példatáblázat, párbeszéd, olvasmány, szövegértés és önálló írás tartozik.

A korábbi 16 lecke és az eredménykulcsok megmaradtak. Új forrásfájl: `a1-guided-lessons-17-20.js`. Tananyagi és technikai ellenőrzés: `node magyar-orosz/verify-a1-units-17-20.mjs`. A négy lecke egyikében sincs húsznál több szókártya. A hangok és a magyar–orosz szövegek emberi, anyanyelvi ellenőrzése a széles körű kiadás előtt továbbra is szükséges.
