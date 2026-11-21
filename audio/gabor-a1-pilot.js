/* Gábor voice pilot for the FIRST A1 workbook lesson only.
   Usage: ?voicepilot=1; no effect on standard visitors, data or lesson progress.
   These are HeyGen-hosted trial WAV URLs; they are not permanent, locally hosted assets.
   Pronunciation is not fully audited; "metró" needs particular review for long ó. */
(() => {
  'use strict';
  const p = new URLSearchParams(window.location.search);
  if (p.get('voicepilot') !== '1') return;
  const clips = {
  "telefon": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9362231869ca482893e1fb23fa381e67.wav",
  "metró": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=ec61784e8a6a4b6184f2e90b25c3ed0f.wav",
  "taxi": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=3fe3e4a5cdfa40948a418209ad443616.wav",
  "rádió": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=4e68bd37f17a491280f120387fafe2a8.wav",
  "internet": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=a58a05b480374b58b7800ef76ff16a89.wav",
  "bank": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=822ce2597aab4a199724905d35be3c79.wav",
  "pizza": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=3b8079d7194242e4b301adcbfb242ab1.wav",
  "banán": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9b48c5a376c2410883ee60c9da427ab2.wav",
  "film": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=d5b8e92223014649aea66fe5a6c04bc0.wav",
  "park": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9f37284e665e4617931eee910438bc81.wav"
};
  window.TanuloVoicePilotKeys = Object.keys(clips);
  window.TanuloVoicePilotReview = ['metró'];
  window.TanuloAudioManifest = Object.assign({}, window.TanuloAudioManifest || {}, clips);
  console.info('Gábor A1 pilot:', window.TanuloVoicePilotKeys.length, 'word clips; metró requires pronunciation review.');
})();
