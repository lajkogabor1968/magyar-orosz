/* Teacher-approved character MP3s. Key: level:lessonIndex:lineIndex (zero based).
   Example after verification: "a1:0:0": "audio/dialogues/a1/anna-001.mp3".
   NEVER put the original speaker's voice sample in this public repository.
   This map stays empty until distinct female and male recordings are approved.
   Until then, the app continues to use the device's Hungarian voice. */
window.TanuloDialogueAudioManifest = Object.assign(
  Object.create(null),
  window.TanuloDialogueAudioManifest || {}
);
