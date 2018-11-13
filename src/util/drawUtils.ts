import { IGridItem, IPosition, ITimeSlot } from '../data/interface';
import { getSlotsInRange } from './gridUtils';

export function drawWaveForItems(
  context: CanvasRenderingContext2D,
  gridItem: IGridItem | null,
  bpm: number,
  timeWindow: ITimeSlot,
) {
  // clear canvas
  context.fillStyle = 'black'; // todo move color somewhere (all default draw options actually)
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  if (!gridItem) {
    return;
  }
  const pixelsPerSecond = context.canvas.width / (timeWindow.end - timeWindow.start);
  drawBeats(context, timeWindow, bpm, pixelsPerSecond);
  drawTimeSlots(context, gridItem, timeWindow, bpm, pixelsPerSecond);
}

function drawTimeSlots(
  context: CanvasRenderingContext2D,
  gridItem: IGridItem,
  timeWindow: ITimeSlot,
  bpm: number,
  pixelsPerSecond: number,
  yMargin = 10,
  lineWidth = 2,
  color = 'deepskyblue',
): void {
  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  const slots = getSlotsInRange(gridItem, bpm, timeWindow);
  const points = getLinePointsForTimeSlots(context, timeWindow, slots, pixelsPerSecond);

  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
    } else {
      context.lineTo(point.x, point.y);
    }
  });

  context.stroke();
}

function getLinePointsForTimeSlots(
  context: CanvasRenderingContext2D,
  timeWindow: ITimeSlot,
  slots: ITimeSlot[],
  pixelsPerSecond: number,
  yMargin = 20,
): IPosition[] {
  const results: IPosition[] = [];
  const yTop = yMargin;
  const yBottom = context.canvas.height - yMargin;
  let endX: number = 0;

  context.beginPath();
  const numSlots = slots.length;
  for (let i = 0; i < numSlots; i += 1) {
    const slot = slots[i];
    const startX = getPositionXInCanvasForTime(
      context,
      slot.start,
      timeWindow.start,
      pixelsPerSecond,
    );
    endX = getPositionXInCanvasForTime(context, slot.end, timeWindow.start, pixelsPerSecond);

    results.push({ x: startX, y: yBottom });
    results.push({ x: startX, y: yTop });
    results.push({ x: endX, y: yTop });
    results.push({ x: endX, y: yBottom });
  }

  if (results.length) {
    // make sure line starts from full left
    if (results[0].x > 0) {
      results.unshift({ x: 0, y: yBottom });
    }
    // and make sure it reaches the end
    if (results[results.length - 1].x < context.canvas.width) {
      results.push({ x: context.canvas.width, y: yBottom });
    }
  }

  return results;
}

export function setCanvasSize(canvas: HTMLCanvasElement, width: number, height: number): void {
  const scale = window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * scale;
  canvas.height = height * scale;
}

export function drawBeats(
  context: CanvasRenderingContext2D,
  timeWindow: ITimeSlot,
  bpm: number,
  pixelsPerSecond: number,
  color = 'red',
  lineWidth = 1,
): void {
  const secondsPerBeat = 60 / bpm;

  const firstBeatAfterStart = Math.ceil(timeWindow.start / secondsPerBeat) * secondsPerBeat;
  if (firstBeatAfterStart > timeWindow.end) {
    return;
  }

  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  let time = firstBeatAfterStart;
  while (time < timeWindow.end) {
    const x = getPositionXInCanvasForTime(context, time, timeWindow.start, pixelsPerSecond);
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, context.canvas.height);
    context.stroke();

    time += secondsPerBeat;
  }
}

function getPositionXInCanvasForTime(
  context: CanvasRenderingContext2D,
  time: number,
  windowStartTime: number,
  pixelsPerSecond: number,
): number {
  return pixelsPerSecond * (time - windowStartTime);
}
