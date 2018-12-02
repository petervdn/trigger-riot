import { IMatrixData, IMatrixItem, IMatrixItemGroup, IStore, ITimeSlot } from '../data/interface';
import StepTypes from '../data/enum/StepTypes';
import { round } from './miscUtils';
import { getRandomFloat, getRandomInt } from './numberUtils';
import { UPDATE_ITEM_VALUE } from '../store/module/matrix/matrix';
import { MatrixItemValueType } from '../data/enum/MatrixItemValue';

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

const getClockMultiplierByStepType = (stepType: string) => {
  const multipliers = {
    [StepTypes.QUARTER]: 1,
    [StepTypes.EIGHTH_D]: 3 / 4,
    [StepTypes.QUARTER_T]: 2 / 3,
    [StepTypes.EIGHTH]: 1 / 2,
    [StepTypes.SIXTEENTH_D]: 3 / 8,
    [StepTypes.EIGHTH_T]: 1 / 3,
    [StepTypes.SIXTEENTH]: 1 / 4,
    [StepTypes.THIRTYSECOND_D]: 3 / 16,
    [StepTypes.SIXTEENTH_T]: 1 / 6,
    [StepTypes.THIRTYSECOND]: 1 / 8,
    [StepTypes.THIRTYSECOND_T]: 1 / 12,
    [StepTypes.SIXTYFOURTH]: 1 / 16,
  };

  return multipliers[stepType] / 4;
};

export function getSlotsInRangeForMatrixItem(
  matrixItem: IMatrixItem,
  bpm: number,
  timeWindow: ITimeSlot,
): ITimeSlot[] {
  if (matrixItem.division === 0) {
    return [];
  }
  // const secondsPerBeat = (60 / bpm) * clockMultiplierByStepType[matrixItem.steps];
  const secondsPerBeat = (60 / bpm) * getClockMultiplierByStepType(matrixItem.steps);
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
      const item: IMatrixItem = {
        index,
        division: 0,
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

// interface IRandomizeData {
//   matrixItem: IMatrixItem;
//   min: number;
//   max: number;
// }

export function matrixItemValueTypeIsEnabled(type: MatrixItemValueType) {
  // todo rename (only value?)
  return [
    MatrixItemValueType.PULSE_WIDTH,
    MatrixItemValueType.DIVISION,
    MatrixItemValueType.STEPS,
  ].includes(type);
}

interface IRandomizeData {
  valueType: MatrixItemValueType;
  // dialData: IDialData;
}

export function createRandomizeData(): IRandomizeData[] {
  return [];
  // return valueTypes.filter(type => dialDataByType[type] !== undefined).map(type => ({
  //   valueType: type,
  //   dialData: dialDataByType[type],
  // }));
}

export function randomizeMatrixItems(
  matrixItems: IMatrixItem[],
  randomizeData: IRandomizeData[],
  activeValueTypes: string[],
  store: IStore,
) {
  matrixItems
    // loop through each matrix-item involved
    .forEach(matrixItem => {
      // for each item, loop through each valueType involved
      randomizeData
        .filter(randomizeEntry => activeValueTypes.includes(randomizeEntry.valueType))
        .forEach(randomizeEntry => {
          // set a value for this item, and for this valueType
          // if (
          //   randomizeEntry.dialData.min !== undefined &&
          //   randomizeEntry.dialData.max !== undefined
          // ) {
          //   store.commit(UPDATE_ITEM_VALUE, {
          //     itemIndex: matrixItem.index,
          //     valueType: randomizeEntry.valueType,
          //     value:
          //       randomizeEntry.dialData.integer !== undefined
          //         ? getRandomInt(randomizeEntry.dialData.min, randomizeEntry.dialData.max)
          //         : getRandomFloat(randomizeEntry.dialData.min, randomizeEntry.dialData.max),
          //   });
          // }
        });
    });
}
