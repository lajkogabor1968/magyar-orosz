/* Teacher-approved MP3s. Key: level:lessonIndex:lineIndex (zero based).
   NEVER put the original speaker's voice sample in this public repository.
   No unapproved character voice: Gábor's recordings play first; otherwise Hungarian TTS. */
window.TanuloDialogueAudioManifest = Object.assign(
  Object.create(null),
  window.TanuloDialogueAudioManifest || {}
);

/* Opt-in A1/A2 Gábor review: ?voice=gabor
   Prefer approved, locally hosted Gábor clips and fall back to Hungarian TTS.
   The manifest is intentionally empty until Gábor supplies a verified sample
   and approves each derived recording. Do not commit his raw voice sample.
   The historical review-mode flag is retained for compatible review URLs. */
window.TanuloApprovedGaborManifest = Object.create(null);
window.TanuloOnlyGaborVoice =
  /\/(a1|a2)\.html$/.test(window.location.pathname) &&
  new URLSearchParams(window.location.search).get('voice') === 'gabor';
if (window.TanuloOnlyGaborVoice) {
  // Keep the same safe preview when switching between the A1 and A2 pages.
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href="a1.html"], a[href="a2.html"]').forEach(link => {
      link.setAttribute('href', link.getAttribute('href') + '?voice=gabor');
    });
  });
}
