(() => {
  'use strict';
  function store(key) {
    let memory = {};
    let memoryOnly = false;
    function read() {
      if (memoryOnly) return memory;
      try {
        const records = JSON.parse(localStorage.getItem(key));
        return records && typeof records === 'object' && !Array.isArray(records) ? records : {};
      } catch { return memory; }
    }
    function update(id, change) {
      const all = read();
      const old = all[id] || {};
      const record = { ...old, ...change(old) };
      all[id] = record;
      memory = all;
      if (!memoryOnly) {
        try { localStorage.setItem(key, JSON.stringify(all)); }
        catch { memoryOnly = true; }
      }
      return { record, saved: !memoryOnly };
    }
    return { read, update };
  }
  function accentKeyboard(container, input) {
    for (const letter of 'áéíóöőúüű') {
      const button = document.createElement('button');
      button.type = 'button'; button.lang = 'hu'; button.textContent = letter;
      button.onclick = () => {
        input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end');
        input.dispatchEvent(new Event('input'));
        input.focus();
      };
      container.append(button);
    }
  }
  window.TanmuhelyPractice = { store, accentKeyboard };
})();
