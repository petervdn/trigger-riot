import { IMatrixItem, IPosition, ITimeSlot } from '../data/interface';
import { flattenTimeSlots, getSlotsInRange } from './matrixUtils';

export function drawWaveForItems(
  context: CanvasRenderingContext2D,
  matrixItems: IMatrixItem[],
  bpm: number,
  timeWindow: ITimeSlot,
  waveMargin: number,
) {
  // clear canvas
  context.fillStyle = 'black'; // todo move color somewhere (all default draw options actually)
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  const pixelsPerSecond = context.canvas.width / (timeWindow.end - timeWindow.start);
  drawBeats(context, timeWindow, bpm, pixelsPerSecond);

  drawTimeSlots(context, matrixItems, timeWindow, bpm, pixelsPerSecond, waveMargin);
}

function drawTimeSlots(
  context: CanvasRenderingContext2D,
  matrixItems: IMatrixItem[],
  timeWindow: ITimeSlot,
  bpm: number,
  pixelsPerSecond: number,
  waveMargin: number,
  lineWidth = 2,
  color = 'deepskyblue',
): void {
  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  let slots: ITimeSlot[] = [];
  for (let i = 0; i < matrixItems.length; i += 1) {
    slots.push(...getSlotsInRange(matrixItems[i], bpm, timeWindow));
  }
  // always flatten, even if there was only 1 matrixItem (will make a correct wave when pulseWidth = 1)
  slots = flattenTimeSlots(slots);
  const points = getLinePointsForTimeSlots(context, timeWindow, slots, pixelsPerSecond, waveMargin);

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
  waveMargin: number,
): IPosition[] {
  const results: IPosition[] = [];
  const yTop = waveMargin;
  const yBottom = context.canvas.height - waveMargin;
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
  } else {
    // when there are no results, draw a low line
    results.push({ x: 0, y: yBottom });
    results.push({ x: context.canvas.width, y: yBottom });
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
  lineWidth = 0.5,
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

export function drawStopButton(context: CanvasRenderingContext2D, size: number): void {
  context.clearRect(0, 0, size, size);

  drawStartStopButtonCircle(context, size);
  const halfSize = size * 0.5;
  const dist = 0.3 * halfSize;
  context.beginPath();
  context.moveTo(halfSize + dist, halfSize + dist);
  context.lineTo(halfSize - dist, halfSize + dist);
  context.lineTo(halfSize - dist, halfSize - dist);
  context.lineTo(halfSize + dist, halfSize - dist);
  context.lineTo(halfSize + dist, halfSize + dist);

  context.fillStyle = 'white';
  context.fill();
}

export function drawStartButton(context: CanvasRenderingContext2D, size: number): void {
  context.clearRect(0, 0, size, size);

  drawStartStopButtonCircle(context, size);

  const halfSize = size * 0.5;
  context.beginPath();
  context.moveTo(halfSize + 0.4 * halfSize, halfSize);
  context.lineTo(halfSize - 0.2 * halfSize, halfSize - 0.4 * halfSize);
  context.lineTo(halfSize - 0.2 * halfSize, halfSize + 0.4 * halfSize);

  context.fillStyle = 'white';
  context.fill();
}

function drawStartStopButtonCircle(context: CanvasRenderingContext2D, size: number): void {
  const halfSize = size * 0.5;
  const lineWidth = 3;
  const margin = 2;
  const pi2 = Math.PI * 2;
  context.beginPath();
  context.arc(halfSize, halfSize, halfSize - 0.5 * lineWidth - margin, 0, pi2);
  context.strokeStyle = 'white';
  context.lineWidth = lineWidth;
  context.stroke();
}
