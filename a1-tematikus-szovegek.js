/* Eredeti, fokozatos A1 olvasmányok. Képek nélkül, orosz feladatutasítással. */
(()=>{'use strict';
const units={
1:{title:'Знакомство в языковой школе',lines:[
['Anna vagyok.','Меня зовут Анна.'],
['Magyarul tanulok.','Я учу венгерский язык.'],
['Ma iskolába megyek.','Сегодня я иду в школу.'],
['Reggel nyolc óra van.','Сейчас восемь часов утра.'],
['Az iskolában sok diák van.','В школе много учеников.'],
['Péter is itt van.','Петер тоже здесь.'],
['Ő magyar.','Он венгр.'],
['Péter kedves és barátságos.','Петер добрый и дружелюбный.'],
['Köszön nekem.','Он здоровается со мной.'],
['Én is köszönök.','Я тоже здороваюсь.'],
['Megkérdezi a nevemet.','Он спрашивает, как меня зовут.'],
['Elmondom a nevemet.','Я называю своё имя.'],
['Péter lassan beszél.','Петер говорит медленно.'],
['Én figyelmesen hallgatok.','Я внимательно слушаю.'],
['Örülök az új barátomnak.','Я рада новому другу.']
],dialogue:[
['Szia! Mi a neved?','Привет! Как тебя зовут?'],
['Anna vagyok. És te?','Я Анна. А ты?'],
['Péter vagyok.','Я Петер.'],
['Magyarul tanulsz?','Ты учишь венгерский?'],
['Igen, magyarul tanulok.','Да, я учу венгерский.'],
['Jól beszélsz magyarul!','Ты хорошо говоришь по-венгерски!'],
['Köszönöm, de még tanulok.','Спасибо, но я ещё учусь.'],
['Semmi baj! Beszéljünk lassan!','Ничего страшного! Давай говорить медленно!']
],questions:[['Hol van Anna?','В школе.','В магазине.','Дома.',0],['Ki magyar?','Анна.','Петер.','Никто.',1]]},
2:{title:'Семейное воскресенье',lines:[
['Vasárnap van.','Сегодня воскресенье.'],
['Otthon vagyok a családommal.','Я дома со своей семьёй.'],
['Az anyukám a konyhában van.','Моя мама на кухне.'],
['Az apukám a kertben dolgozik.','Мой папа работает в саду.'],
['Van egy testvérem.','У меня есть брат или сестра.'],
['A testvérem neve Bence.','Моего брата зовут Бенце.'],
['Bence tizenöt éves.','Бенце пятнадцать лет.'],
['Én húszéves vagyok.','Мне двадцать лет.'],
['Délelőtt együtt reggelizünk.','Утром мы завтракаем вместе.'],
['Kenyeret, sajtot és almát eszünk.','Мы едим хлеб, сыр и яблоки.'],
['Anyukám teát iszik.','Мама пьёт чай.'],
['Apukám kávét iszik.','Папа пьёт кофе.'],
['Délután a nagymamám is eljön.','Днём к нам приходит бабушка.'],
['Sokat beszélgetünk.','Мы много разговариваем.'],
['Szeretem a családomat.','Я люблю свою семью.']
],dialogue:[
['Szia, Bence! Hol van anya?','Привет, Бенце! Где мама?'],
['A konyhában van.','Она на кухне.'],
['És apa?','А папа?'],
['Apa a kertben dolgozik.','Папа работает в саду.'],
['Mit eszünk reggelire?','Что мы едим на завтрак?'],
['Kenyeret és sajtot.','Хлеб и сыр.'],
['Jön ma a nagymama?','Бабушка сегодня придёт?'],
['Igen, délután jön.','Да, она придёт днём.']
],questions:[['Ki dolgozik a kertben?','Мама.','Папа.','Бенце.',1],['Mikor jön a nagymama?','Утром.','Днём.','Ночью.',1]]},
3:{title:'Моя комната и мой дом',lines:[
['Egy kis városban lakom.','Я живу в небольшом городе.'],
['A házunk nem nagy.','Наш дом небольшой.'],
['Van egy kertünk.','У нас есть сад.'],
['A házban három szoba van.','В доме три комнаты.'],
['Van egy konyha is.','Есть и кухня.'],
['A szobám világos.','Моя комната светлая.'],
['Az ablak mellett van az asztalom.','Мой стол стоит у окна.'],
['Az asztalon egy könyv van.','На столе лежит книга.'],
['A székem az asztal mellett van.','Мой стул стоит рядом со столом.'],
['Az ágyam a fal mellett van.','Моя кровать стоит у стены.'],
['Reggel itt olvasok.','Утром я здесь читаю.'],
['Este itt tanulok.','Вечером я здесь учусь.'],
['A kulcsom néha az asztalon van.','Мой ключ иногда лежит на столе.'],
['Ma a kulcsom a táskámban van.','Сегодня мой ключ в сумке.'],
['Szeretem az otthonomat.','Я люблю свой дом.']
],dialogue:[
['Hol van a kulcsod?','Где твой ключ?'],
['A táskámban van.','Он в моей сумке.'],
['Hol van a táskád?','Где твоя сумка?'],
['A szobámban van.','Она в моей комнате.'],
['És hol van a könyved?','А где твоя книга?'],
['Az asztalon van.','Она на столе.'],
['Köszönöm a segítséget!','Спасибо за помощь!'],
['Szívesen!','Пожалуйста!']
],questions:[['Hol van ma a kulcs?','В сумке.','В саду.','В школе.',0],['Hol van az asztal?','У двери.','У окна.','В саду.',1]]}
,4:{title:'Еда и напитки: завтрак дома',lines:[
['Ma szombat van.','Сегодня суббота.'],
['Reggel nyolckor kelek.','Я встаю в восемь утра.'],
['A konyhába megyek.','Я иду на кухню.'],
['Az asztalon kenyér és sajt van.','На столе хлеб и сыр.'],
['A hűtőben tej is van.','В холодильнике есть и молоко.'],
['Először teát készítek.','Сначала я готовлю чай.'],
['A teába nem kérek cukrot.','В чай я не хочу сахар.'],
['Két szelet kenyeret eszem.','Я ем два ломтика хлеба.'],
['A kenyérre sajtot teszek.','На хлеб я кладу сыр.'],
['Anyukám kávét iszik.','Моя мама пьёт кофе.'],
['Apukám egy almát eszik.','Мой папа ест яблоко.'],
['A testvérem vizet kér.','Мой брат просит воды.'],
['Együtt reggelizünk a konyhában.','Мы вместе завтракаем на кухне.'],
['A reggeli egyszerű, de finom.','Завтрак простой, но вкусный.'],
['Reggeli után elmosogatok.','После завтрака я мою посуду.']
],dialogue:[
['Jó reggelt! Kérsz teát?','Доброе утро! Хочешь чай?'],
['Igen, kérek egy teát.','Да, мне чай, пожалуйста.'],
['Kérsz cukrot is?','Хочешь ещё сахар?'],
['Nem, köszönöm.','Нет, спасибо.'],
['Mit eszel reggelire?','Что ты ешь на завтрак?'],
['Kenyeret és sajtot eszem.','Я ем хлеб и сыр.'],
['Kérsz egy almát?','Хочешь яблоко?'],
['Igen, köszönöm szépen!','Да, большое спасибо!']
],questions:[['Mit iszik az anyuka?','Кофе.','Молоко.','Воду.',0],['Hol reggelizik a család?','В саду.','На кухне.','В школе.',1]]}
,5:{title:'Мой обычный день',lines:[
['Hétfő van.','Сегодня понедельник.'],
['Reggel hétkor kelek.','Я встаю в семь утра.'],
['Megmosakszom és felöltözöm.','Я умываюсь и одеваюсь.'],
['Fél nyolckor reggelizem.','Я завтракаю в половине восьмого.'],
['Kenyeret eszem és vizet iszom.','Я ем хлеб и пью воду.'],
['Nyolckor elindulok otthonról.','В восемь я выхожу из дома.'],
['Busszal megyek az iskolába.','Я еду в школу на автобусе.'],
['Délelőtt magyarul tanulok.','В первой половине дня я учу венгерский язык.'],
['Délben ebédelek.','В полдень я обедаю.'],
['Ebéd után egy kicsit pihenek.','После обеда я немного отдыхаю.'],
['Délután házi feladatot írok.','Днём я делаю письменное домашнее задание.'],
['Néha a parkban sétálok.','Иногда я гуляю в парке.'],
['Este otthon vagyok.','Вечером я дома.'],
['Vacsora után könyvet olvasok.','После ужина я читаю книгу.'],
['Tíz órakor lefekszem.','В десять часов я ложусь спать.']
],dialogue:[
['Mikor kelsz reggel?','Во сколько ты встаёшь утром?'],
['Hétkor kelek.','Я встаю в семь.'],
['Mikor reggelizel?','Во сколько ты завтракаешь?'],
['Fél nyolckor.','В половине восьмого.'],
['Mit csinálsz délután?','Что ты делаешь днём?'],
['Tanulok és sétálok.','Я учусь и гуляю.'],
['Mikor fekszel le?','Во сколько ты ложишься спать?'],
['Tíz órakor.','В десять часов.']
],questions:[['Hogyan megy a tanuló az iskolába?','На автобусе.','Пешком.','На велосипеде.',0],['Mit csinál vacsora után?','Готовит.','Читает книгу.','Идёт в магазин.',1]]}
,6:{title:'Вопросы в магазине',lines:[
['Délután a boltba megyek.','Днём я иду в магазин.'],
['A bolt közel van a házunkhoz.','Магазин находится рядом с нашим домом.'],
['Kenyeret és tejet szeretnék venni.','Я хочу купить хлеб и молоко.'],
['A boltban sok ember van.','В магазине много людей.'],
['Először a kenyeret keresem.','Сначала я ищу хлеб.'],
['Megkérdezem az eladót.','Я спрашиваю продавца.'],
['Az eladó kedves.','Продавец приветливый.'],
['Megmutatja, hol van a kenyér.','Он показывает, где находится хлеб.'],
['Egy kenyeret veszek.','Я покупаю одну буханку хлеба.'],
['Utána tejet keresek.','Потом я ищу молоко.'],
['A tej a hűtőben van.','Молоко находится в холодильнике.'],
['Két doboz tejet veszek.','Я покупаю две упаковки молока.'],
['A pénztárnál fizetek.','Я плачу на кассе.'],
['Bankkártyával fizetek.','Я плачу банковской картой.'],
['Végül hazamegyek.','Наконец я возвращаюсь домой.']
],dialogue:[
['Jó napot kívánok! Hol van a kenyér?','Здравствуйте! Где хлеб?'],
['Ott van, a polcon.','Там, на полке.'],
['Köszönöm. És hol találom a tejet?','Спасибо. А где я найду молоко?'],
['A tej a hűtőben van.','Молоко в холодильнике.'],
['Mennyibe kerül ez a kenyér?','Сколько стоит этот хлеб?'],
['Hatszáz forintba kerül.','Он стоит шестьсот форинтов.'],
['Fizethetek kártyával?','Можно оплатить картой?'],
['Igen, természetesen.','Да, конечно.']
],questions:[['Mit vesz a tanuló?','Хлеб и молоко.','Сыр и воду.','Яблоки и чай.',0],['Hogyan fizet?','Наличными.','Картой.','Не платит.',1]]}

,7:{title:'Где находятся мои вещи?',lines:[
['Ma szombat van.','Сегодня суббота.'],
['Anna otthon van.','Анна дома.'],
['A lakásban három szoba van.','В квартире три комнаты.'],
['Anna a szobájában tanul.','Анна учится в своей комнате.'],
['A könyve az asztalon van.','Её книга лежит на столе.'],
['A telefonja az ágyon van.','Её телефон лежит на кровати.'],
['A kulcsa nincs az asztalon.','Её ключа нет на столе.'],
['Anna megkeresi a kulcsát.','Анна ищет свой ключ.'],
['Először a konyhában keres.','Сначала она ищет на кухне.'],
['A kulcs nincs a konyhában.','Ключа на кухне нет.'],
['Utána a táskájába néz.','Потом она заглядывает в свою сумку.'],
['A kulcs a táskában van.','Ключ находится в сумке.'],
['Anna örül.','Анна рада.'],
['Most már elmehet a boltba.','Теперь она может пойти в магазин.'],
['Délután a parkban sétál.','Днём она гуляет в парке.']
],dialogue:[
['Hol van a telefonod?','Где твой телефон?'],
['Az ágyon van.','Он на кровати.'],
['És hol van a kulcsod?','А где твой ключ?'],
['Nem tudom.','Не знаю.'],
['A táskádban van?','Он в твоей сумке?'],
['Igen, ott van!','Да, он там!'],
['Hová mész most?','Куда ты сейчас идёшь?'],
['A boltba megyek.','Я иду в магазин.']
],questions:[['Hol van Anna kulcsa?','В сумке.','На столе.','На кровати.',0],['Hol sétál Anna délután?','В школе.','В парке.','В магазине.',1]]}
,8:{title:'Моё имя, работа и город',lines:[
['A nevem Dóra.','Меня зовут Дора.'],
['Huszonöt éves vagyok.','Мне двадцать пять лет.'],
['Magyarországon élek.','Я живу в Венгрии.'],
['Szegeden lakom.','Я живу в Сегеде.'],
['Szeged szép város.','Сегед — красивый город.'],
['Egy kis lakásban lakom.','Я живу в небольшой квартире.'],
['A lakásom közel van a központhoz.','Моя квартира находится недалеко от центра.'],
['Egy iskolában dolgozom.','Я работаю в школе.'],
['Tanár vagyok.','Я учительница.'],
['Magyarul és angolul beszélek.','Я говорю по-венгерски и по-английски.'],
['Reggel nyolckor kezdődik a munka.','Работа начинается в восемь утра.'],
['Délután hazamegyek.','Днём я возвращаюсь домой.'],
['Este könyvet olvasok.','Вечером я читаю книгу.'],
['Hétvégén találkozom a barátaimmal.','На выходных я встречаюсь с друзьями.'],
['Szeretek Szegeden élni.','Мне нравится жить в Сегеде.']
],dialogue:[
['Jó napot! Hogy hívják?','Здравствуйте! Как вас зовут?'],
['Dóra vagyok.','Меня зовут Дора.'],
['Hol lakik?','Где вы живёте?'],
['Szegeden lakom.','Я живу в Сегеде.'],
['Mi a foglalkozása?','Какая у вас профессия?'],
['Tanár vagyok.','Я учительница.'],
['Beszél angolul?','Вы говорите по-английски?'],
['Igen, beszélek angolul.','Да, я говорю по-английски.']
],questions:[['Hol lakik Dóra?','В Будапеште.','В Сегеде.','В Пече.',1],['Mi Dóra foglalkozása?','Учительница.','Врач.','Продавец.',0]]}
,9:{title:'Страны и языки на курсах',lines:[
['Ma magyarórán vagyok.','Сегодня я на уроке венгерского языка.'],
['Az osztályban sok diák van.','В классе много учеников.'],
['A tanár neve Péter.','Учителя зовут Петер.'],
['Péter magyar.','Петер венгр.'],
['A csoportban Anna is tanul.','В группе учится и Анна.'],
['Anna Oroszországból jött.','Анна приехала из России.'],
['Anna oroszul beszél.','Анна говорит по-русски.'],
['Magyarul még keveset beszél.','По-венгерски она пока говорит мало.'],
['Éva magyar és angolul is beszél.','Эва венгерка и также говорит по-английски.'],
['Thomas Németországból jött.','Томас приехал из Германии.'],
['Ő németül beszél.','Он говорит по-немецки.'],
['A diákok együtt tanulnak.','Ученики учатся вместе.'],
['Új magyar szavakat írnak.','Они записывают новые венгерские слова.'],
['Péter lassan beszél.','Петер говорит медленно.'],
['Mindenki örül az új órának.','Все рады новому уроку.']
],dialogue:[
['Szia! Honnan jöttél?','Привет! Откуда ты приехал?'],
['Oroszországból. És te?','Из России. А ты?'],
['Németországból jöttem.','Я приехал из Германии.'],
['Beszélsz magyarul?','Ты говоришь по-венгерски?'],
['Igen, egy kicsit.','Да, немного.'],
['És angolul?','А по-английски?'],
['Igen, angolul is beszélek.','Да, по-английски я тоже говорю.'],
['Beszéljünk magyarul!','Давай говорить по-венгерски!']
],questions:[['Honnan jött Thomas?','Из Германии.','Из Венгрии.','Из России.',0],['Milyen nyelven beszél Anna?','По-русски.','По-испански.','По-итальянски.',0]]}

,10:{title:'Числа от одного до десяти',lines:[
['Ma a magyarórán számolunk.','Сегодня на уроке венгерского мы считаем.'],
['A tanár a táblánál áll.','Учитель стоит у доски.'],
['Az asztalon egy könyv van.','На столе одна книга.'],
['A könyv mellett két toll van.','Рядом с книгой две ручки.'],
['Anna három ceruzát lát.','Анна видит три карандаша.'],
['Péter négy almát rajzol.','Петер рисует четыре яблока.'],
['Az asztalon öt füzet van.','На столе пять тетрадей.'],
['A tanár hat szót ír a táblára.','Учитель пишет на доске шесть слов.'],
['A teremben hét szék van.','В комнате семь стульев.'],
['Nyolc diák ül a székeken.','Восемь учеников сидят на стульях.'],
['Kilenc könyv van a polcon.','На полке девять книг.'],
['Tíz percig tanulunk.','Мы учимся десять минут.'],
['Anna hangosan számol.','Анна считает вслух.'],
['Péter is számol.','Петер тоже считает.'],
['A tanár azt mondja: nagyon jó!','Учитель говорит: очень хорошо!']
],dialogue:[
['Hány könyv van az asztalon?','Сколько книг на столе?'],
['Egy könyv van az asztalon.','На столе одна книга.'],
['Hány toll van mellette?','Сколько ручек рядом с ней?'],
['Két toll.','Две ручки.'],
['Hány almát rajzol Péter?','Сколько яблок рисует Петер?'],
['Négy almát.','Четыре яблока.'],
['Hány diák van itt?','Сколько здесь учеников?'],
['Nyolc diák.','Восемь учеников.']
],questions:[['Hány ceruzát lát Anna?','Три.','Четыре.','Пять.',0],['Hány könyv van a polcon?','Восемь.','Девять.','Десять.',1]]}
,11:{title:'Возраст и числа от одиннадцати до двадцати',lines:[
['Ma Anna születésnapja van.','Сегодня день рождения Анны.'],
['Anna tizennyolc éves.','Анне восемнадцать лет.'],
['A barátai délután jönnek.','Её друзья придут днём.'],
['A szobában tizenkét szék van.','В комнате двенадцать стульев.'],
['Az asztalon tizenegy pohár van.','На столе одиннадцать стаканов.'],
['A konyhában tizenhárom tányér van.','На кухне тринадцать тарелок.'],
['Péter tizennégy léggömböt hoz.','Петер приносит четырнадцать воздушных шаров.'],
['Dóra tizenöt szalvétát tesz az asztalra.','Дора кладёт на стол пятнадцать салфеток.'],
['A tortán tizennyolc gyertya van.','На торте восемнадцать свечей.'],
['Anna nagyon örül a tortának.','Анна очень рада торту.'],
['Az egyik barátja tizenhat éves.','Одному из её друзей шестнадцать лет.'],
['A másik barátja tizenhét éves.','Другому её другу семнадцать лет.'],
['A testvére tizenkilenc éves.','Её брату девятнадцать лет.'],
['A torta húsz szeletre van vágva.','Торт разрезан на двадцать кусочков.'],
['Mindenki boldog a születésnapon.','Все счастливы на дне рождения.']
],dialogue:[
['Szia, Anna! Hány éves vagy ma?','Привет, Анна! Сколько тебе сегодня лет?'],
['Tizennyolc éves vagyok.','Мне восемнадцать лет.'],
['Boldog születésnapot!','С днём рождения!'],
['Köszönöm szépen!','Большое спасибо!'],
['Hány gyertya van a tortán?','Сколько свечей на торте?'],
['Tizennyolc gyertya.','Восемнадцать свечей.'],
['És hány szelet torta van?','А сколько кусочков торта?'],
['Húsz szelet.','Двадцать кусочков.']
],questions:[['Hány éves Anna?','Шестнадцать.','Восемнадцать.','Двадцать.',1],['Hány pohár van az asztalon?','Одиннадцать.','Двенадцать.','Тринадцать.',0]]}

};
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
window.TanmuhelyRenderA1LongReadings=(level,index)=>{
 document.getElementById('a1LongReading')?.remove();
 if(level!=='A1'||!units[index])return;
 const data=units[index],anchor=document.getElementById('lessonReadingLines');
 if(!anchor)return;
 const details=el('details');details.id='a1LongReading';details.className='a1-long-reading';
 const sum=el('summary','Дополнительный текст и диалог · 15 предложений');details.append(sum);
 details.append(el('h4',data.title),el('p','Прочитайте венгерский текст. Нажмите «Перевод», чтобы проверить понимание.'));
 const toggle=el('button','Показать перевод');toggle.type='button';
 const translations=[];const body=el('div');
 for(const [hu,ru] of data.lines){const row=el('div');row.className='lesson-reading-pair';const p=el('p',hu);p.lang='hu';const t=el('p',ru);t.lang='ru';t.hidden=true;translations.push(t);row.append(p,t);body.append(row);}
 toggle.onclick=()=>{const open=translations[0]?.hidden;translations.forEach(n=>n.hidden=!open);toggle.textContent=open?'Скрыть перевод':'Показать перевод';};
 details.append(toggle,body,el('h4','Диалог · Párbeszéd'));
 for(const [hu,ru] of data.dialogue){const row=el('div');row.className='lesson-reading-pair';const p=el('p',hu);p.lang='hu';const t=el('p',ru);t.lang='ru';t.hidden=true;translations.push(t);row.append(p,t);details.append(row);}
 const section=el('div');section.append(el('h4','Проверьте понимание'));
 data.questions.forEach(([question,...rest])=>{const correct=rest.pop();const block=el('div');block.className='a1-reading-check';const prompt=el('p',question);prompt.lang='hu';block.append(prompt);const feedback=el('p');feedback.setAttribute('role','status');rest.forEach((choice,i)=>{const button=el('button',choice);button.type='button';button.className='integrated-answer';button.onclick=()=>{feedback.textContent=i===correct?'✓ Верно.':'✗ Попробуйте ещё раз.';block.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));};block.append(button);});block.append(feedback);section.append(block);});
 details.append(section);
 anchor.insertAdjacentElement('afterend',details);
};
window.TANMUHELY_A1_LONG_READING_REPORT=Object.entries(units).map(([index,u])=>({lesson:Number(index)+1,sentences:u.lines.length,dialogueTurns:u.dialogue.length}));
})();