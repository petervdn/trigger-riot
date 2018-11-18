import AnimationFrame from '../util/AnimationFrame';
import EventDispatcher from 'seng-event/lib/EventDispatcher';
import { EVENT_TYPE_PLACEHOLDER, generateEventTypes } from 'seng-event/lib/util/eventTypeUtils';
import BasicEvent from 'seng-event/lib/event/BasicEvent';
import SampleManager from 'sample-manager/lib/SampleManager';
import { sampleNames } from '../data/samples';

// Create your own event class
export class SoundManagerEvent extends BasicEvent {
  public static START: string = EVENT_TYPE_PLACEHOLDER;
  public static STOP: string = EVENT_TYPE_PLACEHOLDER;
}
generateEventTypes({ SoundManagerEvent });

export default class SoundManager extends EventDispatcher {
  public currentPlayTime: number = 0;
  public context: AudioContext;

  private frame: AnimationFrame;
  private startTime: number = -1;
  private sampleManager: SampleManager;

  constructor(private samplesPath: string, extension: string) {
    super();

    // @ts-ignore
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleManager = new SampleManager(this.context, this.samplesPath, extension);
    this.frame = new AnimationFrame(this.onFrame);

    this.sampleManager.addSamples(
      Object.keys(sampleNames).map(key => ({
        name: sampleNames[key],
      })),
    );
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
