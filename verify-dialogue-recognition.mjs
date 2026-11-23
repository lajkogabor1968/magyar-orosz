import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./dialogue-recognition.js',import.meta.url),'utf8');
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const workbook=readFileSync(new URL('./lesson-book.js',import.meta.url),'utf8');
const context={window:{}};
runInNewContext(source,context,{filename:'dialogue-recognition.js'});
const create=context.window.TanmuhelyDialogueRecognition.create;
const instances=[];
class FakeRecognizer {
 constructor(){instances.push(this);this.aborted=0}
 start(){this.started=true}
 abort(){this.aborted++}
}
const activity=[],results=[],failures=[];
const controller=create({
 getRecognizer:()=>FakeRecognizer,
 onActive:value=>activity.push(value),
 onResult:result=>results.push(result),
 onFailure:reason=>failures.push(reason)
});

assert.equal(controller.start('Mi ez?','A1:0'),true);
assert.equal(controller.isActive(),true);
assert.equal(instances[0].lang,'hu-HU');
assert.equal(instances[0].continuous,false);
assert.equal(instances[0].maxAlternatives,1);
const firstResult=instances[0].onresult;
firstResult({results:[[{transcript:'Mi ez'}]]});
assert.equal(results.length,1);
assert.equal(results[0].heard,'Mi ez');
assert.equal(results[0].target,'Mi ez?');
assert.equal(results[0].lessonKey,'A1:0');
assert.equal(controller.stop(),true);
assert.equal(instances[0].aborted,1);
assert.equal(instances[0].onresult,null);
firstResult({results:[[{transcript:'Jól vagyok'}]]});
assert.equal(results.length,1,'A late callback cannot update a lesson after stop');

assert.equal(controller.start('Hogy vagy?','A1:1'),true);
assert.equal(instances.length,2);
firstResult({results:[[{transcript:'Mi ez?'}]]});
assert.equal(results.length,1,'A previous lesson callback cannot mark the new one complete');
instances[1].onresult({results:[[{transcript:'Hogy vagy?'}]]});
assert.equal(results[1].lessonKey,'A1:1');
instances[1].onend();
assert.equal(controller.isActive(),false);

assert.equal(controller.start('Ez egy telefon.','A1:0'),true);
instances[2].onerror({error:'not-allowed'});
assert.equal(failures.at(-1),'not-allowed');
assert.equal(controller.isActive(),false);
assert.equal(instances[2].aborted,1);

assert.equal(controller.start('Jó napot!','A1:1'),true);
instances[3].onresult({results:[]});
assert.equal(failures.at(-1),'no-result');
controller.stop();

const unsupported=[];
const none=create({getRecognizer:()=>undefined,onFailure:reason=>unsupported.push(reason)});
assert.equal(none.start('Szia!','A1:0'),false);
assert.equal(unsupported[0],'unsupported');

class BrokenRecognizer {start(){throw Error('Microphone is blocked')} abort(){}}
const errors=[];
const failed=create({getRecognizer:()=>BrokenRecognizer,onFailure:reason=>errors.push(reason)});
assert.equal(failed.start('Szia!','A1:0'),false);
assert.equal(errors[0],'start-failed');
assert.equal(failed.isActive(),false);

assert.match(html,/src="dialogue-recognition\.js\?v=20261123-mic-safety1"[^\n]*src="lesson-book\.js/);
assert.match(html,/браузер может передавать звук внешней службе/);
assert.match(workbook,/if\(view\.hidden\|\|step!==2\|\|startedLesson!==lessonKey\(\)\)return/);
assert.match(workbook,/dialogueRecognition\.stop\(\);\$\('integratedAdvanceAdvice'\)/);
assert.match(workbook,/if\(step!==2\)dialogueRecognition\.stop\(\)/);
assert.match(workbook,/Это не оценка произношения/);
assert.match(workbook,/document\.addEventListener\('visibilitychange'/);
assert.match(workbook,/window\.addEventListener\('pagehide'/);
assert.match(workbook,/if\(event\.target\.closest\('button'\)\)dialogueRecognition\.stop\(\)/);
assert.ok(activity.includes(true)&&activity.includes(false));
console.log('PASS: speech-recognition state, stop, late callbacks, lesson changes, errors, and permission failures.');
console.log('PASS: UI declines pronunciation scoring, discloses possible cloud processing, and stops recording on navigation.');
