import { SCHEDULE_LOOKAHEAD } from "@/src/data/consts";
import { usePlayStore } from "@/src/data/playStore";
import { useSampleStore } from "@/src/data/sampleStore";
import { useMatrixStore } from "@/src/data/matrixStore";
import { createRowAndColumns } from "@/src/utils/matrixStore.utils";

export function getScheduleProps(fromTime: number) {
  const { bpm, startTime } = usePlayStore.getState();
  const { samplesByGroup } = useSampleStore.getState();
  const { matrixItems, numberOfRows, numberOfColumns } =
    useMatrixStore.getState();

  const { rows, columns } = createRowAndColumns({
    numberOfRows,
    numberOfColumns,
    matrixItems,
  });

  return {
    timeWindow: { start: fromTime, end: fromTime + SCHEDULE_LOOKAHEAD },
    contextStartTime: startTime,
    bpm,
    samplesByGroupId: samplesByGroup,
    groups: [...rows, ...columns],
  };
}
