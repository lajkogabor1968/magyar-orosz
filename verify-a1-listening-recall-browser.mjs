import assert from 'node:assert/strict';
import { join } from 'node:path';

const { chromium } = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? await import(join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright/index.mjs'))
  : await import('playwright');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE || '/usr/bin/chromium', args:['--no-sandbox']
});
const page = await browser.newPage({viewport:{width:360,height:760}, timezoneId:'Europe/Budapest', reducedMotion:'reduce'});
page.setDefaultTimeout(6000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const home = new URL('index.html', import.meta.url).href;
const el = id => page.locator('#' + id);
const click = id => el(id).click();
const esc = () => page.keyboard.press('Escape');
const go = query => page.goto(home + (query ? '?' + query : ''));
const fixed = date => page.clock.setFixedTime(new Date(date+'T12:00:00Z'));
const stored = key => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
const recallKey = 'magyarorosz.a1-sentence-recall.v1';
const listenKey = 'magyarorosz.a1-listening.v1';
const routeKey = 'magyarorosz.lesson-route.v1';
const recallSubmit = async answer => {
  await el('recallAnswer').fill(answer);
  await el('recallAnswer').press('Enter');
};
async function chooseListening(label) {
  await el('listeningOptions').getByRole('button',{name:label,exact:true}).click();
  assert.ok((await el('listeningFeedback').innerText()).length > 10);
  await click('listeningNext');
}
async function listen(rate = 1) {
  const audio = el('listeningAudio');
  await audio.evaluate(async (player,rate) => { player.playbackRate=rate; await player.play(); },rate);
  await page.waitForFunction(() => document.getElementById('listeningAudio').ended, null, {timeout:9000});
  assert.ok(await audio.evaluate(player => player.duration > 3 && player.duration < 7));
}

try {
  await fixed('2026-11-24'); await go();
  const lessons = await page.evaluate(() => window.TanmuhelyA1Conversations);
  const clips = await page.evaluate(() => window.TanmuhelyListening.items);
  assert.equal(lessons.length,28); assert.equal(clips.length,8);
  const options = el('listeningOptions').getByRole('button');
  for (const [index,clip] of clips.entries()) {
    await click('landingChooseLesson');
    await page.locator('#catalogMode label').filter({hasText:'На слух'}).click();
    assert.equal(await page.locator('#courseCatalogList button').count(),8);
    await page.locator('#courseCatalogList button').nth(index).click();
    assert.equal(await el('listeningTitle').innerText(),clip.title);
    assert.equal(await page.locator('#listeningTranscript p').isVisible(),false);
    assert.equal(await options.count(),3);
    assert.equal(await options.first().isDisabled(),true);
    assert.ok(await el('listeningAudio').evaluate(player => player.src.includes('/audio/a1-listening/')));
    await listen(index===0 ? 1 : 3);
    for (const question of clip.questions) {
      assert.equal(await el('listeningQuestion').innerText(),question.ask);
      await chooseListening(question.answer);
    }
    assert.match(await el('listeningScore').innerText(),/на слух, до открытия текста: 2/);
    await esc();
  }
  assert.equal(Object.keys(await stored(listenKey)).length,8);
  await go('listen=ital');
  await listen(2);
  await chooseListening('Чай.');
  await page.locator('#listeningTranscript summary').click();
  await page.locator('#listeningTranscript summary').click();
  await chooseListening('Хлеб.');
  assert.deepEqual((await stored(listenKey)).ital.last,{correct:2,audio:1,text:1});
  await click('listeningRetry');
  assert.equal(await options.first().isDisabled(),true);
  await el('listeningAudio').evaluate(player => {
    player.src='data:audio/mpeg;base64,YnJva2Vu'; return player.play().catch(()=>{});
  });
  await page.waitForFunction(() => document.getElementById('listeningStatus').textContent.includes('не загрузилась'));
  await page.locator('#listeningTranscript summary').click();
  await chooseListening('Кофе.');
  await chooseListening('Хлеб.');
  const mixed = (await stored(listenKey)).ital;
  assert.deepEqual(mixed.last,{correct:1,audio:0,text:2}); assert.equal(mixed.best,2);
  await esc(); assert.equal(await stored(routeKey),null);

  // Finish a normal two-part dialogue and let the home card schedule a new
  // independent sentence for the next local day.
  await go('scene=ital');
  const tea = lessons.find(scene => scene.id==='ital');
  await el('conversationOptions').getByRole('button',{name:tea.reply[0],exact:true}).click();
  await click('conversationNext'); await el('conversationAnswer').fill('teát'); await el('conversationAnswer').press('Enter');
  assert.equal((await stored(recallKey)).ital.due,'2026-11-25');
  await click('conversationRecallOpen'); await recallSubmit('Kérek egy kávét.');
  assert.equal((await stored(recallKey)).ital.due,'2026-11-25');
  await esc(); await fixed('2026-11-25'); await go();
  assert.equal(await el('homeConversationKind').innerText(),'Повторение на сегодня');
  await click('homeConversation'); await recallSubmit('EGY KÁVÉT KÉREK!'.normalize('NFD'));
  let record = (await stored(recallKey)).ital;
  assert.equal(record.due,'2026-11-28'); assert.equal(record.lastIndependent,true);
  await go('recall=ital'); await recallSubmit('Egy kávét kérek.');
  assert.equal((await stored(recallKey)).ital.due,'2026-11-28','Early practice does not postpone the review');
  await fixed('2026-11-28'); await go('recall=ital'); await recallSubmit('Kérek szépen egy kávét.');
  assert.equal((await stored(recallKey)).ital.due,'2026-12-05');
  await fixed('2026-12-05'); await go('recall=ital'); await recallSubmit('Kerek egy kavet');
  assert.match(await el('recallFeedback').innerText(),/гласными/);
  assert.equal(await el('recallResult').isVisible(),false);
  await page.reload(); assert.equal(await el('recallAnswer').inputValue(),'Kerek egy kavet');
  await recallSubmit('Kávé kérek.');
  assert.match(await el('recallFeedback').innerText(),/Добавьте -t/);
  await recallSubmit('Én teát iszom.');
  assert.match(await el('recallFeedback').innerText(),/нет среди проверенных/);
  await click('recallHint'); await click('recallHint');
  await page.reload(); assert.equal(await el('recallLater').isVisible(),true);
  await click('recallLater');
  record=(await stored(recallKey)).ital;
  assert.equal(record.lastIndependent,false); assert.equal(record.due,'2026-12-06');

  for (const [index,scene] of lessons.entries()) {
    await go('recall='+scene.id);
    assert.equal(await el('recallPrompt').innerText(),scene.recall.prompt);
    assert.equal(await el('recallFinalLine').isVisible(),false);
    assert.ok(!await page.evaluate(() => document.documentElement.scrollWidth>innerWidth));
    await recallSubmit(scene.recall.forms[index % scene.recall.forms.length]);
    assert.equal(await el('recallResult').isVisible(),true);
    assert.equal((await stored(recallKey))[scene.id].lastIndependent,true);
    await go('recall='+scene.id);
    await recallSubmit(scene.recall.commonError.forms[0]);
    assert.equal(await el('recallFeedback').innerText(),scene.recall.commonError.note);
    assert.equal(await el('recallResult').isVisible(),false);
    await recallSubmit(scene.recall.forms[0]);
    assert.equal((await stored(recallKey))[scene.id].lastIndependent,false);
  }
  assert.equal(await stored(routeKey),null,'Optional practice does not complete or start a guided lesson');

  // Choose each complete lesson as a new learner, finish the first five words,
  // take the actual break action, reload, and resume on card six.
  await go();
  for (const index of lessons.keys()) {
    await click('landingChooseLesson');
    await page.locator('#courseCatalogList button').nth(index).click();
    const words=[];
    for(let i=0;i<5;i++){
      words.push(await el('integratedCardHungarian').innerText());
      await click('integratedCardFlip');
      if(i<4)await click('integratedCardNext');
    }
    for(const word of [words[1],words[3]]) await el('a1CardCheckOptions').getByRole('button',{name:word,exact:true}).click();
    const sixth=await el('integratedCardHungarian').innerText();
    assert.match(await el('integratedCardPosition').innerText(),/Блок 2 · Слово 1/);
    await click('a1PackPause'); await page.reload();
    assert.match(await el('homeLessonPosition').innerText(),/блок 2 из 2/);
    await click('landingStart');
    assert.equal(await el('integratedLessonSelect').inputValue(),String(index));
    assert.equal(await el('integratedCardHungarian').innerText(),sixth);
    await page.locator('.landing-back').click();
  }
  const before = await stored(routeKey);
  await go('review=1&level=A1&lesson=4&section=dialogue');
  await click('lessonListenOnly'); assert.equal(await el('listeningTitle').innerText(),'Напиток и завтрак');
  await esc(); assert.deepEqual(await stored(routeKey),before);
  await go('review=1&level=A1&lesson=11&section=dialogue'); assert.equal(await el('lessonListenOnly').isVisible(),false);
  await go('review=1&level=A2&lesson=0&section=dialogue'); assert.equal(await el('lessonListenOnly').isVisible(),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: 8 decoded recordings, 16 listening questions, audio-only scoring, 28 full-sentence tasks, 1/3/7-day review and 28 saved five-word breaks.');
} finally {
  await browser.close();
}
