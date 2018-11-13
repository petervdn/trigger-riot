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

export function createGridData(rows = 4, columns = 4, defaultPulseWidth = 0.25): IGridData {
  const items: Array<IGridItem> = [];
  let index = 0;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      items.push({
        index,
        position: { x, y },
        division: 4,
        pulseWidth: Math.random(),
      });

      index += 1;
    }
  }

  return { rows, columns, items };
}
