/* Guided Hungarian workbook. Existing source data and assessment records are not modified. */
(() => {
'use strict';
const $=id=>document.getElementById(id),root=document.documentElement;
const view=$('integratedLessonView'),hub=$('studyHub'),back=$('studyBack');
if(!view||!hub||!back)return;
const KEY='magyarorosz.lesson-route.v1',WRITING='magyarorosz.mini-compositions.v1';
const alphabet=[['a','короткое [ɒ]'],['á','долгое [aː]'],['b','б'],['c','ц'],['cs','ч'],['d','д'],['dz','дз'],['dzs','дж'],['e','открытое [ɛ]'],['é','долгое [eː]'],['f','ф'],['g','г'],['gy','мягкое [ɟ]'],['h','[h], лёгкий выдох, как в ház'],['i','и'],['í','долгое и'],['j','й'],['k','к'],['l','л'],['ly','й'],['m','м'],['n','н'],['ny','мягкое [ɲ]'],['o','короткое о'],['ó','долгое о'],['ö','[ø]'],['ő','долгое [øː]'],['p','п'],['q','в заимствованиях'],['r','р'],['s','ш'],['sz','с'],['t','т'],['ty','мягкое [c]'],['u','у'],['ú','долгое у'],['ü','[y]'],['ű','долгое [yː]'],['v','в'],['w','в заимствованиях'],['x','кс'],['y','в заимствованиях'],['z','з'],['zs','ж']];
const courses={"A1":[{"title":"Первые десять знакомых слов","words":["telefon","metró","taxi","rádió","internet","bank","pizza","banán","film","park"],"grammar":["Это знакомые слова — и первое венгерское предложение","Ez — «это», egy — «один / неопределённый артикль». Mi ez? — «Что это?» És ez? — «А это?» Ez egy telefon. — «Это телефон». Ударение обычно на первом слоге. Ez a metró. — «Это метро». Van internet. — «Есть интернет». Для задания с egy выбирайте предмет, который можно сосчитать. Обратите внимание на ó в metró и rádió, á в banán.","Ez egy telefon. — Это телефон."],"dialogue":["Mi ez?","Ez egy telefon.","És ez?","Ez egy rádió."],"composition":["Мои первые венгерские предложения","Составьте не менее 2 коротких предложений по изученному образцу Ez egy … . Используйте слова из этой страницы.","Ez egy telefon. / Ez egy taxi. / Ez egy park."],"min":2,"reading":{"lines":[["Ez egy telefon.","Это телефон."],["Ez egy taxi.","Это такси."],["Ez a metró.","Это метро."]],"q":"Что такое «Ez egy taxi»?","options":["Это такси.","Это радио.","Это телефон."],"answer":0}},{"title":"Приветствия и знакомство","words":["én","te","ő","igen","nem","magyar","beszél","vagy","hogy","ki","mi"],"senses":{"vagy":["ты есть (форма lenni)","Te otthon vagy.","Ты дома."],"hogy":["как?","Hogy vagy?","Как дела?"],"ki":["кто?","Ki ő?","Кто это? (о человеке)"],"mi":["что?","Mi ez?","Что это?"]},"extra":[["Szia!","Привет!","Szia! Hogy vagy?","Привет! Как дела?"],["Jó napot!","Добрый день!","Jó napot kívánok!","Добрый день!"],["Köszönöm.","Спасибо.","Köszönöm szépen.","Большое спасибо."],["Jól vagyok.","У меня всё хорошо.","Jól vagyok, köszönöm.","У меня всё хорошо, спасибо."]],"grammar":["Местоимения и глагол lenni","Én — я, te — ты, ő — он/она. Hogy vagy? — Как дела? Jól vagyok — У меня всё хорошо. A nevem Anna — Меня зовут Анна. Подставьте своё имя.","Hogy vagy? — Jól vagyok."],"dialogue":["Szia!","Szia! Hogy vagy?","Jól vagyok, köszönöm. És te?","Én is jól vagyok."],"composition":["О себе","Напишите не менее 3 коротких предложений по образцам: кто вы, как вас зовут, как себя чувствуете.","A nevem Anna. / Magyar vagyok. / Jól vagyok."],"min":3,"reading":{"lines":[["Szia!","Привет!"],["A nevem Anna.","Меня зовут Анна."],["Jól vagyok, köszönöm.","У меня всё хорошо, спасибо."]],"q":"Как зовут человека в тексте?","options":["Анна","Петер","Не сказано"],"answer":0}},{"title":"Моя семья","words":["anya","apa","család","gyerek","fiú","lány","nő","férfi","barát","testvér"],"grammar":["Кто это?","Ki ez? — Кто это? Ő az anyukám. — Это моя мама. В словах anyukám («моя мама») и apukám («мой папа») окончание -m указывает на владельца, а конечная a удлиняется. Ez a családom — «Это моя семья».","Ki ez? — Ő az anyukám."],"dialogue":["Ki ez?","Ő az anyukám.","És ő?","Ő az apukám."],"composition":["Моя семья","Расскажите о семье в 3–5 коротких предложениях.","Ez a családom. / Ő az anyukám. / Ő az apukám."],"min":3,"reading":{"lines":[["Ez a családom.","Это моя семья."],["Ő az anyukám.","Это моя мама."],["Ő az apukám.","Это мой папа."]],"q":"О ком говорится в тексте?","options":["О семье.","О магазине.","О школе."],"answer":0}},{"title":"Мой дом","words":["ház","lakás","szoba","asztal","szék","ajtó","ablak","ágy","kert","kulcs"],"examples":{"szék":["Ez egy szék.","Это стул."],"szoba":["Ez a szobám.","Это моя комната."]},"extra":[["kert","сад","A kert szép.","Сад красивый."]],"grammar":["Где находится предмет?","Hol? — «Где?» Van — «есть, находится», nincs — «нет». Az asztalon — «на столе»: asztal + -on. Egy házban lakom — «Я живу в доме».","Hol van a könyv? — Az asztalon van."],"dialogue":["Hol van a kulcs?","Az asztalon van.","Köszönöm!","Szívesen!"],"composition":["Мой дом","Напишите 4 предложения о своём доме или квартире.","Egy házban lakom. / Ez a szobám. / Az ajtó nyitva van."],"min":4,"reading":{"lines":[["Ez a szobám.","Это моя комната."],["Ez egy szék.","Это стул."],["A kulcs az asztalon van.","Ключ на столе."]],"q":"Где находится ключ?","options":["На столе.","В саду.","В школе."],"answer":0}},{"title":"Еда и напитки","words":["alma","kenyér","víz","tea","kávé","tej","sajt","tojás","eszik","iszik"],"grammar":["Как попросить?","Kérek — Мне, пожалуйста. В прямом дополнении часто используется -t.","Kérek egy teát."],"dialogue":["Mit kérsz?","Egy teát kérek.","Cukorral?","Nem, köszönöm."],"composition":["Моя любимая еда","Напишите 4 предложения о том, что вы едите и пьёте.","Szeretem a teát. / Reggel kenyeret eszem. / Vizet iszom."],"min":4,"reading":{"lines":[["Kérek egy teát.","Мне чай, пожалуйста."],["Vizet iszom.","Я пью воду."],["Reggel kenyeret eszem.","Утром я ем хлеб."]],"q":"Что человек пьёт?","options":["Воду.","Молоко.","Кофе."],"answer":0}},{"title":"Мой день: сегодня и завтра","words":["ma","holnap","reggel","este","iskola","tanul","olvas","dolgozik","sétál","mindennap"],"examples":{"ma":["Ma tanulok.","Сегодня я учусь."],"holnap":["Holnap dolgozom.","Завтра я работаю."],"reggel":["Reggel tanulok.","Утром я учусь."],"este":["Este olvasok.","Вечером я читаю."],"iskola":["Ez egy iskola.","Это школа."],"tanul":["Magyarul tanulok.","Я учу венгерский язык."],"olvas":["Este olvasok.","Вечером я читаю."],"dolgozik":["Apa dolgozik.","Папа работает."],"sétál":["A parkban sétálok.","Я гуляю в парке."],"mindennap":["Mindennap tanulok.","Я учусь каждый день."]},"grammar":["Время и простое настоящее время","ma — сегодня; holnap — завтра; reggel — утром; este — вечером. С местоимением én форма глагола tanul — tanulok («я учусь»), olvas — olvasok («я читаю»). Mindennap tanulok. — «Я учусь каждый день».","Ma tanulok. — Сегодня я учусь."],"dialogue":["Mit csinálsz ma?","Ma tanulok.","És holnap?","Holnap dolgozom."],"composition":["Мой день","Напишите 4 разных коротких предложения о том, что вы делаете сегодня, утром, вечером и завтра. Используйте образцы.","Ma tanulok. / Reggel tanulok. / Este olvasok. / Holnap dolgozom."],"min":4,"reading":{"lines":[["Ma tanulok.","Сегодня я учусь."],["Este olvasok.","Вечером я читаю."],["Holnap dolgozom.","Завтра я работаю."]],"q":"Что человек делает вечером?","options":["Читает.","Работает.","Гуляет."],"answer":0}},{"title":"Вопросы и короткие ответы","words":["ma","holnap","anya","apa","iskola","bolt","park","lakik","tanul","olvas"],"extra":[["Ki?","кто?","Ki ez?","Кто это?"],["Mi?","что?","Mi ez?","Что это?"],["Hol?","где?","Hol van az iskola?","Где находится школа?"],["Mikor?","когда?","Mikor tanulsz?","Когда ты учишься?"],["Mit csinálsz?","что ты делаешь?","Mit csinálsz ma?","Что ты делаешь сегодня?"]],"grammar":["Как задавать простые вопросы","Венгерские вопросительные слова: ki? — кто? mi? — что? hol? — где? mikor? — когда? Часто вопросительное слово стоит в начале: Ki ez? — «Кто это?»; Mi ez? — «Что это?»; Hol van az iskola? — «Где находится школа?»; Mikor tanulsz? — «Когда ты учишься?» Tanulsz — «ты учишься», а tanulok — «я учусь».","Mikor tanulsz? — Reggel tanulok."],"dialogue":["Mikor tanulsz?","Reggel tanulok.","Mit csinálsz este?","Este olvasok."],"composition":["Я умею задавать вопросы","Напишите не менее 4 разных коротких предложений по изученным образцам: два вопроса и два ответа.","Mikor tanulsz? / Reggel tanulok. / Mit csinálsz este? / Este olvasok."],"min":4,"reading":{"lines":[["Mikor tanulsz?","Когда ты учишься?"],["Reggel tanulok.","Я учусь утром."],["Mit csinálsz este?","Что ты делаешь вечером?"],["Este olvasok.","Вечером я читаю."]],"q":"Когда человек учится?","options":["Утром.","Вечером.","Завтра."],"answer":0}},{"title":"Где? Местонахождение и -ban/-ben","words":["ház","lakás","szoba","iskola","bolt","park","kert","tanul","dolgozik","van"],"senses":{"van":["находится (о месте)","Anna a házban van.","Анна в доме."]},"extra":[["kert","сад","A kert szép.","Сад красивый."],["Hol?","где?","Hol van Anna?","Где Анна?"],["házban","в доме","Anna a házban van.","Анна в доме."],["iskolában","в школе","A fiú az iskolában van.","Мальчик в школе."],["boltban","в магазине","Apa a boltban van.","Папа в магазине."],["kertben","в саду","Anya a kertben van.","Мама в саду."]],"grammar":["Где? Суффиксы -ban / -ben","Hol? — «Где?» Если предмет или человек находится внутри, часто используем суффикс -ban или -ben. После гласных заднего ряда: ház → házban, bolt → boltban. После гласных переднего ряда: kert → kertben. Конечная a в iskola удлиняется: iskolában. Слово park означает «парк», а parkban — «в парке». Например, a parkban sétálok — «я гуляю в парке».","Hol van Anna? — Anna a házban van."],"dialogue":["Hol van apa?","Apa a boltban van.","És anya?","Anya a kertben van."],"composition":["Где находится моя семья?","Напишите четыре разные простые фразы о том, где находятся люди или что расположено в доме. Пользуйтесь образцами.","Apa a boltban van. / Anya a kertben van. / Anna a házban van. / A fiú az iskolában van."],"min":4,"reading":{"lines":[["Hol van apa?","Где папа?"],["Apa a boltban van.","Папа в магазине."],["Anya a kertben van.","Мама в саду."]],"q":"Где мама?","options":["В саду.","В магазине.","В школе."],"answer":0}}],"A2":[{"title":"Общение и планы","words":["beszélget","válaszol","telefonál","üzenet","kérdés","magyaráz","érdekel"],"extra":[["kérdés","вопрос","Van egy kérdésem.","У меня есть вопрос."],["magyaráz","объяснять","A tanár magyaráz.","Учитель объясняет."],["érdekel","интересовать","Érdekel a magyar nyelv.","Меня интересует венгерский язык."]],"grammar":["Спряжение и разговор","beszélgetek — я разговариваю; beszélgetsz — ты разговариваешь; beszélget — он/она разговаривает. Miről? — «О чём?»; a holnapi programról — «о завтрашних планах».","Miről szeretnél beszélgetni?"],"composition":["Мой свободный день","Напишите 5 предложений о свободном времени и планах.","Szabadidőmben … . / Holnap a parkban sétálok."],"min":5,"dialogue":["Szia! Van egy perced?","Igen. Miről szeretnél beszélgetni?","A holnapi programról.","Rendben, hallgatlak."],"reading":{"lines":[["Szia! Van egy perced?","Привет! У тебя есть минутка?"],["Miről szeretnél beszélgetni?","О чём ты хотел(а) бы поговорить?"],["A holnapi programról.","О завтрашних планах."]],"q":"О чём хотят поговорить?","options":["О планах на завтра.","О прошлом годе.","О еде."],"answer":0},"preparation":[["Van egy perced?","У тебя есть минутка?","Вежливый разговорный способ попросить немного времени."],["Miről szeretnél beszélgetni?","О чём ты хотел(а) бы поговорить?","Miről? — о чём?; szeretnél — ты хотел(а) бы."],["A holnapi programról.","О завтрашних планах.","-ról/-ről: о чём-либо; holnapi — завтрашний."],["Rendben, hallgatlak.","Хорошо, я тебя слушаю.","Rendben — хорошо; hallgatlak — я тебя слушаю."]]},{"title":"Жильё и переезд","words":["albérlet","költözik","szomszéd","emelet","lakás","lépcső","lift","szoba"],"extra":[["lépcső","лестница","A lépcső mellett állok.","Я стою рядом с лестницей."],["lift","лифт","A lift az első emeleten van.","Лифт находится на первом этаже."]],"grammar":["Куда? Где? Откуда?","Hová? — «Куда?»; hol? — «Где?»; honnan? — «Откуда?». Házba — «в дом», házban — «в доме», házból — «из дома».","Hová költözöl? — Egy új lakásba."],"composition":["Где я живу","Напишите 5 предложений о городе или деревне, доме и соседях.","… városban lakom. / A lakásom … ."],"min":5,"dialogue":["Hová költözöl?","Egy új lakásba.","Hányadik emeleten van?","A másodikon."],"reading":{"lines":[["Hová költözöl?","Куда ты переезжаешь?"],["Egy új lakásba.","В новую квартиру."],["Hányadik emeleten van?","На каком этаже она находится?"],["A másodikon.","На втором."]],"q":"На каком этаже квартира?","options":["На втором.","На первом.","На третьем."],"answer":0},"preparation":[["Hová költözöl?","Куда ты переезжаешь?","Hová? — куда?; költözöl — ты переезжаешь."],["Egy új lakásba.","В новую квартиру.","-ba/-be: движение внутрь, «в квартиру»."],["Hányadik emeleten van?","На каком этаже находится?","Hányadik? — который по счёту?; emeleten — на этаже."],["A másodikon.","На втором.","Második — второй; -on — местонахождение."]]},{"title":"Вчера и сегодня: прошедшее время","words":["tegnap","ma","reggel","este","tanul","olvas","dolgozik","sétál","érkezik","vásárol"],"examples":{"tegnap":["Tegnap tanultam.","Вчера я учился / училась."],"ma":["Ma tanulok.","Сегодня я учусь."],"reggel":["Reggel olvastam.","Утром я читал / читала."],"este":["Este tanultam.","Вечером я учился / училась."],"tanul":["Tegnap tanultam.","Вчера я учился / училась."],"olvas":["Tegnap olvastam.","Вчера я читал / читала."],"dolgozik":["Tegnap dolgoztam.","Вчера я работал / работала."],"sétál":["Tegnap sétáltam.","Вчера я гулял / гуляла."],"érkezik":["Tegnap érkeztem.","Вчера я приехал / приехала."],"vásárol":["Tegnap vásároltam.","Вчера я делал / делала покупки."]},"grammar":["Прошедшее время: én («я»)","Ma tanulok — «Сегодня я учусь». Tegnap tanultam — «Вчера я учился / училась». Olvasok → olvastam; dolgozom → dolgoztam. Венгерская форма не различает род говорящего.","Ma tanulok. — Tegnap tanultam."],"composition":["Что я делал(а) вчера","Напишите 5 коротких предложений. Сравните, что вы делаете сегодня и что делали вчера. Используйте знакомые формы.","Ma tanulok. / Tegnap tanultam. / Tegnap olvastam. / Este dolgoztam."],"min":5,"dialogue":["Mit csináltál tegnap?","Tegnap tanultam.","És ma?","Ma dolgozom."],"reading":{"lines":[["Mit csináltál tegnap?","Что ты делал(а) вчера?"],["Tegnap tanultam.","Вчера я учился / училась."],["És ma?","А сегодня?"],["Ma dolgozom.","Сегодня я работаю."]],"q":"Что человек делал вчера?","options":["Учился / училась.","Работал / работала.","Переезжал / переезжала."],"answer":0},"preparation":[["Mit csináltál tegnap?","Что ты делал(а) вчера?","Mit? — что?; csináltál — ты делал(а), прошедшее время."],["Tegnap tanultam.","Вчера я учился / училась.","Tegnap — вчера; tanultam — я учился/училась."],["És ma?","А сегодня?","És — и, а; ma — сегодня."],["Ma dolgozom.","Сегодня я работаю.","Настоящее время, первое лицо единственного числа."]]}]};
const dialogueTranslations={"Первые десять знакомых слов":["Что это?","Это телефон.","А это?","Это радио."],"Приветствия и знакомство":["Привет!","Привет! Как дела?","Хорошо, спасибо. А ты?","У меня тоже всё хорошо."],"Моя семья":["Кто это?","Это моя мама.","А это кто?","Это мой папа."],"Мой дом":["Где ключ?","Он на столе.","Спасибо!","Не за что!"],"Еда и напитки":["Что ты хочешь?","Мне чай, пожалуйста.","С сахаром?","Нет, спасибо."],"Мой день: сегодня и завтра":["Что ты делаешь сегодня?","Сегодня я учусь.","А завтра?","Завтра я работаю."],"Общение и планы":["Привет! У тебя есть минутка?","Да. О чём ты хочешь поговорить?","О завтрашних планах.","Хорошо, я слушаю."],"Жильё и переезд":["Куда ты переезжаешь?","В новую квартиру.","На каком этаже она находится?","На втором."],"Вчера и сегодня: прошедшее время":["Что ты делал(а) вчера?","Вчера я учился / училась.","А сегодня?","Сегодня я работаю."],"Вопросы и короткие ответы":["Когда ты учишься?","Утром я учусь.","Что ты делаешь вечером?","Вечером я читаю."],"Где? Местонахождение и -ban/-ben":["Где папа?","Папа в магазине.","А мама?","Мама в саду."]};
let level='A1',lessonIndex=0,step=0,cardIndex=0,writeIndex=0,correctWriting=new Set(),testIndex=0,testCorrect=0,hasAnswered=false,testCompleted=false,compositionChecked=false,flashcardsOpened=false,grammarReviewed=false,dialoguePractised=false,spokenTargetIndex=0,flippedWords=new Set(),testOrder=[],quizMisses=[];
const steps=['lessonWords','lessonGrammar','lessonDialogue','lessonWriting','lessonComposition','lessonExercise'];
const stepsRu=['Слова','Грамматика','Разговор','Письмо','Мини-сочинение','Проверка'];
const checkpointKey='magyarorosz.lesson-checkpoint.v1';
const spellingErrorsKey='magyarorosz.lesson-spelling-errors.v1';
const reviewedErrorsKey='magyarorosz.lesson-reviewed-errors.v1';
let reviewItems=[],reviewPosition=0;
function checkpoint(){return read(checkpointKey)[lessonKey()]||{}}
function saveCheckpoint(){
 const old=read(checkpointKey);
 old[lessonKey()]={flipped:[...flippedWords],written:[...correctWriting],grammar:grammarReviewed,dialogue:dialoguePractised,sentence:$('lessonSentenceInput').value};
 try{localStorage.setItem(checkpointKey,JSON.stringify(old))}catch(_){}
}
function restoreCheckpoint(){
 const c=checkpoint();
 // Older A2 housing lessons listed lépcső and lift twice at the end.
 const restoreIndices=indices=>(indices||[]).map(i=>lessonKey()==='A2:1'&&[8,9].includes(i)?i-3:i);
 flippedWords=new Set(restoreIndices(c.flipped).filter(i=>Number.isInteger(i)&&i>=0&&i<rows().length));
 correctWriting=new Set(restoreIndices(c.written).filter(i=>Number.isInteger(i)&&i>=0&&i<rows().length));
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
function moveNext(){if(!canAdvance()){note(['Сначала откройте перевод как минимум пяти разных слов на карточках.','Прочитайте правило и выберите правильный ответ.','Прослушайте диалог и повторите хотя бы одну реплику вслух.','Сначала правильно напишите не менее трёх слов.','Сначала напишите мини-сочинение и проверьте его структуру.','Сначала ответьте на все вопросы итоговой проверки.'][step]);return}if(step<5){step++;save();stageView()}else{const old=read(KEY);const finished=old.completed||{};finished[lessonKey()]={score:testCorrect,max:Math.min(10,rows().length),errors:quizMisses.map(v=>v.hu),date:new Date().toISOString()};old.completed=finished;try{localStorage.setItem(KEY,JSON.stringify(old));persistQuiz(true)}catch(_){note('Не удалось сохранить результат. Скопируйте его перед выходом.');return}if(lessonIndex+1<courses[level].length){const nextIndex=lessonIndex+1;confirmLessonChange(nextIndex);if(lessonIndex===nextIndex)note('✓ Урок завершён. Вы перешли к следующему.');else note('✓ Урок завершён. Выберите повторение или продолжение обучения.')}else{step=0;save();render();note(Object.keys(courses[level]).every(i=>finished[level+':'+i])?'✓ Все подготовленные уроки этого уровня завершены.':'✓ Урок завершён. В списке уроков выберите следующий без отметки ✓.')}}}

function read(key){try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(_){return {}}}
function save(){const s=read(KEY);s[level]={lessonIndex,step};if(level==='A1')s.migratedFirstUnit20261121=true;try{localStorage.setItem(KEY,JSON.stringify(s))}catch(_){}}
function say(text){try{const u=window.SpeechSynthesisUtterance?new SpeechSynthesisUtterance(text):{text};u.lang='hu-HU';u.rate=.85;if(window.TanuloTTS?.speak)window.TanuloTTS.speak(u);else{speechSynthesis.cancel();speechSynthesis.speak(u)}}catch(_){}}
function el(tag,txt,cl){const node=document.createElement(tag);if(txt!==undefined)node.textContent=txt;if(cl)node.className=cl;return node}
function lesson(){return courses[level][lessonIndex]}
function rows(){const l=lesson(),base=window.MAGYAR_OROSZ_DATA?.[level]||[],result=[];for(const word of l.words){const row=base.find(r=>r[0].toLocaleLowerCase('hu-HU')===word.toLocaleLowerCase('hu-HU')) || (level==='A2'?window.MAGYAR_OROSZ_DATA?.A1?.find(r=>r[0].toLocaleLowerCase('hu-HU')===word.toLocaleLowerCase('hu-HU')):null);if(row){const beginnerExamples={
 'telefon':['Ez egy telefon.','Это телефон.'],
 'metró':['Ez a metró.','Это метро.'],
 'taxi':['Ez egy taxi.','Это такси.'],
 'rádió':['Ez egy rádió.','Это радио.'],
 'internet':['Van internet.','Есть интернет.'],
 'bank':['Ez egy bank.','Это банк.'],
 'pizza':['Ez egy pizza.','Это пицца.'],
 'banán':['Ez egy banán.','Это банан.'],
 'film':['Ez egy film.','Это фильм.'],
 'park':['Ez egy park.','Это парк.']
};const simple=(level==='A1'&&lessonIndex===0?beginnerExamples[word]:null)||l.examples?.[word]||null;result.push({hu:row[0],ru:l.senses?.[word]?.[0]||row[1],example:l.senses?.[word]?.[1]||simple?.[0]||row[2],translation:l.senses?.[word]?.[2]||simple?.[1]||row[3]})}}for(const [hu,ru,example,translation] of l.extra||[]){
 const entry={hu,ru,example,translation},at=result.findIndex(r=>r.hu===hu);
 if(at<0)result.push(entry);else result[at]=entry;
}return result}
function reviewPreviousErrors(){
 const pane=$('lessonPreviousErrors');
 pane.hidden=true;reviewItems=[];reviewPosition=0;
 if(lessonIndex<=0)return;
 const previous=level+':'+(lessonIndex-1);
 const scores=read(KEY).completed?.[previous];
 const failedQuiz=Array.isArray(scores?.errors)?scores.errors:[];
 const failedSpelling=read(spellingErrorsKey)[previous]||[];
 const lastLevelRows=window.MAGYAR_OROSZ_DATA?.[level]||[];
 const previousLesson=courses[level][lessonIndex-1];
 const previousExtras=new Map((previousLesson.extra||[]).map(x=>[x[0],x]));
 const previousSense=previousLesson.senses||{};
 const allPrevious=window.MAGYAR_OROSZ_DATA?.A1||[];
 const reviewed=read(reviewedErrorsKey)[previous]||[];
 const words=[...new Set([...failedQuiz,...failedSpelling].filter(x=>typeof x==='string'))];
 reviewItems=words.map(hu=>{
   const row=lastLevelRows.find(r=>r[0]===hu)||allPrevious.find(r=>r[0]===hu);
   const custom=previousExtras.get(hu);
   return {hu,ru:custom?.[1]||previousSense[hu]?.[0]||row?.[1]||'',translation:custom?.[3]||previousSense[hu]?.[2]||row?.[3]||''}
 }).filter(x=>x.hu&&x.ru).map(item=>({...item,corrected:reviewed.includes(item.hu)}));
 if(!reviewItems.length)return;
 pane.hidden=false;
 $('lessonReviewIntro').textContent='В предыдущем уроке были трудности с '+reviewItems.length+' словами. Рекомендуем повторить их перед новыми карточками. Вы можете продолжить обучение и без этого повторения.';
 const first=reviewItems.findIndex(x=>!x.corrected);reviewPosition=first<0?0:first;
 showReview();
}
function showReview(){
 const item=reviewItems[reviewPosition];if(!item)return;
 $('lessonReviewPrompt').replaceChildren();
 $('lessonReviewPrompt').append(el('strong',item.ru),el('p','Сначала вспомните венгерское написание, затем проверьте себя.'));
 $('lessonReviewInput').value='';
 $('lessonReviewFeedback').textContent='';
 $('lessonReviewStatus').textContent='Слово '+(reviewPosition+1)+' из '+reviewItems.length+' · повторено верно: '+reviewItems.filter(x=>x.corrected).length+' / '+reviewItems.length;
}
function saveReviewedError(hu){
 const previous=level+':'+(lessonIndex-1),store=read(reviewedErrorsKey);
 store[previous]=[...new Set([...(store[previous]||[]),hu])];
 try{localStorage.setItem(reviewedErrorsKey,JSON.stringify(store))}catch(_){ $('lessonReviewFeedback').textContent+=' Не удалось сохранить результат повторения.' }
}
function renderAlphabet(){document.getElementById('alphabetLesson')?.remove();if(level!=='A1'||lessonIndex!==0)return;const section=el('section',undefined,'lesson-alphabet');section.id='alphabetLesson';section.append(el('h3','Венгерский алфавит — 44 буквы'),el('p','Прослушайте каждую букву. Русские подсказки приблизительны: точный венгерский звук лучше слушать.'));const grid=el('div',undefined,'alphabet-grid');for(const [letter,hint]of alphabet){const button=el('button',undefined,'alphabet-letter');button.type='button';button.append(el('strong',letter),el('small',hint));button.onclick=()=>say(letter);grid.append(button)}section.append(grid,el('p','Особенно важно: o–ó, ö–ő, u–ú, ü–ű. Долгота гласных меняет произношение.'));$('integratedWords').before(section)}
const chapterVisuals={
 A1:[
 {icon:'📱',title:'Знакомые слова — новый язык',subtitle:'Уже знакомые понятия звучат по-венгерски',cards:[['📱','telefon','телефон'],['🚇','metró','метро'],['📻','rádió','радио']]},
 {icon:'👋',title:'Начнём разговор',subtitle:'Приветствие и знакомство',cards:[['👋','Szia!','Привет!'],['🙂','Hogy vagy?','Как дела?'],['💬','Jól vagyok.','У меня всё хорошо.']]},
 {icon:'🏡',title:'Люди рядом',subtitle:'Кто это? Моя семья',cards:[['👩','anya','мама'],['👨','apa','папа'],['👨‍👩‍👧','család','семья']]},
 {icon:'🛋️',title:'Моё пространство',subtitle:'Предметы и место',cards:[['🏠','ház','дом'],['🪑','szék','стул'],['🗝️','kulcs','ключ']]},
 {icon:'☕',title:'В кафе',subtitle:'Простая вежливая просьба',cards:[['☕','tea','чай'],['💧','víz','вода'],['🍞','kenyér','хлеб']]},
 {icon:'🌅',title:'Мой день',subtitle:'Сегодня и завтра',cards:[['☀️','reggel','утром'],['📖','Este olvasok.','Вечером я читаю.'],['🌤️','holnap','завтра']]},
 {icon:'❓',title:'Я могу спросить',subtitle:'Кто? Где? Когда?',cards:[['👤','Ki?','Кто?'],['📍','Hol?','Где?'],['⏰','Mikor?','Когда?']]},
 {icon:'📍',title:'Где находится?',subtitle:'Изучаем -ban и -ben',cards:[['🏠','házban','в доме'],['🏫','iskolában','в школе'],['🌳','kertben','в саду']]}
 ],
 A2:[
 {icon:'💬',title:'Разговор о планах',subtitle:'Из знакомых фраз строим настоящий диалог',cards:[['💬','Miről?','О чём?'],['📅','holnapi','завтрашний'],['🤝','beszélgetni','разговаривать']]},
 {icon:'🏢',title:'Новый адрес',subtitle:'Куда? Где? Откуда?',cards:[['➡️','házba','в дом'],['📍','házban','в доме'],['⬅️','házból','из дома']]},
 {icon:'🕰️',title:'Вчера и сегодня',subtitle:'Простое прошедшее время',cards:[['☀️','Ma tanulok.','Сегодня я учусь.'],['🕰️','Tegnap tanultam.','Вчера я учился / училась.'],['📖','olvastam','я читал / читала']]}
 ]
};
function renderVisual(){
 const box=$('lessonVisual');if(!box)return;
 box.replaceChildren();
 const data=chapterVisuals[level]?.[lessonIndex];if(!data)return;
 const header=el('div',undefined,'chapter-visual-header');
 const symbol=el('span',data.icon,'chapter-visual-symbol');symbol.setAttribute('aria-hidden','true');
 const text=el('div');text.append(el('strong',data.title),el('small',data.subtitle));
 header.append(symbol,text);box.append(header);
 const cards=el('div',undefined,'chapter-visual-cards');
 for(const [emoji,hu,ru]of data.cards){
  const card=el('div',undefined,'chapter-visual-card');
  const icon=el('span',emoji,'chapter-visual-emoji');icon.setAttribute('aria-hidden','true');
  const huWord=el('strong',hu);huWord.lang='hu';
  const ruWord=el('small',ru);ruWord.lang='ru';
  card.append(icon,huWord,ruWord);
  const listen=el('button','🔊');listen.type='button';listen.setAttribute('aria-label','Прослушать '+hu);listen.onclick=()=>say(hu);
  card.append(listen);cards.append(card)
 }
 box.append(cards);
 if(level==='A2'&&lessonIndex===1){
  const diagram=el('div',undefined,'chapter-direction-diagram');
  const from=el('span','Honnan?  házból');
  const where=el('span','Hol?  házban');
  const to=el('span','Hová?  házba');
  diagram.append(from,el('span','→','moving-arrow'),where,el('span','→','moving-arrow'),to);box.append(diagram)
 }
 if(level==='A2'&&lessonIndex===2){
  const timeline=el('div',undefined,'chapter-time-diagram');
  timeline.append(el('span','TEGNAP · tanultam'),el('span','→','moving-arrow'),el('span','MA · tanulok'));box.append(timeline)
 }
}
/* Optional game: lesson-specific five rounds, no penalty for exploring or repeating. */
const GAME_KEY='magyarorosz.lesson-game-best.v1';
let gameItems=[],gameRound=0,gameScore=0,gameAnswered=false;
function gameBestText(){
 const stored=read(GAME_KEY),best=stored[lessonKey()];
 $('lessonGameBest').textContent=Number.isInteger(best)?'Ваш лучший результат: '+best+' / 5.':'Результат игры сохраняется только в этом браузере.';
}
function showGameRound(){
 const box=$('lessonGameOptions');box.replaceChildren();
 const item=gameItems[gameRound];if(!item)return;
 gameAnswered=false;
 $('lessonGameProgress').textContent='Раунд '+(gameRound+1)+' / '+gameItems.length+' · Верно: '+gameScore;
 $('lessonGamePrompt').textContent=item.hu;
 $('lessonGameFeedback').textContent='Выберите русский перевод.';
 $('lessonGameNext').hidden=true;
 const known=new Set([item.ru]);
 const other=randomOrder(rows().filter(r=>r.hu!==item.hu&&r.ru!==item.ru)).filter(r=>{if(known.has(r.ru))return false;known.add(r.ru);return true}).slice(0,3);
 for(const candidate of randomOrder([item,...other])){
  const button=el('button',candidate.ru,'lesson-game-choice');button.type='button';
  button.onclick=()=>{
   if(gameAnswered)return;gameAnswered=true;
   const correct=candidate.ru===item.ru;
   if(correct)gameScore++;
   const explanation=' '+item.hu+' — '+item.ru+'. '+(item.example?item.example+' — '+item.translation:'');
   $('lessonGameFeedback').textContent=(correct?'✓ Верно.':'✗ Пока неверно.')+explanation;
   for(const b of box.querySelectorAll('button')){
    b.disabled=true;
    if(b.textContent===item.ru)b.classList.add('right');
    else if(b===button&&!correct)b.classList.add('wrong');
   }
   $('lessonGameProgress').textContent='Раунд '+(gameRound+1)+' / '+gameItems.length+' · Верно: '+gameScore;
   $('lessonGameNext').hidden=false;
   $('lessonGameNext').textContent=gameRound+1===gameItems.length?'Посмотреть результат →':'Следующий раунд →';
  };
  box.append(button);
 }
}
function beginGame(){
 const words=rows();
 gameItems=randomOrder(words).slice(0,Math.min(5,words.length));
 gameRound=0;gameScore=0;gameAnswered=false;
 $('lessonGameArea').hidden=false;
 $('lessonGameStart').hidden=true;$('lessonGameRestart').hidden=true;
 showGameRound();
}
function resetGame(){
 gameItems=[];gameRound=0;gameScore=0;gameAnswered=false;
 $('lessonGameArea').hidden=true;
 $('lessonGameStart').hidden=false;$('lessonGameRestart').hidden=true;
 $('lessonGameOptions').replaceChildren();
 $('lessonGameFeedback').textContent='';
 gameBestText();
}
$('lessonGameStart').onclick=beginGame;
$('lessonGameRestart').onclick=beginGame;
$('lessonGameNext').onclick=()=>{
 if(!gameAnswered)return;
 if(gameRound+1<gameItems.length){gameRound++;showGameRound();return}
 const saved=read(GAME_KEY),previous=Number(saved[lessonKey()])||0;
 saved[lessonKey()]=Math.max(previous,gameScore);
 try{localStorage.setItem(GAME_KEY,JSON.stringify(saved))}catch(_){}
 $('lessonGamePrompt').textContent=gameScore+' / '+gameItems.length;
 $('lessonGameOptions').replaceChildren();
 $('lessonGameFeedback').textContent=gameScore===gameItems.length?'Отлично! Все пять значений определены верно.':'Раунд завершён. Повторите слова, которые вызвали затруднение, и сыграйте ещё раз.';
 $('lessonGameNext').hidden=true;$('lessonGameRestart').hidden=false;
 gameBestText();
};
/* CSS teaching animation only; no video file is claimed or loaded. */
function renderMotion(){
 const area=$('lessonMicroMotion'),scene=$('lessonMotionScene');
 area.hidden=true;scene.replaceChildren();scene.classList.remove('active');
 $('lessonMotionToggle').setAttribute('aria-pressed','false');
 $('lessonMotionToggle').textContent='▶ Показать движение';
 const isLocation=(level==='A1'&&lessonIndex===7)||(level==='A2'&&lessonIndex===1);
 const isTime=(level==='A1'&&lessonIndex===5)||(level==='A2'&&lessonIndex===2);
 if(!isLocation&&!isTime)return;
 area.hidden=false;
 $('lessonMotionTitle').textContent=isLocation?'Где? Куда? Откуда?':'Сегодня и вчера';
 $('lessonMotionHint').textContent=isLocation?'Наблюдайте, как направление движения меняет окончание слова.':'Сравните действия сейчас и в прошлом.';
 const stages=isLocation?[['🏠','házban','в доме'],['➡️','házba','в дом'],['⬅️','házból','из дома']]:[['☀️','ma tanulok','сегодня учусь'],['🕰️','tegnap tanultam','вчера учился / училась']];
 for(const [emoji,hu,ru] of stages){
  const item=el('div',undefined,'lesson-motion-step');
  const symbol=el('span',emoji,'lesson-motion-icon');symbol.setAttribute('aria-hidden','true');
  const h=el('strong',hu);h.lang='hu';
  const translation=el('small',ru);translation.lang='ru';
  const listen=el('button','🔊');listen.type='button';listen.onclick=()=>say(hu);
  item.append(symbol,h,translation,listen);scene.append(item)
 }
 $('lessonMotionToggle').onclick=()=>{
  const active=scene.classList.toggle('active');
  $('lessonMotionToggle').setAttribute('aria-pressed',String(active));
  $('lessonMotionToggle').textContent=active?'Ⅱ Остановить движение':'▶ Показать движение';
 };
}
function resetVideo(){
 const block=$('lessonVideoBlock'),player=$('lessonVideoPlayer');
 block.hidden=true;player.pause();player.removeAttribute('src');player.load();
 /* Real videos are only displayed when a verified media asset has been supplied. */
}
function renderReading(){
 const reading=lesson().reading;
 const box=$('lessonReadingLines'),answers=$('lessonReadingAnswers');
 if(!box||!answers)return;
 box.replaceChildren();answers.replaceChildren();
 if(!reading||!Array.isArray(reading.lines)){ $('lessonReadingQuestion').textContent='';return; }
 let translationVisible=false;
 const translations=[];
 for(const [hu,ru] of reading.lines){
  const row=el('div',undefined,'lesson-reading-line');
  const pair=el('div',undefined,'lesson-reading-pair');
  const hungarian=el('p',hu);hungarian.lang='hu';
  const russian=el('p',ru,'lesson-reading-translation');russian.lang='ru';russian.hidden=true;
  translations.push(russian);pair.append(hungarian,russian);
  const listen=el('button','🔊');listen.type='button';
  listen.setAttribute('aria-label','Прослушать: '+hu);
  listen.onclick=()=>say(hu);
  row.append(pair,listen);box.append(row);
 }
 $('lessonReadingPlay').onclick=()=>say(reading.lines.map(item=>item[0]).join(' '));
 $('lessonReadingTranslations').onclick=()=>{
  translationVisible=!translationVisible;
  translations.forEach(p=>p.hidden=!translationVisible);
  $('lessonReadingTranslations').textContent=translationVisible?'Скрыть русский перевод':'Показать русский перевод';
 };
 $('lessonReadingTranslations').textContent='Показать русский перевод';
 $('lessonReadingQuestion').textContent=reading.q;
 $('lessonReadingFeedback').textContent='Выберите ответ. Проверка проводится сразу.';
 reading.options.forEach((option,i)=>{
  const button=el('button',option,'integrated-answer');button.type='button';
  button.onclick=()=>{
    const correct=i===reading.answer;
    $('lessonReadingFeedback').textContent=(correct?'✓ Верно. ':'✗ Пока неверно. ')+'Правильный ответ: '+reading.options[reading.answer]+'. Вернитесь к тексту, если хотите перечитать его.';
  };
  answers.append(button);
 });
}
function renderWords(){
 const box=$('integratedWords'),phrases=$('integratedPhrases');box.replaceChildren();phrases.replaceChildren();
 const w=rows();
 $('integratedWordCount').textContent=level==='A1'&&lessonIndex===0?'Теперь посмотрите знакомые слова и их венгерское написание.':'Теперь повторите слова и их переводы.';
 const shown=new Set();
 for(const v of w){
  const row=el('div',undefined,'integrated-word'),text=el('div');
  const hu=el('strong',v.hu);hu.lang='hu';
  text.append(hu,el('span',v.ru));
  const audio=el('button','🔊');audio.type='button';audio.onclick=()=>say(v.hu);audio.setAttribute('aria-label','Прослушать слово');
  row.append(text,audio);box.append(row);
  const example=String(v.example||'').trim();
  if(!example||shown.has(example)||example===v.hu||example===v.hu+'.')continue;
  shown.add(example);
  const phrase=el('div',undefined,'integrated-word');
  const phraseText=el('div');const phraseHu=el('strong',example);phraseHu.lang='hu';
  phraseText.append(phraseHu,el('span',v.translation||''));
  const play=el('button','🔊');play.type='button';play.onclick=()=>say(example);play.setAttribute('aria-label','Прослушать выражение');
  phrase.append(phraseText,play);phrases.append(phrase);
 }
 const prepared=lesson().preparation||[];
 for(const [hu,ru,explanation] of prepared){
   const phrase=el('div',undefined,'integrated-word');
   const content=el('div');const hungarian=el('strong',hu);hungarian.lang='hu';
   const russian=el('span',ru);russian.lang='ru';const help=el('small',explanation);
   content.append(hungarian,russian,help);
   const replay=el('button','🔊');replay.type='button';replay.onclick=()=>say(hu);replay.setAttribute('aria-label','Прослушать выражение');
   phrase.append(content,replay);phrases.append(phrase);
 }
 renderAlphabet()
}
function card(){const w=rows(),v=w[cardIndex%w.length];if(!v)return;$('integratedCardPosition').textContent=(cardIndex+1)+' / '+w.length;$('integratedCardHungarian').textContent=v.hu;$('integratedCardRussian').textContent=v.ru;$('integratedCardRussian').hidden=true;$('integratedCardFlip').textContent='Показать перевод'}
function norm(s){return String(s).normalize('NFC').toLocaleLowerCase('hu-HU').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ')}
function sentencePractice(reset=false){
 const ui=$('lessonSentencePractice');
 ui.hidden=correctWriting.size<Math.min(3,rows().length);
 if(!reset)return;
 const i=lesson().dialogue.findIndex(line=>line.trim().split(/\s+/).length>1);
 const target=lesson().dialogue[i];
 $('lessonSentenceTarget').textContent=target;
 $('lessonSentenceTranslation').textContent=dialogueTranslations[lesson().title][i];
 $('lessonSentenceInput').value=String(checkpoint().sentence||'');
 $('lessonSentenceFeedback').textContent='';
 $('lessonSentenceModel').open=false;
}
$('lessonSentenceInput').addEventListener('input',saveCheckpoint);
$('lessonSentenceCheck').onclick=()=>{
 const target=$('lessonSentenceTarget').textContent,got=$('lessonSentenceInput').value;
 $('lessonSentenceFeedback').textContent=norm(got)===norm(target)?'✓ Слова и диакритические знаки совпадают с образцом.':'Сравните свою запись с образцом: '+target;
};
function spelling(){const w=rows(),v=w[writeIndex%w.length];$('integratedWritingPrompt').textContent='Напишите по-венгерски: '+v.ru;$('integratedWritingInput').value='';$('integratedWritingFeedback').textContent='';$('integratedWritingProgress').textContent='Верно написано: '+correctWriting.size+' / '+w.length+(level==='A1'&&lessonIndex===0?' · с долгой гласной: '+[...correctWriting].filter(i=>/[áéíóöőúüű]/.test(w[i]?.hu||'')).length+' / 2':'')}
function spellingCheck(){const v=rows()[writeIndex%rows().length],got=norm($('integratedWritingInput').value),target=norm(v.hu);if(!got){$('integratedWritingFeedback').textContent='Введите слово.';return}const spellingErrors=read(spellingErrorsKey),current=Array.isArray(spellingErrors[lessonKey()])?spellingErrors[lessonKey()]:[];if(got===target){spellingErrors[lessonKey()]=current.filter(hu=>hu!==v.hu);try{localStorage.setItem(spellingErrorsKey,JSON.stringify(spellingErrors))}catch(_){}correctWriting.add(writeIndex);saveCheckpoint();$('integratedWritingFeedback').textContent='✓ Правильно! '+v.hu+' — '+v.ru}else{spellingErrors[lessonKey()]=[...new Set([...current,v.hu])];try{localStorage.setItem(spellingErrorsKey,JSON.stringify(spellingErrors))}catch(_){}const bare=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');const missing=bare(got)===bare(target);const differences=[...target].map((c,i)=>[c,[...got][i]]).filter(([expected,actual])=>expected!==actual&&actual!==undefined).slice(0,3).map(([expected,actual])=>actual+' → '+expected);$('integratedWritingFeedback').textContent=(missing?'Почти верно: проверьте долготу и вид гласной. ':'Есть ошибка в буквах или их порядке. ')+(differences.length?'Обратите внимание: '+differences.join(', ')+'. ':'')+'Правильно: '+v.hu+'. Напишите ещё раз.'}$('integratedWritingProgress').textContent='Верно написано: '+correctWriting.size+' / '+rows().length}
function composition(){const l=lesson(),key=level+':'+lessonIndex;$('integratedCompositionPrompt').textContent=l.composition[0]+'. '+l.composition[1];$('integratedCompositionHints').textContent='Примеры начала предложений: '+l.composition[2];$('integratedCompositionText').value=read('magyarorosz.lesson-writing.v1')[key]||'';$('integratedCompositionFeedback').textContent='Напишите собственный текст. Он сохранится только в этом браузере.'}
function saveComposition(){const s=read('magyarorosz.lesson-writing.v1');s[level+':'+lessonIndex]=$('integratedCompositionText').value;try{localStorage.setItem('magyarorosz.lesson-writing.v1',JSON.stringify(s));$('integratedCompositionFeedback').textContent='✓ Текст сохранён на этом устройстве.';return true}catch(_){$('integratedCompositionFeedback').textContent='Не удалось сохранить. Скопируйте текст вручную.'}}
function checkComposition(){
 const draftSaved=saveComposition();
 const source=$('integratedCompositionText').value.normalize('NFC').trim();
 const sentences=(source.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[]).map(t=>t.trim()).filter(Boolean);
 const minimum=lesson().min, phrases=sentences.map(t=>norm(t).replace(/[.!?]/g,'').trim());
 const duplicates=phrases.length-new Set(phrases).size;
 const missingFinalPunctuation=source!==''&&!/[.!?]\s*$/.test(source);
 const nonHungarian=sentences.filter(t=>!/[a-záéíóöőúüű]/i.test(t)||/\p{Script=Cyrillic}/u.test(t));
 const beginner=level==='A1'&&lessonIndex===0;
 let unsuitable=[];
 if(beginner){
  const valid=new Set(rows().filter(r=>r.hu!=='internet').map(r=>norm(r.hu)));
  unsuitable=phrases.filter(t=>{const m=/^ez egy (.+)$/.exec(t);return !m||!valid.has(m[1])});
 }
 const enough=sentences.length>=minimum;
 const questionCount=sentences.filter(t=>t.endsWith('?')).length;
 const answerCount=sentences.filter(t=>/[.!]$/.test(t)).length;
 const requiresQuestions=level==='A1'&&lessonIndex===6;
 compositionChecked=enough&&!duplicates&&!missingFinalPunctuation&&!nonHungarian.length&&!unsuitable.length&&(!requiresQuestions||(questionCount>=2&&answerCount>=2));
 stepButton.disabled=!compositionChecked;
 const messages=draftSaved?[]:['Не удалось сохранить текст. Скопируйте его перед выходом.'];
 messages.push('Предложений: '+sentences.length+' / '+minimum+'.');
 if(!enough)messages.push('Добавьте ещё '+(minimum-sentences.length)+' предложение(я).');
 if(duplicates)messages.push('Есть повторяющиеся предложения. Напишите разные примеры.');
 if(missingFinalPunctuation)messages.push('Поставьте знак конца предложения.');
 if(nonHungarian.length)messages.push('Напишите предложения по-венгерски латинскими буквами.');
 if(unsuitable.length)messages.push('В этом первом задании используйте образец «Ez egy …» и слово из списка урока. Например: «Ez egy telefon.»');
 if(requiresQuestions&&(questionCount<2||answerCount<2))messages.push('В уроке о вопросах напишите не менее двух вопросов со знаком «?», а также два ответа.');

 messages.push(compositionChecked?'✓ Формальные условия выполнены. Можно продолжать.':'Исправьте отмеченные пункты и проверьте ещё раз.');
 messages.push('Это проверка формы, а не полная оценка грамматики и содержания.');
 $('integratedCompositionFeedback').textContent=messages.join(' ');
 if(compositionChecked)note('Проверка формы завершена. Содержание можно обсудить с преподавателем.');
}
const quizKey='magyarorosz.lesson-quiz.v1';
let quizAnswers=[];
function persistQuiz(clear=false){
 const records=read(quizKey);
 if(clear)delete records[lessonKey()];
 else records[lessonKey()]={order:testOrder.map(i=>rows()[i].hu),answers:quizAnswers,index:testIndex,done:testCompleted};
 try{localStorage.setItem(quizKey,JSON.stringify(records))}catch(_){}
}
function resumeQuiz(){
 quizAnswers=[];
 const saved=read(quizKey)[lessonKey()],w=rows();
 if(!saved||!Array.isArray(saved.order)||!Array.isArray(saved.answers))return;
 const order=saved.order.map(hu=>w.findIndex(r=>r.hu===hu)),n=Math.min(10,w.length);
 if(order.length!==w.length||order.includes(-1)||new Set(order).size!==w.length||
    !Number.isInteger(saved.index)||saved.index<0||saved.index>=n||
    ![saved.index,saved.index+1].includes(saved.answers.length)||
    saved.answers.some(a=>typeof a!=='string')||(saved.done&&saved.answers.length!==n))return;
 testOrder=order;testIndex=saved.index;quizAnswers=saved.answers;
 for(const [i,a] of quizAnswers.entries()){
  const v=w[order[i]];
  if(a===v.ru)testCorrect++;else quizMisses.push(v);
 }
 hasAnswered=quizAnswers.length>testIndex;testCompleted=!!saved.done;
}
function showQuizResult(){
 renderErrorSummary();
 const n=Math.min(10,rows().length),percent=Math.round(testCorrect/n*100);
 $('integratedAnswerFeedback').textContent='Результат: '+testCorrect+' / '+n+' ('+percent+'%). '+(percent>=90?'Отлично! Вы готовы к следующему уроку.':'Рекомендуем повторить слова и добиться 90%, но это не обязательное условие.');
 $('integratedNextQuestion').hidden=true;stepButton.disabled=false;
}
function test(){const w=rows(),v=w[testOrder[testIndex]??testIndex%w.length],box=$('integratedQuestion');box.replaceChildren();$('integratedErrorSummary').hidden=true;if(!v)return;const p=el('p',v.hu);p.lang='hu';box.append(p);const seen=new Set([v.ru]);const others=randomOrder(w.filter(r=>r.ru!==v.ru)).filter(r=>{if(seen.has(r.ru))return false;seen.add(r.ru);return true}).slice(0,3);const options=randomOrder([v,...others]);for(const candidate of options){const b=el('button',candidate.ru,'integrated-answer');b.type='button';b.onclick=()=>{if(hasAnswered||testCompleted)return;hasAnswered=true;quizAnswers[testIndex]=candidate.ru;persistQuiz();const good=candidate.ru===v.ru;if(good)testCorrect++;else quizMisses.push({hu:v.hu,ru:v.ru,example:v.example,translation:v.translation});$('integratedAnswerFeedback').textContent=good?'✓ Верно! '+v.hu+' — '+v.ru:'✗ Вы выбрали: '+candidate.ru+'. Правильный перевод: '+v.ru+'. Пример: '+v.example+' — '+v.translation+'. Прослушайте и повторите слово.';$('integratedNextQuestion').hidden=false;box.querySelectorAll('button').forEach(btn=>btn.disabled=true);$('integratedStepNext').disabled=true};box.append(b)}$('integratedNextQuestion').hidden=true;$('integratedAnswerFeedback').textContent='Вопрос '+(testIndex+1)+' / '+Math.min(10,w.length);
 if(hasAnswered){
  box.querySelectorAll('button').forEach(b=>b.disabled=true);
  const a=quizAnswers[testIndex];
  $('integratedAnswerFeedback').textContent=(a===v.ru?'✓ Верно. ':'✗ Ваш ответ: '+a+'. ')+v.hu+' — '+v.ru;
  $('integratedNextQuestion').hidden=false;
 }
 if(testCompleted)showQuizResult();
}
function renderErrorSummary(){
 const box=$('integratedErrorSummary');box.replaceChildren();box.hidden=false;
 if(!quizMisses.length){box.append(el('p','✓ Все слова в проверке переведены правильно.'));return}
 box.append(el('strong','Повторите слова, в которых была ошибка ('+quizMisses.length+'):'));
 for(const missed of quizMisses){const row=el('div',undefined,'lesson-error-row');const description=el('span',missed.hu+' — '+missed.ru);const speakButton=el('button','🔊 Слушать');speakButton.type='button';speakButton.setAttribute('aria-label','Прослушать '+missed.hu);speakButton.onclick=()=>say(missed.hu);row.append(description,speakButton);box.append(row)}
 box.append(el('p','Прослушайте ошибочные слова ещё раз. При необходимости вернитесь к разделу «Слова».'))
}
function stageView(){steps.forEach((id,i)=>$(id).hidden=i!==step);$('integratedPreviousStep').hidden=step===0;$('integratedRouteProgress').textContent='Урок '+(lessonIndex+1)+' · шаг '+(step+1)+' из 6 · '+stepsRu[step];$('integratedRouteBar').value=step+1;document.querySelectorAll('.lesson-sections a').forEach((a,i)=>{a.hidden=i!==step;a.textContent=(i+1)+'. '+stepsRu[i]});$('integratedLessonIntro').textContent='Шаг '+(step+1)+' из 6 · '+['Слушайте слова, изучайте венгерские буквы и откройте перевод пяти карточек.','Прочитайте правило по-русски и ответьте на один вопрос.','Послушайте реплику и повторите её вслух.','Напишите правильно три разных слова; в первом уроке минимум два с долгой гласной.','Напишите небольшой текст по образцу и проверьте его структуру.','Ответьте на вопросы и узнайте результат сразу.'][step];$('integratedStepNext').textContent=step===5?'Завершить урок →':'Следующий шаг →';$('integratedStepNext').disabled=!canAdvance();document.querySelector('.lesson-end').hidden=true}
function render(){$('integratedAdvanceAdvice').hidden=true;const l=lesson();reviewPreviousErrors();$('integratedLessonLevel').textContent=level;$('integratedLessonCounter').textContent='Урок '+(lessonIndex+1)+' из '+courses[level].length;$('integratedLessonHeading').textContent='Урок '+(lessonIndex+1)+'. '+l.title;$('integratedLessonSelect').replaceChildren();courses[level].forEach((x,i)=>{const finished=read(KEY).completed?.[level+':'+i];const o=el('option',(finished?'✓ ':'')+(i+1)+'. '+x.title);o.value=String(i);$('integratedLessonSelect').append(o)});$('integratedLessonSelect').value=String(lessonIndex);renderVisual();renderMotion();resetVideo();renderReading();renderWords();resetGame();grammarQuestion();$('integratedGrammar').replaceChildren();$('integratedGrammar').append(el('strong',l.grammar[0]),el('p',l.grammar[1]),el('p',l.grammar[2]));const dialog=$('integratedDialogue');dialog.replaceChildren();for(const [i,line] of l.dialogue.entries()){const row=el('div',undefined,'integrated-dialogue-line');const words=el('div',undefined,'lesson-dialogue-text');const h=el('span',line);h.lang='hu';const translation=el('small',dialogueTranslations[l.title]?.[i]||'');translation.lang='ru';words.append(h,translation);const b=el('button','🔊');b.type='button';b.onclick=()=>{spokenTargetIndex=Array.from(dialog.children).indexOf(row);say(line);$('integratedDialogueFeedback').textContent='Прослушайте и повторите фразу: '+line;note('Для проверки нажмите микрофон или отметьте, что повторили вслух.')};row.append(words,b);dialog.append(row)}cardIndex=0;writeIndex=0;correctWriting=new Set();testIndex=0;testCorrect=0;hasAnswered=false;testCompleted=false;compositionChecked=false;flashcardsOpened=false;grammarReviewed=false;dialoguePractised=false;spokenTargetIndex=0;flippedWords=new Set();quizMisses=[];testOrder=randomOrder(rows().map((_,i)=>i));restoreCheckpoint();resumeQuiz();sentencePractice(true);$('integratedFlashcard').hidden=false;card();spelling();composition();test();stageView()}
function open(mode){level=document.querySelector('.welcome .level.active')?.dataset.level||'A1';if(!courses[level]){document.querySelector('[data-hub-view="steps"]')?.click();return}const stored=read(KEY),saved=stored[level];if(level==='A1'&&saved&&!stored.migratedFirstUnit20261121){saved.lessonIndex=Math.max(0,Number(saved.lessonIndex)||0)+(Number(saved.lessonIndex)>0?1:0);stored.migratedFirstUnit20261121=true;try{localStorage.setItem(KEY,JSON.stringify(stored))}catch(_){}}lessonIndex=Math.max(0,Math.min(courses[level].length-1,Number(saved?.lessonIndex)||0));step=mode==='words'?0:Math.max(0,Math.min(5,Number(saved?.step)||0));root.classList.remove('study-menu','study-active','study-coach','study-online','study-exam','study-daily');root.classList.add('study-book');hub.hidden=true;view.hidden=false;back.hidden=false;render();view.scrollIntoView({block:'start'});}
let stepButton=$('integratedStepNext');if(!stepButton){stepButton=el('button','Следующий шаг →','lesson-primary');stepButton.type='button';stepButton.id='integratedStepNext';view.insertBefore(stepButton,$('lessonWords'))}
stepButton.onclick=moveNext;
$('integratedPreviousStep').onclick=()=>{if(step>0){step--;save();stageView();note('Вы вернулись к предыдущему шагу. Уже проверенные ответы сохранены.') }};
$('lessonsPrimary')?.addEventListener('click',()=>open('resume'));$('lessonsVocabulary')?.addEventListener('click',()=>open('words'));
function completedScore(index){return read(KEY).completed?.[level+':'+index]}
function reviewAdvice(targetIndex){
 if(targetIndex<=0)return '';
 const prev=completedScore(targetIndex-1);
 if(!prev)return 'Предыдущий урок ещё не завершён. Для уверенного продвижения рекомендуем сначала пройти его и повторить новые слова.';
 if(!Number.isFinite(prev.max)||prev.max<=0)return 'Для предыдущего урока нет проверенного результата. Перед продолжением рекомендуем повторить материал.';
 const percent=Math.round(prev.score/prev.max*100);
 if(percent>=90)return '';
 const errors=(prev.errors||[]).slice(0,5);
 return 'Результат предыдущего урока — '+percent+'%. Рекомендуем повторить материал'+(errors.length?', особенно: '+errors.join(', '):'')+'. Это рекомендация, а не ограничение.';
}
function confirmLessonChange(targetIndex){
 if(!Number.isInteger(targetIndex)||targetIndex<0||targetIndex>=courses[level].length)return;
 const message=reviewAdvice(targetIndex);
 if(!message){lessonIndex=targetIndex;step=0;save();render();return}
 const box=$('integratedAdvanceAdvice');
 box.replaceChildren();
 box.append(el('strong','Рекомендация перед продолжением'),el('p',message));
 const actions=el('div',undefined,'lesson-actions');
 const revise=el('button','Повторить предыдущий урок');
 const proceed=el('button','Продолжить обучение');
 revise.type='button';proceed.type='button';
 revise.onclick=()=>{lessonIndex=targetIndex-1;step=0;save();render();box.hidden=true};
 proceed.onclick=()=>{lessonIndex=targetIndex;step=0;save();render();box.hidden=true};
 actions.append(revise,proceed);box.append(actions);box.hidden=false;
 box.scrollIntoView({block:'nearest'});
}
$('integratedLessonSelect').addEventListener('change',e=>{const target=Number(e.target.value);e.target.value=String(lessonIndex);confirmLessonChange(target)});
$('integratedFlashcardOpen').onclick=()=>{cardIndex=0;card();$('integratedFlashcard').hidden=false;note('Повторите карточки. Уже открытые переводы сохраняются в прогрессе урока.')};
$('integratedCardFlip').onclick=()=>{const node=$('integratedCardRussian');node.hidden=!node.hidden;if(!node.hidden){flippedWords.add(cardIndex);saveCheckpoint();if(step===0&&canAdvance())stepButton.disabled=false;note('Проверено слов: '+flippedWords.size+' / '+Math.min(5,rows().length)+'.')} $('integratedCardFlip').textContent=node.hidden?'Показать перевод':'Скрыть перевод'};
$('integratedCardNext').onclick=()=>{cardIndex=(cardIndex+1)%rows().length;card()};
$('integratedCardSpeak').onclick=()=>say(rows()[cardIndex%rows().length].hu);
const grammarLinks={
 'A1:0':'A magyar magánhangzók',
 'A1:1':'A létige: vagyok, vagy, van',
 'A1:2':'Szótő és toldalék: hogyan épül fel egy szó?',
 'A1:3':'Magánhangzó-harmónia: -ban/-ben',
 'A1:4':'Szótő és toldalék: hogyan épül fel egy szó?',
 'A1:5':'Határozatlan igeragozás – jelen idő',
 'A1:6':'Ki cselekszik? Alany, ige és tárgy',
 'A1:7':'Magánhangzó-harmónia: -ban/-ben',
 'A2:0':'Határozatlan igeragozás – jelen idő',
 'A2:1':'Hová? Hol? Honnan?',
 'A2:2':'A múlt idő alapjai'
};
$('lessonReviewListen').onclick=()=>{const item=reviewItems[reviewPosition];if(item)say(item.hu)};
$('lessonReviewCheck').onclick=()=>{
 const item=reviewItems[reviewPosition];if(!item)return;
 const received=norm($('lessonReviewInput').value),expected=norm(item.hu);
 if(!received){$('lessonReviewFeedback').textContent='Введите слово для проверки.';return}
 if(received===expected){
   item.corrected=true;saveReviewedError(item.hu);
   $('lessonReviewFeedback').textContent='✓ Правильно: '+item.hu+' — '+item.ru+'.';
 }else{
   const unaccented=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
   $('lessonReviewFeedback').textContent=(unaccented(received)===unaccented(expected)?'Проверьте долготу гласных. ':'Слово пока написано неверно. ')+'Правильно: '+item.hu+'. Попробуйте ещё раз.';
 }
 $('lessonReviewStatus').textContent='Повторено верно: '+reviewItems.filter(x=>x.corrected).length+' / '+reviewItems.length;
};
$('lessonReviewNext').onclick=()=>{if(!reviewItems.length)return;reviewPosition=(reviewPosition+1)%reviewItems.length;showReview()};
$('lessonReviewInput').addEventListener('keydown',event=>{if(event.key==='Enter'){$('lessonReviewCheck').click();event.preventDefault()}});
$('integratedGrammarMore').onclick=()=>{
 const topic=grammarLinks[lessonKey()];
 const grammarLevel=lessonKey()==='A2:0'?'A1':level;
 const params=new URLSearchParams({level:grammarLevel,from:'workbook',returnLevel:level,returnLesson:String(lessonIndex)});
 if(topic)params.set('topic',topic);
 location.href='nyelvtan.html?'+params.toString();
};
/* A nyelvtani állomás teljesítését a példára épülő helyes válasz igazolja. */
const dialogueLines=()=>lesson().dialogue;
$('integratedDialogueRepeat').onclick=()=>{dialoguePractised=true;saveCheckpoint();stepButton.disabled=false;$('integratedDialogueFeedback').textContent='Повторение отмечено по вашей самооценке. Произношение автоматически не проверялось.';};
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
$('integratedWritingCheck').onclick=()=>{spellingCheck();sentencePractice();if(canAdvance()){stepButton.disabled=false;note('✓ Условия письма выполнены. Можно продолжать.')}else{stepButton.disabled=true;note('Правильно записано '+correctWriting.size+' слов. В первом уроке среди них должны быть хотя бы два слова с долгой гласной (например metró, rádió, banán).')}};
$('integratedWritingNext').onclick=()=>{writeIndex=(writeIndex+1)%rows().length;spelling()};
$('integratedCompositionSave').onclick=saveComposition;
$('integratedCompositionCheck').onclick=checkComposition;
$('integratedCompositionText').addEventListener('input',()=>{const drafts=read('magyarorosz.lesson-writing.v1');drafts[lessonKey()]=$('integratedCompositionText').value;let saved=true;try{localStorage.setItem('magyarorosz.lesson-writing.v1',JSON.stringify(drafts))}catch(_){saved=false}compositionChecked=false;if(step===4)stepButton.disabled=true;$('integratedCompositionFeedback').textContent=saved?'Черновик сохранён на этом устройстве. Проверьте текст ещё раз.':'Не удалось сохранить черновик. Скопируйте текст перед выходом.';});
$('integratedNextQuestion').onclick=()=>{if(testIndex+1>=Math.min(10,rows().length)){testCompleted=true;persistQuiz();showQuizResult();note('Проверка завершена. Вы можете перейти к следующему уроку.');return}testIndex++;hasAnswered=false;persistQuiz();test();stepButton.disabled=true};
$('integratedNextLesson').onclick=()=>confirmLessonChange(Math.min(courses[level].length-1,lessonIndex+1));
$('integratedAllWords').onclick=()=>{root.classList.remove('study-book');view.hidden=true;document.querySelector('.tab[data-view="list"]')?.click();root.classList.add('study-active')};
const accentBox=$('integratedAccentKeys');for(const letter of 'áéíóöőúüű'){const b=el('button',letter);b.type='button';b.onclick=()=>{const input=$('integratedWritingInput');const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.value=input.value.slice(0,start)+letter+input.value.slice(end);input.focus();input.setSelectionRange(start+1,start+1)};accentBox.append(b)}
back.addEventListener('click',()=>{view.hidden=true;root.classList.remove('study-book')});
const returnParams=new URLSearchParams(location.search);
if(returnParams.get('workbook')==='1'){
 const requestedLevel=returnParams.get('level');
 const requestedLesson=Number(returnParams.get('lesson'));
 if(['A1','A2'].includes(requestedLevel)&&Number.isInteger(requestedLesson)){
  document.querySelector('.welcome .level[data-level="'+requestedLevel+'"]')?.click();
  level=requestedLevel;
  const stored=read(KEY);stored[requestedLevel]={lessonIndex:requestedLesson,step:1};
  try{localStorage.setItem(KEY,JSON.stringify(stored))}catch(_){}
  open('resume');
 }
}
})();
