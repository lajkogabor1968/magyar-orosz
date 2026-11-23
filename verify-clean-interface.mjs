import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('./clean-interface.css', import.meta.url), 'utf8');
const lessons = readFileSync(new URL('./lesson-book.js', import.meta.url), 'utf8');

const occurrence = (text, value) => text.split(value).length - 1;
for (const id of [
  'landingStart', 'studyHub', 'lessonsPrimary', 'integratedLessonView',
  'integratedStageTrack', 'integratedRouteBar', 'integratedStepNext',
  'integratedWords', 'integratedPhrases', 'integratedExpressions',
  'integratedFlashcard', 'lessonGameStart',
]) {
  assert.equal(occurrence(html, `id="${id}"`), 1, `${id} must occur once`);
}

assert.match(html, /clean-interface\.css\?v=20261123-a1-guidance1/);
assert.match(html, /<ol id="integratedStageTrack"[^>]*>(?:<li>[^<]+<\/li>){6}<\/ol>/);
assert.ok(html.indexOf('id="integratedStepNext"') > html.indexOf('id="lessonExercise"'), 'step action is after current activity');
assert.ok(html.indexOf('id="integratedStepNext"') < html.indexOf('class="lesson-end"'), 'step action precedes final lesson controls');
const referenceStart = html.indexOf('<details class="lesson-reference">');
const referenceEnd = html.indexOf('</details>', referenceStart);
assert.ok(referenceStart !== -1 && referenceEnd !== -1);
for (const id of ['integratedWords', 'integratedPhrases', 'integratedExpressions']) {
  const at = html.indexOf(`id="${id}"`);
  assert.ok(at > referenceStart && at < referenceEnd, `${id} belongs to the optional reference`);
}
assert.match(lessons, /document\.querySelector\('#lessonWords \.lesson-reference'\)\.before\(section\)/, 'A1 alphabet remains before the optional reference');
assert.match(lessons, /details=el\('details',undefined,'alphabet-full'\)/, 'the 44-letter reference is collapsed by default');
assert.match(lessons, /for\(const letter of \['a','á','e','é'\]\)/, 'essential beginner vowels are always visible and playable');
assert.match(lessons, /meter\.querySelector\('progress'\)\.value=count/, 'visible card progress is synchronized to existing saved flips');
assert.match(lessons, /cardIndex<core\?'Обязательное слово '/, 'mandatory versus optional cards have a plain-language label');
assert.match(css, /\.lesson-card-mastery-bar/);
assert.match(css, /\.alphabet-starter-letter/);
assert.match(lessons, /item\.setAttribute\('aria-current','step'\)/, 'current stage is announced to screen readers');
assert.match(lessons, /view\.scrollIntoView\(\{block:'start',behavior:'instant'\}\)/, 'next stage returns to its heading');
assert.match(css, /:focus-visible/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /@media \(max-width: 700px\)/);
assert.match(css, /lesson-continue-bar:has\(#integratedStepNext:not\(:disabled\)\)/, 'active next button is reachable');
assert.match(css, /\.lesson-answer-options \.integrated-answer/);
console.log('PASS: focused responsive UI; six accessible steps; one next action; reference material and alphabet retained.');
