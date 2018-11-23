import {
  IIndexedTimeSlot,
  IMatrixData,
  IMatrixItem,
  IMatrixItemGroup,
  ITimeSlot,
} from '../data/interface';
import MatrixMode from '../data/enum/MatrixMode';

export function getIndexedSlotsInRangeForMatrixItems(
  matrixItems: IMatrixItem[],
  bpm: number,
  timeWindow: ITimeSlot,
): IIndexedTimeSlot[] {
  const slots: ITimeSlot[] = [];
  for (let i = 0; i < matrixItems.length; i += 1) {
    slots.push(...getSlotsInRangeForMatrixItem(matrixItems[i], bpm, timeWindow));
  }

  // always flatten, even if there was only 1 matrixItem (will make a correct wave when pulseWidth = 1)
  // todo fix pulsewidth = 0
  return flattenTimeSlots(slots).map(entry => ({
    start: entry.start,
    end: entry.end,
    startTimeIndex: Math.round(entry.start / (60 / bpm)), // todo can we do this without the rounding?
  }));
}

function round(value: any, decimals: number) {
  let number: any = +value;
  const precision = decimals ? +decimals : 0;
  if (precision === 0) {
    return Math.round(number);
  }
  let sign = 1;
  if (number < 0) {
    sign = -1;
    number = Math.abs(number);
  }

  // Shift
  number = number.toString().split('e');
  /* tslint:disable */
  number = Math.round(+(number[0] + 'e' + (number[1] ? +number[1] + precision : precision)));
  // Shift back
  number = number.toString().split('e');
  return +(number[0] + 'e' + (number[1] ? +number[1] - precision : -precision)) * sign;
  /* tslint:enable */
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

export function createMatrixData(
  numberOfRows = 4,
  numberOfColumns = 4,
  defaultPulseWidth = 0.25,
): IMatrixData {
  const items: IMatrixItem[] = [];

  let index = 0;
  for (let y = 0; y < numberOfRows; y += 1) {
    for (let x = 0; x < numberOfColumns; x += 1) {
      const item: IMatrixItem = {
        index,
        position: { x, y },
        division: 0,
        pulseWidth: defaultPulseWidth,
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

interface IMatrixItemValueDefinition {
  min: number;
  max: number;
  integer?: boolean;
}

// todo use this
export const matrixItemValueDefinitions: { [key: string]: IMatrixItemValueDefinition } = {
  [MatrixMode.DIVISION]: {
    min: 0,
    max: 255,
    integer: true,
  },
  [MatrixMode.PULSE_WIDTH]: {
    min: 0,
    max: 1,
  },
};
