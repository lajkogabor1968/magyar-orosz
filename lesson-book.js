/* Guided Hungarian workbook. Existing source data and assessment records are not modified. */
(() => {
'use strict';
const $=id=>document.getElementById(id),root=document.documentElement;
const view=$('integratedLessonView'),hub=$('studyHub'),back=$('studyBack');
if(!view||!hub||!back)return;
const KEY='magyarorosz.lesson-route.v1',WRITING='magyarorosz.mini-compositions.v1';
const alphabet=[['a','короткое [ɒ]'],['á','долгое [aː]'],['b','б'],['c','ц'],['cs','ч'],['d','д'],['dz','дз'],['dzs','дж'],['e','открытое [ɛ]'],['é','долгое [eː]'],['f','ф'],['g','г'],['gy','мягкое [ɟ]'],['h','х'],['i','и'],['í','долгое и'],['j','й'],['k','к'],['l','л'],['ly','й'],['m','м'],['n','н'],['ny','мягкое [ɲ]'],['o','короткое о'],['ó','долгое о'],['ö','[ø]'],['ő','долгое [øː]'],['p','п'],['q','в заимствованиях'],['r','р'],['s','ш'],['sz','с'],['t','т'],['ty','мягкое [c]'],['u','у'],['ú','долгое у'],['ü','[y]'],['ű','долгое [yː]'],['v','в'],['w','в заимствованиях'],['x','кс'],['y','в заимствованиях'],['z','з'],['zs','ж']];
const courses={
A1:[
{title:'Первые десять знакомых слов',words:['telefon','metró','taxi','rádió','internet','bank','pizza','banán','film','park'],grammar:['Это знакомые слова — и первое венгерское предложение','Ez — «это», egy — «один / неопределённый артикль». Mi ez? — «Что это?» És ez? — «А это?» Ez egy telefon. — «Это телефон». Ударение обычно на первом слоге. Обратите внимание на ó в metró и rádió, á в banán.','Ez egy telefon. — Это телефон.'],dialogue:['Mi ez?','Ez egy telefon.','És ez?','Ez egy rádió.'],composition:['Мои первые венгерские предложения','Составьте не менее 2 коротких предложений по изученному образцу Ez egy … . Используйте слова из этой страницы.','Ez egy telefon. / Ez egy taxi. / Ez egy park.'],min:2},
{title:'Приветствия и знакомство',words:['én','te','ő','igen','nem','magyar','beszél','vagy','hogy','ki','mi'],extra:[['Szia!','Привет!','Szia! Hogy vagy?','Привет! Как дела?'],['Jó napot!','Добрый день!','Jó napot kívánok!','Добрый день!'],['Köszönöm.','Спасибо.','Köszönöm szépen.','Большое спасибо.'],['Jól vagyok.','У меня всё хорошо.','Jól vagyok, köszönöm.','У меня всё хорошо, спасибо.']],grammar:['Местоимения и глагол lenni','Én — я, te — ты, ő — он/она. Hogy vagy? — Как дела? Jól vagyok — У меня всё хорошо.','Hogy vagy? — Jól vagyok.'],dialogue:['Szia!','Szia! Hogy vagy?','Jól vagyok, köszönöm. És te?','Én is jól vagyok.'],composition:['О себе','Напишите не менее 3 коротких предложений по образцам: кто вы, как вас зовут, как себя чувствуете.','A nevem Anna. / Magyar vagyok. / Jól vagyok.'],min:3},
{title:'Моя семья',words:['anya','apa','család','gyerek','fiú','lány','nő','férfi','barát','testvér'],grammar:['Кто это?','Ki ez? — Кто это? Ő az anyukám. — Это моя мама.','Ki ez? — Ő az anyukám.'],dialogue:['Ki ez?','Ő az anyukám.','És ő?','Ő az apukám.'],composition:['Моя семья','Расскажите о семье в 3–5 коротких предложениях.','Ez a családom. / Ő az anyukám. / Ő az apukám.'],min:3},
{title:'Мой дом',words:['ház','lakás','szoba','asztal','szék','ajtó','ablak','ágy','kert','kulcs'],extra:[['kert','сад','A kert szép.','Сад красивый.']],grammar:['Где находится предмет?','Hol? — Где? Van — есть/находится; nincs — нет.','Hol van a könyv? — Az asztalon van.'],dialogue:['Hol van a kulcs?','Az asztalon van.','Köszönöm!','Szívesen!'],composition:['Мой дом','Напишите 4 предложения о своём доме или квартире.','Egy házban lakom. / Ez a szobám. / Az ajtó nyitva van.'],min:4},
{title:'Еда и напитки',words:['alma','kenyér','víz','tea','kávé','tej','sajt','tojás','eszik','iszik'],grammar:['Как попросить?','Kérek — Мне, пожалуйста. В прямом дополнении часто используется -t.','Kérek egy teát.'],dialogue:['Mit kérsz?','Egy teát kérek.','Cukorral?','Nem, köszönöm.'],composition:['Моя любимая еда','Напишите 4 предложения о том, что вы едите и пьёте.','Szeretem a teát. / Reggel kenyeret eszem. / Vizet iszom.'],min:4},
{title:'Мой день: сегодня и завтра',words:['ma','holnap','reggel','este','iskola','tanul','olvas','dolgozik','sétál','mindennap'],examples:{ma:['Ma tanulok.','Сегодня я учусь.'],holnap:['Holnap dolgozom.','Завтра я работаю.'],reggel:['Reggel tanulok.','Утром я учусь.'],este:['Este olvasok.','Вечером я читаю.'],iskola:['Ez egy iskola.','Это школа.'],tanul:['Magyarul tanulok.','Я учу венгерский язык.'],olvas:['Este olvasok.','Вечером я читаю.'],dolgozik:['Apa dolgozik.','Папа работает.'],sétál:['A parkban sétálok.','Я гуляю в парке.'],mindennap:['Mindennap tanulok.','Я учусь каждый день.']},grammar:['Время и простое настоящее время','ma — сегодня; holnap — завтра; reggel — утром; este — вечером. С местоимением én форма глагола tanul — tanulok («я учусь»), olvas — olvasok («я читаю»). Mindennap tanulok. — «Я учусь каждый день».','Ma tanulok. — Сегодня я учусь.'],dialogue:['Mit csinálsz ma?','Ma tanulok.','És holnap?','Holnap dolgozom.'],composition:['Мой день','Напишите 4 разных коротких предложения о том, что вы делаете сегодня, утром, вечером и завтра. Используйте образцы.','Ma tanulok. / Reggel tanulok. / Este olvasok. / Holnap dolgozom.'],min:4},
{title:'Вопросы и короткие ответы',words:['ma','holnap','anya','apa','iskola','bolt','park','lakik','tanul','olvas'],extra:[['Ki?','кто?','Ki ez?','Кто это?'],['Mi?','что?','Mi ez?','Что это?'],['Hol?','где?','Hol van az iskola?','Где находится школа?'],['Mikor?','когда?','Mikor tanulsz?','Когда ты учишься?'],['Mit csinálsz?','что ты делаешь?','Mit csinálsz ma?','Что ты делаешь сегодня?']],grammar:['Как задавать простые вопросы','Венгерские вопросительные слова: ki? — кто? mi? — что? hol? — где? mikor? — когда? Часто вопросительное слово стоит в начале: Ki ez? — «Кто это?»; Mi ez? — «Что это?»; Hol van az iskola? — «Где находится школа?»; Mikor tanulsz? — «Когда ты учишься?» Tanulsz — «ты учишься», а tanulok — «я учусь».','Mikor tanulsz? — Reggel tanulok.'],dialogue:['Mikor tanulsz?','Reggel tanulok.','Mit csinálsz este?','Este olvasok.'],composition:['Я умею задавать вопросы','Напишите не менее 4 разных коротких предложений по изученным образцам: два вопроса и два ответа.','Mikor tanulsz? / Reggel tanulok. / Mit csinálsz este? / Este olvasok.'],min:4},
{title:'Где? Местонахождение и -ban/-ben',words:['ház','lakás','szoba','iskola','bolt','park','kert','tanul','dolgozik','van'],extra:[['Hol?','где?','Hol van Anna?','Где Анна?'],['házban','в доме','Anna a házban van.','Анна в доме.'],['iskolában','в школе','A fiú az iskolában van.','Мальчик в школе.'],['boltban','в магазине','Apa a boltban van.','Папа в магазине.'],['kertben','в саду','Anya a kertben van.','Мама в саду.']],grammar:['Где? Суффиксы -ban / -ben','Hol? — «Где?» Если предмет или человек находится внутри, часто используем суффикс -ban или -ben. После гласных заднего ряда: ház → házban, bolt → boltban. После гласных переднего ряда: kert → kertben. Конечная a в iskola удлиняется: iskolában. Учтите: парк — parkban, но в повседневной речи часто говорят a parkban sétálok — «я гуляю в парке».','Hol van Anna? — Anna a házban van.'],dialogue:['Hol van apa?','Apa a boltban van.','És anya?','Anya a kertben van.'],composition:['Где находится моя семья?','Напишите четыре разные простые фразы о том, где находятся люди или что расположено в доме. Пользуйтесь образцами.','Apa a boltban van. / Anya a kertben van. / Anna a házban van. / A fiú az iskolában van.'],min:4}
],
A2:[
{title:'Общение и планы',words:['beszélget','válaszol','telefonál','üzenet','kérdés','magyaráz','érdekel'],extra:[['kérdés','вопрос','Van egy kérdésem.','У меня есть вопрос.'],['magyaráz','объяснять','A tanár magyaráz.','Учитель объясняет.'],['érdekel','интересовать','Érdekel a magyar nyelv.','Меня интересует венгерский язык.']],grammar:['Спряжение и разговор','beszélgetek — я разговариваю; beszélgetsz — ты; beszélget — он/она.','Miről beszélgettek?'],dialogue:['Szia! Van egy perced?','Igen. Miről szeretnél beszélgetni?','A holnapi programról.','Rendben, hallgatlak.'],composition:['Мой свободный день','Напишите 5 предложений о свободном времени и планах.','Szabadidőmben … . / Holnap … fogok.'],min:5},
{title:'Жильё и переезд',words:['albérlet','költözik','szomszéd','emelet','lakás','lépcső','lift','szoba'],extra:[['lépcső','лестница','A lépcső mellett állok.','Я стою рядом с лестницей.'],['lift','лифт','A lift az első emeleten van.','Лифт находится на первом этаже.']],grammar:['Куда? Где? Откуда?','Hová? — куда? Hol? — где? Honnan? — откуда? házba — в дом, házban — в доме, házból — из дома.','Hová költözöl? — Egy új lakásba.'],dialogue:['Hová költözöl?','Egy új lakásba.','Hányadik emeleten van?','A másodikon.'],composition:['Где я живу','Напишите 5 предложений о городе или деревне, доме и соседях.','… városban lakom. / A lakásom … .'],min:5},
{title:'Вчера и сегодня: прошедшее время',words:['tegnap','ma','reggel','este','tanul','olvas','dolgozik','sétál','érkezik','vásárol'],examples:{tegnap:['Tegnap tanultam.','Вчера я учился / училась.'],ma:['Ma tanulok.','Сегодня я учусь.'],reggel:['Reggel olvastam.','Утром я читал / читала.'],este:['Este tanultam.','Вечером я учился / училась.'],tanul:['Tegnap tanultam.','Вчера я учился / училась.'],olvas:['Tegnap olvastam.','Вчера я читал / читала.'],dolgozik:['Tegnap dolgoztam.','Вчера я работал / работала.'],sétál:['Tegnap sétáltam.','Вчера я гулял / гуляла.'],érkezik:['Tegnap érkeztem.','Вчера я приехал / приехала.'],vásárol:['Tegnap vásároltam.','Вчера я делал / делала покупки.']},grammar:['Прошедшее время: én («я»)','В настоящем времени: Ma tanulok. — «Сегодня я учусь». В прошедшем: Tegnap tanultam. — «Вчера я учился / училась». Сравните: olvasok → olvastam; dolgozom → dolgoztam. Венгерская форма не различает мужской и женский род говорящего.','Ma tanulok. — Tegnap tanultam.'],dialogue:['Mit csináltál tegnap?','Tegnap tanultam.','És ma?','Ma dolgozom.'],composition:['Что я делал(а) вчера','Напишите 5 коротких предложений. Сравните, что вы делаете сегодня и что делали вчера. Используйте знакомые формы.','Ma tanulok. / Tegnap tanultam. / Tegnap olvastam. / Este dolgoztam.'],min:5}
]};
const dialogueTranslations={"Первые десять знакомых слов":["Что это?","Это телефон.","А это?","Это радио."],"Приветствия и знакомство":["Привет!","Привет! Как дела?","Хорошо, спасибо. А ты?","У меня тоже всё хорошо."],"Моя семья":["Кто это?","Это моя мама.","А это кто?","Это мой папа."],"Мой дом":["Где ключ?","Он на столе.","Спасибо!","Не за что!"],"Еда и напитки":["Что ты хочешь?","Мне чай, пожалуйста.","С сахаром?","Нет, спасибо."],"Мой день: сегодня и завтра":["Что ты делаешь сегодня?","Сегодня я учусь.","А завтра?","Завтра я работаю."],"Общение и планы":["Привет! У тебя есть минутка?","Да. О чём ты хочешь поговорить?","О завтрашних планах.","Хорошо, я слушаю."],"Жильё и переезд":["Куда ты переезжаешь?","В новую квартиру.","На каком этаже она находится?","На втором."],"Вчера и сегодня: прошедшее время":["Что ты делал(а) вчера?","Вчера я учился / училась.","А сегодня?","Сегодня я работаю."],"Вопросы и короткие ответы":["Когда ты учишься?","Утром я учусь.","Что ты делаешь вечером?","Вечером я читаю."],"Где? Местонахождение и -ban/-ben":["Где папа?","Папа в магазине.","А мама?","Мама в саду."]};
let level='A1',lessonIndex=0,step=0,cardIndex=0,writeIndex=0,correctWriting=new Set(),testIndex=0,testCorrect=0,hasAnswered=false,testCompleted=false,compositionChecked=false,dialogueListened=false,flashcardsOpened=false,grammarReviewed=false,dialoguePractised=false,spokenTargetIndex=0,flippedWords=new Set(),testOrder=[],quizMisses=[];
const steps=['lessonWords','lessonGrammar','lessonDialogue','lessonWriting','lessonComposition','lessonExercise'];
const stepsRu=['Слова','Грамматика','Разговор','Письмо','Мини-сочинение','Проверка'];
const checkpointKey='magyarorosz.lesson-checkpoint.v1';
function checkpoint(){return read(checkpointKey)[lessonKey()]||{}}
function saveCheckpoint(){
 const old=read(checkpointKey);
 old[lessonKey()]={flipped:[...flippedWords],written:[...correctWriting],grammar:grammarReviewed,dialogue:dialoguePractised};
 try{localStorage.setItem(checkpointKey,JSON.stringify(old))}catch(_){}
}
function restoreCheckpoint(){
 const c=checkpoint();flippedWords=new Set((c.flipped||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<rows().length));
 correctWriting=new Set((c.written||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<rows().length));
 grammarReviewed=!!c.grammar;dialoguePractised=!!c.dialogue;
}
function randomOrder(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

const checks={
 'A1:0':{q:'Как перевести «Ez egy telefon.»?',a:['Это телефон.','Это метро.','Где телефон?'],ok:0,why:'Ez — «это», egy — неопределённый артикль, telefon — «телефон». В первом образце мы уже видели это предложение.'},
 'A1:1':{q:'Как по-венгерски спросить «Как дела?»',a:['Hogy vagy?','Mi ez?','Hol van?'],ok:0,why:'Hogy vagy? — «Как дела?» Это выражение уже было в уроке.'},
 'A1:2':{q:'Как спросить «Кто это?»',a:['Ki ez?','Hol van?','Hogy vagy?'],ok:0,why:'Ki — «кто», ez — «это». Ki ez? — «Кто это?»'},
 'A1:3':{q:'Как спросить «Где?»',a:['Ki?','Hol?','Hogy?'],ok:1,why:'Hol? — «Где?». Пример: Hol van a kulcs?'},
 'A1:4':{q:'Как попросить чай?',a:['Kérek egy teát.','Hol van a tea?','Ki ez?'],ok:0,why:'Kérek egy teát. — «Мне чай, пожалуйста».'},
 'A1:5':{q:'Как по-венгерски сказать «Сегодня я учусь»?',a:['Ma tanulok.','Ma olvasok.','Este olvasok.'],ok:0,why:'Ma — «сегодня», tanulok — «я учусь». Ma olvasok означает «сегодня я читаю», а Este olvasok — «вечером я читаю».'},
 'A1:6':{q:'Как по-венгерски спросить «Когда ты учишься?»',a:['Mikor tanulsz?','Hol tanulsz?','Ki ez?'],ok:0,why:'Mikor? — «Когда?». Tanulsz — «ты учишься». Пример «Mikor tanulsz?» был в объяснении.'},
 'A1:7':{q:'Как сказать «в саду»?',a:['kertban','kertben','kertból'],ok:1,why:'В слове kert гласная переднего ряда e; на вопрос Hol? («Где?») выбираем -ben: kertben.'},
 'A2:0':{q:'Какая форма означает «я разговариваю»?',a:['beszélgetek','beszélgetsz','beszélget'],ok:0,why:'Для én («я») используется beszélgetek.'},
 'A2:1':{q:'Какая форма означает «в дом»?',a:['házban','házba','házból'],ok:1,why:'házba — «в дом» (куда?); házban — «в доме»; házból — «из дома».'},
 'A2:2':{q:'Какая форма означает «Вчера я учился / училась»?',a:['Ma tanulok.','Tegnap tanultam.','Holnap tanulok.'],ok:1,why:'Tegnap — «вчера», tanultam — прошедшее время 1-го лица единственного числа. В венгерском нет различия по роду.'}
};
function lessonKey(){return level+':'+lessonIndex}
function grammarQuestion(){
 const c=checks[lessonKey()],box=$('integratedGrammarOptions');
 box.replaceChildren();$('integratedGrammarQuestion').textContent=c.q;
 $('integratedGrammarFeedback').textContent='Выберите ответ. Вы сразу увидите объяснение.';
 c.a.forEach((answer,i)=>{const btn=el('button',answer,'integrated-answer');btn.type='button';btn.onclick=()=>{
  const good=i===c.ok;
  $('integratedGrammarFeedback').textContent=(good?'✓ Верно. ':'✗ Пока неверно. ')+c.why;
  if(good){grammarReviewed=true;saveCheckpoint();stepButton.disabled=false;note('✓ Пример понятен. Продолжайте обучение.')}
 };box.append(btn)})
}

function note(message){let node=$('integratedStepStatus');if(!node){node=el('p','','lesson-step-status');node.id='integratedStepStatus';node.setAttribute('role','status');node.setAttribute('aria-live','polite');$('integratedStepNext').after(node)}node.textContent=message}
function canAdvance(){
if(step===0)return flippedWords.size>=Math.min(5,rows().length);
if(step===1)return grammarReviewed;
if(step===2)return dialoguePractised;
if(step===3)return correctWriting.size>=Math.min(3,rows().length) && (level!=='A1'||lessonIndex!==0||[...correctWriting].filter(i=>/[áéíóöőúüű]/.test(rows()[i]?.hu||'')).length>=2);
if(step===4)return compositionChecked;
if(step===5)return testCompleted;
return true
}
function moveNext(){if(!canAdvance()){note(['Сначала откройте перевод как минимум пяти разных слов на карточках.','Прочитайте правило и подтвердите его изучение.','Прослушайте диалог и повторите хотя бы одну реплику вслух.','Сначала правильно напишите не менее трёх слов.','Сначала напишите мини-сочинение и проверьте его структуру.','Сначала ответьте на все вопросы итоговой проверки.'][step]);return}if(step<5){step++;save();stageView()}else{const old=read(KEY);const finished=old.completed||{};finished[lessonKey()]={score:testCorrect,max:Math.min(10,rows().length),errors:quizMisses.map(v=>v.hu),date:new Date().toISOString()};old.completed=finished;try{localStorage.setItem(KEY,JSON.stringify(old))}catch(_){}if(lessonIndex+1<courses[level].length){lessonIndex++;step=0;save();render();note('✓ Предыдущий урок завершён. Начинаем следующий.')}else{step=0;save();render();note('✓ Все подготовленные уроки этого уровня завершены. Повторите материалы или выберите другой уровень.')}}}

function read(key){try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(_){return {}}}
function save(){const s=read(KEY);s[level]={lessonIndex,step};try{localStorage.setItem(KEY,JSON.stringify(s))}catch(_){}}
function say(text){try{const u=new SpeechSynthesisUtterance(text);u.lang='hu-HU';u.rate=.85;if(window.TanuloTTS?.speak)window.TanuloTTS.speak(u);else{speechSynthesis.cancel();speechSynthesis.speak(u)}}catch(_){}}
function el(tag,txt,cl){const node=document.createElement(tag);if(txt!==undefined)node.textContent=txt;if(cl)node.className=cl;return node}
function lesson(){return courses[level][lessonIndex]}
function rows(){const l=lesson(),base=window.MAGYAR_OROSZ_DATA?.[level]||[],result=[];for(const word of l.words){const row=base.find(r=>r[0].toLocaleLowerCase('hu-HU')===word.toLocaleLowerCase('hu-HU')) || (level==='A2'?window.MAGYAR_OROSZ_DATA?.A1?.find(r=>r[0].toLocaleLowerCase('hu-HU')===word.toLocaleLowerCase('hu-HU')):null);if(row){const beginnerExamples={
 'telefon':['Ez egy telefon.','Это телефон.'],
 'metró':['Metró.','Метро.'],
 'taxi':['Ez egy taxi.','Это такси.'],
 'rádió':['Ez egy rádió.','Это радио.'],
 'internet':['Internet.','Интернет.'],
 'bank':['Ez egy bank.','Это банк.'],
 'pizza':['Ez egy pizza.','Это пицца.'],
 'banán':['Ez egy banán.','Это банан.'],
 'film':['Ez egy film.','Это фильм.'],
 'park':['Ez egy park.','Это парк.']
};const simple=(level==='A1'&&lessonIndex===0?beginnerExamples[word]:null)||l.examples?.[word]||null;result.push({hu:row[0],ru:row[1],example:simple?.[0]||row[2],translation:simple?.[1]||row[3]})}}for(const [hu,ru,example,translation] of l.extra||[])result.push({hu,ru,example,translation});return result}
function renderAlphabet(){document.getElementById('alphabetLesson')?.remove();if(level!=='A1'||lessonIndex!==0)return;const section=el('section',undefined,'lesson-alphabet');section.id='alphabetLesson';section.append(el('h3','Венгерский алфавит — 44 буквы'),el('p','Прослушайте каждую букву. Русские подсказки приблизительны: точный венгерский звук лучше слушать.'));const grid=el('div',undefined,'alphabet-grid');for(const [letter,hint]of alphabet){const button=el('button',undefined,'alphabet-letter');button.type='button';button.append(el('strong',letter),el('small',hint));button.onclick=()=>say(letter);grid.append(button)}section.append(grid,el('p','Особенно важно: o–ó, ö–ő, u–ú, ü–ű. Долгота гласных меняет произношение.'));$('integratedWords').before(section)}
function renderWords(){const box=$('integratedWords');box.replaceChildren();const w=rows();$('integratedWordCount').textContent=level==='A1'&&lessonIndex===0?'Вы уже знаете похожие слова по-русски. Изучите '+w.length+' венгерских написаний, послушайте звучание и обращайте внимание на долгие гласные.':'Изучите '+w.length+' слов и выражений. Слушайте произношение, читайте перевод и повторяйте примеры.';for(const v of w){const row=el('div',undefined,'integrated-word');const text=el('div');const hu=el('strong',v.hu);hu.lang='hu';text.append(hu,el('span',v.ru),el('small',v.example+' — '+v.translation));const audio=el('button','🔊');audio.type='button';audio.onclick=()=>say(v.hu);audio.setAttribute('aria-label','Прослушать слово');const phrase=el('button','🗣');phrase.type='button';phrase.onclick=()=>say(v.example);phrase.setAttribute('aria-label','Прослушать пример');row.append(text,audio,phrase);box.append(row)}renderAlphabet()}
function card(){const w=rows(),v=w[cardIndex%w.length];if(!v)return;$('integratedCardPosition').textContent=(cardIndex+1)+' / '+w.length;$('integratedCardHungarian').textContent=v.hu;$('integratedCardRussian').textContent=v.ru;$('integratedCardRussian').hidden=true;$('integratedCardFlip').textContent='Показать перевод'}
function norm(s){return String(s).toLocaleLowerCase('hu-HU').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ')}
function spelling(){const w=rows(),v=w[writeIndex%w.length];$('integratedWritingPrompt').textContent='Напишите по-венгерски: '+v.ru;$('integratedWritingInput').value='';$('integratedWritingFeedback').textContent='';$('integratedWritingProgress').textContent='Верно написано: '+correctWriting.size+' / '+w.length+(level==='A1'&&lessonIndex===0?' · с долгой гласной: '+[...correctWriting].filter(i=>/[áéíóöőúüű]/.test(w[i]?.hu||'')).length+' / 2':'')}
function spellingCheck(){const v=rows()[writeIndex%rows().length],got=norm($('integratedWritingInput').value),target=norm(v.hu);if(!got){$('integratedWritingFeedback').textContent='Введите слово.';return}if(got===target){correctWriting.add(writeIndex);saveCheckpoint();$('integratedWritingFeedback').textContent='✓ Правильно! '+v.hu+' — '+v.ru}else{const bare=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');const missing=bare(got)===bare(target);const differences=[...target].map((c,i)=>[c,[...got][i]]).filter(([expected,actual])=>expected!==actual&&actual!==undefined).slice(0,3).map(([expected,actual])=>actual+' → '+expected);$('integratedWritingFeedback').textContent=(missing?'Почти верно: проверьте долготу и вид гласной. ':'Есть ошибка в буквах или их порядке. ')+(differences.length?'Обратите внимание: '+differences.join(', ')+'. ':'')+'Правильно: '+v.hu+'. Напишите ещё раз.'}$('integratedWritingProgress').textContent='Верно написано: '+correctWriting.size+' / '+rows().length}
function composition(){const l=lesson(),key=level+':'+lessonIndex;$('integratedCompositionPrompt').textContent=l.composition[0]+'. '+l.composition[1];$('integratedCompositionHints').textContent='Примеры начала предложений: '+l.composition[2];$('integratedCompositionText').value=read('magyarorosz.lesson-writing.v1')[key]||'';$('integratedCompositionFeedback').textContent='Напишите собственный текст. Он сохранится только в этом браузере.'}
function saveComposition(){const s=read('magyarorosz.lesson-writing.v1');s[level+':'+lessonIndex]=$('integratedCompositionText').value;try{localStorage.setItem('magyarorosz.lesson-writing.v1',JSON.stringify(s));$('integratedCompositionFeedback').textContent='✓ Текст сохранён на этом устройстве.'}catch(_){$('integratedCompositionFeedback').textContent='Не удалось сохранить. Скопируйте текст вручную.'}}
function checkComposition(){
 saveComposition();
 const source=$('integratedCompositionText').value.normalize('NFC').trim();
 const sentences=(source.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[]).map(t=>t.trim()).filter(Boolean);
 const minimum=lesson().min, phrases=sentences.map(t=>norm(t).replace(/[.!?]/g,'').trim());
 const duplicates=phrases.length-new Set(phrases).size;
 const missingFinalPunctuation=source!==''&&!/[.!?]\s*$/.test(source);
 const fragments=sentences.filter(t=>t.replace(/[.!?]/g,'').trim().split(/\s+/).length<2);
 const beginner=level==='A1'&&lessonIndex===0;
 let unsuitable=[];
 if(beginner){
  const valid=new Set(rows().map(r=>norm(r.hu)));
  unsuitable=phrases.filter(t=>{const m=/^ez egy (.+)$/.exec(t);return !m||!valid.has(m[1])});
 }
 const enough=sentences.length>=minimum;
 const questionCount=sentences.filter(t=>t.endsWith('?')).length;
 const requiresQuestions=level==='A1'&&lessonIndex===6;
 compositionChecked=enough&&!duplicates&&!missingFinalPunctuation&&!fragments.length&&!unsuitable.length&&(!requiresQuestions||questionCount>=2);
 stepButton.disabled=!compositionChecked;
 const messages=[];
 messages.push('Предложений: '+sentences.length+' / '+minimum+'.');
 if(!enough)messages.push('Добавьте ещё '+(minimum-sentences.length)+' предложение(я).');
 if(duplicates)messages.push('Есть повторяющиеся предложения. Напишите разные примеры.');
 if(missingFinalPunctuation)messages.push('Поставьте знак конца предложения.');
 if(fragments.length)messages.push('В каждом предложении должно быть не менее двух слов.');
 if(unsuitable.length)messages.push('В этом первом задании используйте образец «Ez egy …» и слово из списка урока. Например: «Ez egy telefon.»');
 if(requiresQuestions&&questionCount<2)messages.push('В уроке о вопросах напишите не менее двух вопросов со знаком «?», а также два ответа.');
 if(!/[áéíóöőúüű]/i.test(source))messages.push('Проверьте, нужны ли долгие венгерские гласные.');
 messages.push(compositionChecked?'✓ Формальные условия выполнены. Можно продолжать.':'Исправьте отмеченные пункты и проверьте ещё раз.');
 messages.push('Это проверка формы, а не полная оценка грамматики и содержания.');
 $('integratedCompositionFeedback').textContent=messages.join(' ');
 if(compositionChecked)note('✓ Мини-текст проверен по учебному образцу.');
}
function test(){const w=rows(),v=w[testOrder[testIndex]??testIndex%w.length],box=$('integratedQuestion');box.replaceChildren();$('integratedErrorSummary').hidden=true;if(!v)return;const p=el('p',v.hu);p.lang='hu';box.append(p);const seen=new Set([v.ru]);const others=randomOrder(w.filter(r=>r.ru!==v.ru)).filter(r=>{if(seen.has(r.ru))return false;seen.add(r.ru);return true}).slice(0,3);const options=randomOrder([v,...others]);for(const candidate of options){const b=el('button',candidate.ru,'integrated-answer');b.type='button';b.onclick=()=>{if(hasAnswered||testCompleted)return;hasAnswered=true;const good=candidate.ru===v.ru;if(good)testCorrect++;else quizMisses.push({hu:v.hu,ru:v.ru,example:v.example,translation:v.translation});$('integratedAnswerFeedback').textContent=good?'✓ Верно! '+v.hu+' — '+v.ru:'✗ Вы выбрали: '+candidate.ru+'. Правильный перевод: '+v.ru+'. Пример: '+v.example+' — '+v.translation+'. Прослушайте и повторите слово.';$('integratedNextQuestion').hidden=false;box.querySelectorAll('button').forEach(btn=>btn.disabled=true);$('integratedStepNext').disabled=true};box.append(b)}$('integratedNextQuestion').hidden=true;$('integratedAnswerFeedback').textContent='Вопрос '+(testIndex+1)+' / '+Math.min(10,w.length)}
function renderErrorSummary(){
 const box=$('integratedErrorSummary');box.replaceChildren();box.hidden=false;
 if(!quizMisses.length){box.append(el('p','✓ Все слова в проверке переведены правильно.'));return}
 box.append(el('strong','Повторите слова, в которых была ошибка ('+quizMisses.length+'):'));
 for(const missed of quizMisses){const row=el('div',undefined,'lesson-error-row');const description=el('span',missed.hu+' — '+missed.ru);const speakButton=el('button','🔊 Слушать');speakButton.type='button';speakButton.setAttribute('aria-label','Прослушать '+missed.hu);speakButton.onclick=()=>say(missed.hu);row.append(description,speakButton);box.append(row)}
 box.append(el('p','Прослушайте ошибочные слова ещё раз. При необходимости вернитесь к разделу «Слова».'))
}
function stageView(){steps.forEach((id,i)=>$(id).hidden=i!==step);$('integratedPreviousStep').hidden=step===0;$('integratedRouteProgress').textContent='Урок '+(lessonIndex+1)+' · шаг '+(step+1)+' из 6 · '+stepsRu[step];$('integratedRouteBar').value=step+1;document.querySelectorAll('.lesson-sections a').forEach((a,i)=>{a.hidden=i!==step;a.textContent=(i+1)+'. '+stepsRu[i]});$('integratedLessonIntro').textContent='Шаг '+(step+1)+' из 6 · '+['Слушайте слова, изучайте венгерские буквы и откройте перевод пяти карточек.','Прочитайте правило по-русски и ответьте на один вопрос.','Послушайте реплику и повторите её вслух.','Напишите правильно три разных слова; в первом уроке минимум два с долгой гласной.','Напишите небольшой текст по образцу и проверьте его структуру.','Ответьте на вопросы и узнайте результат сразу.'][step];$('integratedStepNext').textContent=step===5?'Завершить урок →':'Следующий шаг →';$('integratedStepNext').disabled=!canAdvance();document.querySelector('.lesson-end').hidden=true}
function render(){const l=lesson();$('integratedLessonLevel').textContent=level;$('integratedLessonCounter').textContent='Урок '+(lessonIndex+1)+' из '+courses[level].length;$('integratedLessonHeading').textContent='Урок '+(lessonIndex+1)+'. '+l.title;$('integratedLessonSelect').replaceChildren();courses[level].forEach((x,i)=>{const finished=read(KEY).completed?.[level+':'+i];const o=el('option',(finished?'✓ ':'')+(i+1)+'. '+x.title);o.value=String(i);$('integratedLessonSelect').append(o)});$('integratedLessonSelect').value=String(lessonIndex);renderWords();grammarQuestion();$('integratedGrammar').replaceChildren();$('integratedGrammar').append(el('strong',l.grammar[0]),el('p',l.grammar[1]),el('p',l.grammar[2]));const dialog=$('integratedDialogue');dialog.replaceChildren();for(const [i,line] of l.dialogue.entries()){const row=el('div',undefined,'integrated-dialogue-line');const words=el('div',undefined,'lesson-dialogue-text');const h=el('span',line);h.lang='hu';const translation=el('small',dialogueTranslations[l.title]?.[i]||'');translation.lang='ru';words.append(h,translation);const b=el('button','🔊');b.type='button';b.onclick=()=>{dialogueListened=true;spokenTargetIndex=Array.from(dialog.children).indexOf(row);say(line);$('integratedDialogueFeedback').textContent='Прослушайте и повторите фразу: '+line;note('Для проверки нажмите микрофон или отметьте, что повторили вслух.')};row.append(words,b);dialog.append(row)}cardIndex=0;writeIndex=0;correctWriting=new Set();testIndex=0;testCorrect=0;hasAnswered=false;testCompleted=false;compositionChecked=false;dialogueListened=false;flashcardsOpened=false;grammarReviewed=false;dialoguePractised=false;spokenTargetIndex=0;flippedWords=new Set();quizMisses=[];testOrder=randomOrder(rows().map((_,i)=>i));restoreCheckpoint();$('integratedFlashcard').hidden=true;card();spelling();composition();test();stageView()}
function open(mode){level=document.querySelector('.welcome .level.active')?.dataset.level||'A1';if(!courses[level]){document.querySelector('[data-hub-view="steps"]')?.click();return}const stored=read(KEY),saved=stored[level];if(level==='A1'&&saved&&!stored.migratedFirstUnit20261121){saved.lessonIndex=Math.max(0,Number(saved.lessonIndex)||0)+(Number(saved.lessonIndex)>0?1:0);stored.migratedFirstUnit20261121=true;try{localStorage.setItem(KEY,JSON.stringify(stored))}catch(_){}}lessonIndex=Math.max(0,Math.min(courses[level].length-1,Number(saved?.lessonIndex)||0));step=mode==='words'?0:Math.max(0,Math.min(5,Number(saved?.step)||0));root.classList.remove('study-menu','study-active','study-coach','study-online','study-exam','study-daily');root.classList.add('study-book');hub.hidden=true;view.hidden=false;back.hidden=false;render();view.scrollIntoView({block:'start'});}
let stepButton=$('integratedStepNext');if(!stepButton){stepButton=el('button','Следующий шаг →','lesson-primary');stepButton.type='button';stepButton.id='integratedStepNext';view.insertBefore(stepButton,$('lessonWords'))}
stepButton.onclick=moveNext;
$('integratedPreviousStep').onclick=()=>{if(step>0){step--;save();stageView();note('Вы вернулись к предыдущему шагу. Уже проверенные ответы сохранены.') }};
$('lessonsPrimary')?.addEventListener('click',()=>open('resume'));$('lessonsVocabulary')?.addEventListener('click',()=>open('words'));
$('integratedLessonSelect').addEventListener('change',e=>{lessonIndex=Number(e.target.value);step=0;save();render()});
$('integratedFlashcardOpen').onclick=()=>{flashcardsOpened=true;$('integratedFlashcard').hidden=false;card();note('Откройте переводы пяти разных слов. Слова: 0 / 5.')};
$('integratedCardFlip').onclick=()=>{const node=$('integratedCardRussian');node.hidden=!node.hidden;if(!node.hidden){flippedWords.add(cardIndex);saveCheckpoint();if(step===0&&canAdvance())stepButton.disabled=false;note('Проверено слов: '+flippedWords.size+' / '+Math.min(5,rows().length)+'.')} $('integratedCardFlip').textContent=node.hidden?'Показать перевод':'Скрыть перевод'};
$('integratedCardNext').onclick=()=>{cardIndex=(cardIndex+1)%rows().length;card()};
$('integratedCardSpeak').onclick=()=>say(rows()[cardIndex%rows().length].hu);
$('integratedGrammarMore').onclick=()=>location.href='nyelvtan.html?level='+level;
/* A nyelvtani állomás teljesítését a példára épülő helyes válasz igazolja. */
const dialogueLines=()=>lesson().dialogue;
$('integratedDialogueRepeat').onclick=()=>{if(!dialogueListened){$('integratedDialogueFeedback').textContent='Сначала нажмите 🔊 рядом с репликой, послушайте её и повторите вслух.';return}dialoguePractised=true;saveCheckpoint();stepButton.disabled=false;$('integratedDialogueFeedback').textContent='✓ Хорошо! Вы повторили фразу вслух. Если нужно, прослушайте её ещё раз.';};
$('integratedDialogueMic').onclick=()=>{
 const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Recognition){$('integratedDialogueFeedback').textContent='В этом браузере распознавание речи недоступно. Повторите фразу вслух, затем нажмите «Я повторил(а) вслух».';return}
 try{
   const rec=new Recognition();rec.lang='hu-HU';rec.interimResults=false;rec.maxAlternatives=1;
   const target=dialogueLines()[spokenTargetIndex%dialogueLines().length];
   $('integratedDialogueFeedback').textContent='Произнесите: '+target;
   rec.onresult=e=>{
     const heard=e.results?.[0]?.[0]?.transcript||'';
     const simplified=v=>norm(v).replace(/[,.!?]/g,'');
     const exact=simplified(heard)===simplified(target);
     $('integratedDialogueFeedback').textContent='Распознано: «'+heard+'». Образец: «'+target+'». '+(exact?'✓ Совпадает с образцом.':'Сравните слова и повторите. Это не оценка произношения.');
     if(exact){dialoguePractised=true;saveCheckpoint();stepButton.disabled=false}
   };
   rec.onerror=e=>{$('integratedDialogueFeedback').textContent=e.error==='not-allowed'?'Разрешите использование микрофона.':'Не удалось распознать речь. Повторите вслух или используйте кнопку самооценки.'};
   rec.start();
 }catch(_){$('integratedDialogueFeedback').textContent='Микрофон недоступен. Повторите вслух и используйте самооценку.'}
};
$('integratedSpeakPractice').onclick=()=>location.href=level.toLowerCase()+'.html#spokenDialogue';
$('integratedWritingListen').onclick=()=>say(rows()[writeIndex%rows().length].hu);
$('integratedWritingCheck').onclick=()=>{spellingCheck();if(canAdvance()){stepButton.disabled=false;note('✓ Условия письма выполнены. Можно продолжать.')}else{stepButton.disabled=true;note('Правильно записано '+correctWriting.size+' слов. В первом уроке среди них должны быть хотя бы два слова с долгой гласной (например metró, rádió, banán).')}};
$('integratedWritingNext').onclick=()=>{writeIndex=(writeIndex+1)%rows().length;spelling()};
$('integratedCompositionSave').onclick=saveComposition;
$('integratedCompositionCheck').onclick=checkComposition;
$('integratedCompositionText').addEventListener('input',()=>{const drafts=read('magyarorosz.lesson-writing.v1');drafts[lessonKey()]=$('integratedCompositionText').value;try{localStorage.setItem('magyarorosz.lesson-writing.v1',JSON.stringify(drafts))}catch(_){}compositionChecked=false;if(step===4)stepButton.disabled=true;$('integratedCompositionFeedback').textContent='Черновик автоматически сохранён на этом устройстве. После изменений проверьте текст ещё раз.';});
$('integratedNextQuestion').onclick=()=>{if(testIndex+1>=Math.min(10,rows().length)){testCompleted=true;renderErrorSummary();const percent=Math.round(testCorrect/Math.min(10,rows().length)*100);$('integratedAnswerFeedback').textContent='Результат: '+testCorrect+' / '+Math.min(10,rows().length)+' ('+percent+'%). '+(percent>=90?'Отлично! Вы готовы к следующему уроку.':'Рекомендуем повторить слова и добиться 90%, но это не обязательное условие.');$('integratedNextQuestion').hidden=true;stepButton.disabled=false;note('Проверка завершена. Вы можете перейти к следующему уроку.');return}testIndex++;hasAnswered=false;test();stepButton.disabled=true};
$('integratedNextLesson').onclick=()=>{step=0;lessonIndex=Math.min(courses[level].length-1,lessonIndex+1);save();render()};
$('integratedAllWords').onclick=()=>{root.classList.remove('study-book');view.hidden=true;document.querySelector('.tab[data-view="list"]')?.click();root.classList.add('study-active')};
const accentBox=$('integratedAccentKeys');for(const letter of 'áéíóöőúüű'){const b=el('button',letter);b.type='button';b.onclick=()=>{const input=$('integratedWritingInput');const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.value=input.value.slice(0,start)+letter+input.value.slice(end);input.focus();input.setSelectionRange(start+1,start+1)};accentBox.append(b)}
back.addEventListener('click',()=>{view.hidden=true;root.classList.remove('study-book')});
})();
