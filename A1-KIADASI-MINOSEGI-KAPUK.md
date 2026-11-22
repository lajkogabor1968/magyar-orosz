# A1 minőségi kapuk – Magyar–orosz Tanműhely

Állapot: 2026. november 22.  A cél egy kezdőt önállóan tanító, ellenőrizhető, orosz anyanyelvűek számára készített magyar nyelvtanfolyam. Ez belső fejlesztési terv, nem kiadási tanúsítvány.

## Jelenlegi, automatizáltan mérhető kiindulás

- A1 szókincstár: 600 bejegyzés, 580 különböző magyar címszó.
- A1 vezetett tanulási út: **12 lecke**, 135 különböző tanított szó vagy kifejezés; 87 címszó szerepel az A1-szótárban (**15,0%-os címszólefedettség**). A 9–12. lecke a személyes adatokat, országokat, nyelveket és az 1–20-as számokat tanítja.
- A1 nyelvtan: 10 tanító fejezet, 66 feladat.
- A2 vezetett tanulási út: 3 lecke, 25 különböző szó vagy kifejezés; az A1-es szókincs ismétlése szándékos.
- A szókincstár, az önálló nyelvtani modul, az ECL-gyakorlók és a kiegészítő szövegértések több anyagot tartalmaznak, mint a vezetett leckeút. A fenti arány **csak a vezetett leckék szókincslefedettsége**, nem az alkalmazás teljes szókincse.

A mérés megismételhető: `node magyar-orosz/verify-guided-coverage.mjs`.

## Kötelező kapuk a széles körű A1-kiadás előtt

1. **Tartalmi teljesség:** minden A1-es címszó kapjon tanulási helyet egy fokozatos, rövid leckékre bontott útban; legyen elkülönítve az új szó és az ismétlés. A többjelentésű címszavak jelentéseit külön ellenőrizzük. Nem elegendő csak az önálló szólistában szerepeltetni őket.
2. **Valódi tanítás:** minden új nyelvtani jelenség előtt orosz nyelvű magyarázat, rövid magyar–orosz példák, szükség esetén ragozási tábla, majd fokozatos feladatok következzenek. A hangminőségbeli különbségeket (különösen a–á és e–é) ne magyarázzuk kizárólag hosszúsággal.
3. **Értékelési igazságosság:** egyetlen helyes választ sem szabad tévesnek jelölni. A válaszok sorrendje ne árulja el a megoldást; több elfogadható alak esetén a kérdés legyen pontos vagy a megoldókulcs fogadja el mindet. Minden automatikus teszt fusson a fő ágon.
4. **Kétnyelvű használhatóság:** a kezelőszervek, utasítások, javítások és hibajelzések egy teljesen kezdő orosz tanuló számára is érthetők legyenek. Ne legyen olyan leckelépés, ahol a továbbjutáshoz magyar kezelőszöveget kell megérteni.
5. **Hang és mobil:** ténylegesen kipróbált Androidos és asztali hang; a közzétett hang pontosan egyezzen a javított mondattal. Ha nincs megfelelő hang, jelezzük egyértelműen, ne nevezzük sikeres hanggyakorlatnak. Az idegen hangminta ne kerüljön a Gábor-hangos próbamódba.
6. **Eredmények:** visszatérő tanulónál nincs elvesző pont vagy rossz leckéhez rendelt eredmény. A régi `localStorage`-kulcsokat nem változtatjuk meg előzetes migráció és visszaállítási próba nélkül.
7. **Lektorálás és próbatanulók:** magyar tanári ellenőrzés, külön orosz anyanyelvi szakmai ellenőrzés, majd legalább 6–10 valós tanulóval dokumentált felhasználói próba. Kiadáskor nulla ismert kritikus nyelvi vagy pontozási hibát engedünk meg.

## Javasolt A1-es bővítési rend

Megmaradnak az eredeti nyolc lecke és eredményazonosítóik; a 9–12. lecke új, `A1:8`–`A1:11` azonosítóval már elkészült. A további új leckék ezek után kerülnek, amíg nincs stabil, tartós tanulóazonosító-alapú átrendezés.

| Egység | Tanulási cél | Nyelvtani alap |
| --- | --- | --- |
| A1/9–12 | **Elkészült:** személyes adatok, országok, nyelvek, számok 1–20-ig | lenni, kérdések, számnevek |
| A1/13–16 | Család, foglalkozás, tulajdonságok | birtokos alakok kezdő szinten, névelők |
| A1/17–20 | Otthon, iskola, környezet | hol? hová?, alapvető helyragok |
| A1/21–24 | Napi tevékenységek, időpont, hét | jelen idejű alanyi ragozás, tagadás |
| A1/25–28 | Étkezés, vásárlás, mennyiségek | kérek, szeretnék, egyszerű tárgyeset |
| A1/29–32 | Város, utazás, útbaigazítás | helyviszonyok, rögzült útbaigazító formulák |
| A1/33–36 | Szabadidő, időjárás, tervek | alapvető igekötők és jövőre utalás |
| A1/37–40 | Egyszerű egészségügyi helyzetek, hétköznapi problémák | egyszerű kell/lehet minták, rövid kérdés–válasz |
| A1/41–... | Ismétlés, hiányzó szócikkek, szintzáró gyakorlás | saját hibák célzott újratanítása |

Az egységszámok **terv**, nem elkészült leckék. A pontos szószám-elosztást a meglévő 600 szócikk témacsoportos, orosz nyelvű lektorálása után rögzítjük.

## Megkülönböztető pedagógiai előny

A cél nem a pontok vagy animációk mennyisége. A Tanműhely akkor adhat különösen jó értéket, ha oroszul megmutatja **miért** ilyen a magyar szóalak, nem tanít hibás fordítást, és a magyarországi életből vett természetes helyzetekben később visszakéri a tanult szerkezetet. A visszatérő hibákra rövid, célzott magyarázó leckét ajánlunk.
