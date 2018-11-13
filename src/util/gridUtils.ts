import { IGridData, IGridItem, ITimeSlot } from '../data/interface';

export function getSlotsInRange(
  gridItem: IGridItem,
  bpm: number,
  timeWindow: ITimeSlot,
): ITimeSlot[] {
  const secondsPerBeat = 60 / bpm;
  const itemRepeatTime = gridItem.division * secondsPerBeat;

  // get last one that starts before starttme
  let entryStart = Math.floor(timeWindow.start / itemRepeatTime) * itemRepeatTime;

  const results: ITimeSlot[] = [];
  while (entryStart < timeWindow.end) {
    const entryEnd = entryStart + gridItem.pulseWidth * itemRepeatTime;

    if (
      (entryStart > timeWindow.start && entryStart < timeWindow.end) ||
      (entryEnd > timeWindow.start && entryEnd < timeWindow.end)
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

export function createGridData(
  numberOfRows = 4,
  numberOfColumns = 4,
  defaultPulseWidth = 0.25,
): IGridData {
  const items: Array<IGridItem> = [];

  let index = 0;
  for (let y = 0; y < numberOfRows; y += 1) {
    for (let x = 0; x < numberOfColumns; x += 1) {
      const item: IGridItem = {
        index,
        position: { x, y },
        division: Math.round(Math.random() * 15),
        pulseWidth: Math.random(),
      };
      items.push(item);
      index += 1;
    }
  }

  const columns: Array<Array<IGridItem>> = [];
  for (let x = 0; x < numberOfColumns; x += 1) {
    columns.push(items.filter(item => item.position.x === x));
  }

  const rows: Array<Array<IGridItem>> = [];
  for (let y = 0; y < numberOfRows; y += 1) {
    rows.push(items.filter(item => item.position.y === y));
  }

  return { rows, columns, items };
}
