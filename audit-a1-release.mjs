// Reproducible A1-only release audit. It checks structural and scoring safety,
// not whether every Hungarian/Russian translation is linguistically correct.
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';

const folder=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(folder,name),'utf8');
const book=read('lesson-book.js');
const html=read('index.html');
const context={window:{}};
const unitScripts=['data.js','ecl-vocab.js','a1-guided-lessons-next.js','a1-guided-lessons-13-16.js',
 'a1-guided-lessons-17-20.js','a1-guided-lessons-21-24.js',
 'a1-guided-lessons-25-28.js','a1-guided-lessons-29-30.js'];
for(const name of unitScripts)runInNewContext(read(name),context,{filename:name});

const coursesText=book.match(/const courses=(\{[\s\S]*?\});\nconst dialogueTranslations=/)?.[1];
const translationsText=book.match(/const dialogueTranslations=(\{[^\n]*\});/)?.[1];
const checksText=book.match(/const checks=(\{[\s\S]*?\n\});/)?.[1];
if(!coursesText||!translationsText||!checksText)throw Error('A tananyag alapadatainak szerkezete megváltozott; az audit nem találja őket.');
const courses=JSON.parse(coursesText);
const dialogueTranslations=JSON.parse(translationsText);
const checks=runInNewContext('('+checksText+')');
const extensions=[
 context.window.TanmuhelyA1Continuation,
 context.window.TanmuhelyA1Units13to16,
 context.window.TanmuhelyA1Units17to20,
 context.window.TanmuhelyA1Units21to24,
 context.window.TanmuhelyA1Units25to28,
 context.window.TanmuhelyA1Units29to30
];
for(const extension of extensions){
 if(!extension)throw Error('Hiányzó A1-es leckecsokor.');
 courses.A1.push(...extension.lessons);
 Object.assign(dialogueTranslations,extension.dialogueTranslations);
 Object.assign(checks,extension.checks);
}

// The first lesson's extra explanations are applied by the renderer without
// changing historical lesson IDs, checkpoints, or students' saved answers.
const firstLessonCorrections=book.match(/function improveA1Foundations\(\)\{[\s\S]*?\n\}/)?.[0];
if(firstLessonCorrections){
 const setup=runInNewContext(`(function(courses){${firstLessonCorrections}; improveA1Foundations()})`);
 setup(courses);
}
const earlyExampleCorrections=book.match(/function improveEarlyA1CardExamples\(\)\{[\s\S]*?\n\}/)?.[0];
if(!earlyExampleCorrections)throw Error('Hiányoznak a kezdő kártyák tanári példamondatai.');
runInNewContext(`(function(courses){${earlyExampleCorrections}; improveEarlyA1CardExamples()})`)(courses);

const blockers=[];
const reviews=[];
const add=(arr,lesson,code,message)=>arr.push({lesson,code,message});
const fail=(lesson,code,message)=>add(blockers,lesson,code,message);
const flag=(lesson,code,message)=>add(reviews,lesson,code,message);
const unique=values=>new Set(values.map(value=>value.toLocaleLowerCase('hu-HU'))).size===values.length;
const knownWords=new Set(context.window.MAGYAR_OROSZ_DATA.A1.map(row=>row[0].toLocaleLowerCase('hu-HU')));
const taught=new Set();
const allTaught=new Set();
const titles=new Set();
let totalNew=0,overloaded=0,familyRequiredNew=0,familyOptionalNew=0,dailyRequiredNew=0,dailyOptionalNew=0;

if(courses.A1.length!==30)fail('A1','LESSON_COUNT',`A várt 30 helyett ${courses.A1.length} lecke szerepel.`);
if(courses.A2.length!==3)fail('A2','FROZEN_A2','Az A2-es leckék száma módosult.');
const rowFn=book.match(/function rows\(\)\{[\s\S]*?\nreturn result\}/)?.[0];
if(!rowFn)fail('A1','CARD_RENDERER','A szókártyák előállító függvénye nem ellenőrizhető.');

for(const [index,lesson] of courses.A1.entries()){
 const id=`A1:${index}`,name=`${index+1}. ${lesson.title}`;
 if(!lesson.title||titles.has(lesson.title))fail(id,'TITLE','Üres vagy ismétlődő leckecím.');
 titles.add(lesson.title);
 if(!Array.isArray(lesson.words)||lesson.words.length<5||lesson.words.length>20)fail(id,'WORD_LOAD','A szókártyák száma nincs 5 és 20 között.');
 const coreCount=lesson.coreCount??Math.min(10,lesson.words.length);
 if(!Number.isInteger(coreCount)||coreCount<5||coreCount>Math.min(10,lesson.words.length))
  fail(id,'CORE_COUNT','A kötelező szókártyák száma nem ellenőrizhető vagy kívül esik az 5–10 közötti tartományon.');
 if(!unique(lesson.words))fail(id,'DUPLICATE_WORD','Azonos szó kétszer szerepel az egy leckén belüli szókártyalistában.');
 const extras=new Map((lesson.extra||[]).map(row=>[String(row[0]).toLocaleLowerCase('hu-HU'),row]));
 if(extras.size!==(lesson.extra||[]).length)fail(id,'DUPLICATE_EXTRA','Az új kifejezés többször szerepel a leckében.');
 for(const word of lesson.words){
  const normalized=String(word).toLocaleLowerCase('hu-HU');
  allTaught.add(normalized);
  if(!knownWords.has(normalized)&&!extras.has(normalized))fail(id,'MISSING_WORD',`Nincs megjeleníthető szókártya: ${word}.`);
 }
 for(const row of lesson.extra||[]){
  allTaught.add(row[0].toLocaleLowerCase('hu-HU'));
  if(row.length!==4||row.some(value=>typeof value!=='string'||!value.trim()))fail(id,'EXTRA_TRANSLATION','Hiányos magyar–orosz szókártya vagy példamondat.');
 }
 const newWords=lesson.words.filter(word=>!taught.has(word.toLocaleLowerCase('hu-HU')));
 if(index===2){
  familyRequiredNew=lesson.words.slice(0,coreCount).filter(word=>!taught.has(word.toLocaleLowerCase('hu-HU'))).length;
  familyOptionalNew=newWords.length-familyRequiredNew;
  if(coreCount!==8||lesson.words[8]!=='barát'||lesson.words[9]!=='testvér')
   fail(id,'FAMILY_CORE','A családlecke kötelező nyolc szava vagy a két eredeti helyű opcionális szó megváltozott.');
 }
 if(index===5){
  dailyRequiredNew=lesson.words.slice(0,coreCount).filter(word=>!taught.has(word.toLocaleLowerCase('hu-HU'))).length;
  dailyOptionalNew=newWords.length-dailyRequiredNew;
  const mandatoryText=[...lesson.grammar,...lesson.dialogue,...lesson.reading.lines.map(line=>line[0]),...lesson.composition].join(' ').toLocaleLowerCase('hu-HU');
  if(coreCount!==8||lesson.words[8]!=='sétál'||lesson.words[9]!=='mindennap'||/sétál|mindennap/.test(mandatoryText))
   fail(id,'DAILY_CORE','A napirendlecke nyolc kötelező szava és két opcionális szava nem illeszkedik a tanított mintákhoz.');
 }
 totalNew+=newWords.length;
 if(newWords.length>8){
  overloaded++;
  flag(id,'NEW_WORD_LOAD',`${newWords.length} új szó/kifejezés egy vezetett leckében (tanári felülvizsgálat).`);
 }
 for(const word of lesson.words)taught.add(word.toLocaleLowerCase('hu-HU'));
 if(!Array.isArray(lesson.grammar)||lesson.grammar.length!==3||lesson.grammar.some(value=>!value.trim()))fail(id,'GRAMMAR','A háromrészes orosz nyelvtani magyarázat hiányos.');
 if(!Array.isArray(lesson.grammarTable)||lesson.grammarTable.length<2||lesson.grammarTable.some(row=>row.length!==3||row.some(x=>!String(x).trim())))fail(id,'TABLE','A kétnyelvű nyelvtani mintatáblázat hiányos.');
 if(!Array.isArray(lesson.preparation)||lesson.preparation.length<3||lesson.preparation.some(row=>row.length!==3||row.some(x=>!String(x).trim())))fail(id,'TEACH_BEFORE_TEST','Nincs elég, magyarázattal előkészített magyar–orosz mondatminta.');
 if(!Array.isArray(lesson.dialogue)||lesson.dialogue.length<4||dialogueTranslations[lesson.title]?.length!==lesson.dialogue.length)fail(id,'DIALOGUE','Hiányzik valamelyik párbeszédsor orosz fordítása.');
 const reading=lesson.reading;
 if(!reading||!Array.isArray(reading.lines)||reading.lines.length<3||reading.lines.some(row=>row.length!==2||row.some(x=>!String(x).trim())))fail(id,'READING','A szövegértési anyag vagy a mondatfordítás hiányos.');
 if(!reading||!Array.isArray(reading.options)||!Number.isInteger(reading.answer)||reading.answer<0||reading.answer>=reading.options.length||reading.options.length<3)fail(id,'READING_KEY','Hiányzó vagy hibás szövegértési javítókulcs.');
 else if(new Set(reading.options.map(x=>x.trim())).size!==reading.options.length)fail(id,'READING_DUPLICATE','A szövegértési kérdésnél azonos válaszlehetőségek vannak.');
 if(!Array.isArray(lesson.composition)||lesson.composition.length!==3||!Number.isInteger(lesson.min)||lesson.min<2)fail(id,'WRITING','Hiányos önálló írásfeladat.');
 const question=checks[id];
 if(!question||!Array.isArray(question.a)||!Number.isInteger(question.ok)||question.ok<0||question.ok>=question.a.length||!question.why?.trim())fail(id,'GRAMMAR_KEY','A nyelvtani kérdés javítókulcsa vagy magyarázata hiányzik.');
 else if(new Set(question.a.map(x=>x.trim())).size!==question.a.length)fail(id,'GRAMMAR_DUPLICATE','A nyelvtani kérdésnél azonos válaszlehetőségek vannak.');
 if(rowFn){
  const displayed=runInNewContext(`${rowFn};rows()`,{window:context.window,level:'A1',lessonIndex:index,lesson:()=>lesson});
  if(displayed.length<lesson.words.length||displayed.some(row=>!row.hu?.trim()||!row.ru?.trim()||!row.example?.trim()||!row.translation?.trim()))fail(id,'VISIBLE_CARDS','A tanuló nem látja valamennyi szó jelentését és mondatpéldáját.');
 }
}

const intro=courses.A1[0].grammar?.[1]||'';
if(!/в русском языке (нет|отсутствуют) артикл/i.test(intro)||!/a\/az/i.test(intro)||!/a\s*[–-]\s*á/.test(intro)||!/e\s*[–-]\s*é/.test(intro))
 fail('A1:0','RUSSIAN_STARTER_BRIDGE','A magyar névelőket és az a–á, e–é hangkülönbségeket nem tanítjuk kifejezetten orosz kezdőknek.');
if(!book.includes('placeReadingAfterTeaching()')||!book.includes('writing.prepend(panel)'))fail('A1','READING_ORDER','A szövegértés nem bizonyíthatóan követi a tanítást.');
if(!book.includes('function renderA1WordPreview()')||!book.includes('renderWords();renderA1WordPreview();renderGrammarExamples()')||!book.includes('prepared.slice(0,3)')||!book.includes('const started=say(hu)'))
 fail('A1','BEGINNER_WORD_PREVIEW','A három kétnyelvű, meghallgatható tanári mondatminta nem jelenik meg a szókártyák előtt.');
if(!book.includes('function requiredCardsSeen()')||!book.includes("if(level==='A1')testOrder=initialTestOrder()")||!book.includes("const distractors=level==='A1'?w.slice(0,requiredCardCount()):w"))
 fail('A1','UNTAUGHT_QUIZ_WORD','A záróteszt olyan A1-es szót vagy válaszlehetőséget is kérdezhet, amelynek jelentését előbb nem kellett megismerni.');
if(!book.includes('function cardChunks()')||!book.includes('function renderCardCheckpoint()')||!book.includes('a1CheckedBatches'))
 fail('A1','OVERLOADED_CARDS','A kötelező A1-es szókártyák nem tanulhatók két ötszavas egységben, külön visszakérdezéssel.');
if(!book.includes('function resumeA1CardIndex()')||!book.includes('restoreCheckpoint();cardIndex=resumeA1CardIndex()')||!book.includes("pause.id='a1CardBreak'")||!book.includes('checkedBatches.has(0)||fastTrackPacks.has(0)'))
 fail('A1','FIVE_WORD_RESUME','Az első ötszavas blokk után nincs menthető szünet, vagy újranyitáskor nem áll vissza a befejezetlen kártya.');
if(!book.includes('a1FastTrackPacks:[...fastTrackPacks]')||!book.includes('fastTrackPacks.add(part)')||!book.includes('fastTrackPacks.has(i)||(checkedBatches.has(i)'))
 fail('A1','PARTIAL_KNOWN_WORDS','Az ismert ötszavas csoport nem ugorható át külön, vagy a részleges ellenőrzés nincs biztonságosan mentve.');
if(!book.includes('function quizQuestionCount()')||!book.includes('quizTargetCount=quizQuestionCount()')||!book.includes('saved.count===undefined?Math.min(10,w.length):saved.count')||!book.includes('max:quizTargetCount'))
 fail('A1','LEGACY_QUIZ_LENGTH','A csökkentett kötelező szóanyag zárótesztje vagy a régi tízkérdéses teszt mentése nem biztonságos.');
if(!book.includes("const KEY='magyarorosz.lesson-route.v1'")||!book.includes("const checkpointKey='magyarorosz.lesson-checkpoint.v1'"))fail('A1','SAVED_PROGRESS','A korábbi leckék és részfeladatok mentési kulcsa módosult.');
if(!book.includes('randomOrder(reading.options.map')||!book.includes('randomOrder(c.a.map'))fail('A1','ANSWER_ORDER','A választási lehetőségek sorrendje nem keveredik.');
if(!/src="lesson-book\.js\?v=[^\"]+"/.test(html))fail('A1','PUBLISHED_SCRIPT','A tanulói oldalon nincs gyorsítótár-verziózott leckemotor.');

const guidedKnown=[...allTaught].filter(word=>knownWords.has(word)).length;
const coverage=Math.round(guidedKnown/knownWords.size*1000)/10;
if(coverage<80)flag('A1','GUIDED_COVERAGE',`Az A1-szótár címszavainak ${coverage}%-a kerül be közvetlenül a vezetett leckék szókártyáiba (belső 80%-os figyelmeztetési küszöb, nem KER-norma).`);
flag('A1','HUMAN_REVIEW','A teljes magyar–orosz nyelvi helyességet, a több elfogadható választ, a valódi hangminőséget és a KER-kimenetet orosz anyanyelvi lektorral és 6–10 próbatanulóval kell ellenőrizni.');

console.log(`A1 KIADÁS ELŐTTI AUDIT · ${courses.A1.length} lecke · ${totalNew} első alkalommal előforduló alapszókártya · ${allTaught.size} különböző szó/kifejezés az extrákkal`);
console.log(`KRITIKUS: ${blockers.length} · FELÜLVIZSGÁLANDÓ: ${reviews.length} · TÚLTERHELT SZÓKINCSELSŐSÉG: ${overloaded} lecke`);
console.log(`CSALÁDLECKE PILOT: ${familyRequiredNew} új kötelező szó · ${familyOptionalNew} új, választható szó (eredeti kártyaindexekkel; a 13-as figyelmeztetés továbbra is minden új szót számol).`);
console.log(`NAPIRANDLECKE PILOT: ${dailyRequiredNew} új kötelező szó · ${dailyOptionalNew} új, választható szó (eredeti kártyaindexekkel).`);
for(const issue of blockers)console.log(`HIBA | ${issue.lesson} | ${issue.code} | ${issue.message}`);
for(const issue of reviews)console.log(`FIGYELMEZTETÉS | ${issue.lesson} | ${issue.code} | ${issue.message}`);
console.log('Megjegyzés: a strukturális PASS nem jelent hitelesített fordítást vagy igazolt A1-es nyelvtudást.');
if(blockers.length)process.exitCode=1;
