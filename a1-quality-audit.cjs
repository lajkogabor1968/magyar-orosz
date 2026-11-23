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
const originalTranslationsMatch=source.match(/const dialogueTranslations=(\{[^\n]+\});\s*const /);
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

console.log('A1 audit: '+all.length+' lessons · '+errors.length+' errors · '+warnings.length+' warnings');
for(const error of errors)console.error('ERROR '+error);
for(const warning of warnings)console.warn('WARN '+warning);
if(errors.length)process.exitCode=1;
