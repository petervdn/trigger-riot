import { MatrixItem } from "@/src/types/matrix.types";
import { round } from "@/src/utils/number.utils";
import { TimeWindow } from "@/src/types/misc.types";

// todo: maybe rename the timeslots concept

/**
 * Retrieve the timeslots
 * @param matrixItems
 * @param timeWindow
 * @param bpm
 */
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
        timeWindow: {
          start: Math.max(0, timeWindow.start),
          end: timeWindow.end,
        },
      })
    );
  }

  // always flatten, even if there was only 1 matrixItem (will make a correct wave when pulseWidth = 1)
  return flattenTimeSlots(slots).map((entry) => ({
    start: entry.start,
    end: entry.end,
  }));
}

function getClockMultiplierValue({ steps }: MatrixItem): number {
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
  // todo: division cannot be 0?
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

/**
 * Combine an array of timeslots to a new array in which the timeslots
 * don't overlap anymore (they are extended into longer timeslots)
 * .
 * @param timeSlots
 */
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

export function getTimeSinceLastTimeslotStart(
  timeslots: Array<TimeWindow>,
  beforeOrOnTime: number
) {
  let result: TimeWindow | undefined;
  for (let i = 0; i < timeslots.length; i++) {
    const timeDifference = beforeOrOnTime - timeslots[i].start;
    if (timeDifference <= 0) {
      if (i > 0) {
        // if i === 0 then no timeslot is in the past
        result = timeslots[i - 1];
      }
      break;
    }
  }

  return result ? beforeOrOnTime - result.start : undefined;
}
