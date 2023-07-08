import EventDispatcher, { createEventClass } from "seng-event";
import { useMatrixStore } from "@/src/data/matrixStore";

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

  public schedule = () => {
    console.log(useMatrixStore.getState());
    // const groups: IMatrixItemGroup[] = [
    //   ...this.store!.state.matrix.matrix.columns,
    //   ...this.store!.state.matrix.matrix.rows,
    // ];
    //
    // for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
    //   const group = groups[groupIndex];
    //   if (!group.sample) continue;
    //
    //   // only collect items which have a division > 0
    //   // const itemsWithDivisionSet: IMatrixItem[] = []; // todo also include pulseWidth > 0
    //   // for (let itemIndex = 0; itemIndex < group.items.length; itemIndex += 1) {
    //   //   if (group.items[itemIndex].division.value > 0) {
    //   //     itemsWithDivisionSet.push(group.items[itemIndex]);
    //   //   }
    //   // }
    //
    //   if (itemsWithDivisionSet.length > 0) {
    //     // group has a sample, and there is at least 1 item in this group with a division > 0;
    //     const slots = getTimeSlotsInRangeForMatrixItems(
    //       itemsWithDivisionSet,
    //       this.store!.state.app.bpm,
    //       {
    //         start: playTime,
    //         end: playTime + settings.SCHEDULE_LOOKAHEAD,
    //       }
    //     );
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
    // }
  };
}

export const soundManager = new SoundManager();
