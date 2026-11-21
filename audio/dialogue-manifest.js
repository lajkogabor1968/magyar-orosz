/* Teacher-approved character MP3s. Key: level:lessonIndex:lineIndex (zero based).
   NEVER put the original speaker's voice sample in this public repository.
   Do not add Anna's voice: the current voice project uses Gábor's voice only.
   Existing standard playback remains unchanged until recordings are approved. */
window.TanuloDialogueAudioManifest = Object.assign(
  Object.create(null),
  window.TanuloDialogueAudioManifest || {}
);

/* Isolated, opt-in A1/A2 review: ?voice=gabor
   Only explicitly approved, locally hosted Gábor recordings may play.
   The manifest is intentionally empty until Gábor supplies a verified sample
   and approves each derived recording. Do not commit his raw voice sample. */
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
