import {
  MatrixItem,
  MatrixItemGroup,
  MatrixItemsGroupIdentifier,
} from "@/src/types/matrix.types";
import { Position, RowOrColumn } from "@/src/types/misc.types";
import { round } from "@/src/utils/numberUtils";
import { TimeWindow } from "@/src/types/misc.types";
import { matrixItemsGroupIdentifierToString } from "@/src/data/sampleStore.utils";

export function getTimeSlotsInRangeForMatrixItems({
  matrixItems,
  timeWindow,
  bpm,
}: {
  matrixItems: Array<MatrixItem>;
  bpm: number;
  timeWindow: TimeWindow;
}): Array<TimeWindow> {
  const slots: Array<TimeWindow> = [];
  for (let i = 0; i < matrixItems.length; i += 1) {
    slots.push(
      ...getSlotsInRangeForMatrixItem({
        matrixItem: matrixItems[i],
        bpm,
        timeWindow,
      })
    );
  }

  // always flatten, even if there was only 1 matrixItem (will make a correct wave when pulseWidth = 1)
  return flattenTimeSlots(slots).map((entry) => ({
    start: entry.start,
    end: entry.end,
  }));
}

function getClockMultiplierValue({ steps }: MatrixItem) {
  return steps.value / 96;
}

export function getSlotsInRangeForMatrixItem({
  matrixItem,
  timeWindow,
  bpm,
}: {
  matrixItem: MatrixItem;
  bpm: number;
  timeWindow: TimeWindow;
}): Array<TimeWindow> {
  if (matrixItem.division.value === 0 || matrixItem.pulseWidth.value === 0) {
    // in these cases: there will be no wave at all
    return [];
  }

  const secondsPerBeat = (60 / bpm) * getClockMultiplierValue(matrixItem);
  const itemRepeatTime = matrixItem.division.value * secondsPerBeat;

  // get last one that starts before start time
  let entryStart = -1;
  const lastEntryStartBeforeWindowStart =
    Math.floor(timeWindow.start / itemRepeatTime) * itemRepeatTime;

  const results: Array<TimeWindow> = [];
  let iteration = 0;
  while (entryStart < timeWindow.end) {
    entryStart = lastEntryStartBeforeWindowStart + iteration * itemRepeatTime;
    let entryEnd = entryStart + matrixItem.pulseWidth.value * itemRepeatTime;
    entryStart = round(entryStart, 10);
    entryEnd = round(entryEnd, 10);

    if (
      (entryStart > timeWindow.start && entryStart < timeWindow.end) ||
      (entryEnd > timeWindow.start && entryEnd < timeWindow.end) ||
      (entryStart < timeWindow.start && entryEnd > timeWindow.end)
    ) {
      results.push({
        start: entryStart,
        end: entryEnd,
      });
    }

    iteration += 1;
  }
  return results;
}

export function flattenTimeSlots(
  timeSlots: Array<TimeWindow>
): Array<TimeWindow> {
  timeSlots.sort((a, b) => a.start - b.start);
  const results: Array<TimeWindow> = [];

  for (let i = 0; i < timeSlots.length; i += 1) {
    if (
      results.length &&
      timeSlots[i].start >= results[results.length - 1].start &&
      timeSlots[i].start <= results[results.length - 1].end
    ) {
      if (timeSlots[i].end > results[results.length - 1].end) {
        results[results.length - 1].end = timeSlots[i].end;
      }
    } else {
      results.push(Object.assign({}, timeSlots[i]));
    }
  }

  return results;
}

export function getPositionsForGroup({
  groupIdentifier,
  numberOfRows,
  numberOfColumns,
}: {
  groupIdentifier: MatrixItemsGroupIdentifier;
  numberOfRows: number;
  numberOfColumns: number;
}): Array<Position> {
  if (groupIdentifier.type === "row") {
    return Array.from({ length: numberOfColumns }).map((_, index) => ({
      x: index,
      y: groupIdentifier.index,
    }));
  }

  return Array.from({ length: numberOfRows }).map((_, index) => ({
    x: groupIdentifier.index,
    y: index,
  }));
}
