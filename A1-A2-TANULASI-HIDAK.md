# A1–A2 nyelvtani egymásra épülés – ellenőrzési jegyzőkönyv

Állapot: 2026. november 21.

## Eredmény

Az A1-ben 10 témakör és 66 feladat; az A2-ben 22 témakör és 198 feladat található.
A négy szint együtt 40 témakört és 304 nyelvtani kérdést ad.
Az A1–A2 összes 32 leckéjéhez magyar–orosz tanító fejezet,
önálló nyelvtani táblázat és legalább öt gyakorlófeladat tartozik.
Mind a 40 témacímnek van orosz fordítása, és a 304 kérdés mindegyikénél
megjelenik orosz feladatutasítás.

A strukturált előismereti ellenőrzés eredménye: **22/22 A2-téma** rendelkezik
legalább egy megfelelő A1-es vagy korábbi A2-es alapozó leckével.
Összesen **38 kattintható előfeltétel-kapcsolat** került a tanulófelületre.
A megfelelő korábbi lecke közvetlenül megnyitható a témakör alatt.

## Feltárt hiányok és elvégzett javítások

| Ellenőrzés megállapítása | Beépített javítás |
| --- | --- |
| A tárgyrag és a határozott igeragozás megértéséhez előbb meg kell különböztetni az alanyt, az igét és a tárgyat. Ezt az A1 nem tanította külön. | Új A1-es alapozó: **Ki cselekszik? Alany, ige és tárgy** – magyarázat, hatrészes áttekintő táblázat, kilenc feladat, orosz utasítás. |
| A birtokos személyjelek ismerete nem jelent automatikusan önálló birtoklási mondatképzést. | Új A2-es fejezet: **Birtoklás: van könyvem, nincs autóm**, 12 feladattal. A van/nincs különbségét és a hat személyt tanítja. |
| A részes eset személyes alakjai (nekem, neked stb.) a „kell” leckében szerepeltek, de a ragrendszer nem volt külön tanítva. | Új A2-es fejezet: **Részes eset: -nak/-nek – kinek?**, 12 feladattal; a „kell” tankönyvi magyarázata kifejezetten megnevezi a kinek? kérdést és előreutal a külön leckére. |
| A helyviszonyok korábban elsősorban a belső térre korlátozódtak (-ba/-be, -ban/-ben, -ból/-ből). | Új A2-es fejezet: **Helyragok II.: -ra/-re, -on/-en/-ön, -ról/-ről**, 12 feladattal és hová?–hol?–honnan? táblázattal. |
| Az A2 leckéiből nem lehetett látni, melyik A1-es ismeretet érdemes felfrissíteni. | A teljes A2 kapott 38 közvetlen, kétnyelvű előfeltétel-hivatkozást; automatikusan ellenőrizzük, hogy nincs nem létező vagy későbbi A2-es előfeltétel. |
| A témakörválasztó és a lecke fejlécének címe kizárólag magyarul szerepelt. | Mind a 40 cím orosz fordítása megjelenik a listában és a fejlécben is. |
| Egy új feladat beírandó teljes szót várt, miközben a kérdés csupán rag pótlását sugallta; egy másik alaktani példa mesterkélt volt. | A részes eset feladatai már következetesen **teljes alak** beírását kérik; a személynek címzett példákban az **Emese → Emesének** természetes személynévi mintát használjuk. |

## Előismereti láncok

A teljes, 22 témakörre kiterjedő gépileg ellenőrzött lista a
nyelvtan-elofeltetelek.js fájlban található. A tanítási összefüggések:

| A2-es témacsoport | A1-es alap | További, korábbi A2-es lépés |
| --- | --- | --- |
| Tárgyrag és tárgyas/határozatlan ragozás | Alany–ige–tárgy; névelők; jelen idejű ragozás | Tárgyrag → ragozástípus → teljes határozott paradigma |
| Helyhatározók I–II. | Magánhangzó-harmónia és -ban/-ben | Hová? Hol? Honnan? → felületi helyragok |
| Múlt idő és tárgyasság | Szótő–toldalék; jelen idejű igeragozás | Múlt idő alapjai → teljes múltidő-ragozás → múlt idő tárgyas alakjai |
| Felszólítás I–IV. és rendhagyó alakok | Személyragok és tagadás | Alapfelszólítás → határozott tárgy → hangváltozások és tiltás → rendhagyó formák |
| Igekötők | Tagadás és főnévi igenév | Felszólító mód → állítás, tagadás, felszólítás igekötővel |
| Jövő idő | Főnévi igenév; jelen idejű ragozás | Határozott igeragozás → fogok/fogom különbsége |
| Személyragos főnévi igenév + kell | Főnévi igenév; személyes névmások | A kinek? névmási sor magyarázata a leckében; részletes részes eset külön fejezetben |
| Birtokos személyjelek és birtoklás | Szótő–toldalék; létige | Birtokos jel → van/nincs birtoklási mondat |
| Részes eset -nak/-nek | Hangrend, alany–tárgy felismerése | Különbség a tárgy (mit?) és a címzett (kinek?) között |

## Sorrend és tanulói eredmények

A meglévő témákat **nem rendeztük át**, mert a böngészőben tárolt eredmények
kulcsa „hu-ru-grammar-v1”, azon belül például „A2:0”, „A2:1”.
Egy régi téma áthelyezése a pontszámot másik leckéhez kötné.
Ezért az új A1/A2 témák a saját szintjük végére kerülnek; az előfeltétel-gombok
segítik a pedagógiai visszalépést. A jövőben a stabil, témánkénti azonosítók
bevezetése után lehet majd biztonságosan újrarendezni a tanulási útvonalat.

## Ellenőrzés és fennmaradó feladat

- node magyar-orosz/verify-nyelvtan.mjs: teljes körű szerkezeti vizsgálat,
  címfordítások, 304 orosz feladatutasítás, 32 tankönyvi fejezet, 38 előfeltétel,
  feladatkulcsok és régi témaazonosítók ellenőrzése.
- node magyar-orosz/verify-nyelvtan-browser.mjs: a tanulói felület,
  pontozás, haladásmegőrzés, orosz címsorok és a kezdőképernyő böngészős ellenőrzése
  Playwright és Chromium megléte esetén.
- Az orosz magyarázatokat és a magyar példamondatokat a fizetős,
  széles körű kiadás előtt **tanári és orosz anyanyelvű lektorral**
  is ellenőrizni kell. A gépi vizsgálat nem garantálhat minden
  nyelvi, fordítási vagy módszertani finomságot.

Az új szövegek, feladatok és táblázatok önálló szerkesztésűek; a feltöltött
orosz nyelvű nyelvtankönyv felépítése módszertani minta, nem másolt tananyag.
