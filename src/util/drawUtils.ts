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
    const value = getValueAtTimeForItems(startTime + timePerPixel * x, items);
    context.fillRect(x, bottom - value * (bottom - top), 1, 1);
  }
}

export function getValueAtTimeForItems(time: number, items: Array<IGridItem>): number {
  return Math.random() > 0.5 ? 1 : 0;
}

export function clearContext(
  context: CanvasRenderingContext2D,
  color = drawSettings.bgColor,
): void {
  context.fillStyle = color;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
