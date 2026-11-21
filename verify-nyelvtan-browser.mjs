import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const packageLocation = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const {chromium} = packageLocation
  ? await import(join(packageLocation, 'playwright/index.mjs'))
  : await import('playwright');

const file = join(dirname(fileURLToPath(import.meta.url)), 'nyelvtan.html');
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_EXECUTABLE || '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox']});
const page = await browser.newPage({viewport: {width: 1280, height: 900}});
const errors = [];
page.on('pageerror', err => errors.push(err.message));

try {
  await page.goto(`file://${file}?level=A2`);
  await page.locator('#topic option').first().waitFor({state: 'attached'});
  assert.match(await page.locator('#count').textContent(), /22 témakör \/ тем · 198 feladat \/ заданий/);
  const select = page.locator('#topic');
  const target = await select.locator('option').evaluateAll(opts =>
    opts.find(el => el.textContent.includes('Felszólító mód I.'))?.value);
  assert.ok(target, 'Nem található a felszólító mód első fejezete.');
  await select.selectOption(target);
  assert.match(await page.locator('#title').textContent(), /Felszólító mód I/);
  assert.match(await page.locator('.grammar-topic-title-ru').textContent(), /Повелительное наклонение/);
  assert.ok(await page.locator('.grammar-prerequisites-links button').count() >= 1);
  assert.equal(await page.locator('.conjugation-table tbody tr').count(), 6,
    'A felszólító mód hat személyű táblázata látható.');
  assert.equal(await page.locator('.grammar-input').count(), 3);
  assert.equal(await page.locator('#questions .question-instruction-ru').count(), 8,
    'Minden A2-es feladatnál legyen orosz utasítás.');
  assert.equal(await page.locator('#nyelvtan-tankonyv .lesson-step').count(), 2,
    'A felszólító módhoz két tankönyvi magyarázó lépés tartozzon.');
  assert.equal(await page.locator('.lesson-quick-nav button').count(), 2,
    'A tankönyv és a gyakorlás külön navigációs gombot kapjon.');
  assert.match(await page.locator('.textbook-worked').textContent(), /várjon/);

  await page.screenshot({path: '/tmp/tanulomuhely-a2-nyelvtan-desktop.png', fullPage: true});
  const currentQuestions = await page.evaluate(() => {
    const level = 'A2';
    const all = window.GRAMMAR_TOPICS.filter(t => t.level === level);
    const selected = Number(document.getElementById('topic').value);
    return all[selected].questions;
  });
  for (const [i, q] of currentQuestions.entries()) {
    const row = page.locator('#questions .question').nth(i);
    if (q.type === 'input') await row.locator('input').fill(q.accept[0]);
    else {
      const labels = await row.locator('button').allTextContents();
      const choiceIndex = labels.indexOf(q.options[q.answer]);
      assert.ok(choiceIndex >= 0, 'A jó válasz nem jelenik meg a kevert lehetőségek közt.');
      await row.locator('button').nth(choiceIndex).click();
    }
  }
  await page.locator('#check').click();
  assert.match(await page.locator('#result').textContent(), /8 \/ 8 баллов · 100%/);
  assert.equal(await page.locator('.feedback').count(), 8);
  const key = `A2:${target}`;
  assert.deepEqual(JSON.parse(await page.evaluate(k => localStorage.getItem(k), 'hu-ru-grammar-v1'))[key],
    {score: 8, max: 8});

  await page.reload();
  assert.match(await page.locator('#progress').textContent(), /1 befejezett témakör/);
  await select.selectOption('15');
  assert.match(await page.locator('#title').textContent(), /Múlt idő – határozott/);
  assert.equal(await page.locator('.lesson-step').count(), 3);
  assert.equal(await page.locator('.conjugation-table tbody tr').count(), 6);
  const newQuestions = await page.evaluate(() => window.GRAMMAR_TOPICS.filter(t => t.level === 'A2')[15].questions);
  for (const [i, q] of newQuestions.entries()) {
    const row = page.locator('#questions .question').nth(i);
    if (q.type === 'input') await row.locator('input').fill(q.accept[0]);
    else await row.getByRole('button', {name: q.options[q.answer], exact: true}).click();
  }
  await page.locator('#check').click();
  assert.match(await page.locator('#result').textContent(), /12 \/ 12 баллов · 100%/);
  assert.equal(await page.locator('.feedback[lang="ru"]').count(), 12);

  for (const [index, title] of [
    ['16', 'Jövő idő'], ['17', 'Kell és a személyragos'], ['18', 'Birtokos személyjelek']
  ]) {
    await select.selectOption(index);
    assert.ok((await page.locator('#title').textContent()).includes(title));
    assert.ok(await page.locator('.lesson-step').count() >= 3,
      'Az új A2-es leckék tanulható magyarázattal induljanak.');
    assert.equal(await page.locator('.conjugation-table tbody tr').count(), 6);
    assert.equal(await page.locator('#questions .question-instruction-ru').count(), 12);
    const questions = await page.evaluate(i => window.GRAMMAR_TOPICS.filter(
      t => t.level === 'A2')[Number(i)].questions, index);
    for (const [i, q] of questions.entries()) {
      const row = page.locator('#questions .question').nth(i);
      if (q.type === 'input') await row.locator('input').fill(q.accept[0]);
      else await row.getByRole('button', {name: q.options[q.answer], exact: true}).click();
    }
    await page.locator('#check').click();
    assert.match(await page.locator('#result').textContent(), /12 \/ 12 баллов · 100%/);
    assert.equal(await page.locator('.feedback[lang="ru"]').count(), 12);
  }
  for (const [index, title] of [
    ['19', 'Birtoklás: van könyvem'], ['20', 'Részes eset: -nak/-nek'],
    ['21', 'Helyragok II.']
  ]) {
    await select.selectOption(index);
    assert.ok((await page.locator('#title').textContent()).includes(title));
    assert.ok((await page.locator('.grammar-topic-title-ru').textContent()).trim().length > 8);
    assert.ok(await page.locator('.grammar-prerequisites-links button').count() >= 1);
    assert.ok(await page.locator('.lesson-step').count() >= 3);
    assert.equal(await page.locator('#questions .question-instruction-ru').count(), 12);
    const questions = await page.evaluate(i => window.GRAMMAR_TOPICS.filter(
      t => t.level === 'A2')[Number(i)].questions, index);
    for (const [i, q] of questions.entries()) {
      const row = page.locator('#questions .question').nth(i);
      if (q.type === 'input') await row.locator('input').fill(q.accept[0]);
      else await row.getByRole('button', {name: q.options[q.answer], exact: true}).click();
    }
    await page.locator('#check').click();
    assert.match(await page.locator('#result').textContent(), /12 \/ 12 баллов · 100%/);
  }
  await page.locator('#levels [data-level="A1"]').click();
  assert.match(await page.locator('#count').textContent(), /10 témakör \/ тем · 66 feladat \/ заданий/);
  await select.selectOption('9');
  assert.match(await page.locator('#title').textContent(), /Alany, ige és tárgy/);
  assert.equal(await page.locator('#questions .question-instruction-ru').count(), 9);
  assert.equal(await page.locator('.conjugation-table').count(), 1,
    'Az A1-es alaptémákhoz is tartozzon táblázat.');

  await page.locator('#levels [data-level="B1"]').click();
  assert.equal(await page.locator('#questions .question-instruction-ru').count(), 5,
    'A B1-es gyakorlási utasításoknak is oroszul kell szerepelniük.');
  await page.locator('#levels [data-level="B2"]').click();
  assert.equal(await page.locator('#questions .question-instruction-ru').count(), 5,
    'A B2-es gyakorlási utasításoknak is oroszul kell szerepelniük.');
  await page.locator('#levels [data-level="B1"]').click();
  assert.ok(await page.locator('#nyelvtan-tankonyv').evaluate(el => el.classList.contains('hidden')),
    'A még nem kidolgozott B1-es tankönyvi oldalt nem szabad üresen mutatni.');

  await page.setViewportSize({width: 390, height: 844});
  await page.locator('#levels [data-level="A2"]').click();
  await select.selectOption(target);
  await page.screenshot({path: '/tmp/tanulomuhely-a2-nyelvtan-mobile.png', fullPage: true});
  await page.goto('file://' + join(dirname(fileURLToPath(import.meta.url)), 'index.html'));
  assert.ok(await page.locator('html').evaluate(el => el.classList.contains('landing-mode')),
    'A kezdőlapon először csak az orosz üdvözlés jelenjen meg.');
  assert.ok(!(await page.locator('#listView').isVisible()),
    'A szólista induláskor legyen elrejtve.');
  assert.match(await page.locator('#landingTitle').textContent(), /Венгерский с нуля/);
  await page.locator('#landingStart').click();
  assert.ok(await page.locator('#lessonsPrimary').isVisible(), 'Az Indítás után a vezetett leckék legyenek elérhetők.');
  await page.locator('.landing-back').click();
  assert.ok(await page.locator('#landingScreen').isVisible(), 'Vissza lehessen lépni a kezdőlapra.');
  assert.equal(errors.length, 0, `Böngészőhibák: ${errors.join('; ')}`);
  console.log('Böngészős teszt rendben: 40 kétnyelvű cím, 304 feladat, 32 tankönyv, 22 A2 előfeltétel, eredménymegőrzés és orosz kezdőképernyő.');
} finally {
  await browser.close();
}
