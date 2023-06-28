import {
  MatrixItem,
  MatrixItemsGroupIdentifier,
} from "@/src/types/matrix.types";
import { Position } from "@/src/types/misc.types";
import { StepType } from "@/src/data/consts";
import { round } from "@/src/utils/numberUtils";
import { TimeWindow } from "@/src/types/misc.types";

export const createMatrixItems = ({
  numberOfRows,
  numberOfColumns,
}: {
  numberOfRows: number;
  numberOfColumns: number;
}): Array<MatrixItem> => {
  return Array.from({ length: numberOfRows * numberOfColumns }, (_, index) => ({
    index,
    position: getPositionForIndex(index, numberOfColumns),
    division: {
      type: "number" as const,
      min: 1,
      max: 8,
      value: 1,
      isInteger: true,
    },
    pulseWidth: {
      type: "number" as const,
      min: 0,
      max: 1,
      value: 0.5,
      isInteger: false,
    },
    steps: {
      type: "string" as const,
      value: StepType.SIXTEENTH,
    },
  }));
};

export function getPositionForIndex(index: number, numberOfColumns: number) {
  return {
    x: index % numberOfColumns,
    y: Math.floor(index / numberOfColumns),
  };
}

export function getIndexForPosition(position: Position, numberOfRows: number) {
  return position.y * numberOfRows + position.x;
}

export function getTimeSlotsInRangeForMatrixItems(
  matrixItems: Array<MatrixItem>,
  bpm: number,
  timeWindow: TimeWindow
): Array<TimeWindow> {
  const slots: Array<TimeWindow> = [];
  for (let i = 0; i < matrixItems.length; i += 1) {
    slots.push(
      ...getSlotsInRangeForMatrixItem(matrixItems[i], bpm, timeWindow)
    );
  }

  // always flatten, even if there was only 1 matrixItem (will make a correct wave when pulseWidth = 1)
  return flattenTimeSlots(slots).map((entry) => ({
    start: entry.start,
    end: entry.end,
  }));
}

const getClockMultiplierByStepType = (stepType: string): number => {
  const multipliers = {
    [StepType.QUARTER]: 1,
    [StepType.EIGHTH_D]: 3 / 4,
    [StepType.QUARTER_T]: 2 / 3,
    [StepType.EIGHTH]: 1 / 2,
    [StepType.SIXTEENTH_D]: 3 / 8,
    [StepType.EIGHTH_T]: 1 / 3,
    [StepType.SIXTEENTH]: 1 / 4,
    [StepType.THIRTYSECOND_D]: 3 / 16,
    [StepType.SIXTEENTH_T]: 1 / 6,
    [StepType.THIRTYSECOND]: 1 / 8,
    [StepType.THIRTYSECOND_T]: 1 / 12,
    [StepType.SIXTYFOURTH]: 1 / 16,
  };

  return multipliers[stepType] / 4;
};

export function getSlotsInRangeForMatrixItem(
  matrixItem: MatrixItem,
  bpm: number,
  timeWindow: TimeWindow
): Array<TimeWindow> {
  if (matrixItem.division.value === 0 || matrixItem.pulseWidth.value === 0) {
    // in these cases: there will be no wave at all
    return [];
  }

  const secondsPerBeat = 60 / bpm; //* getClockMultiplierByStepType(matrixItem.steps.value);
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
