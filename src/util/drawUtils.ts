import { IGridItem, IPosition, ITimeSlot } from '../data/interface';
import { isNumeric } from './miscUtils';
import { getSlotsInRange } from './gridUtils';

const drawSettings = {
  margin: {
    top: 10,
    bottom: 20,
  },
  drawColor: 'orange',
  bgColor: 'black',
};

export function drawWaveForItems(
  context: CanvasRenderingContext2D,
  gridItem: IGridItem,
  bpm: number,
  startTime: number,
  endTime: number,
) {
  clearContext(context, drawSettings.bgColor);

  drawBeats(context, startTime, endTime, bpm, 'red');
  drawTimeSlots(context, gridItem, startTime, endTime, bpm);
}

function drawTimeSlots(
  context: CanvasRenderingContext2D,
  gridItem: IGridItem,
  startTime: number, // todo rename to time window or something
  endTime: number,
  bpm: number,
  yMargin = 10,
  lineWidth = 2,
  color = 'deepskyblue',
): void {
  // todo fix broken line at beginning
  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  const yTop = yMargin;
  const yBottom = context.canvas.height - yMargin;

  const slots = getSlotsInRange(gridItem, bpm, startTime, endTime);
  let endX: number = 0;

  context.beginPath();
  slots.forEach((slot, index) => {
    const startX = getPositionXInCanvasForTime(context, slot.startTime, startTime, endTime);
    endX = getPositionXInCanvasForTime(context, slot.endTime, startTime, endTime);
    if (index === 0) {
      context.moveTo(startX, yBottom);
    } else {
      context.lineTo(startX, yBottom);
    }
    context.lineTo(startX, yTop);
    context.lineTo(endX, yTop);
    context.lineTo(endX, yBottom);
  });

  // make sure line reaches the end
  if (endX < context.canvas.width) {
    context.lineTo(context.canvas.width, yBottom);
  }

  context.stroke();
}

export function setCanvasSize(canvas: HTMLCanvasElement, width: number, height: number): void {
  const scale = window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * scale;
  canvas.height = height * scale;
}

function getSecondsPerPixel(
  context: CanvasRenderingContext2D,
  startTime: number,
  endTime: number,
): number {
  return (endTime - startTime) / context.canvas.width;
}

function getPixelsPerSecond(
  context: CanvasRenderingContext2D,
  startTime: number,
  endTime: number,
): number {
  return context.canvas.width / (endTime - startTime);
}

export function getValueAtTimeForGridItems(
  time: number,
  items: Array<IGridItem>,
  bpm: number,
): number {
  return getValueAtTimeForGridItem(time, { division: 2, pulseWidth: 0.25 }, bpm);
}

export function getValueAtTimeForGridItem(time: number, item: IGridItem, bpm: number): number {
  const secondsPerBeat = 60 / bpm;
  const repeatTimeForItem = item.division * secondsPerBeat;
  const positionInRepeat = (time / repeatTimeForItem) % 1;
  return positionInRepeat > item.pulseWidth ? 0 : 1;
}

export function clearContext(context: CanvasRenderingContext2D, color = 'black'): void {
  context.fillStyle = color;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawBeats(
  context: CanvasRenderingContext2D,
  startTime: number,
  endTime: number,
  bpm: number,
  color: string,
  lineWidth = 1,
): void {
  if (!isNumeric(startTime) || !isNumeric(endTime) || endTime < startTime) {
    return;
  }
  const secondsPerBeat = 60 / bpm;

  const firstBeatAfterStart = Math.ceil(startTime / secondsPerBeat) * secondsPerBeat;
  if (firstBeatAfterStart > endTime) {
    return;
  }

  // const pixelsPerSecond = getPixelsPerSecond(context, startTime, endTime);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  let time = firstBeatAfterStart;
  while (time < endTime) {
    const x = getPositionXInCanvasForTime(context, time, startTime, endTime);
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
): number {
  const pixelsPerSecond = getPixelsPerSecond(context, startTime, endTime);
  return pixelsPerSecond * (time - startTime);
}
