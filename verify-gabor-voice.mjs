// Futtatás: node magyar-orosz/verify-gabor-voice.mjs
// A Gábor-only A1/A2 próbában sem a készülék, sem más ember hangja nem szólhat.
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
    assert.match(html, /function audioTest\(\)\s*\{\s*stop\(\);\s*if\(window\.TanuloOnlyGaborVoice\)/,
      'A régi, közvetlen MP3-hangtesztet is tiltani kell a kizárólagos Gábor-módban.');
  }
  const { calls, window, utterance, links } = createSandbox(page, '?voice=gabor');
  assert.equal(window.TanuloOnlyGaborVoice, true);
  calls.events.DOMContentLoaded();
  assert.deepEqual(links.map(link => link.value), ['a1.html?voice=gabor', 'a2.html?voice=gabor'],
    `${page}: szintváltáskor se kapcsoljon vissza másik hangra`);
  assert.equal(window.TanuloTTS.speak(utterance), false, `${page}: nincs jóváhagyott hang`);
  assert.equal(calls.device, 0, `${page}: TTS-átváltás tilos`);
  assert.deepEqual(calls.files, [], `${page}: régi/idegen felvétel lejátszása tilos`);

  window.TanuloApprovedGaborManifest[`${page}:0:0`] = 'https://example.com/other.wav';
  assert.equal(window.TanuloTTS.speak(utterance), false, `${page}: külső hanghivatkozás tilos`);
  assert.equal(calls.device, 0);

  window.TanuloApprovedGaborManifest[`${page}:0:0`] = `audio/gabor/${page}/approved-001.mp3`;
  assert.equal(window.TanuloTTS.speak(utterance), true, `${page}: jóváhagyott hang indul`);
  assert.deepEqual(calls.files, [`audio/gabor/${page}/approved-001.mp3`]);
  assert.equal(calls.device, 0, `${page}: jóváhagyott felvétel mellett sincs TTS`);
  calls.player.onerror(new Error('404'));
  assert.equal(calls.device, 0, `${page}: MP3-hiba esetén sem szólhat más hang`);

  const regular = createSandbox(page, '');
  assert.equal(regular.window.TanuloOnlyGaborVoice, false);
  // The regular lesson experience still uses recordings where present, or TTS.
  assert.equal(regular.window.TanuloTTS.speak(regular.utterance), true);
  assert.equal(regular.calls.files.length + regular.calls.device, 1);
}

console.log('Gábor-only A1/A2 hangteszt: RENDBEN (nincs idegen hang vagy TTS-visszaváltás).');
