/* Gábor A1 voice pilot with word and phrase trials.
   Usage: ?voicepilot=1; no effect on standard visitors, data or lesson progress.
   These are HeyGen-hosted trial WAV URLs; they are not permanent, locally hosted assets.
   Teacher-approved falling-intonation takes are used for "rádió" and "metró". */
(() => {
  'use strict';
  const p = new URLSearchParams(window.location.search);
  if (p.get('voicepilot') !== '1') return;
  const clips = {
  "telefon": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9362231869ca482893e1fb23fa381e67.wav",
  "metró": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=42403921cd364e958fad098d455a2ca5.wav",
  "taxi": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=3fe3e4a5cdfa40948a418209ad443616.wav",
  "rádió": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=93d5173f00744c138789a524f606557d.wav",
  "internet": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=a58a05b480374b58b7800ef76ff16a89.wav",
  "bank": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=822ce2597aab4a199724905d35be3c79.wav",
  "pizza": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=3b8079d7194242e4b301adcbfb242ab1.wav",
  "banán": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9b48c5a376c2410883ee60c9da427ab2.wav",
  "film": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=d5b8e92223014649aea66fe5a6c04bc0.wav",
  "park": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9f37284e665e4617931eee910438bc81.wav",
  "Szia!": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=705624fdfbe64319be774dfeb044070e.wav",
  "Jó napot!": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=8e816d7d11eb4f9094e8a5bc330d2f92.wav",
  "Köszönöm.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=29b240e2de1e4c90a271d097c2d6e0ed.wav",
  "Jól vagyok.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=2b47ee6e4edd472fa58d3ffbb288924d.wav",
  "Szia! Hogy vagy?": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=e51565e8c4384c0ba49e4c2c4c1054e2.wav",
  "Hogy vagy?": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=4badec60c45b4a2d84743a67cf626542.wav",
  "A nevem Anna.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=bb45119d49ba4801bc7115e08cdfb7ae.wav",
  "Én is jól vagyok.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=4a72716ec3104c179cdd5db89c724333.wav",
  "Jó napot kívánok!": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=e0604c2c0f76493bb9979b260e69afb0.wav",
  "Ki ez?": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=5d621f4edc8d4a2184a6ec69ca0962c1.wav",
  "Ő az anyukám.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=f4aa14db9b504899a067dbd1aef42f44.wav",
  "És ő?": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=c4d3fc1fe9d443e1b6b37272497e7239.wav",
  "Ő az apukám.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=b09dbb55f3804d308c2e78175f0b925c.wav",
  "Ez egy telefon. Ez egy taxi. Ez a metró.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=116e88ab5474434a8116e38195cce66a.wav",
  "Szia! A nevem Anna. Jól vagyok, köszönöm.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=a92167e764594e98a55315871c772d6c.wav",
  "Ez a családom. Ő az anyukám. Ő az apukám.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=49fad5cb77a94591b877fdf82cc010dc.wav",
  "Ez a szobám. Ez egy szék. A kulcs az asztalon van.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=67cc6e1154954a73a91bc37f0d303116.wav",
  "Kérek egy teát. Vizet iszom. Reggel kenyeret eszem.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=7bf418c6006349668d1713d38d6bd65a.wav",
  "Ma tanulok. Este olvasok. Holnap dolgozom.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=9ff9b862311c4c4e885d8a3ade218891.wav",
  "Mikor tanulsz? Reggel tanulok. Mit csinálsz este? Este olvasok.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=5d4cf15cf0f04d45bc87403380117efb.wav",
  "Hol van apa? Apa a boltban van. Anya a kertben van.": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=8db6ef558a9e4badaed858ba5c7fa418.wav",
  "Kérsz egy teát?": "https://resource2.heygen.ai/text_to_speech/e45fb1f2f10d4ae39d090b1d18b14dd3/8c6600d646584d17a495a0d09981a940/id=1ff33c5387954c27b0cca2bc704bdb3a.wav"
};
  window.TanuloVoicePilotKeys = Object.keys(clips);
  window.TanuloVoicePilotReview = [];
  window.TanuloAudioManifest = Object.assign({}, window.TanuloAudioManifest || {}, clips);
  console.info('Gábor A1 pilot:', window.TanuloVoicePilotKeys.length, 'word/phrase clips; listen and approve each new recording.');
})();
