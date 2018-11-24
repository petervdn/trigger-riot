// import AnimationFrame from '../util/AnimationFrame';
import EventDispatcher from 'seng-event/lib/EventDispatcher';
import { EVENT_TYPE_PLACEHOLDER, generateEventTypes } from 'seng-event/lib/util/eventTypeUtils';
import BasicEvent from 'seng-event/lib/event/BasicEvent';
import SampleManager from 'sample-manager/lib/SampleManager';
import { sampleNames } from '../data/samples';
import { IMatrixItem, IMatrixItemGroup, IStore } from '../data/interface';
import { globalPlayFrame } from '../util/globalPlayFrame';
import { getTimeSlotsInRangeForMatrixItems } from '../util/matrixUtils';
import { SamplePlayer } from './SamplePlayer';

export class SoundManagerEvent extends BasicEvent {
  public static START: string = EVENT_TYPE_PLACEHOLDER;
  public static STOP: string = EVENT_TYPE_PLACEHOLDER;
}
generateEventTypes({ SoundManagerEvent });

const settings = {
  SCHEDULE_INTERVAL: 1,
  SCHEDULE_LOOKAHEAD: 1.5,
};

const timeOffset = 0;

export default class SoundManager extends EventDispatcher {
  public currentPlayTime: number = timeOffset;
  public context!: AudioContext;

  private scheduleIntervalId: number = -1;
  private startTime: number = -1;
  private sampleManager: SampleManager;
  private samplePlayer: SamplePlayer;
  private store: IStore | undefined;

  constructor(private samplesPath: string, extension: string) {
    super();

    // @ts-ignore
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleManager = new SampleManager(this.context, this.samplesPath, extension);
    this.samplePlayer = new SamplePlayer(this.context);

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

    // force first schedule with time = 0, otherwise the first samples (on 0.0) will not fire
    // (playtime might be something like 0.000005 on first schedule)
    this.schedule(0);

    this.scheduleIntervalId = setInterval(() => {
      this.schedule(this.currentPlayTime);
    }, settings.SCHEDULE_INTERVAL * 1000);

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.START));
  }

  public stop(): void {
    this.startTime = -1;
    this.currentPlayTime = timeOffset;
    clearInterval(this.scheduleIntervalId);
    this.samplePlayer.stopAll();
    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.STOP));
  }

  private schedule = (playTime: number) => {
    const groups: IMatrixItemGroup[] = [
      ...this.store!.state.matrix.matrix.columns,
      ...this.store!.state.matrix.matrix.rows,
    ];

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
      const group = groups[groupIndex];
      if (!group.sample) continue;

      // only collect items which have a division > 0
      const itemsWithDivisionSet: IMatrixItem[] = [];
      for (let itemIndex = 0; itemIndex < group.items.length; itemIndex += 1) {
        if (group.items[itemIndex].division > 0) {
          itemsWithDivisionSet.push(group.items[itemIndex]);
        }
      }

      if (itemsWithDivisionSet.length > 0) {
        // group has a sample, and there is at least 1 item in this group with a division > 0;
        const slots = getTimeSlotsInRangeForMatrixItems(
          itemsWithDivisionSet,
          this.store!.state.app.bpm,
          {
            start: playTime,
            end: playTime + settings.SCHEDULE_LOOKAHEAD,
          },
        );

        for (let slotIndex = 0; slotIndex < slots.length; slotIndex += 1) {
          // only play sample if the slot is in the future (or now)
          if (slots[slotIndex].start >= playTime) {
            this.samplePlayer.playSampleAtTime(
              group.sample,
              group.id,
              slots[slotIndex].start + this.startTime - timeOffset,
            );
          }
        }
      }
    }
  };

  private onFrame = () => {
    this.currentPlayTime = timeOffset + this.context.currentTime - this.startTime;
  };
}
