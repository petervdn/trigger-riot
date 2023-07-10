import { useSampleStore } from "@/src/data/sampleStore";
import { usePlayStore } from "@/src/data/playStore";
import { MatrixItemGroup } from "@/src/types/matrix.types";
import { getTimeSlotsInRangeForMatrixItems } from "@/src/utils/timeslots.utils";
import { SCHEDULE_LOOKAHEAD } from "@/src/data/consts";

export function schedule(scheduleStartTime: number) {
  console.log(scheduleStartTime);
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
      // if (slots[slotIndex].start >= this.getCurrentTime()) {
      //   this.samplePlayer.playSampleAtTime(
      //     sampleForGroup,
      //     group.stringId,
      //     slots[slotIndex].start + this.startTime
      //   );
      // }
    }
  }
}
