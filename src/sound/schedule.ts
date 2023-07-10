import { Sample } from "@/src/data/sampleStore";
import { MatrixItemGroup } from "@/src/types/matrix.types";
import { getTimeSlotsInRangeForMatrixItems } from "@/src/utils/timeslots.utils";
import { samplePlayer } from "@/src/sound/SamplePlayer";
import { TimeWindow } from "@/src/types/misc.types";

export function schedule({
  contextStartTime,
  timeWindow,
  groups,
  samplesByGroupId,
  bpm,
}: {
  timeWindow: TimeWindow;
  groups: Array<MatrixItemGroup>;
  contextStartTime?: number;
  bpm: number;
  samplesByGroupId: Record<string, Sample | undefined>;
}) {
  if (!contextStartTime) {
    console.error("No contextStartTime");
    return;
  }

  for (const group of groups) {
    const sampleForGroup = samplesByGroupId[group.stringId];
    if (!sampleForGroup || !sampleForGroup.audioBuffer) {
      continue;
    }

    const slots = getTimeSlotsInRangeForMatrixItems({
      matrixItems: group.items,
      bpm,
      timeWindow,
    });

    for (const slot of slots) {
      samplePlayer.playSampleAtTime(
        sampleForGroup,
        group.stringId,
        slot.start + contextStartTime
      );
    }
  }
}
