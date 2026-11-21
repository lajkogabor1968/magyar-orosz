# Magyar–orosz Tanulóműhely – minőség, Android és fenntartható bevétel

**Cél:** orosz anyanyelvűeknek szóló, tanári szakértelemre épülő magyar nyelvtanuló alkalmazás. A működő honlapot fejlesztjük tovább; a Play Áruházba szánt Android-változat ugyanennek a terméknek a későbbi kiadása. A kiinduló elv: *ne rögzüljön hibás fordítás vagy téves tesztvisszajelzés*.

## 1. Bizonyított jelenlegi állapot (2026-11-21)

- Egyetlen, mobilon elérhető magyar–orosz webalkalmazás: szólista, tanulókártyák, szó- és mondatfeladatok, párbeszédek, nyelvtani modulok, tanulási javaslatok és helyi eredmények.
- Szókincs: A1 **600**, A2 **1200**, B1 **431**, B2 **14** bejegyzés. **A B2 szószám nem elegendő egy teljes B2-es tanfolyam ígéretéhez.**
- Az A2 **1200/1200 szócikkének első nyelvi köre** elkészült; **931 bejegyzés** módosult. Ez nem anyanyelvi hitelesítés.
- Az előre generált magyar MP3-készlet egyelőre csak a tananyag egy részét fedi le; a többi hang lejátszása készülékfüggő. Két korábbi, szövegükben elavult hanghivatkozás újrafelvételre vár.
- A tanulói eredmények böngészős `localStorage`-ban vannak. **Nincs** fiókok közötti szinkronizálás, kész Android-csomag, Play Áruház-közzététel vagy fizetési rendszer.

## 2. Következő kötelező minőségi kapuk

1. **Fordítás:** teljes A1–A2 második, független keresztellenőrzése; kétértelmű címszavak, ragozás, orosz igeszemlélet és a példák természetessége. Orosz anyanyelvű lektori ellenőrzés szükséges, az ellenőrző neve és dátuma belső naplóval.
2. **Tesztigazságosság:** azonos magyar kérdéshez tartozó másik elfogadható orosz fordítás nem szerepelhet hibás válaszként. A `choice-options.js` és `verify-quiz-options.mjs` ezt az *azonos szöveggel megfogalmazott kérdésekre* automatikusan őrzi; külön emberi ellenőrzés kell a szinonimákhoz és másképp fogalmazott, de egyaránt helyes megoldásokhoz.
3. **Hang:** az eredeti MP3-fájlok és a szöveg egyezése, érthető kiejtés, Android/Chrome-próba. A beszédgyakorlás maradjon egyértelműen **önellenőrzés**, amíg nincs hitelesített automatikus kiejtésértékelés.
4. **Tanulási eredmény:** valódi tanulói próbákon mérni a megértést, a visszatérést, az ismétlések eredményességét és a félreérthető feladatok számát. Javítás előtt és után külön tesztadat.
5. **Mobilminőség és hozzáférhetőség:** kis képernyőn könnyű navigáció, nagy érintési célfelületek, képernyőolvasó, stabil pontmentés, lassú hálózat és offline helyzetek kezelése. Az adatokat átálláskor sem szabad elveszíteni.

## 3. A Duolingóval való verseny helyett: világos saját előnyök

- **Magyar nyelv orosz anyanyelvűeknek:** célzott, kétnyelvű magyarázatok és magyar–orosz nyelvtani összevetések.
- **Életszerű magyarországi helyzetek:** hivatal, lakásbérlés, orvos, munkavállalás, tömegközlekedés, iskola, kulturális tudnivalók.
- **Tanári magyarázat a hibáknál:** a jó válaszon túl a tévedés oka, rövid szabály és újragyakorlás.
- **Rugalmas tanulás:** rövid, ismétlésre épülő gyakorlás és hosszabb, valódi szövegértést fejlesztő leckék; nem pusztán pontszerzés.
- **Átlátható szintjelzés:** az A1/A2/B1/B2 megnevezés mindig ténylegesen ellenőrzött tudáshoz és tananyaghoz kapcsolódjon, ne egy címkéhez.

## 4. Android-alkalmazás és Play Áruház

1. **Előbb a tanulói mobilélmény:** A1–A2 minőségi kapuk és telefonos próbateszt, offline igény, akadálymentesség és megbízható eredménytárolás.
2. **Android-csomagolás megtervezése:** egy valódi, tesztelhető Android-változat (pl. Capacitor) azonos tananyagból, nem különálló új kurzusból. A Trusted Web Activity is megvizsgálható; az eredeti honlap tulajdonjogát és a digitális kapcsolati fájlt külön igazolni kell. A technikai döntést a kívánt offline működés és fizetési integráció alapján hozzuk meg.
3. **Play-megfelelés:** az aktuális Google Play cél-API-szint, fióktípus szerinti tesztelés, adatkezelési tájékoztató, minőségi elvárások, grafikai elemek és áruházi ismertető. Új, 2023. november 13. utáni **személyes** fejlesztői fiókoknál jelenleg általában legalább **12 tesztelő 14 egymást követő napon át** szükséges a gyártási hozzáférés kéréséhez.
4. **Fizetős funkció csak megbízható jogosultságkezeléssel:** Androidon digitális előfizetésnél figyelembe kell venni a Play fizetési szabályait; vásárlásellenőrzéshez szerveroldali megoldás, a tanulói jogosultságok visszaállítása és adatvédelmi terv kell. Nem készítünk látszólagos prémiumkaput valódi jogosultság-ellenőrzés nélkül.

## 5. Fenntartható, tanulóbarát üzleti modell – előzetes javaslat

- **Ingyenes rész:** valóban használható A1-es alaptanulás, néhány párbeszéd és próbagyakorlás.
- **Lehetséges prémium:** teljes ellenőrzött A2 és későbbi B1 tanfolyam, rendszerezett tanulási út, offline csomagok, bővített gyakorlás és a fejlődés követése – csak akkor ígérve, ha az adott funkció működik.
- **Árazás:** előbb 20–30 tényleges célcsoportbeli tanuló visszajelzése és fizetési hajlandóságának mérése; az előfizetési ár későbbi döntés. A bevétel nem garantált és nem teljesen passzív: fenntartás, lektorálás, ügyfélszolgálat és rendszerfrissítés folyamatos feladat.
- **Pénzügyi terv:** a bruttó árbevételből külön kell levonni az aktuális Play-szolgáltatási és fizetési díjakat, az adózást, a hangok/lektorálás és az infrastruktúra költségét. A díjak régiónként és programonként eltérhetnek; nincs rögzített, minden esetre alkalmazható jutalék.

## 6. Mit jelent a következő kész mérföldkő?

**„A1–A2 zárt tanulói béta”** akkor kész, ha a fordítás második köre és az orosz lektorálás befejeződött, a szinonimás válaszok kézi tesztje lezajlott, a hangok működnek a célkészülékeken, nincs ismert adatvesztés, és legalább egy kis csoport valós használata dokumentált. **A Play Áruházba publikálást ettől külön döntés és ellenőrzés előzi meg.**

### Hivatalos, idővel változható feltételek

- [Google Play – cél-API-követelmények](https://support.google.com/googleplay/android-developer/answer/11926878)
- [Google Play – új személyes fiókok tesztkövetelménye](https://support.google.com/googleplay/android-developer/answer/14151465)
- [Android Developers – Google Play Billing](https://developer.android.com/google/play/billing)
- [Google Play – szolgáltatási díjak](https://support.google.com/googleplay/android-developer/answer/112622)
- [Chrome – Trusted Web Activity útmutató](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)
