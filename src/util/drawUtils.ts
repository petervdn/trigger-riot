import { IGridItem, IPosition, ITimeSlot } from '../data/interface';
import { getSlotsInRange } from './gridUtils';

export function drawWaveForItems(
  context: CanvasRenderingContext2D,
  gridItem: IGridItem,
  bpm: number,
  startTime: number,
  endTime: number,
) {
  context.fillStyle = 'black'; // todo move somewhere
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  const pixelsPerSecond = context.canvas.width / (endTime - startTime);
  drawBeats(context, startTime, endTime, bpm, pixelsPerSecond);
  drawTimeSlots(context, gridItem, startTime, endTime, bpm, pixelsPerSecond);
}

function drawTimeSlots(
  context: CanvasRenderingContext2D,
  gridItem: IGridItem,
  startTime: number, // todo rename to time window or something, and combine to Itimeslot
  endTime: number,
  bpm: number,
  pixelsPerSecond: number,
  yMargin = 10,
  lineWidth = 2,
  color = 'deepskyblue',
): void {
  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  const slots = getSlotsInRange(gridItem, bpm, startTime, endTime);
  const points = getLinePointsForTimeSlots(context, startTime, endTime, slots, pixelsPerSecond);

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
  startTime: number,
  endTime: number,
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
      slot.startTime,
      startTime,
      endTime,
      pixelsPerSecond,
    );
    endX = getPositionXInCanvasForTime(context, slot.endTime, startTime, endTime, pixelsPerSecond);

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
  startTime: number,
  endTime: number,
  bpm: number,
  pixelsPerSecond: number,
  color = 'red',
  lineWidth = 1,
): void {
  const secondsPerBeat = 60 / bpm;

  const firstBeatAfterStart = Math.ceil(startTime / secondsPerBeat) * secondsPerBeat;
  if (firstBeatAfterStart > endTime) {
    return;
  }

  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  let time = firstBeatAfterStart;
  while (time < endTime) {
    const x = getPositionXInCanvasForTime(context, time, startTime, endTime, pixelsPerSecond);
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
  startTime: number,
  endTime: number,
  pixelsPerSecond: number,
): number {
  return pixelsPerSecond * (time - startTime);
}
