import assert from 'node:assert/strict';
import { join } from 'node:path';

const { chromium } = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? await import(join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright/index.mjs'))
  : await import('playwright');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE || '/usr/bin/chromium', args: ['--no-sandbox']
});
const home = new URL('index.html', import.meta.url).href;
const page = await browser.newPage({ viewport: {width: 360, height: 760}, reducedMotion: 'reduce' });
page.setDefaultTimeout(5000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const click = id => page.locator('#' + id).click();
const pressClose = () => page.keyboard.press('Escape');
const text = id => page.locator('#' + id).innerText();
const route = () => page.evaluate(() => localStorage.getItem('magyarorosz.lesson-route.v1'));
const options = page.locator('#conversationOptions');
const typeAnswer = async value => {
  await page.locator('#conversationAnswer').fill(value);
  await page.locator('#conversationForm button[type="submit"]').click();
};
const chooseLevel = level => page.locator('#landingLevelMenu label').filter({hasText:level}).click();

try {
  await page.goto(home);
  const data = await page.evaluate(() => window.TanmuhelyA1Conversations);
  assert.equal(data.length, 28);
  assert.equal(new Set(data.map(s => s.id)).size, data.length);
  assert.equal(await route(), null);
  assert.equal(await text('homeProgressLabel'), 'Пройдено уроков: 0 из 28');
  await click('landingChooseLesson');
  assert.equal(await page.locator('#courseCatalogList button').count(), data.length);
  await pressClose();
  assert.equal(await route(), null, 'Browsing the catalog must not start a lesson.');

  for (const [index, scene] of data.entries()) {
    await click('landingChooseLesson');
    await page.locator('#catalogMode label').filter({hasText:'Короткие диалоги'}).click();
    await page.locator('#courseCatalogList button').nth(index).click();
    assert.equal(await text('conversationTitle'), scene.title);
    assert.equal(await text('conversationQuestion'), scene.question);
    const incorrect = scene.alternatives[index % scene.alternatives.length];
    await options.getByRole('button', {name:incorrect[0], exact:true}).click();
    assert.ok((await text('conversationChoiceFeedback')).includes(incorrect[1]));
    assert.equal(await page.locator('#conversationNext').isVisible(), false);
    await options.getByRole('button', {name:scene.reply[0], exact:true}).click();
    assert.ok((await text('conversationChoiceFeedback')).includes(scene.reply[1]));
    await click('conversationNext');
    await typeAnswer(scene.id === 'ital' ? 'tea' : 'próba');
    assert.ok((await text('conversationWriteFeedback')).includes(scene.hint));
    const answer = scene.answers.at(-1);
    await typeAnswer(answer.normalize('NFD').toLocaleUpperCase('hu-HU'));
    assert.equal(await page.locator('#conversationResult').isVisible(), true);
    assert.ok((await text('conversationSummary')).includes('для повторения'));
    assert.ok(!(await text('conversationFinalLine')).includes('___'));
    await pressClose();
  }
  assert.equal(await route(), null, 'Optional practice must not mark a workbook lesson as started or completed.');
  const records = await page.evaluate(() => window.TanmuhelyConversation.progress());
  assert.ok(records.every(record => record.completed && record.review));
  assert.equal(await text('homeProgressLabel'), 'Пройдено уроков: 0 из 28');

  const tea = data.find(s => s.id === 'ital');
  await page.goto(home+'?scene=ital');
  assert.equal(await text('conversationTitle'), tea.title);
  await options.getByRole('button',{name:tea.reply[0],exact:true}).click();
  await click('conversationNext');
  await page.locator('#conversationAnswer').fill('te');
  await page.reload();
  assert.equal(await page.locator('#conversationAnswer').inputValue(), 'te');
  await page.locator('#conversationForm summary').click();
  await page.locator('#conversationAccentKeys').getByRole('button',{name:'á',exact:true}).click();
  await page.locator('#conversationAnswer').press('End');
  await page.locator('#conversationAnswer').press('t');
  assert.equal(await page.locator('#conversationAnswer').inputValue(), 'teát');
  await page.locator('#conversationForm button[type="submit"]').click();
  assert.ok((await text('conversationSummary')).includes('без подсказки'));
  const clean = await page.evaluate(() => JSON.parse(localStorage.getItem('magyarorosz.a1-conversations.v1')).ital);
  assert.equal(clean.review,false);
  await click('conversationFinish');
  assert.equal(await page.locator('#integratedLessonSelect').inputValue(), '4');
  assert.equal(await page.locator('#lessonWords').isVisible(),true);
  await page.locator('.landing-back').click();
  assert.equal(await text('landingStart'),'Продолжить урок');

  // Existing A1 saves, including pre-introductory-unit indices, must be previewed
  // without mutation and reopened on the same stage by the primary action.
  await page.evaluate(() => localStorage.setItem('magyarorosz.lesson-route.v1', JSON.stringify({
    A1:{lessonIndex:8, step:2}, completed:{'A1:0':{score:8,max:10}}
  })));
  await page.reload();
  assert.match(await text('homeLessonPosition'), /Урок 10 из 28 · Разговор/);
  assert.match(await text('homeProgressLabel'), /1 из 28/);
  const old = await route();
  await click('landingChooseLesson'); await pressClose();
  assert.equal(await route(),old);
  await click('landingStart');
  assert.equal(await page.locator('#integratedLessonSelect').inputValue(),'9');
  assert.equal(await page.locator('#lessonDialogue').isVisible(),true);
  await click('lessonConversation');
  assert.equal(await text('conversationTitle'), data[9].title);
  await pressClose();
  await page.locator('.landing-back').click();
  await chooseLevel('A2');
  assert.equal(await page.locator('#homeConversation').isVisible(),false);
  await click('landingChooseLesson');
  assert.equal(await page.locator('#courseCatalogList button').count(),3);
  await page.locator('#courseCatalogList button').nth(1).click();
  assert.equal(await text('integratedLessonLevel'),'A2');
  assert.equal(await page.locator('#integratedLessonSelect').inputValue(),'1');
  await page.locator('.landing-back').click();

  for (const level of ['B1','B2']) {
    await chooseLevel(level);
    await click('landingChooseLesson');
    assert.equal(await page.locator('#studyHub').isVisible(),true);
    await click('lessonsPrimary');
    assert.equal(new URL(page.url()).pathname.split('/').at(-1), level.toLowerCase()+'.html');
    await page.goto(home);
    assert.equal(await page.locator('#landingLevelMenu input:checked').inputValue(),level);
    await click('landingStart');
    assert.equal(new URL(page.url()).pathname.split('/').at(-1), level.toLowerCase()+'.html');
    await page.goto(home);
  }
  const beforeReview = await route();
  await page.goto(home+'?review=1&level=A1&lesson=9&section=dialogue');
  assert.equal(await page.locator('#lessonDialogue').isVisible(),true);
  assert.equal(await route(),beforeReview);
  assert.deepEqual(errors,[]);
  console.log('PASS: 28 A1 conversations, 56 tasks, targeted retry, accent input, review, independent progress and A1–B2 entry points.');
} finally {
  await browser.close();
}
