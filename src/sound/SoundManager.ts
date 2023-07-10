import EventDispatcher, { createEventClass } from "seng-event";
import { useMatrixStore } from "@/src/data/matrixStore";
import { MatrixItemGroup } from "@/src/types/matrix.types";
import { useSampleStore } from "@/src/data/sampleStore";
import { getTimeSlotsInRangeForMatrixItems } from "@/src/utils/timeslots.utils";
import { usePlayStore } from "@/src/data/playStore";
import { SamplePlayer } from "@/src/sound/SamplePlayer";

export class SoundManagerEvent extends createEventClass()("START", "STOP") {}

const SCHEDULE_INTERVAL = 1;
const SCHEDULE_LOOKAHEAD = 1.5;

export default class SoundManager extends EventDispatcher<SoundManagerEvent> {
  public context: AudioContext;
  private startTime: number | undefined;
  private scheduleIntervalId: number = -1;
  private samplePlayer: SamplePlayer;

  constructor() {
    super();
    // @ts-ignore
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.samplePlayer = new SamplePlayer(this.context);
  }

  public getIsPlaying(): boolean {
    return this.startTime !== undefined;
  }

  public async start(): Promise<void> {
    if (this.context.state === "suspended") {
      await this.context.resume();
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

    this.samplePlayer.stopAll();

    this.dispatchEvent(new SoundManagerEvent(SoundManagerEvent.types.STOP));
  }

  public getCurrentTime() {
    return soundManager.context && typeof this.startTime === "number"
      ? soundManager.context.currentTime - this.startTime
      : 0;
  }

  public schedule = (scheduleStartTime: number) => {
    if (this.startTime === undefined) {
      return;
    }

    const timeWindow = {
      start: scheduleStartTime,
      end: scheduleStartTime + SCHEDULE_LOOKAHEAD,
    };

    const { samplesByGroup } = useSampleStore.getState();
    const { bpm } = usePlayStore.getState();
    const groups: MatrixItemGroup[] = []; // todo

    for (const group of groups) {
      const sampleForGroup = samplesByGroup[group.stringId];
      if (!sampleForGroup || !sampleForGroup.audioBuffer) {
        continue;
      }

      const slots = getTimeSlotsInRangeForMatrixItems({
        matrixItems: group.items,
        bpm,
        timeWindow,
      });

      for (let slotIndex = 0; slotIndex < slots.length; slotIndex += 1) {
        // only play sample if the slot is in the future (or now) todo: why would that not be the case?
        if (slots[slotIndex].start >= this.getCurrentTime()) {
          this.samplePlayer.playSampleAtTime(
            sampleForGroup,
            group.stringId,
            slots[slotIndex].start + this.startTime
          );
        }
      }
    }
  };
}

export const soundManager = new SoundManager();
