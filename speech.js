/* Shared speech playback for the Magyar–orosz Tanulóműhely.
   Prefer approved Gábor recordings; use the device's Hungarian TTS if missing. */
(() => {
  'use strict';
  if (window.TanuloTTS) return;

  const engine = window.speechSynthesis;
  const available = Boolean(engine && window.SpeechSynthesisUtterance);
  let voices = [];
  let generation = 0;
  let active = null;
  let activeAudio = null;
  let noticeTimer = null;
  let ttsNoticeShown = false;

  function refreshVoices() {
    if (!available) return;
    try { voices = engine.getVoices() || []; } catch { voices = []; }
  }

  function voiceFor(language) {
    refreshVoices();
    const lang = String(language || 'hu-HU').toLowerCase();
    const short = lang.split('-')[0];
    return voices.find(v => v.lang.toLowerCase() === lang && v.localService)
      || voices.find(v => v.lang.toLowerCase() === lang)
      || voices.find(v => v.lang.toLowerCase().split('-')[0] === short && v.localService)
      || voices.find(v => v.lang.toLowerCase().split('-')[0] === short)
      || null;
  }

  function message(text) {
    if (!document.body) return;
    let box = document.getElementById('tanulo-tts-message');
    if (!box) {
      box = document.createElement('div');
      box.id = 'tanulo-tts-message';
      box.setAttribute('role', 'status');
      box.setAttribute('aria-live', 'polite');
      Object.assign(box.style, {
        pointerEvents: 'none', position: 'fixed', left: '12px', right: '12px', bottom: '12px',
        zIndex: '10000', maxWidth: '540px', margin: '0 auto',
        padding: '13px 16px', borderRadius: '12px',
        color: '#173d3c', background: '#fff4d8',
        border: '2px solid #e6af46', boxShadow: '0 4px 18px #0002',
        font: '15px/1.4 system-ui, sans-serif'
      });
      document.body.appendChild(box);
    }
    const [russian, hungarian] = text.split(' / ');
    box.textContent = document.documentElement.lang === 'hu' && hungarian ? hungarian : russian;
    box.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { box.hidden = true; }, 16000);
  }

  function chunks(text) {
    const words = String(text).replace(/\s+/g, ' ').trim().split(' ');
    const output = [];
    let part = '';
    for (const word of words) {
      if (part && (part.length + word.length + 1 > 170)) {
        output.push(part);
        part = '';
      }
      if (word.length > 170) {
        for (let i = 0; i < word.length; i += 170) output.push(word.slice(i, i + 170));
      } else {
        part = part ? part + ' ' + word : word;
      }
    }
    if (part) output.push(part);
    return output;
  }

  function cancel() {
    generation++;
    active = null;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.removeAttribute('src');
      activeAudio = null;
    }
    if (available) {
      try { engine.cancel(); } catch { /* No active playback. */ }
    }
  }

  function approvedClipFor(utterance) {
    if (!String(utterance?.lang || 'hu-HU').toLowerCase().startsWith('hu')) return null;
    const phrase = String(utterance?.text || '').normalize('NFC').replace(/\s+/g, ' ').trim();
    const key = String(utterance?.recordingKey || '');
    const recordings = window.TanuloApprovedGaborManifest || {};
    const source = key ? recordings[key] : recordings[phrase];
    return typeof source === 'string' &&
      /^audio\/gabor\/(a1|a2)\/[a-z0-9][a-z0-9._-]*\.(mp3|wav|ogg)$/i.test(source)
      ? source : null;
  }

  function pilotClipFor(utterance) {
    // The HeyGen pilot is an explicitly opt-in experiment, never a default voice.
    if (!String(utterance?.lang || 'hu-HU').toLowerCase().startsWith('hu')) return null;
    const phrase = String(utterance?.text || '').normalize('NFC').replace(/\s+/g, ' ').trim();
    if (!window.TanuloVoicePilotKeys?.includes(phrase)) return null;
    const source = window.TanuloAudioManifest?.[phrase];
    return typeof source === 'string' &&
      /^https:\/\/resource2\.heygen\.ai\/text_to_speech\/[a-z0-9]+\/[a-z0-9]+\/id=[a-z0-9]+\.wav$/i.test(source)
      ? source : null;
  }

  function a1ClipFor(utterance) {
    if (!window.TanuloA1Audio || !String(utterance.lang || 'hu-HU').toLowerCase().startsWith('hu')) return null;
    const level = document.querySelector('.welcome .level.active')?.dataset.level;
    if (level && level !== 'A1' && !document.querySelector('#conversationDialog[open], #a1RecallDialog[open], #a1ListeningDialog[open]')) return null;
    const phrase = String(utterance.text).normalize('NFC').replace(/\s+/g, ' ').trim();
    const url = window.TanuloA1Audio[phrase];
    return typeof url === 'string' ? url : null;
  }

  function sourceFor(utterance) {
    if (approvedClipFor(utterance)) return 'gabor';
    if (pilotClipFor(utterance)) return 'pilot';
    if (a1ClipFor(utterance)) return 'piper';
    return available ? 'tts' : 'unavailable';
  }

  function speak(utterance, skipRecording = false, skipPiper = skipRecording) {
    if (!utterance || !String(utterance.text || '').trim()) return false;
    const lang = String(utterance.lang || 'hu-HU').toLowerCase();
    // Legacy MP3s without Gábor approval must not be presented as his voice.
    // The optional, labelled Gábor trial is kept for ?voicepilot=1 reviews.
    const approvedClip = skipRecording ? null : approvedClipFor(utterance);
    const pilotClip = !skipRecording && !approvedClip ? pilotClipFor(utterance) : null;
    const syntheticClip = !skipPiper && a1ClipFor(utterance);
    const clip = approvedClip || pilotClip || syntheticClip;
    if (clip) {
      cancel();
      const token = generation;
      const player = new Audio(clip);
      activeAudio = player;
      player.preload = 'auto';
      player.playbackRate = Math.max(0.5, Math.min(2, Number(utterance.rate) || 1));
      player.onplaying = event => {
        if (token !== generation) return;
        if (approvedClip || pilotClip) message(pilotClip
          ?'Звучит пробная запись голоса Габора. / Gábor kísérleti hangpróbája szól.'
          :'Звучит запись голосом Габора. / Gábor saját felvétele szól.');
        if (typeof utterance.onstart === 'function') utterance.onstart(event);
      };
      player.onended = event => {
        if (token !== generation) return;
        activeAudio = null;
        if (typeof utterance.onend === 'function') utterance.onend(event);
      };
      // A missing/broken MP3 must not stop a whole dialogue.
      // Retry once using device speech without selecting the failed recording again.
      function recordingFailed(event) {
        if (token !== generation || activeAudio !== player) return;
        player.onerror = null;
        player.onended = null;
        player.pause();
        activeAudio = null;
        if (!skipRecording && (approvedClip || pilotClip) && syntheticClip) {
          speak(utterance, true, false);
        } else if (available) {
          message('Запись недоступна. Пробуем венгерский компьютерный голос. / A felvétel nem érhető el. A készülék magyar géphangjával próbálkozunk.');
          speak(utterance, true, true);
        } else {
          message('Запись недоступна. Устройство не поддерживает синтез речи. / Az MP3 nem játszható le, és ezen a készüléken nincs beszédszintézis.');
          if (typeof utterance.onerror === 'function') utterance.onerror(event);
        }
      }
      player.onerror = recordingFailed;
      player.play().catch(recordingFailed);
      return true;
    }
    if (!available) {
      message('Синтез речи недоступен. Попробуйте другой браузер. / Ez a böngésző nem támogatja a felolvasást. Nyisd meg az alkalmazást a telefon Chrome böngészőjében.');
      return false;
    }
    cancel();
    const parts = chunks(utterance.text);
    const token = generation;
    const originalEnd = utterance.onend;
    const originalStart = utterance.onstart;
    const originalError = utterance.onerror;
    const selectedVoice = voiceFor(utterance.lang);
    if (!selectedVoice && voices.length && String(utterance.lang).toLowerCase().startsWith('hu')) {
      message('На устройстве не найден венгерский голос. Проверьте настройки синтеза речи. / Nem található magyar beszédhang a készüléken. Androidon a Szövegfelolvasó kimenet beállításainál töltsd le a magyar hangot.');
    }
    if (!ttsNoticeShown && lang.startsWith('hu')) {
      ttsNoticeShown = true;
      message('Для этой фразы используется венгерский компьютерный голос. Запись Габора всегда имеет приоритет. / Ehhez a szöveghez magyar géphangot használunk. Gábor felvétele mindig elsőbbséget élvez.');
    }
    let index = 0;

    function next() {
      if (token !== generation) return;
      const u = new SpeechSynthesisUtterance(parts[index]);
      u.lang = utterance.lang || 'hu-HU';
      u.rate = utterance.rate ?? 1;
      u.pitch = utterance.pitch ?? 1;
      u.volume = utterance.volume ?? 1;
      if (selectedVoice) u.voice = selectedVoice;
      let started = false;
      let finished = false;
      active = u;
      const timeout = setTimeout(() => {
        if (token === generation && active === u && !started && !finished && !engine.speaking) {
          message('Звук не запустился. Проверьте венгерский голос в настройках синтеза речи. / Nem indult el a hang. Androidon próbáld Chrome-ban, és ellenőrizd a Beállítások → Szövegfelolvasó kimenet menüben a magyar hangot.');
        }
      }, 2800);

      u.onstart = event => {
        started = true;
        clearTimeout(timeout);
        if (index === 0 && typeof originalStart === 'function') originalStart.call(utterance, event);
      };
      u.onend = event => {
        finished = true;
        clearTimeout(timeout);
        if (token !== generation) return;
        index++;
        if (index < parts.length) next();
        else {
          active = null;
          if (typeof originalEnd === 'function') originalEnd.call(utterance, event);
        }
      };
      u.onerror = event => {
        finished = true;
        clearTimeout(timeout);
        if (token !== generation) return;
        active = null;
        message('Не удалось озвучить текст. Проверьте настройки венгерского голоса. / A felolvasás nem sikerült. Androidon ellenőrizd a magyar beszédhangot, vagy próbáld a Chrome böngészőt.');
        if (typeof originalError === 'function') originalError.call(utterance, event);
      };
      try {
        // Keep this call in the user's tap/click handler: mobile browsers
        // often require a real user gesture to start audio playback.
        engine.speak(u);
        if (engine.paused) engine.resume();
      } catch (error) {
        clearTimeout(timeout);
        active = null;
        message('Не удалось запустить звук. Проверьте настройки браузера и синтеза речи. / A készülék nem tudta elindítani a hangot. Ellenőrizd a böngésző és a szövegfelolvasó beállításait.');
        if (typeof originalError === 'function') originalError.call(utterance, { error: 'synthesis-failed' });
      }
    }
    next();
    return true;
  }

  if (available) {
    refreshVoices();
    if (engine.addEventListener) engine.addEventListener('voiceschanged', refreshVoices);
    window.addEventListener('pageshow', refreshVoices);
  }
  window.TanuloTTS = { speak, cancel, sourceFor, getVoices: () => { refreshVoices(); return voices.slice(); } };
})();
