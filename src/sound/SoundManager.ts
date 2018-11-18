import AnimationFrame from '../util/AnimationFrame';
import EventDispatcher from 'seng-event/lib/EventDispatcher';
import { EVENT_TYPE_PLACEHOLDER, generateEventTypes } from 'seng-event/lib/util/eventTypeUtils';
import BasicEvent from 'seng-event/lib/event/BasicEvent';

// Create your own event class
export class SoundManagerEvent extends BasicEvent {
  public static START: string = EVENT_TYPE_PLACEHOLDER;
  public static STOP: string = EVENT_TYPE_PLACEHOLDER;
}
generateEventTypes({ SoundManagerEvent });

export default class SoundManager extends EventDispatcher {
  // @ts-ignore
  public context: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
  public currentPlayTime: number = 0;

  private frame: AnimationFrame;
  private startTime: number = -1;

  constructor() {
    super();

    this.frame = new AnimationFrame(this.onFrame);
  }

  public start(): void {
    this.startTime = this.context.currentTime;
    this.frame.start();

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.START));
  }

  public stop(): void {
    this.startTime = -1;
    this.currentPlayTime = 0;

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.STOP));
  }

  private onFrame = () => {
    this.currentPlayTime = this.context.currentTime - this.startTime;
  };
}
