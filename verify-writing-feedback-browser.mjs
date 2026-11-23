/* Optional end-to-end smoke test. Requires Playwright and a Chromium browser. */
import assert from 'node:assert/strict';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {createRequire} from 'node:module';
const {chromium} = createRequire(import.meta.url)('playwright');

const folder = fileURLToPath(new URL('.', import.meta.url));
const address = pathToFileURL(join(folder, 'index.html')).href + '?review=1&level=A1&lesson=0&section=writing';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox']});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(address);
  const prompt = page.locator('#integratedWritingPrompt');
  const input = page.locator('#integratedWritingInput');
  const feedback = page.locator('#integratedWritingFeedback');
  const next = page.locator('#integratedWritingNext');
  const check = page.locator('#integratedWritingCheck');
  await prompt.waitFor({state: 'visible'});
  assert.match(await prompt.textContent(), /телефон/);
  await input.fill('telefn');
  await check.click();
  assert.match(await feedback.textContent(), /Пропущена буква «o»/);
  await input.fill('telefon');
  await check.click();
  assert.match(await feedback.textContent(), /✓ Правильно!/);
  await next.click();
  assert.match(await prompt.textContent(), /метро/);
  await input.fill('metro');
  await check.click();
  assert.match(await feedback.textContent(), /o → ó/);
  await input.fill('metró');
  await check.click();
  assert.match(await feedback.textContent(), /✓ Правильно!/);
  await next.click();
  await input.fill('taxi');
  await check.click();
  assert.match(await feedback.textContent(), /✓ Правильно!/);
  const practice = page.locator('#lessonSentencePractice');
  await practice.waitFor({state: 'visible'});
  const target = await page.locator('#lessonSentenceTarget').textContent();
  const words = target.trim().replace(/[.!?]+$/, '').split(/\s+/);
  assert.ok(words.length >= 2);
  await page.locator('#lessonSentenceInput').fill(words.slice(0, -1).join(' '));
  await page.locator('#lessonSentenceCheck').click();
  assert.match(await page.locator('#lessonSentenceFeedback').textContent(), /Пропущено слово/);
  await page.locator('#lessonSentenceInput').fill(target);
  await page.locator('#lessonSentenceCheck').click();
  assert.match(await page.locator('#lessonSentenceFeedback').textContent(), /✓ Написание совпадает/);
  assert.deepEqual(errors, [], 'No uncaught JS errors on the A1 writing route');
  console.log('PASS: A1 workbook shows specific spelling and model-sentence feedback in Chromium.');
} finally {
  await browser.close();
}
