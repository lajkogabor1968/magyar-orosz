import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';

const file = name => readFileSync(new URL(name, import.meta.url), 'utf8');
const html = file('./index.html');
const css = file('./clean-interface.css');
const hub = file('./study.js');
const app = file('./app.js');
const lessons = file('./lesson-book.js');

const once = (source, text) => source.split(text).length - 1;
for (const id of ['quickReviewPrimary', 'quickReviewProgress', 'a1DailyJourney',
  'a1DailyWords', 'a1DailySentences', 'a1DailySpeaking', 'a1DailyOverall']) {
  assert.equal(once(html, `id="${id}"`), 1, `${id} must be unique`);
}
assert.ok(html.indexOf('id="quickReviewPrimary"') > html.indexOf('id="lessonsPrimary"'));
assert.ok(html.indexOf('id="quickReviewPrimary"') < html.indexOf('id="studyMore"'), 'daily practice is not hidden among advanced tools');
assert.match(html, /5 слов · 5 предложений · 3 фразы вслух/);
for (const script of ['app.js?v=20261122-adaptive-daily2',
  'study.js?v=20261122-quick-daily1', 'lesson-book.js?v=20261122-a1-quality-gates2']) {
  assert.ok(html.includes(script), `${script} cache must be refreshed`);
}

assert.match(hub, /quick\.hidden = !isA1/, 'primary shortcut is A1-only');
assert.match(hub, /quick\?\.addEventListener\('click',[\s\S]*?mode\('study-daily'\)/);
assert.match(hub, /MutationObserver\(refreshQuickReview\)/, 'daily progress refreshes without reloading');
assert.match(css, /\.quick-review-primary\[hidden\]\s*\{\s*display:\s*none\s*!important/);
assert.match(css, /@media\s*\(max-width:\s*700px\)/, 'mobile layout remains supported');

const daily = app.match(/function startA1Daily\(type\)\{([\s\S]*?)\n\}/)?.[1];
assert.ok(daily, 'daily exercise function exists');
assert.match(daily, /current\.filter\(e=>e\.level==='A1'\)/);
assert.match(daily, /dueAt\(type,e\)>0&&dueAt\(type,e\)<=now/);
assert.match(daily, /needsPractice:needsSentencePractice/);
assert.match(daily, /prioritizedPick\(urgent,Math\.min\(5,urgent\.length\),type\)/);
assert.match(daily, /new Set\(priority\.map\(e=>e\.id\)\)/, 'selected IDs cannot repeat');
assert.match(daily, /prioritizedPick\(pool\.filter\(e=>!chosen\.has\(e\.id\)\),Math\.max\(0,5-priority\.length\),type\)/);
assert.match(app, /function finishA1Daily\(type\)/, 'daily results remain recorded');
assert.match(app, /saved\.a1DailyJourney=progress;save\(\)/);
assert.match(app, /const example=e\.huS\+' — '\+e\.ruS/, 'corrective feedback uses a bilingual sentence');
assert.match(app, /const answer=e\[key\],end=\/\[\.!\?…\]\$\/\.test\(answer\)\?'':'\.'/,
  'sentence feedback avoids doubling terminal punctuation');
assert.match(app, /trackMistake\(e,ok,type\)/, 'wrong answers remain available for review');
assert.match(app, /const storeKey='magyarorosz\.v1'/, 'existing browser progress storage retained');

assert.match(lessons, /function highlightAnswerButtons\(box,selected,correctText\)/);
assert.match(lessons, /button\.classList\.toggle\('right',right\)/);
assert.match(lessons, /button\.classList\.toggle\('wrong',button===selected&&!right\)/);
assert.match(lessons, /button\.setAttribute\('aria-pressed',String\(button===selected\)\)/);
assert.match(lessons, /highlightAnswerButtons\(box,btn,c\.a\[c\.ok\]\)/, 'grammar reveals the correct answer');
assert.match(lessons, /const answer=c\.a\[c\.ok\],end=\/\[\.!\?…\]\$\/\.test\(answer\)\?'':'\.'/,
  'grammar feedback avoids doubling terminal punctuation');
assert.match(lessons, /highlightAnswerButtons\(answers,button,answer\)/, 'reading reveals the correct answer');
assert.match(lessons, /function placeReadingAfterTeaching\(\)/, 'A1 reading order is managed separately');
assert.match(lessons, /if\(level!=='A1'\)\{\s*if\(moved\)\{original\.append/, 'A2 retains its previous reading position');
assert.match(lessons, /writing\.prepend\(panel\)/, 'A1 comprehension comes after taught vocabulary and grammar');
assert.match(lessons, /placeReadingAfterTeaching\(\);renderVisual\(\)/, 'every rendered lesson uses the correct reading order');
assert.match(css, /\.lesson-answer-options \.integrated-answer\.right/);
assert.match(css, /\.lesson-answer-options \.integrated-answer\.wrong/);

console.log('PASS: A1 daily shortcut, 5+5+3 flow, adaptive non-duplicate selection, explanatory feedback, existing progress storage.');
