// Each independent practice module remembers its own selected lesson.
window.TanuloLessonPosition = {
  read(key, count) {
    try {
      const raw = localStorage.getItem(key);
      const index = Number(raw);
      if (raw !== null && Number.isInteger(index) && index >= 0 && index < count) return index;
    } catch {}
    return 0;
  },
  write(key, index) {
    try { localStorage.setItem(key, String(index)); } catch {}
  }
};
