export const audioContext = new (window.AudioContext ||
  // @ts-ignore
  window.webkitAudioContext)();
