/* Kiegészítő mini-tankönyv A1–A2: saját szerkesztésű, orosz magyarázatokkal. */
(()=>{'use strict';
const content={
 A1:{
  0:{notes:[['Mi ez?','Что это?','Mi = что; ez = это. Вопрос о предмете.'],['Ez egy park.','Это парк.','Слова egy нет в русском переводе: это венгерский неопределённый артикль.']],tables:[['Ez egy taxi.','Это такси.','egy перед существительным'],['Ez a bank.','Это банк.','a — определённый артикль перед согласным']]},
  1:{notes:[['Ön orosz?','Вы русский? / Вы русская?','Ön — вежливое обращение к одному человеку.'],['Mi az ön neve?','Как вас зовут?','Вежливый вопрос при знакомстве.']],tables:[['Te magyar vagy?','Ты венгр? / Ты венгерка?','te + vagy: неформальное обращение'],['Ön magyar?','Вы венгр? / Вы венгерка?','ön: при именном сказуемом связка обычно отсутствует']]},
  2:{notes:[['Ő az anyukám.','Это моя мама.','anyuka → anyukám: окончание выражает принадлежность.'],['Van családom.','У меня есть семья.','van + существительное с притяжательным окончанием.']],tables:[['anyuka → anyukám','мама → моя мама','a удлиняется в á'],['apa → apám','папа → мой папа','a удлиняется в á; вариант apukám тоже возможен']]},
  3:{notes:[['A kanapé a nappaliban van.','Диван находится в гостиной.','-ban/-ben обозначает местонахождение внутри.'],['A kulcs az asztalon van.','Ключ на столе.','-on обозначает положение на поверхности.']],tables:[['szoba → szobában','в комнате','-ban: с гармонией гласных'],['asztal → asztalon','на столе','-on: на поверхности']]},
  4:{notes:[['Szeretek főzni.','Я люблю готовить.','После szeretek часто употребляется инфинитив на -ni.'],['Kérek egy teát.','Мне чай, пожалуйста.','tea → teát: винительный падеж; a → á.']],tables:[['főz → főzni','готовить','инфинитив часто образуется с -ni'],['tea → teát','чай (объект)','показатель винительного падежа -t']]},
  5:{notes:[['Reggelente teát iszom.','По утрам я пью чай.','reggelente — регулярно по утрам; reggel — утро или утром.'],['Szeretek olvasni.','Я люблю читать.','olvasni — инфинитив; olvasok — я читаю.']],tables:[['ma / holnap','сегодня / завтра','обстоятельства времени'],['olvasok / olvasni','я читаю / читать','личная форма и инфинитив']]},
  6:{notes:[['Hány éves ön?','Сколько вам лет?','hány = сколько; éves = лет от роду.'],['Kérem, beszéljen lassan!','Пожалуйста, говорите медленно!','Вежливая просьба к одному человеку.']],tables:[['Ki? / Mi?','Кто? / Что?','человек / предмет'],['Hol? / Mikor?','Где? / Когда?','место / время']]},
  7:{notes:[['Az osztályban tanulok.','Я учусь в классе.','-ban/-ben отвечает на вопрос hol? — где?'],['Az iskolába megyek.','Я иду в школу.','-ba/-be отвечает на вопрос hová? — куда?; это подготовка к A2.']],tables:[['házban / kertben','в доме / в саду','hol? — где?'],['házba / kertbe','в дом / в сад','hová? — куда?; предварительное знакомство']]}
 },
 A2:{
  0:{notes:[['Készen állsz a beszélgetésre?','Ты готов к разговору?','készen áll valamire: быть готовым к чему-либо.'],['Szeretnék találkozni veled.','Я хотел бы встретиться с тобой.','találkozik valakivel — встречаться с кем-либо.']],tables:[['Szeretek beszélgetni.','Я люблю беседовать.','szeretek + инфинитив'],['Szeretnék beszélgetni.','Я хотел бы побеседовать.','szeretnék выражает более мягкое желание']]},
  1:{notes:[['A szobám otthonos.','Моя комната уютная.','otthonos описывает уютную обстановку, не просто дом.'],['A barátomhoz megyek.','Я иду к другу.','-hoz/-hez/-höz: направление к человеку или месту.']],tables:[['szobában / szobába / szobából','в комнате / в комнату / из комнаты','hol? / hová? / honnan?'],['barátnál / baráthoz / baráttól','у друга / к другу / от друга','группа суффиксов для одушевлённого лица']]},
  2:{notes:[['Tegnap dolgoztam.','Вчера я работал / работала.','Прошедшее время: dolgoz- + -t- + -am.'],['Ma jobban értem.','Сегодня я понимаю лучше.','jobban — сравнительная форма слова jól.']],tables:[['Ma tanulok.','Сегодня я учусь.','настоящее время'],['Tegnap tanultam.','Вчера я учился / училась.','прошедшее время: tanul + -t + -am']]}
 }
};
window.TanmuhelyEnrichA1A2=function(courses){
// Az alábbi rövid kiegészítések saját szerkesztésűek; a torontói gyűjteményből
// kizárólag a napirend és a múlt idő kommunikációs témaválasztását vettük ötletként.
const focus=[
 {level:'A1',index:5,notes:[
  ['Mikor reggelizel?','Когда ты завтракаешь?','Mikor? — когда? Reggelizel — ты завтракаешь.'],
  ['Reggel hétkor reggelizem.','Я завтракаю в семь утра.','Reggel — утром; hétkor — в семь часов.'],
  ['Este egy kicsit olvasok.','Вечером я немного читаю.','Az időhatározó gyakran a mondat elején áll: este — вечером.']
 ],tables:[['Reggel dolgozom.','Утром я работаю.','время + личная форма глагола'],['Holnap pihenek.','Завтра я отдыхаю.','завтра + настоящее время для будущего действия']]},
 {level:'A2',index:2,notes:[
  ['Mit csináltál hétvégén?','Что ты делал / делала на выходных?','A hétvégén — на выходных. Csináltál — прошедшее время, 2-е лицо.'],
  ['Szombaton bevásároltam.','В субботу я сделал / сделала покупки.','Bevásároltam — прошедшее время от bevásárol.'],
  ['Vasárnap otthon pihentem.','В воскресенье я отдыхал / отдыхала дома.','Pihentem — прошедшее время от pihen.']
 ],tables:[['Ma pihenek.','Сегодня я отдыхаю.','настоящее время'],['Tegnap pihentem.','Вчера я отдыхал / отдыхала.','прошедшее время'],['Ma bevásárolok. / Tegnap bevásároltam.','Сегодня делаю покупки. / Вчера сделал(а) покупки.','сравните настоящее и прошедшее']]}
];
for(const unit of focus){const l=courses[unit.level]?.[unit.index];if(!l)continue;
 l.preparation=l.preparation||[];l.grammarTable=l.grammarTable||[];
 const noteKeys=new Set(l.preparation.map(x=>x[0]+'|'+x[1]));
 const grammarKeys=new Set(l.grammarTable.map(x=>x[0]+'|'+x[1]));
 for(const n of unit.notes){const key=n[0]+'|'+n[1];if(!noteKeys.has(key)){l.preparation.push(n);noteKeys.add(key)}}
 for(const t of unit.tables){const key=t[0]+'|'+t[1];if(!grammarKeys.has(key)){l.grammarTable.push(t);grammarKeys.add(key)}}
}
const changes=[];
for(const [lv,units] of Object.entries(content))for(const [ix,value] of Object.entries(units)){
 const lesson=courses[lv]?.[Number(ix)];if(!lesson)continue;
 lesson.preparation=lesson.preparation||[]; lesson.grammarTable=lesson.grammarTable||[];
 const existingNotes=new Set(lesson.preparation.map(x=>x[0]+'|'+x[1]));
 const existingTables=new Set(lesson.grammarTable.map(x=>x[0]+'|'+x[1]));
 for(const n of value.notes){const key=n[0]+'|'+n[1];if(!existingNotes.has(key)){lesson.preparation.push(n);existingNotes.add(key)}}
 for(const t of value.tables){const key=t[0]+'|'+t[1];if(!existingTables.has(key)){lesson.grammarTable.push(t);existingTables.add(key)}}
 changes.push({level:lv,lesson:Number(ix),addedTeachingNotes:value.notes.length,addedGrammarExamples:value.tables.length});
}
window.TANMUHELY_A1A2_TEXTBOOK_REPORT=changes;
return changes;
};
})();
