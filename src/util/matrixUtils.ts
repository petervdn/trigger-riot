import { IMatrixData, IMatrixItem, IMatrixItemGroup, ITimeSlot } from '../data/interface';
import MatrixItemValueType from '../data/enum/MatrixItemValueType';
import StepTypes, { orderedStepTypes } from '../data/enum/StepTypes';
import { round } from './miscUtils';

export function getTimeSlotsInRangeForMatrixItems(
  matrixItems: IMatrixItem[],
  bpm: number,
  timeWindow: ITimeSlot,
): ITimeSlot[] {
  const slots: ITimeSlot[] = [];
  for (let i = 0; i < matrixItems.length; i += 1) {
    slots.push(...getSlotsInRangeForMatrixItem(matrixItems[i], bpm, timeWindow));
  }

  // always flatten, even if there was only 1 matrixItem (will make a correct wave when pulseWidth = 1)
  // todo fix pulsewidth = 0
  return flattenTimeSlots(slots).map(entry => ({
    start: entry.start,
    end: entry.end,
  }));
}

export function getSlotsInRangeForMatrixItem(
  matrixItem: IMatrixItem,
  bpm: number,
  timeWindow: ITimeSlot,
): ITimeSlot[] {
  if (matrixItem.division === 0) {
    return [];
  }
  const secondsPerBeat = 60 / bpm;
  const itemRepeatTime = matrixItem.division * secondsPerBeat;

  // get last one that starts before starttme
  let entryStart = -1;
  const lastEntryStartBeforeWindowStart =
    Math.floor(timeWindow.start / itemRepeatTime) * itemRepeatTime;

  const results: ITimeSlot[] = [];
  let iteration = 0;
  while (entryStart < timeWindow.end) {
    entryStart = lastEntryStartBeforeWindowStart + iteration * itemRepeatTime;
    let entryEnd = entryStart + matrixItem.pulseWidth * itemRepeatTime;
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

export function createMatrixData(numberOfRows = 4, numberOfColumns = 4): IMatrixData {
  const items: IMatrixItem[] = [];

  let index = 0;
  for (let y = 0; y < numberOfRows; y += 1) {
    for (let x = 0; x < numberOfColumns; x += 1) {
      let division = 0;
      if (y === 0 && x === 0) {
        division = 3;
      }
      if (y === 0 && x === 1) {
        division = 5;
      }
      const item: IMatrixItem = {
        division,
        index,
        position: { x, y },
        pulseWidth: 0.25,
        steps: StepTypes.QUARTER,
      };
      items.push(item);
      index += 1;
    }
  }

  const columns: IMatrixItemGroup[] = [];
  for (let x = 0; x < numberOfColumns; x += 1) {
    columns.push({
      items: items.filter(item => item.position.x === x),
      id: `column-${x + 1}`,
    });
  }

  const rows: IMatrixItemGroup[] = [];
  for (let y = 0; y < numberOfRows; y += 1) {
    rows.push({
      items: items.filter(item => item.position.y === y),
      id: `row-${y + 1}`,
    });
  }

  return {
    items,
    rows,
    columns,
  };
}

export function flattenTimeSlots(timeSlots: ITimeSlot[]): ITimeSlot[] {
  timeSlots.sort((a, b) => a.start - b.start);
  const results: ITimeSlot[] = [];

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

interface IDialData {
  min?: number;
  max?: number;
  options?: string[] | number[] | { label: string; value: any }[];
  integer?: boolean;
  formatter?: (value: number) => string | number;
}

export const dialDataByType: { [key: string]: IDialData } = {
  [MatrixItemValueType.DIVISION]: {
    min: 0,
    max: 255,
    integer: true,
  },
  [MatrixItemValueType.STEPS]: {
    options: orderedStepTypes,
  },
  [MatrixItemValueType.PULSE_WIDTH]: {
    min: 0,
    max: 1,
    formatter: value => `${Math.round(value * 100)} %`,
  },
};
