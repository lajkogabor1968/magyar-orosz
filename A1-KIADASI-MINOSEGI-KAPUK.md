# A1 minőségi kapuk – Magyar–orosz Tanműhely

Állapot: 2026. november 22.  A cél egy kezdőt önállóan tanító, ellenőrizhető, orosz anyanyelvűek számára készített magyar nyelvtanfolyam. Ez belső fejlesztési terv, nem kiadási tanúsítvány.

## Jelenlegi, automatizáltan mérhető kiindulás

- A1 szókincstár: 600 bejegyzés, 580 különböző magyar címszó.
- A1 vezetett tanulási út: **28 lecke**, 341 különböző tanított szó vagy kifejezés; 173 címszó szerepel az A1-szótárban (**29,8%-os címszólefedettség**). A 9–12. lecke a személyes adatokat, országokat, nyelveket és az 1–20-as számokat, a 13–16. lecke a családi viszonyokat, foglalkozásokat, tulajdonságokat és a birtokos alakokat, a 17–20. lecke a helyviszonyokat, a 21–24. lecke a jelen idejű igeragozást, szeret + főnévi igenév szerkezetet, időpontokat és a tárgyrag alapjait, a 25–28. lecke az udvarias kérést, a mennyiségeket, az éttermi rendelést és a piaci vásárlást tanítja.
- A1 nyelvtan: 10 tanító fejezet, 66 feladat.
- A2 vezetett tanulási út: 3 lecke, 25 különböző szó vagy kifejezés; az A1-es szókincs ismétlése szándékos.
- A szókincstár, az önálló nyelvtani modul, az ECL-gyakorlók és a kiegészítő szövegértések több anyagot tartalmaznak, mint a vezetett leckeút. A fenti arány **csak a vezetett leckék szókincslefedettsége**, nem az alkalmazás teljes szókincse.

A mérés megismételhető: `node magyar-orosz/verify-guided-coverage.mjs`.

## Duolingo-mintájú, megismételhető A1-audit – 2026. november 22.

Futtatás a repó gyökeréből: `node magyar-orosz/audit-a1-release.mjs`. Ezt a
korábbi 14 célzott technikai ellenőrzéssel és a
`node magyar-orosz/verify-a1-teach-before-test.mjs` biztonsági teszttel együtt futtattuk. A keretrendszer
**nem** a Duolingo nem nyilvános belső tesztjeinek másolata: annak közzétett
tananyag-tervezési és ellenőrzési elveiből indultunk ki.

| Ellenőrzési kapu | Megfigyelt eredmény | Értelmezés |
| --- | --- | --- |
| 28 A1-es lecke, egyedi sorrend, régi azonosítók | Rendben | A korábbi tanulói eredmények kulcsai érintetlenek. |
| Szókártyák, orosz magyarázatok, minták, párbeszédek | 28/28 lecke szerkezetileg ellenőrizve | Ez **nem** hitelesíti a fordítások nyelvi helyességét. |
| Nyelvtani és szövegértési javítókulcs | 28/28 lecke: létező kulcs, nem duplikált választási lehetőségek | A többféleképpen helyes válaszok emberi lektorálása még szükséges. |
| Tanítás előtti számonkérés kizárása | Az újonnan indított A1-es záróteszt 10 kérdése csak a kötelezően átnézett első 10 kártyából kerülhet ki | A többi kártya külön, szabadon tanulható; a régi folyamatban lévő tesztek sorrendje megmarad. |
| Teljes automatikus A1-audit | **0 fennmaradó kritikus szerkezeti találat** | A feltárt első leckés magyarázati hiányt javítottuk. |
| Szókincsterhelés | **13 lecke szakmai felülvizsgálatra jelölve** | 9–13 új alapszókártya; figyelmeztetés, nem automatikus bukás. |
| Vezetett út / A1-szótár | 173/580 különböző címszó, **29,8%** | Nem tekinthető kész A1-es útvonalnak. |
| Független nyelvi és tanulói próba | **Még nem teljesült** | Orosz anyanyelvű lektor és 6–10 valós tanuló szükséges. |

Az első körben megoldott pedagógiai hiba: az 1. lecke immár külön elmagyarázza,
hogy az oroszban nincsenek névelők, de a magyarban az `egy` és az `a/az`
eltérő szerepet tölt be; az `a–á`, `e–é` hangpárok minőségben is különböznek.
Az olvasmányi ellenőrzés továbbra is csak a szókártyás, nyelvtani és párbeszédes
tanítás után jelenik meg.

**Szakmai minták, nem hivatalos átvett szabályok:**

- A [Duolingo saját leírása a kurzuskészítésről](https://blog.duolingo.com/how-duolingo-experts-work-with-ai/): tantervtervezés, tananyag, gyakorlatok, személyre szabás; a tanuló anyanyelvéhez igazítás.
- A [Duolingo korábbi minőségi metrikáiról szóló beszámoló](https://blog.duolingo.com/how-were-improving-duolingos-course-creation-process/) 6–7 szót említ kedvező leckénkénti terhelésként. Ez 2019-es, a Duolingo akkori leckeszerkezetére vonatkozó adat; az A1-es Tanműhelyre csak **felülvizsgálati jelzésként** használjuk, nem vakon alkalmazott határértékként.
- Az [Európa Tanács A1-es KER-leírása](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-%20cefr-3.3-common-reference-levels-global-scale) az egyszerű hétköznapi kommunikációt és a saját élethelyzetekről való alapvető kérdés–választ tekinti célnak. A fenti automatizált ellenőrzés **nem méri** ezt a tanulói kimenetet.

## Kötelező kapuk a széles körű A1-kiadás előtt

1. **Tartalmi teljesség:** minden A1-es címszó kapjon tanulási helyet egy fokozatos, rövid leckékre bontott útban; legyen elkülönítve az új szó és az ismétlés. A többjelentésű címszavak jelentéseit külön ellenőrizzük. Nem elegendő csak az önálló szólistában szerepeltetni őket.
2. **Valódi tanítás:** minden új nyelvtani jelenség előtt orosz nyelvű magyarázat, rövid magyar–orosz példák, szükség esetén ragozási tábla, majd fokozatos feladatok következzenek. A hangminőségbeli különbségeket (különösen a–á és e–é) ne magyarázzuk kizárólag hosszúsággal.
3. **Értékelési igazságosság:** egyetlen helyes választ sem szabad tévesnek jelölni. A válaszok sorrendje ne árulja el a megoldást; több elfogadható alak esetén a kérdés legyen pontos vagy a megoldókulcs fogadja el mindet. Minden automatikus teszt fusson a fő ágon.
4. **Kétnyelvű használhatóság:** a kezelőszervek, utasítások, javítások és hibajelzések egy teljesen kezdő orosz tanuló számára is érthetők legyenek. Ne legyen olyan leckelépés, ahol a továbbjutáshoz magyar kezelőszöveget kell megérteni.
5. **Hang és mobil:** ténylegesen kipróbált Androidos és asztali hang; a közzétett hang pontosan egyezzen a javított mondattal. Ha nincs megfelelő hang, jelezzük egyértelműen, ne nevezzük sikeres hanggyakorlatnak. Az idegen hangminta ne kerüljön a Gábor-hangos próbamódba.
6. **Eredmények:** visszatérő tanulónál nincs elvesző pont vagy rossz leckéhez rendelt eredmény. A régi `localStorage`-kulcsokat nem változtatjuk meg előzetes migráció és visszaállítási próba nélkül.
7. **Lektorálás és próbatanulók:** magyar tanári ellenőrzés, külön orosz anyanyelvi szakmai ellenőrzés, majd legalább 6–10 valós tanulóval dokumentált felhasználói próba. Kiadáskor nulla ismert kritikus nyelvi vagy pontozási hibát engedünk meg.

## Javasolt A1-es bővítési rend

Megmaradnak az eredeti nyolc lecke és eredményazonosítóik; a 9–12. lecke `A1:8`–`A1:11`, a 13–16. lecke `A1:12`–`A1:15`, a 17–20. lecke `A1:16`–`A1:19`, a 21–24. lecke `A1:20`–`A1:23`, a 25–28. lecke `A1:24`–`A1:27` azonosítóval készült el. A további új leckék ezek után kerülnek, amíg nincs stabil, tartós tanulóazonosító-alapú átrendezés.

| Egység | Tanulási cél | Nyelvtani alap |
| --- | --- | --- |
| A1/9–12 | **Elkészült:** személyes adatok, országok, nyelvek, számok 1–20-ig | lenni, kérdések, számnevek |
| A1/13–16 | **Elkészült:** család, foglalkozások, tulajdonságok, birtoklás | birtokos alakok kezdő szinten, van/nincs |
| A1/17–20 | **Elkészült:** otthon, iskola, környezet, helyviszonyok | hol? hová?, -ban/-ben, -ba/-be, -on/-en/-ön, mellett/előtt/mögött/alatt |
| A1/21–24 | **Elkészült:** mindennapi igék, szabadidős tevékenységek, időpontok, vásárlás | jelen idejű alanyi ragozás, szeret + főnévi igenév, tagadás, -kor, alapvető tárgyeset |
| A1/25–28 | **Elkészült:** kávézó, élelmiszermennyiségek, éttermi rendelés és piaci vásárlás | szeretnék, hány?/mennyi?, mértékegységek, kérek/kérem, tárgyrag megerősítése |
| A1/29–32 | Város, utazás, útbaigazítás | helyviszonyok, rögzült útbaigazító formulák |
| A1/33–36 | Szabadidő, időjárás, tervek | alapvető igekötők és jövőre utalás |
| A1/37–40 | Egyszerű egészségügyi helyzetek, hétköznapi problémák | egyszerű kell/lehet minták, rövid kérdés–válasz |
| A1/41–... | Ismétlés, hiányzó szócikkek, szintzáró gyakorlás | saját hibák célzott újratanítása |

A **nem elkészültnek jelölt** egységek egyelőre tervek. A pontos szószám-elosztást a meglévő 600 szócikk témacsoportos, orosz nyelvű lektorálása után rögzítjük.

## Megkülönböztető pedagógiai előny

A cél nem a pontok vagy animációk mennyisége. A Tanműhely akkor adhat különösen jó értéket, ha oroszul megmutatja **miért** ilyen a magyar szóalak, nem tanít hibás fordítást, és a magyarországi életből vett természetes helyzetekben később visszakéri a tanult szerkezetet. A visszatérő hibákra rövid, célzott magyarázó leckét ajánlunk.
