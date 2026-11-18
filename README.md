# Magyar–orosz Tanulóműhely

Statikus, telepítést nem igénylő, mobilon és számítógépen használható magyar–orosz szókincsgyakorló alkalmazás.

## Tartalom

- **A1:** 454 szócikk
- **A2:** 951 szócikk
- **B1:** 225 szócikk
- **B2:** 14 szócikk
- Összesen: **1644** szócikk.
- Minden bejegyzés négy mezője a mellékelt Excel-fájlból származik: magyar szó, orosz jelentés, egyszerű magyar példamondat, orosz mondatfordítás.

## Gyakorlási módok

1. Kereshető, lapozható négyoszlopos szólista, kedvencek és felolvasás.
2. Magyar–orosz tanulókártyák, választhatóan szavakkal vagy mondatokkal.
3. Feleletválasztós szóteszt, 10 kérdéses fordulók.
4. Orosz mondat alapján magyar mondat kiválasztása, 10 kérdéses fordulók.
5. Megjelölt szavak ismétlése, helyi pontszám és találati arány.

A böngésző a megjelölt szavakat és eredményeket helyben (`localStorage`) tárolja. Nincs bejelentkezés és nincs központi tanulói adatgyűjtés. A hangos felolvasás a böngésző beépített magyar/orosz beszédhangjától függ; nem minden eszköz biztosít mindkét nyelvet.

## Indítás

A `index.html`, `style.css`, `app.js` és `data.js` legyen ugyanabban a mappában. Nyissa meg a `index.html` fájlt, vagy használjon egyszerű webszervert. Az adatokat az alkalmazás a mellékelt `data.js`-ből olvassa ki; internetkapcsolat nem szükséges.

## GitHub Pages – új, különálló projekt

1. Nyissa meg a [GitHub új repository oldalát](https://github.com/new).
2. Repository name: `magyar-orosz-tanulomuhely`; Visibility: **Public**; hozza létre a repositoryt.
3. A repository `Add file → Upload files` menüpontjában töltse fel a mappában található **négy állományt**: `index.html`, `style.css`, `app.js`, `data.js` (a README opcionális). **A ZIP-et ne egyben töltse fel**, hanem bontsa ki előbb.
4. Válassza a `Commit changes` lehetőséget.
5. `Settings → Pages → Build and deployment → Deploy from a branch`, majd Branch: `main`, Folder: `/ (root)` és `Save`.
6. Az oldal a Pages beállításainál jelzett címen érhető el, jellemzően: `https://lajkogabor1968.github.io/magyar-orosz-tanulomuhely/`.

**Megjegyzés:** ez a csomag nem lett automatikusan publikálva. A GitHub Pages link csak a létrehozott nyilvános repository és engedélyezett Pages után lesz élő.

## Tanári ellenőrzés

A szókincs és a példamondatok **az eredeti, felhasználó által megadott Excel-fájlból** kerültek át, tartalmi átfogalmazás nélkül. Néhány forrásbeli példamondat nyelvileg mesterkélt vagy szemantikailag hibás lehet; tanulóknak történő közzététel előtt célszerű külön magyar–orosz nyelvi lektorálás.

## Magyar nyelvű felolvasás
A szólistában a hangszóró a magyar szót, a beszéd ikon a magyar példamondatot olvassa fel. A mondatgyakorlás magyar mondatot és magyar hangot használ; a válaszlehetőségek orosz fordítások. A tanulókártyákon a „Magyar kiejtés” gomb mindig a magyar oldalt olvassa fel, még akkor is, ha az orosz fordítás látható. A felolvasáshoz a készüléken elérhető magyar beszédhang szükséges.