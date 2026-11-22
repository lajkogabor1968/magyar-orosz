// Futtatás: node magyar-orosz/verify-gabor-voice.mjs
// Gábor hangja elsőbbséget kap; hiányzó / hibás felvételnél magyar TTS indul.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

function createSandbox(page, search) {
  const calls = { device: 0, files: [], events: {} };
  const links = ['a1.html', 'a2.html'].map(value => ({
    value,
    getAttribute() { return this.value; },
    setAttribute(name, next) { if (name === 'href') this.value = next; }
  }));
  const engine = {
    paused: false,
    speaking: false,
    getVoices: () => [],
    cancel: () => {},
    speak: () => { calls.device++; }
  };
  function Utterance(text) { this.text = text; this.lang = 'hu-HU'; }
  function Audio(url) {
    calls.files.push(url);
    this.play = () => Promise.resolve();
    this.pause = () => {};
    this.removeAttribute = () => {};
    calls.player = this;
  }
  const window = {
    location: { pathname: `/magyar-orosz/${page}.html`, search },
    speechSynthesis: engine,
    SpeechSynthesisUtterance: Utterance,
    addEventListener: (name, handler) => { calls.events[name] = handler; },
    TanuloAudioManifest: { 'Szia!': 'audio/hu/a1-001-s.mp3' },
    TanuloDialogueAudioManifest: { 'a1:0:0': 'audio/dialogues/a1/other.mp3' }
  };
  const ctx = vm.createContext({
    window, Audio, SpeechSynthesisUtterance: Utterance, URLSearchParams,
    document: { body: null, querySelectorAll: () => links },
    setTimeout: () => 1, clearTimeout: () => {}
  });
  for (const file of ['audio/dialogue-manifest.js', 'speech.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  }
  const utterance = { text: 'Szia!', lang: 'hu-HU', rate: 1,
    recordingKey: `${page}:0:0`, speaker: 'Anna' };
  return { calls, window, utterance, links };
}

for (const page of ['a1', 'a2']) {
  const html = fs.readFileSync(path.join(root, `${page}.html`), 'utf8');
  assert.ok(html.indexOf('audio/dialogue-manifest.js') < html.indexOf('speech.js'),
    `${page}: a manifest a hangmotor előtt töltődjön be`);
  const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
  for (const [, source] of inlineScripts) new vm.Script(source, { filename: `${page}.html` });
  if (page === 'a1') {
    assert.match(html, /function audioTest\(\)\s*\{\s*stop\(\);/,
      'A hangpróbának a közös hangmotort kell használnia.');
    assert.ok(!html.includes('new Audio(source)'), 'Régi, ismeretlen beszélőjű MP3 nem szólhat közvetlenül.');
  }
  const { calls, window, utterance, links } = createSandbox(page, '?voice=gabor');
  assert.equal(window.TanuloOnlyGaborVoice, true);
  calls.events.DOMContentLoaded();
  assert.deepEqual(links.map(link => link.value), ['a1.html?voice=gabor', 'a2.html?voice=gabor'],
    `${page}: szintváltáskor se kapcsoljon vissza másik hangra`);
  assert.equal(window.TanuloTTS.sourceFor(utterance), 'tts');
  assert.equal(window.TanuloTTS.speak(utterance), true, `${page}: hiányzó Gábor-felvétel helyett géphang`);
  assert.equal(calls.device, 1, `${page}: a magyar géphang induljon el`);
  assert.deepEqual(calls.files, [], `${page}: régi/idegen felvétel lejátszása tilos`);

  window.TanuloApprovedGaborManifest[`${page}:0:0`] = 'https://example.com/other.wav';
  assert.equal(window.TanuloTTS.speak(utterance), true, `${page}: nem engedélyezett külső URL helyett géphang`);
  assert.equal(calls.device, 2);
  assert.deepEqual(calls.files, [], `${page}: külső hanghivatkozás tilos`);

  window.TanuloApprovedGaborManifest[`${page}:0:0`] = `audio/gabor/${page}/approved-001.mp3`;
  assert.equal(window.TanuloTTS.sourceFor(utterance), 'gabor');
  assert.equal(window.TanuloTTS.speak(utterance), true, `${page}: jóváhagyott hang indul`);
  assert.deepEqual(calls.files, [`audio/gabor/${page}/approved-001.mp3`]);
  assert.equal(calls.device, 2, `${page}: jóváhagyott felvétel mellett nincs TTS`);
  calls.player.onerror(new Error('404'));
  assert.equal(calls.device, 3, `${page}: hibás Gábor-MP3 helyett magyar TTS`);

  const regular = createSandbox(page, '');
  assert.equal(regular.window.TanuloOnlyGaborVoice, false);
  // Legacy MP3s are not labelled as Gábor's voice; TTS handles their absence.
  assert.equal(regular.window.TanuloTTS.speak(regular.utterance), true);
  assert.equal(regular.calls.device, 1);
  assert.deepEqual(regular.calls.files, []);
}

const pilot = createSandbox('a1', '?voicepilot=1');
pilot.window.TanuloVoicePilotKeys = ['Szia!'];
pilot.window.TanuloAudioManifest['Szia!'] =
  'https://resource2.heygen.ai/text_to_speech/abcdef/123456/id=aa123.wav';
assert.equal(pilot.window.TanuloTTS.sourceFor(pilot.utterance), 'pilot');
assert.equal(pilot.window.TanuloTTS.speak(pilot.utterance), true,
  'Az elkülönített Gábor-próbahang változatlanul kipróbálható.');
assert.equal(pilot.calls.files.length, 1);
assert.equal(pilot.calls.device, 0);

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(index.indexOf('audio/dialogue-manifest.js') < index.indexOf('speech.js'),
  'A főoldalon is elérhető legyen a jóváhagyott Gábor-hangjegyzék.');
const book = fs.readFileSync(path.join(root, 'lesson-book.js'), 'utf8');
assert.match(book, /if\(!selected\)\{fallback\(\);return;\}/,
  'Hiányzó teljes Gábor-szövegnél gépi felolvasás legyen.');
assert.match(book, /player\.onerror=failedRecording/,
  'A hibás teljes szöveges felvételnek is legyen géphangos pótlása.');
assert.ok(!book.includes('Nem váltunk géphangra'), 'A régi géphangtilalom nem maradhat a tanulási útban.');

console.log('Gábor-első A1/A2 hangteszt: RENDBEN (jóváhagyott felvétel, géphangos pótlás, idegen MP3 kizárva).');
