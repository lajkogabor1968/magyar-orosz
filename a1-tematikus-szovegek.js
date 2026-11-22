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
 const feedback=el('p');feedback.setAttribute('role','status');
 data.questions.forEach(([question,...rest])=>{const correct=rest.pop();const prompt=el('p',question);prompt.lang='hu';section.append(prompt);rest.forEach((choice,i)=>{const button=el('button',choice);button.type='button';button.className='integrated-answer';button.onclick=()=>{feedback.textContent=i===correct?'✓ Верно.':'✗ Попробуйте ещё раз.';};section.append(button);});});
 section.append(feedback);details.append(section);
 anchor.insertAdjacentElement('afterend',details);
};
window.TANMUHELY_A1_LONG_READING_REPORT=Object.entries(units).map(([index,u])=>({lesson:Number(index)+1,sentences:u.lines.length,dialogueTurns:u.dialogue.length}));
})();