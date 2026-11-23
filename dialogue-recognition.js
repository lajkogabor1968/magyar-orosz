/* Guard the browser speech recognizer against stale results after lesson changes.
   Recognition produces a transcript, NOT a pronunciation or fluency score. */
(() => {
  'use strict';
  function create({getRecognizer, onActive, onResult, onFailure}) {
    let active = null, serial = 0;
    const publishActive = value => onActive?.(value);
    function detach(rec) {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
    }
    function stop() {
      serial++;
      const old = active;
      active = null;
      if (old) {
        detach(old);
        try { old.abort?.(); } catch (_) { /* Already stopped. */ }
      }
      publishActive(false);
      return Boolean(old);
    }
    function start(target, lessonKey) {
      stop();
      const Recognizer = getRecognizer?.();
      if (typeof Recognizer !== 'function') {
        onFailure?.('unsupported');
        return false;
      }
      let rec;
      try {
        rec = new Recognizer();
        rec.lang = 'hu-HU';
        rec.interimResults = false;
        rec.continuous = false;
        rec.maxAlternatives = 1;
        const run = ++serial;
        active = rec;
        const valid = () => run === serial && active === rec;
        rec.onresult = event => {
          if (!valid()) return;
          const heard = String(event?.results?.[0]?.[0]?.transcript || '').trim();
          if (heard) onResult?.({heard, target, lessonKey});
          else onFailure?.('no-result');
        };
        rec.onerror = event => {
          if (!valid()) return;
          const kind = String(event?.error || 'unknown');
          stop();
          if (kind !== 'aborted') onFailure?.(kind);
        };
        rec.onend = () => {
          if (!valid()) return;
          detach(rec);
          active = null;
          publishActive(false);
        };
        publishActive(true);
        rec.start();
        return true;
      } catch (_) {
        if (rec && active === rec) stop();
        onFailure?.('start-failed');
        return false;
      }
    }
    return Object.freeze({start, stop, isActive: () => Boolean(active)});
  }
  window.TanmuhelyDialogueRecognition = Object.freeze({create});
})();
