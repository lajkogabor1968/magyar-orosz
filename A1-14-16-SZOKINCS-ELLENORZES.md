# A1/14–16: szókincsterhelés és előfeltételek – célzott szakmai vizsgálat
Dátum: 2026-11-23. Forrás: `a1-guided-lessons-13-16.js`, a `a1-writing-feedback-20261123` fejlesztőágban.

## A1/14 – Foglalkozások és munkahely
A szókártyák 12 alapszót és 7 kiegészítő kifejezést tartalmaznak. A jelenlegi alapértelmezett kötelező kártyaszám 10; az `étterem` és `bolt` az alapszavak 11–12. helyén marad, miközben a kötelező párbeszédben `kórház`, `iskola`, `tanár`, `orvos` és a `dolgozik` ragozott alakjai szerepelnek. A kötelező olvasmány **étteremben** alakot is használ, így az `étterem` szót nem szabad pusztán a 11. helye alapján előtanítás nélkülinek tekinteni. A `tanárnő` és `magyartanár` az első tíz között van, de nem szükséges a rövid kötelező párbeszéd megértéséhez.

**Következő javítási jelölt:** a kötelező szavak és a kötelező szöveg tényleges szóalakjainak összevetése; a `tanárnő` és `magyartanár` kifejezések opcionálissá tétele csak úgy biztonságos, ha a szókártyák régi indexei, a mentett tesztsorrend és az `étteremben` előtanítása is változatlanul működik. Az egyszerű `coreCount: 8` módosítás **nem megfelelő**, mert az első nyolcban `tanárnő` és `magyartanár` maradna, míg `iskola` és `kórház` kiesne.

## A1/15 – Személyek leírása
14 alapszó és 4 kiegészítő kifejezés. A kötelező nyelvtan és olvasmány a `kedves`, `fiatal`, `magas`, `nagy`, `kicsi`, `nem` szavakat is használja. A jelenlegi első tíz kártya között `nem` nincs, és a `nagyon` sem szerepel az első tízben, noha mindkettő előfordul a kötelező párbeszédben vagy nyelvtanban. Ez **előtanítási ellenőrzést igényel**, nem automatikus szócsökkentést. A párbeszéd `új` szava szintén a kötelező tízen kívül esik.

**Következő javítási jelölt:** a tanuló a kötelező feladat előtt kapjon világos, oroszul magyarázott, hallgatható `nem`, `nagyon`, `új` mintákat; csak ezután dönthető el, melyik szókártya legyen opcionális. Az eredeti kártyaindexek és mentések nem módosulhatnak.

## A1/16 – Van / nincs
A lecke 10 alapszót tartalmaz, amelyekből több korábban is szerepelt; a fő új nyelvtani elem a birtokos szerkezet és a `nincs`. Ennél a leckénél **nem indokolt pusztán a kártyaszám alapján** újabb 8+2-es csökkentés. A birtokos alakok külön előkészítése fontosabb.

## Kiadási döntés
A 13 összesített új-szószámra figyelmeztető auditjelzés nem azonos a kötelező, tanítás nélkül számon kért szavak számával. A következő fejlesztésben két külön mérőszámot kell vezetni: (1) minden új kártya/kifejezés, (2) a kötelező tanulási lépésekben ténylegesen szükséges új szavak és alakok. A szóalakokat (`étterem` → `étteremben`) külön kell vizsgálni. A korábbi tanulói mentések visszafelé kompatibilitása és az A2 érintetlensége kötelező.

**Státusz:** dokumentált szakmai ellenőrzés, nem kódmódosítás, nem bizonyított tanulói hatás.