export default class SoundManager {
  // @ts-ignore
  public context: AudioContext = new (window.AudioContext || window.webkitAudioContext)();

  constructor() {}
}
