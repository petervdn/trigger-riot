import { IGridItem } from '../data/interface';

const drawSettings = {
  margin: {
    top: 10,
    bottom: 10,
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
  clearContext(context);

  context.fillStyle = drawSettings.drawColor;
  const top = drawSettings.margin.top;
  const bottom = context.canvas.height - drawSettings.margin.bottom;
  const duration = endTime - startTime;
  const timePerPixel = duration / context.canvas.width;
  for (let x = 0; x < context.canvas.width; x += 1) {
    const value = getValueAtTimeForGridItems(startTime + timePerPixel * x, items, bpm);
    context.fillRect(x, bottom - value * (bottom - top), 1, 1);
  }
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

export function clearContext(
  context: CanvasRenderingContext2D,
  color = drawSettings.bgColor,
): void {
  context.fillStyle = color;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
