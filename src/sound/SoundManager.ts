// import AnimationFrame from '../util/AnimationFrame';
import EventDispatcher from 'seng-event/lib/EventDispatcher';
import { EVENT_TYPE_PLACEHOLDER, generateEventTypes } from 'seng-event/lib/util/eventTypeUtils';
import BasicEvent from 'seng-event/lib/event/BasicEvent';
import SampleManager from 'sample-manager/lib/SampleManager';
import { sampleNames } from '../data/samples';
import { IMatrixItem, IMatrixItemGroup, IStore } from '../data/interface';
import { globalPlayFrame } from '../util/globalPlayFrame';

// Create your own event class
export class SoundManagerEvent extends BasicEvent {
  public static START: string = EVENT_TYPE_PLACEHOLDER;
  public static STOP: string = EVENT_TYPE_PLACEHOLDER;
}
generateEventTypes({ SoundManagerEvent });

const settings = {
  SCHEDULE_INTERVAL: 1,
  SCHEDULE_LOOKAHEAD: 1.5,
};

const timeOffset = 130;

export default class SoundManager extends EventDispatcher {
  public currentPlayTime: number = timeOffset;
  public context!: AudioContext;

  // private timeFrame: AnimationFrame; // for updating time info todo combine schedule interval into this?
  private scheduleIntervalId: number = -1;
  private startTime: number = -1;
  private sampleManager: SampleManager;
  private store: IStore | undefined;

  constructor(private samplesPath: string, extension: string) {
    super();

    // @ts-ignore
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleManager = new SampleManager(this.context, this.samplesPath, extension);
    // this.timeFrame = new AnimationFrame(this.onFrame);

    globalPlayFrame.addCallback(this.onFrame);

    this.sampleManager.addSamples(
      Object.keys(sampleNames).map(key => ({
        name: sampleNames[key],
      })),
    );
  }

  public setStore(store: IStore): void {
    this.store = store;
  }

  public start(): void {
    this.startTime = this.context.currentTime;
    this.schedule();
    this.scheduleIntervalId = setInterval(this.schedule, settings.SCHEDULE_INTERVAL * 1000);

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.START));
  }

  public stop(): void {
    this.startTime = -1;
    this.currentPlayTime = timeOffset;
    clearInterval(this.scheduleIntervalId);
    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.STOP));
  }

  private schedule = () => {
    // console.log('schedule');
    const groups: IMatrixItemGroup[] = [
      ...this.store!.state.matrix.matrix.columns,
      ...this.store!.state.matrix.matrix.rows,
    ];

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
      const group = groups[groupIndex];
      if (!group.sample) continue;

      const itemsWithDivisionSet: IMatrixItem[] = [];
      for (let itemIndex = 0; itemIndex < group.items.length; itemIndex += 1) {
        if (group.items[itemIndex].division > 0) {
          itemsWithDivisionSet.push(group.items[itemIndex]);
        }
      }

      if (itemsWithDivisionSet.length > 0) {
        // group has a sample, and there is at least 1 item in this group with a division > 0
        // console.log(group.sample.name, itemsWithDivisionSet.length);
      }
    }
  };

  private onFrame = () => {
    this.currentPlayTime = timeOffset + this.context.currentTime - this.startTime;
  };
}
