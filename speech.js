/* Shared speech playback for the Magyar–orosz Tanulóműhely.
   Prefer pre-generated Hungarian MP3 recordings, then device speech. */
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

  function speak(utterance, skipRecording = false) {
    if (!utterance || !String(utterance.text || '').trim()) return false;
    const lang = String(utterance.lang || 'hu-HU').toLowerCase();
    const phrase = String(utterance.text).normalize('NFC').replace(/\s+/g, ' ').trim();
    const recordings = window.TanuloAudioManifest || {};
    const clip = !skipRecording && lang.startsWith('hu') && recordings[phrase];
    if (clip) {
      cancel();
      const token = generation;
      const player = new Audio(clip);
      activeAudio = player;
      player.preload = 'auto';
      player.playbackRate = Math.max(0.5, Math.min(2, Number(utterance.rate) || 1));
      player.onplaying = event => {
        if (token !== generation) return;
        if ((window.TanuloVoicePilotKeys || []).includes(phrase)) {
          message('Тестовая запись голоса Габора воспроизводится: ' + phrase + ' / Gábor hangpróba szól: ' + phrase);
        }
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
        if ((window.TanuloVoicePilotKeys || []).includes(phrase)) {
          message('Запись Габора не загрузилась. Голос устройства отключён для теста. / Gábor hangmintája nem érhető el. Tesztmódban nem váltunk át a készülék másik hangjára.');
          if (typeof utterance.onerror === 'function') utterance.onerror(event);
          return;
        }
        if (available) {
          message('Не удалось воспроизвести запись. Пробуем венгерский голос устройства. / Az MP3 nem játszható le. Próbálkozás a készülék magyar felolvasójával.');
          speak(utterance, true);
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
    const parts = chunks(utterance.text);
    const token = generation;
    const originalEnd = utterance.onend;
    const originalStart = utterance.onstart;
    const originalError = utterance.onerror;
    const selectedVoice = voiceFor(utterance.lang);
    if (!selectedVoice && voices.length && String(utterance.lang).toLowerCase().startsWith('hu')) {
      message('На устройстве не найден венгерский голос. Проверьте настройки синтеза речи. / Nem található magyar beszédhang a készüléken. Androidon a Szövegfelolvasó kimenet beállításainál töltsd le a magyar hangot.');
    }
    let index = 0;

    function next() {
      if (token !== generation) return;
      const u = parts.length === 1 ? utterance : new SpeechSynthesisUtterance(parts[index]);
      if (parts.length > 1) {
        u.lang = utterance.lang;
        u.rate = utterance.rate;
        u.pitch = utterance.pitch;
        u.volume = utterance.volume;
      }
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
  window.TanuloTTS = { speak, cancel, getVoices: () => { refreshVoices(); return voices.slice(); } };
})();
