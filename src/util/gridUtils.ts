import { IGridItem, ITimeSlot } from '../data/interface';

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
