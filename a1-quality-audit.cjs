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
const all = [...original];
for (const [filename, exportName] of additions) {
 const sandbox = {window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(dir,filename),'utf8'),sandbox,{filename,timeout:3000});
 const block = sandbox.window[exportName];
 if (!block || !Array.isArray(block.lessons)) {errors.push(filename+': missing lessons export');continue;}
 for (const lesson of block.lessons) {
  const idx = all.length, key='A1:'+idx, check=block.checks?.[key];
  if (!check) errors.push(key+': missing grammar question');
  else if (!Array.isArray(check.a)||check.a.length<2||!Number.isInteger(check.ok)||
   check.ok<0||check.ok>=check.a.length||new Set(check.a).size!==check.a.length)
   errors.push(key+': invalid grammar options or correct index');
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
 if (!reading.q||!Array.isArray(reading.options)||reading.options.length<2||
  !Number.isInteger(reading.answer)||reading.answer<0||reading.answer>=reading.options.length||
  new Set(reading.options).size!==reading.options.length)
  errors.push(id+': missing comprehension question or invalid answer index');
});
console.log('A1 audit: '+all.length+' lessons · '+errors.length+' errors · '+warnings.length+' warnings');
for(const error of errors)console.error('ERROR '+error);
for(const warning of warnings)console.warn('WARN '+warning);
if(errors.length)process.exitCode=1;
