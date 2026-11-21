/* Optional Gábor voice pilot: two A1 words awaiting verification. No progress changes.
   Query ?voicepilot=1 enables this test; remote clips are not permanent hosting. */
(() => {
  const p = new URLSearchParams(window.location.search);
  if (p.get('voicepilot') !== '1') return;
  const clips = {
  "telefon": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9362231869ca482893e1fb23fa381e67.wav",
  "taxi": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=3fe3e4a5cdfa40948a418209ad443616.wav"
};
  window.TanuloVoicePilotKeys = Object.keys(clips);
  window.TanuloAudioManifest = Object.assign({}, window.TanuloAudioManifest || {}, clips);
  console.info('Gábor voice pilot: 2 unverified A1 word recordings enabled.');
})();
