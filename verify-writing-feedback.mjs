import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source = readFileSync(new URL('./writing-feedback.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const workbook = readFileSync(new URL('./lesson-book.js', import.meta.url), 'utf8');
const sandbox = {window: {}};
runInNewContext(source, sandbox, {filename: 'writing-feedback.js'});
const {checkWord, checkSentence, suggestAccents, suggestBeginnerGrammar, insertHungarianLetter} = sandbox.window.TanmuhelyWritingFeedback;

const wordCases = [
  ['metró', 'metró', 'correct'],
  ['METRÓ ', 'metró', 'correct'],
  ['metro', 'metró', 'diacritics'],
  ['rádio', 'rádió', 'diacritics'],
  ['turo', 'túró', 'diacritics'],
  ['tűz', 'tüz', 'diacritics'],
  ['konyv', 'könyv', 'diacritics'],
  ['könvy', 'könyv', 'transposition'],
  ['telefno', 'telefon', 'transposition'],
  ['teléfon', 'telefon', 'diacritics'],
  ['banan', 'banán', 'diacritics'],
  ['telefn', 'telefon', 'missing-letter'],
  ['teléfno', 'telefon', 'other'],
  ['teleffon', 'telefon', 'extra-letter'],
  ['telexon', 'telefon', 'letter'],
  ['телефон', 'telefon', 'keyboard'],
  ['   ', 'telefon', 'empty'],
  ['tefleno', 'telefon', 'other']
];
for (const [received, expected, kind] of wordCases) {
  const result = checkWord(received, expected);
  assert.equal(result.kind, kind, `${received} → ${expected}: expected ${kind}`);
  assert.ok(result.hint.length > 6);
}
assert.match(checkWord('metro', 'metró').hint, /o → ó/);
assert.match(checkWord('konyv', 'könyv').hint, /o → ö/);
assert.doesNotMatch(checkWord('telefon', 'telefón').hint, /Правильно!/);

const sentenceCases = [
  ['Ez egy telefon.', 'Ez egy telefon.', 'correct'],
  ['  EZ   EGY TELEFON  ', 'Ez egy telefon.', 'correct'],
  ['Ez egy radio.', 'Ez egy rádió.', 'diacritics'],
  ['Ez telefon.', 'Ez egy telefon.', 'missing-word'],
  ['Ez egy egy telefon.', 'Ez egy telefon.', 'extra-word'],
  ['Telefon egy ez.', 'Ez egy telefon.', 'word-order'],
  ['Ez egy telefno.', 'Ez egy telefon.', 'transposition'],
  ['Ез egy telefon.', 'Ez egy telefon.', 'keyboard'],
  ['', 'Ez egy telefon.', 'empty'],
  ['Jó este!', 'Jó reggelt!', 'other']
];
for (const [received, expected, kind] of sentenceCases) {
  const result = checkSentence(received, expected);
  assert.equal(result.kind, kind, `${received} → ${expected}: expected ${kind}`);
  assert.ok(result.hint.length > 6);
}
assert.match(checkSentence('Ez telefon.', 'Ez egy telefon.').hint, /«egy»/);
assert.match(checkSentence('Ez egy radio.', 'Ez egy rádió.').hint, /o → ó/);

const accentPairs=(text,models)=>Array.from(suggestAccents(text,models),s=>[s.received,s.expected]);
assert.deepEqual(accentPairs('Ez egy radio. A haz nagy.', ['Ez egy rádió.','A ház nagy.']),[
 ['radio','rádió'],['haz','ház']
],'open writing suggestions may use only known Hungarian lesson models');
assert.deepEqual(accentPairs('KONYV. Már jó.', ['Könyv.','Már jó.']),[['konyv','könyv']],
 'case differences are accepted and only missing accents are suggested');
assert.deepEqual(accentPairs('kor. kar.', ['kör','kór','kar','kár']),[],
 'multiple legitimate model spellings for the same plain letters must stay ambiguous');
assert.deepEqual(accentPairs('Ez a telefon.', ['Ez a telefon.']),[]);
assert.deepEqual(accentPairs('ház, jó', ['ház','jó']),[]);
assert.deepEqual(accentPairs('háa', ['ház']),[], 'non-accent typos are not guessed');
assert.deepEqual(accentPairs('radio haz konyv turo', ['rádió','ház','könyv','túró']).length,3,
 'suggestions are capped so an independent learner is not flooded with hints');
assert.deepEqual(accentPairs('radio',null),[], 'no model must never produce a guessing correction');

for(const draft of ['A tanár kedves van.','A ház nem nagy van.','Péter nagyon fiatal van.'])
  assert.match(suggestBeginnerGrammar(draft,14).join(' '),/не добавляйте van/,`A1/15: ${draft}`);
for(const draft of ['A tanár kedves.','Én kedves vagyok.','Ő jól van.','A tanár az iskolában van.','A tanár kedves, de sokat dolgozik.'])
  assert.equal(suggestBeginnerGrammar(draft,14).length,0,`A1/15 must avoid unsupported correction: ${draft}`);
for(const draft of ['Nem van autóm.','Van autóm. Nem van könyvem.'])
  assert.match(suggestBeginnerGrammar(draft,15).join(' '),/используйте nincs/,`A1/16: ${draft}`);
for(const draft of ['Nincs autóm.','Nem vagyok tanár.','Van autóm.'])
  assert.equal(suggestBeginnerGrammar(draft,15).length,0,`A1/16: ${draft}`);
assert.equal(suggestBeginnerGrammar('Nem van autóm.',14).length,0, 'grammar hints must stay in the targeted lesson');
assert.equal(suggestBeginnerGrammar('A tanár kedves van.',15).length,0, 'grammar hints must stay in the targeted lesson');

class InputEvent {
  constructor(type,options){this.type=type;this.bubbles=options.bubbles}
}
const events=[];
const fakeInput={
  value:'metro',selectionStart:4,selectionEnd:5,focused:false,
  ownerDocument:{defaultView:{Event:InputEvent}},
  focus(){this.focused=true},
  setSelectionRange(start,end){this.selectionStart=start;this.selectionEnd=end},
  dispatchEvent(event){events.push(event)}
};
assert.equal(insertHungarianLetter(fakeInput,'ó'),true);
assert.equal(fakeInput.value,'metró');
assert.equal(fakeInput.selectionStart,5);
assert.equal(fakeInput.selectionEnd,5);
assert.equal(fakeInput.focused,true);
assert.equal(events.length,1);
assert.equal(events[0].type,'input');
assert.equal(events[0].bubbles,true,'Autosave and draft-invalidation listeners must run after insertion');
fakeInput.value='szep';fakeInput.selectionStart=2;fakeInput.selectionEnd=3;
assert.equal(insertHungarianLetter(fakeInput,'é'),true);
assert.equal(fakeInput.value,'szép');
assert.equal(insertHungarianLetter(fakeInput,'x'),false,'Non-Hungarian button labels must be rejected');
assert.equal(fakeInput.value,'szép');

const writingScript = html.indexOf('src="writing-feedback.js?');
const lessonScript = html.indexOf('src="lesson-book.js?');
assert.ok(writingScript >= 0 && lessonScript > writingScript,
  'The spelling feedback module must load before the guided workbook.');
assert.match(workbook, /writingFeedback\.checkWord\(\$\('integratedWritingInput'\)\.value,v\.hu\)/);
assert.match(workbook, /writingFeedback\.checkSentence\(got,target\)/);
assert.match(workbook, /writingFeedback\.checkWord\(received,expected\)/);
assert.match(workbook, /correctWriting\.add\(writeIndex\);saveCheckpoint\(\)/,
  'Correct writing must continue to use the existing checkpoint IDs.');
for(const id of ['integratedAccentKeys','lessonSentenceAccentKeys','lessonReviewAccentKeys','integratedCompositionAccentKeys'])
  assert.ok(workbook.includes(id),`Missing accent keyboard: ${id}`);
assert.match(workbook,/writingFeedback\.insertHungarianLetter\(input,letter\)/);
const accentFunction=workbook.match(/function compositionAccentHint\(value\)\{[\s\S]*?\n\}/)?.[0];
const grammarFunction=workbook.match(/function compositionGrammarHint\(value\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(accentFunction,'free writing should have conservative accent hints');
assert.ok(grammarFunction,'free writing should have lesson-specific grammar hints');
const makeHint=level=>runInNewContext(`${accentFunction};compositionAccentHint('A haz nagy. Ez egy radio.')`,{
 level,lesson:()=>({composition:['','','A ház nagy. Ez egy rádió.'],dialogue:[],reading:{lines:[]},preparation:[]}),
 rows:()=>[],writingFeedback:{suggestAccents}
});
assert.match(makeHint('A1'),/«haz» → «ház»/);
assert.match(makeHint('A1'),/«radio» → «rádió»/);
assert.equal(makeHint('A2'),'','the frozen A2 route must not acquire new grading or prompts');
const makeGrammarHint=(level,lessonIndex,draft)=>runInNewContext(`${grammarFunction};compositionGrammarHint(${JSON.stringify(draft)})`,{
 level,lessonIndex,writingFeedback:{suggestBeginnerGrammar}
});
assert.match(makeGrammarHint('A1',14,'A tanár kedves van.'),/Возможная грамматическая неточность/);
assert.match(makeGrammarHint('A1',15,'Nem van autóm.'),/Nincs autóm/);
assert.equal(makeGrammarHint('A2',14,'A tanár kedves van.'),'','A2 remains untouched');
assert.equal(makeGrammarHint('A1',13,'A tanár kedves van.'),'','other A1 lessons are unchanged');
assert.match(workbook,/const accentHint=compositionAccentHint\(source\)/,
 'the final form check must also explain possible accents');
assert.match(workbook,/const grammarHint=compositionGrammarHint\(source\)/,
 'the final form check must include the non-scoring A1/15–16 grammar hint');
assert.match(workbook,/compositionAccentHint\(\$\('integratedCompositionText'\)\.value\)/,
 'typing or reopening a draft must refresh the hint');
assert.equal((workbook.match(/compositionGrammarHint\(\$\('integratedCompositionText'\)\.value\)/g)||[]).length,2,
 'typing and reopening the saved draft must both refresh grammar hints');
assert.match(workbook,/compositionChecked=enough&&!duplicates&&!missingFinalPunctuation/,
 'uncertain accent suggestions must not become a completion gate');
const inputHandler=workbook.split('\n').find(line=>line.startsWith("$('integratedCompositionText').addEventListener('input',"));
assert.ok(inputHandler,'the already auto-saving free writing input event must still exist');
const eventsByName={};
const draftInput={value:'A haz nagy. Ez egy radio.',addEventListener:(name,callback)=>{eventsByName[name]=callback}};
const draftFeedback={textContent:''},continueButton={disabled:false},storedDrafts=new Map();
const draftContext={
 level:'A1',lessonIndex:14,step:4,compositionChecked:true,stepButton:continueButton,
 lesson:()=>({composition:['','','A ház nagy. Ez egy rádió.'],dialogue:[],reading:{lines:[]},preparation:[]}),
 rows:()=>[],writingFeedback:{suggestAccents,suggestBeginnerGrammar},read:()=>({}),lessonKey:()=> 'A1:0',
 localStorage:{setItem:(key,value)=>storedDrafts.set(key,value)},
 $:id=>id==='integratedCompositionText'?draftInput:draftFeedback
};
runInNewContext(`${accentFunction}\n${grammarFunction}\n${inputHandler}`,draftContext);
assert.equal(typeof eventsByName.input,'function');
eventsByName.input();
assert.equal(JSON.parse(storedDrafts.get('magyarorosz.lesson-writing.v1'))['A1:0'],draftInput.value,
 'the new live hint must not replace, edit or lose the existing saved draft');
assert.match(draftFeedback.textContent,/«haz» → «ház»/,'hints appear while typing, without pressing Check');
assert.match(draftFeedback.textContent,/Черновик сохранён/);
assert.equal(draftContext.compositionChecked,false,'editing invalidates a previously checked draft');
assert.equal(continueButton.disabled,true,'editing a checked draft still requires rechecking');
draftInput.value='A tanár kedves van.';
eventsByName.input();
assert.match(draftFeedback.textContent,/не добавляйте van/,'a narrowly defined grammar mistake is signaled immediately');
assert.equal(JSON.parse(storedDrafts.get('magyarorosz.lesson-writing.v1'))['A1:0'],draftInput.value,
 'grammar feedback must not rewrite what the learner typed');
draftInput.value='A tanár kedves.';
eventsByName.input();
assert.doesNotMatch(draftFeedback.textContent,/не добавляйте van/,'corrected sentences lose the warning');
console.log(`PASS: ${wordCases.length} word and ${sentenceCases.length} model-sentence comparisons.`);
console.log('PASS: free A1 writing receives limited, non-scoring accent hints from unique lesson forms; ambiguity is ignored.');
console.log('PASS: the real typing handler saves the unchanged draft and shows accent hints immediately.');
console.log('PASS: A1/15–16 narrowly detectable grammar slips receive non-scoring Russian hints while other lessons and A2 stay unchanged.');
console.log('PASS: four accent keyboards preserve selection, dispatch an input event, and reject invalid characters.');
console.log('PASS: the workbook uses the new explanatory feedback in all three writing checks without changing saved IDs.');
console.log('NOTE: comparisons assess a known model, not open-ended Hungarian grammar or pronunciation.');
