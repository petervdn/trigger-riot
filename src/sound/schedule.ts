import { Sample } from "@/src/data/sampleStore";
import { MatrixItemGroup } from "@/src/types/matrix.types";
import { getTimeSlotsInRangeForMatrixItems } from "@/src/utils/timeslots.utils";
import { samplePlayer } from "@/src/sound/SamplePlayer";
import { TimeWindow } from "@/src/types/misc.types";

export function schedule({
  audioContextStartTime,
  timeWindow,
  groups,
  samplesByGroupId,
  bpm,
  audioContext,
}: {
  timeWindow: TimeWindow;
  groups: Array<MatrixItemGroup>;
  audioContextStartTime?: number;
  bpm: number;
  samplesByGroupId: Record<string, Sample | undefined>;
  audioContext: AudioContext;
}) {
  if (!audioContextStartTime) {
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
      samplePlayer.playSampleAtTime({
        sample: sampleForGroup,
        layerId: group.stringId,
        time: slot.start + audioContextStartTime,
        audioContext,
      });
    }
  }
}
