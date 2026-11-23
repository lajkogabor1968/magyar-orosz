/* Optional real-browser regression: requires Playwright and Chromium. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {join} from 'node:path';

const {chromium}=createRequire(import.meta.url)('playwright');
const base=pathToFileURL(join(fileURLToPath(new URL('.',import.meta.url)),'index.html')).href;
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base);
 await page.locator('#lessonStartSelect').selectOption('1'); // A1 lesson 2, not lesson 1.
 await page.locator('#lessonStartSelected').click();
 assert.match(await page.locator('#integratedLessonHeading').textContent(),/Урок 2\./);
 assert.match(await page.locator('#integratedCardPosition').textContent(),/слово 1 из 10/);
 const translations=new Map();
 async function reveal(){
  await page.locator('#integratedCardFlip').click();
  translations.set(await page.locator('#integratedCardRussian').textContent(),await page.locator('#integratedCardHungarian').textContent());
 }
 async function advance(){await page.locator('#integratedCardNext').click()}
 await reveal();await advance();await reveal();
 await page.reload();
 await page.locator('#lessonsPrimary').click();
 assert.match(await page.locator('#integratedLessonHeading').textContent(),/Урок 2\./);
 assert.match(await page.locator('#integratedCardPosition').textContent(),/слово 3 из 10/,
  'reopening after two words should resume the third, not the first');
 for(let n=2;n<5;n++){
  await reveal();
  if(n!==4)await advance();
 }
 for(let n=0;n<2;n++){
  const prompt=await page.locator('#a1CardCheckPrompt').textContent();
  const russian=prompt.match(/«([^»]+)»/)?.[1];
  const hungarian=translations.get(russian);
  assert.ok(hungarian,`Missing a taught Hungarian translation for ${russian}`);
  await page.locator('#a1CardCheckOptions').getByRole('button',{name:hungarian,exact:true}).click();
 }
 assert.equal(await page.locator('#a1CardBreak').isVisible(),true,
  'a voluntary break appears after five words and the retrieval check');
 assert.match(await page.locator('#integratedCardPosition').textContent(),/слово 6 из 10/);
 await page.locator('#a1CardBreak').click();
 assert.equal(await page.locator('#integratedLessonView').isVisible(),false,
  'a break returns to the study menu');
 await page.reload();
 assert.equal(await page.locator('#lessonStartSelect').inputValue(),'1',
  'the selected second lesson survives reloading');
 await page.locator('#lessonsPrimary').click();
 assert.match(await page.locator('#integratedLessonHeading').textContent(),/Урок 2\./);
 assert.match(await page.locator('#integratedCardPosition').textContent(),/слово 6 из 10/,
  'after the saved break the workbook must reopen in the second five-word group');
 assert.equal(await page.locator('#a1CardBreak').isVisible(),true);
 assert.deepEqual(errors,[],'No uncaught browser errors during the A1 resume path');
 console.log('PASS: Chromium mobile viewport resumes A1 lesson 2 after two cards, then after a saved five-word break.');
}finally{
 await browser.close();
}
