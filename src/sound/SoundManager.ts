import EventDispatcher, { createEventClass } from "seng-event";
import { useMatrixStore } from "@/src/data/matrixStore";
import { MatrixItemGroup } from "@/src/types/matrix.types";
import { useSampleStore } from "@/src/data/sampleStore";
import { getTimeSlotsInRangeForMatrixItems } from "@/src/utils/timeslots.utils";
import { usePlayStore } from "@/src/data/playStore";

export class SoundManagerEvent extends createEventClass()("START", "STOP") {}

const SCHEDULE_INTERVAL = 1;
const SCHEDULE_LOOKAHEAD = 1.5;

export default class SoundManager extends EventDispatcher<SoundManagerEvent> {
  public context!: AudioContext;
  private startTime: number | undefined;
  private scheduleIntervalId: number = -1;

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

    // force first schedule with time = 0, otherwise the first samples (on 0.0) will not fire
    // (playtime might be something like 0.000005 on first schedule)
    this.schedule(0);
    // return;
    this.scheduleIntervalId = window.setInterval(() => {
      this.schedule(this.getCurrentTime());
    }, SCHEDULE_INTERVAL * 1000);

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

  public schedule = (startTime: number) => {
    const timeWindow = {
      start: startTime,
      end: startTime + SCHEDULE_LOOKAHEAD,
    };

    const { columns, rows } = useMatrixStore.getState();
    const { samplesByGroup } = useSampleStore.getState();
    const { bpm } = usePlayStore.getState();
    const groups: MatrixItemGroup[] = [...columns, ...rows];

    for (const group of groups) {
      if (!samplesByGroup[group.stringId]) continue;

      const slots = getTimeSlotsInRangeForMatrixItems({
        matrixItems: group.items,
        bpm,
        timeWindow,
      });

      //
      //     for (let slotIndex = 0; slotIndex < slots.length; slotIndex += 1) {
      //       // only play sample if the slot is in the future (or now)
      //       if (slots[slotIndex].start >= playTime) {
      //         this.samplePlayer.playSampleAtTime(
      //           group.sample,
      //           group.id,
      //           slots[slotIndex].start + this.startTime - timeOffset
      //         );
      //       }
      //     }
      //   }
    }
  };
}

export const soundManager = new SoundManager();
