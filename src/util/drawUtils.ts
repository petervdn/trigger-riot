import { IGridItem } from '../data/interface';
import { isNumeric } from './miscUtils';

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
  items: Array<IGridItem>,
  bpm: number,
  startTime: number,
  endTime: number,
) {
  clearContext(context, drawSettings.bgColor);

  drawBeats(context, startTime, endTime, bpm, 'red');

  // context.fillStyle = drawSettings.drawColor;
  // const top = drawSettings.margin.top;
  // const bottom = context.canvas.height - drawSettings.margin.bottom;
  // const duration = endTime - startTime;
  // const timePerPixel = duration / context.canvas.width;
  //
  // // loop through every pixel todo refactor to other approach
  // let previousValue = 0;
  // for (let x = 0; x < context.canvas.width; x += 1) {
  //   const value = getValueAtTimeForGridItems(startTime + timePerPixel * x, items, bpm);
  //   const height = value !== previousValue ? bottom - top : 1;
  //   const y = bottom - value * (bottom - top);
  //   context.fillRect(x, y, 1, value === 0 && previousValue === 1 ? -height : height);
  //   previousValue = value;
  // }
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

  const pixelsPerSecond = getPixelsPerSecond(context, startTime, endTime);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  let time = firstBeatAfterStart;
  while (time < endTime) {
    const x = pixelsPerSecond * (time - startTime);
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, context.canvas.height);
    context.stroke();

    time += secondsPerBeat;
  }
}
