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

## Indítás

A teljes `magyar-orosz` mappát (az audiofájlokkal és a modulokkal együtt) kell kiszolgálni. A `index.html`-t egyszerű webszerverrel vagy a GitHub Pages-en lehet megnyitni.

## GitHub Pages – meglévő alkalmazás

Az alkalmazás a `lajkogabor1968/abece-kaland` GitHub-repozitórium `magyar-orosz/` mappájában él. A meglévő nyilvános cím:

https://lajkogabor1968.github.io/abece-kaland/magyar-orosz/

A fejlesztés **nem hoz létre külön alkalmazást vagy repositoryt**. A tanulói adatok az egyes böngészőkben maradnak.

## Tanári ellenőrzés

A szókincs részben az eredeti, felhasználó által megadott Excel-fájlból származik, de azóta bővült, és nyelvi ellenőrzés alatt áll. A javítások nyilvántartását a `KER-szokincs-audit.md` tartalmazza. A változtatások során a szócikkek sorrendjét meg kell őrizni, mert az eredmények helyi azonosítói a szintből és a sorszámból képződnek. Teljes körű, orosz anyanyelvű lektorálás még nem történt.

Automatikus A1-adatellenőrzés a teljes repository gyökeréből: `node magyar-orosz/verify-a1.mjs`. Ez a szószámokat, a rekordok szerkezetét, a tanulói azonosítók állandóságát és a magyar MP3-hivatkozásokat vizsgálja. A tényleges nyelvi pontosságot és a telefonos hangélményt nem tudja tanúsítani.

Az A2 nyelvi felülvizsgálata külön, kisebb adagokban folyik; az első 721 bejegyzés 2026-11-20-án került átnézésre. Az A2 szerkezeti és sablon-ellenőrzése: `node magyar-orosz/verify-a2.mjs`. Az 1200 bejegyzés **nem** jelent kész, orosz anyanyelvű lektorálással hitelesített szókincset.

## Magyar nyelvű felolvasás
A szólistában a hangszóró a magyar szót, a beszéd ikon a magyar példamondatot olvassa fel. A mondatgyakorlás magyar mondatot és magyar hangot használ; a válaszlehetőségek orosz fordítások. A tanulókártyákon a „Magyar kiejtés” gomb mindig a magyar oldalt olvassa fel, még akkor is, ha az orosz fordítás látható. Az `audio/hu-manifest.js` jelenleg 57 magyar hangfájlra hivatkozik; a többi kifejezés a készülék beszédszintézisét igényelheti.
