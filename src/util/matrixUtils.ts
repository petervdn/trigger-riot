import { IMatrixData, IMatrixItem, ITimeSlot } from '../data/interface';

export function getSlotsInRange(
  matrixItem: IMatrixItem,
  bpm: number,
  timeWindow: ITimeSlot,
): ITimeSlot[] {
  const secondsPerBeat = 60 / bpm;
  const itemRepeatTime = matrixItem.division * secondsPerBeat;

  // get last one that starts before starttme
  let entryStart = Math.floor(timeWindow.start / itemRepeatTime) * itemRepeatTime;

  const results: ITimeSlot[] = [];
  while (entryStart < timeWindow.end) {
    const entryEnd = entryStart + matrixItem.pulseWidth * itemRepeatTime;

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

    entryStart += itemRepeatTime;
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

  const columns: IMatrixItem[][] = [];
  for (let x = 0; x < numberOfColumns; x += 1) {
    columns.push(items.filter(item => item.position.x === x));
  }

  const rows: Array<Array<IMatrixItem>> = [];
  for (let y = 0; y < numberOfRows; y += 1) {
    rows.push(items.filter(item => item.position.y === y));
  }

  return { rows, columns, items };
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
