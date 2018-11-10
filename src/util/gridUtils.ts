import { IGridItem, ITimeSlot } from '../data/interface';

export function getSlotsInRange(
  gridItem: IGridItem,
  bpm: number,
  startTime: number,
  endTime: number,
): ITimeSlot[] {
  const secondsPerBeat = 60 / bpm;
  const itemRepeatTime = gridItem.division * secondsPerBeat;

  // get last one that starts before starttme
  let entryStart = Math.floor(startTime / itemRepeatTime) * itemRepeatTime;

  const results: any[] = [];
  while (entryStart < endTime) {
    const entryEnd = entryStart + gridItem.pulseWidth * itemRepeatTime;

    if (
      (entryStart > startTime && entryStart < endTime) ||
      (entryEnd > startTime && entryEnd < endTime)
    ) {
      results.push({
        startTime: entryStart,
        endTime: entryEnd,
      });
    }

    entryStart += itemRepeatTime;
  }
  return results;
}
