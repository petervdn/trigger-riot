import { SCHEDULE_LOOKAHEAD } from "@/src/data/consts";
import { usePlayStore } from "@/src/data/playStore";
import { useSampleStore } from "@/src/data/sampleStore";
import { useMatrixStore } from "@/src/data/matrixStore";
import { createRowAndColumns } from "@/src/utils/matrixStore.utils";
import { useAudioContextStore } from "@/src/data/audioContextStore";

export function getScheduleProps(fromTime: number) {
  const { bpm, audioContextStartTime } = usePlayStore.getState();
  const { samplesByGroupId } = useSampleStore.getState();
  const { matrixItems, numberOfRows, numberOfColumns } =
    useMatrixStore.getState();

  const { audioContext } = useAudioContextStore.getState();

  const { rows, columns } = createRowAndColumns({
    numberOfRows,
    numberOfColumns,
    matrixItems,
  });

  return {
    timeWindow: { start: fromTime, end: fromTime + SCHEDULE_LOOKAHEAD },
    audioContextStartTime,
    bpm,
    samplesByGroupId,
    groups: [...rows, ...columns],
    audioContext: audioContext!,
  };
}
