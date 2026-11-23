/* Run: node a1-quality-audit.cjs
 * Read-only checks for all 28 beginner lessons. Does not alter course files
 * or any learner progress stored in browsers.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const dir = __dirname;
const errors = [], warnings = [];
const source = fs.readFileSync(path.join(dir, 'lesson-book.js'), 'utf8');
const match = source.match(/const courses=(\{[^\n]+\});\s*const dialogueTranslations=/);
if (!match) throw Error('Course definitions not located; inspect lesson-book.js format.');
const original = JSON.parse(match[1]).A1;
const additions = [
 ['a1-guided-lessons-next.js','TanmuhelyA1Continuation'],
 ['a1-guided-lessons-13-16.js','TanmuhelyA1Units13to16'],
 ['a1-guided-lessons-17-20.js','TanmuhelyA1Units17to20'],
 ['a1-guided-lessons-21-24.js','TanmuhelyA1Units21to24'],
 ['a1-guided-lessons-25-28.js','TanmuhelyA1Units25to28']
];

/* Validate the first eight original lessons as well as appended units. */
const originalTranslationsMatch=source.match(/const dialogueTranslations=(\{[^\n]+\});\s*\/\/ Editorial A1 starter correction/);
if (!originalTranslationsMatch) throw Error('Original dialogue translations not located.');
const originalTranslations=JSON.parse(originalTranslationsMatch[1]);
const originalChecksMatch=source.match(/const checks=(\{[\s\S]*?\});\s*\/\/ The continuation/);
if (!originalChecksMatch) throw Error('Original grammar answer keys not located.');
const originalChecks=vm.runInNewContext('('+originalChecksMatch[1]+')',{}, {timeout:3000});
function validQuestion(question,choices,correct) {
 return typeof question==='string'&&question.trim()&&Array.isArray(choices)&&choices.length>=2&&
  choices.every(x=>typeof x==='string'&&x.trim())&&new Set(choices).size===choices.length&&
  Number.isInteger(correct)&&correct>=0&&correct<choices.length;
}
for (const [index,lesson] of original.entries()){
 const key='A1:'+index, check=originalChecks[key];
 if (!check||!validQuestion(check.q,check.a,check.ok))errors.push(key+': invalid or missing original grammar answer key');
 if(!Array.isArray(originalTranslations[lesson.title])||
   originalTranslations[lesson.title].length!==lesson.dialogue?.length)
  errors.push(key+': original dialogue translations do not match');
}

const all = [...original];
for (const [filename, exportName] of additions) {
 const sandbox = {window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(dir,filename),'utf8'),sandbox,{filename,timeout:3000});
 const block = sandbox.window[exportName];
 if (!block || !Array.isArray(block.lessons)) {errors.push(filename+': missing lessons export');continue;}
 for (const lesson of block.lessons) {
  const idx = all.length, key='A1:'+idx, check=block.checks?.[key];
  if (!check||!validQuestion(check.q,check.a,check.ok))
   errors.push(key+': invalid or missing grammar question');
  const translations=block.dialogueTranslations?.[lesson.title];
  if (!Array.isArray(translations)||translations.length!==lesson.dialogue?.length)
   errors.push(key+': dialogue translation count differs from Hungarian turns');
  else if (translations.some(x=>typeof x!=='string'||!x.trim()))
   errors.push(key+': empty dialogue translation');
  all.push(lesson);
 }
}
if (all.length!==28) errors.push('Expected 28 A1 lessons, found '+all.length);
// Every advertised A1 lesson word must actually be present on some study card.
// Supplemental words are added after the old card order to protect old checkpoints.
const dictionarySandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),dictionarySandbox,
 {filename:'data.js',timeout:3000});
const knownWords=new Set((dictionarySandbox.window.MAGYAR_OROSZ_DATA?.A1||[])
 .map(row=>String(row[0]).toLocaleLowerCase('hu-HU')));
for(const [index,lesson] of all.entries()){
 const extraWords=new Set((lesson.extra||[]).map(row=>String(row[0]).toLocaleLowerCase('hu-HU')));
 const supplementaryWords=new Set();
 for(const row of lesson.supplemental||[]){
  if(!Array.isArray(row)||row.length!==4||row.some(x=>typeof x!=='string'||!x.trim()))
   errors.push('A1:'+index+': invalid supplemental vocabulary row');
  else supplementaryWords.add(row[0].toLocaleLowerCase('hu-HU'));
 }
 for(const word of lesson.words||[]){
  const normalized=String(word).toLocaleLowerCase('hu-HU');
  if(!knownWords.has(normalized)&&!extraWords.has(normalized)&&!supplementaryWords.has(normalized))
   errors.push('A1:'+index+': vocabulary card missing for '+word);
 }
}
all.forEach((lesson,index)=>{
 const id='A1:'+(index);
 if (!lesson.title||!Array.isArray(lesson.words)||!lesson.words.length)
  errors.push(id+': missing title or vocabulary');
 if (!Array.isArray(lesson.dialogue)||lesson.dialogue.length<2||
  lesson.dialogue.some(x=>typeof x!=='string'||!x.trim()))
  errors.push(id+': missing or empty dialogue');
 const reading=lesson.reading;
 if (!reading||!Array.isArray(reading.lines)||reading.lines.length<3)
  {errors.push(id+': no usable reading');return;}
 if (reading.lines.some(pair=>!Array.isArray(pair)||pair.length!==2||
  pair.some(x=>typeof x!=='string'||!x.trim())))errors.push(id+': malformed Hungarian/Russian sentence pair');
 if(!validQuestion(reading.q,reading.options,reading.answer))
  errors.push(id+': missing comprehension question or invalid answer index');
});
// Inspect the eleven supplementary 15-sentence readings and their Russian hints.
const extraReadingSource=fs.readFileSync(path.join(dir,'a1-tematikus-szovegek.js'),'utf8');
const extraToken='const el=(tag,text)=>';
if(!extraReadingSource.includes(extraToken))throw Error('Supplementary reading module structure changed.');
const extraSandbox={window:{}};
vm.runInNewContext(extraReadingSource.replace(extraToken,
 'window.__A1_AUDIT={units,readingGuidance};'+extraToken),extraSandbox,
 {filename:'a1-tematikus-szovegek.js',timeout:3000});
const extraData=extraSandbox.window.__A1_AUDIT;
if(!extraData||Object.keys(extraData.units).length!==11)
 errors.push('Expected 11 supplementary A1 readings');
else for(const [key,unit] of Object.entries(extraData.units)){
 if(!Number.isInteger(Number(key))||Number(key)<1||Number(key)>27)
  errors.push('Invalid supplementary lesson index '+key);
 if(!Array.isArray(unit.lines)||unit.lines.length!==15||
   unit.lines.some(pair=>!Array.isArray(pair)||pair.length!==2||
    pair.some(text=>typeof text!=='string'||!text.trim())))
  errors.push('Supplement '+key+': malformed Hungarian/Russian reading');
 if(!Array.isArray(unit.dialogue)||unit.dialogue.length!==8||
   unit.dialogue.some(pair=>!Array.isArray(pair)||pair.length!==2||
    pair.some(text=>typeof text!=='string'||!text.trim())))
  errors.push('Supplement '+key+': malformed bilingual dialogue');
 if(!Array.isArray(unit.questions)||unit.questions.length!==2||
    unit.questions.some(([q,a,b,c,correct])=>!validQuestion(q,[a,b,c],correct)))
  errors.push('Supplement '+key+': invalid comprehension answer key');
 if(!Array.isArray(extraData.readingGuidance[key])||
    !extraData.readingGuidance[key].length)
  warnings.push('Supplement '+key+': missing pre-reading grammar notes');
}

// Controls for repeated entry should be reused and a learner must be able to
// interrupt assessment and return to the bilingual text without losing progress.
if(!source.includes("let begin=$('integratedDialogueUnderstandingBegin')")||
 !source.includes("let review=$('integratedDialogueUnderstandingReview')")||
 !source.includes("review.onclick=showStudy")||
 !source.includes("showStudy();"))
 errors.push('A1: dialogue test may duplicate controls or prevent returning to study');
// The translation must be shown while learning but hidden at assessment time.
if(!source.includes("container.insertBefore(begin,promptNode)")||
 !source.includes("translationsOnScreen.forEach(node=>{node.hidden=true;})")||
 !source.includes("translationsOnScreen.forEach(node=>{node.hidden=false;})"))
 errors.push('A1: dialogue answer is visible during its meaning check');
// Understanding check must test the meaning of Hungarian, not visually copy
// the next Hungarian dialogue line.
if(!source.includes("Что означает венгерская реплика")||
 !source.includes("const prompt=lines[1],correct=translations[1]")||
 !source.includes("button.lang='ru'"))
 errors.push('A1: dialogue test is not a Hungarian-to-Russian meaning question');
// Dialogue turns have roles, but the names Anna/Péter are not universal:
// salespeople, teachers and guests also speak in A1 scenarios.
if(!source.includes("level==='A1'?(i%2===0?'Собеседник A':'Собеседник B')"))
 errors.push('A1: dialogue speakers are still hardcoded as Anna and Péter');
// Freeze the completed lesson's displayed percentage before the next lesson
// rendering resets testCorrect to zero.
if(!source.includes("const finishedPercent=Math.round(testCorrect/")||
 !source.includes("note('Проверка слов завершена ('+finishedPercent+'%)"))
 errors.push('A1: next lesson may incorrectly report 0% for the completed quiz');
// An A1 retake must preserve the best achieved vocabulary score while
// recording the latest score for review. Existing old result fields remain valid.
if(!source.includes("current.bestScore=best.score")||
 !source.includes("current.bestMax=best.max")||
 !source.includes("current.attempts=")||
 !source.includes("finished[lessonKey()]=current"))
 errors.push('A1: best score may be overwritten by a weaker retake');
// A previously solved grammar question must be rendered only after its checkpoint
// is restored. Otherwise a completed lesson can show actionable answer buttons.
if(!source.includes('restoreCheckpoint();grammarQuestion();renderDialogueUnderstanding();'))
 errors.push('A1: grammar state rendered before restoring saved lesson progress');
// Regression: accept short, well-formed beginner questions without treating
// a single noun with punctuation as an independently written sentence.
const compositionCode=source.match(/const incompleteSentences=level==='A1'\?sentences\.filter\(t=>\{[\s\S]*?\n \}\):\[\];/)?.[0];
if(!compositionCode)errors.push('A1: writing minimum checks unavailable');
else {
 const sample=['Ki ő?','Mi ez?','Ő az.','Ez jó.','Telefon.','a b.'];
 const checks=vm.runInNewContext(
  'const level="A1",sentences='+JSON.stringify(sample)+';'+compositionCode+
  ';Array.from(incompleteSentences)',{}, {timeout:3000});
 const expected=['Telefon.','a b.'];
 if(JSON.stringify(Array.from(checks))!==JSON.stringify(expected))
  errors.push('A1: short correct questions or single-word writing are misclassified');
}

// A1 entrypoint, private recording, phonetics and safe import regressions.
const home=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const landing=fs.readFileSync(path.join(dir,'landing.js'),'utf8');
const localVoice=fs.readFileSync(path.join(dir,'voice-compare.js'),'utf8');
const localBackup=fs.readFileSync(path.join(dir,'progress-backup.js'),'utf8');
if(!landing.includes("if(chosen==='A1')document.getElementById('lessonsPrimary')?.click()"))
 errors.push('A1: landing no longer opens the guided lesson directly');
if(!home.includes('<small>Начальный</small>')||!home.includes('<small>Выше среднего</small>')||
 home.includes('<small>Продвинутый</small>'))
 errors.push('UI: inconsistent Russian level labels');
if(!localVoice.includes('window.TanuloVoiceCompareReset=reset')||
 !localVoice.includes('if(ownGeneration!==generation)')||
 !source.includes('window.TanuloVoiceCompareReset?.();'))
 errors.push('A1: local voice recording is not cleared on lesson changes');
if(!localVoice.includes('navigator.mediaDevices.getUserMedia({audio:true})')||
 !localVoice.includes('new MediaRecorder(stream')||
 !home.includes('id="integratedVoiceRecordPlayback"'))
 errors.push('A1: local pronunciation recording fallback missing');
if(!home.includes('data-pronounce="kor"')||!home.includes('data-pronounce="kór"')||
 !home.includes('data-pronounce="tör"')||!home.includes('data-pronounce="tőr"'))
 errors.push('A1: beginner vowel pair exercises missing');
if(!localBackup.includes('const missing=entries.filter(([k])=>localStorage.getItem(k)===null)')||
 !localBackup.includes('version:2,exportedAt:')||
 !localBackup.includes('![1,2].includes(payload.version)'))
 errors.push('A1: file restore may overwrite existing learner progress or reject old exports');

// A1 writing self-review remains an optional, per-lesson checklist. It
// must not be counted as an automatically certified grammar assessment.
if(!home.includes('id="integratedCompositionSelfcheck"')||
 (home.match(/data-a1-selfcheck="/g)||[]).length!==5||
 !source.includes("const compositionChecklistKey='magyarorosz.a1-composition-checklist.v1'")||
 !source.includes('restoreCompositionChecklist()')||
 !source.includes('updateCompositionChecklistLabel()'))
 errors.push('A1: five-point optional writing checklist is incomplete');
if(source.includes('compositionChecked=')&&source.match(/compositionChecked=[^;]+/)?.[0].includes('compositionChecklist'))
 errors.push('A1: optional self-review must not falsely certify writing');

// Word dictation and remembered dialogue sentences must give specific vowel
// diacritic feedback while keeping strict exact-answer validation.
const vowelHelper=source.match(/function hungarianAccentFeedback\(attempt,expected\)\{[\s\S]*?\n\}/)?.[0];
if(!vowelHelper)errors.push('A1: Hungarian accent-specific writing feedback missing');
else {
 const feedback=vm.runInNewContext(vowelHelper+';hungarianAccentFeedback',{}, {timeout:3000});
 for(const [typed,expected,correction] of [
  ['kor','kór','o → ó'],['tör','tőr','ö → ő'],['ver','vér','e → é'],
  ['haz','ház','a → á'],['fül','fűl','ü → ű']
 ]){
  if(!feedback(typed,expected).includes(correction))
   errors.push('A1: accent feedback missing correction '+correction);
 }
 if(feedback('ház','ház')||feedback('hal','ház'))
  errors.push('A1: accent feedback mislabels correct words or other errors');
}
if(!source.includes('hungarianAccentFeedback(got,target)')||
 !source.includes('hungarianAccentFeedback(actual,correct)')||
 !source.includes('if(got===target){spellingErrors'))
 errors.push('A1: strict spelling acceptance or sentence feedback regressed');

// The first A1 spelling error should not disclose the whole answer.
if(!source.includes("level==='A1'&&writingMisses===1")||
 !source.includes("writingMisses=0;const w=rows()")||
 !source.includes("writingMisses++;const accentTip"))
 errors.push('A1: spelling retry or answer-hint gate is missing');

console.log('A1 audit: '+all.length+' lessons · '+errors.length+' errors · '+warnings.length+' warnings');
for(const error of errors)console.error('ERROR '+error);
for(const warning of warnings)console.warn('WARN '+warning);
if(errors.length)process.exitCode=1;
