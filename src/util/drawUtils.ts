import { IMatrixItem, IPosition, ITimeSlot } from '../data/interface';
import { getTimeSlotsInRangeForMatrixItems } from './matrixUtils';

export function drawWaveForItems(
  context: CanvasRenderingContext2D,
  matrixItems: IMatrixItem[],
  bpm: number,
  timeWindow: ITimeSlot,
  waveMargin: number,
  drawBeatIndex: boolean,
) {
  // clear canvas
  context.fillStyle = 'black'; // todo move color somewhere (all default draw options actually)
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  const pixelsPerSecond = context.canvas.width / (timeWindow.end - timeWindow.start);
  drawBeats(context, timeWindow, bpm, pixelsPerSecond, drawBeatIndex);

  drawTimeSlots(context, matrixItems, timeWindow, bpm, pixelsPerSecond, waveMargin);
}

export function drawTimeSlots(
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

  const slots = getTimeSlotsInRangeForMatrixItems(matrixItems, bpm, timeWindow);
  const drawData = getDrawDataForTimeSlots(
    context,
    timeWindow,
    slots,
    bpm,
    pixelsPerSecond,
    waveMargin,
  );

  context.beginPath();
  for (let i = 0; i < drawData.linePoints.length; i += 1) {
    if (i === 0) {
      context.moveTo(drawData.linePoints[i].x, drawData.linePoints[i].y);
    } else {
      context.lineTo(drawData.linePoints[i].x, drawData.linePoints[i].y);
    }
  }
  context.stroke();
}

/**
 * Returns both the positions for the pulse-wave
 * @param context
 * @param timeWindow
 * @param slots
 * @param bpm
 * @param pixelsPerSecond
 * @param waveMargin
 */
function getDrawDataForTimeSlots(
  context: CanvasRenderingContext2D,
  timeWindow: ITimeSlot,
  slots: ITimeSlot[],
  bpm: number,
  pixelsPerSecond: number,
  waveMargin: number,
): { linePoints: IPosition[] } {
  const linePoints: IPosition[] = [];
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

    linePoints.push({ x: startX, y: yBottom });
    linePoints.push({ x: startX, y: yTop });
    linePoints.push({ x: endX, y: yTop });
    linePoints.push({ x: endX, y: yBottom });
  }

  if (linePoints.length) {
    // make sure line starts from full left
    if (linePoints[0].x > 0) {
      linePoints.unshift({ x: 0, y: yBottom });
    }
    // and make sure it reaches the end
    if (linePoints[linePoints.length - 1].x < context.canvas.width) {
      linePoints.push({ x: context.canvas.width, y: yBottom });
    }
  } else {
    // when there are no results, draw a low line todo fix high line, when not playing, that goes beyond the canvas range
    linePoints.push({ x: 0, y: yBottom });
    linePoints.push({ x: context.canvas.width, y: yBottom });
  }

  return { linePoints };
}

export function setCanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  scaleToPixelRatio = true,
): void {
  const scale = scaleToPixelRatio ? window.devicePixelRatio : 1;
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
  drawBeatIndex: boolean,
  drawTime = true,
  color = 'dodgerblue',
  lineWidth = 1,
): void {
  const secondsPerBeat = 60 / bpm;

  const firstBeatAfterStart = Math.floor(timeWindow.start / secondsPerBeat) * secondsPerBeat;
  if (firstBeatAfterStart > timeWindow.end) {
    // so much zoomed in that the first beat isn't in view
    return;
  }

  context.strokeStyle = color;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.lineWidth = lineWidth;

  const fontSize = 11;
  const verticalMargin = 2;
  context.font = `${fontSize}px 'Noto Sans KR'`;
  // context.font = `${fontSize}px monospace`;

  let time = firstBeatAfterStart;
  while (time < timeWindow.end) {
    const x = getPositionXInCanvasForTime(context, time, timeWindow.start, pixelsPerSecond);
    let bottomY = context.canvas.height;

    const beatIndex = Math.round(time / secondsPerBeat);
    if (drawBeatIndex && beatIndex > 0 && beatIndex % 1 === 0) {
      context.fillText(
        drawTime ? time.toFixed(2) : beatIndex.toString(),
        x,
        context.canvas.height - 2 * verticalMargin,
      ); // that 2 * margin shouldn't be there, but it seems to center it better todo probably fix with measuring the text?

      bottomY = context.canvas.height - 2 * verticalMargin - fontSize;
    }

    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, bottomY);
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
  const lineWidth = 2;
  const margin = 2;
  const pi2 = Math.PI * 2;
  context.beginPath();
  context.arc(halfSize, halfSize, halfSize - 0.5 * lineWidth - margin, 0, pi2);
  context.strokeStyle = 'white';
  context.lineWidth = lineWidth;
  context.stroke();
}
