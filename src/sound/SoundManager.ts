import EventDispatcher, { createEventClass } from "seng-event";

export class SoundManagerEvent extends createEventClass()("START", "STOP") {}

export default class SoundManager extends EventDispatcher<SoundManagerEvent> {
  public context!: AudioContext;
  private startTime: number | undefined;

  constructor() {
    super();
  }

  public getIsPlaying() {
    return this.startTime !== undefined;
  }

  public start(): void {
    if (!this.context) {
      // @ts-ignore
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    }
    this.startTime = this.context.currentTime;

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.types.START));
  }

  public stop(): void {
    this.startTime = undefined;

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.types.STOP));
  }

  public getCurrentTime() {
    return soundManager.context && typeof this.startTime === "number"
      ? soundManager.context.currentTime - this.startTime
      : 0;
  }
}

export const soundManager = new SoundManager();
