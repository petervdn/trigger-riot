// import { getTimeSlotsInRangeForMatrixItems } from "./matrixUtils";
import { TimeWindow } from "@/src/types/misc.types";
import { BeatLabelType } from "@/src/data/consts";
import { Position } from "../types/misc.types";
import { MatrixItem } from "@/src/types/matrix.types";
import { getTimeSlotsInRangeForMatrixItems } from "@/src/utils/matrixUtils";

export function drawWaveForItems({
  waveMargin,
  bpm,
  matrixItems,
  context,
  beatLabelRepeat,
  beatLabelType,
  timeWindow,
  showBeats,
}: {
  context: CanvasRenderingContext2D;
  matrixItems: Array<MatrixItem>;
  bpm: number;
  timeWindow: TimeWindow;
  waveMargin: number;
  showBeats: boolean;
  beatLabelType: string;
  beatLabelRepeat: number;
}) {
  // clear canvas
  context.fillStyle = "black";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  const pixelsPerSecond =
    context.canvas.width / (timeWindow.end - timeWindow.start);
  if (showBeats) {
    drawBeats({
      context,
      timeWindow,
      bpm,
      pixelsPerSecond,
      beatLabelType,
      beatLabelRepeat,
    });
  }

  drawTimeSlots({
    context,
    matrixItems,
    timeWindow,
    bpm,
    pixelsPerSecond,
    waveMargin,
  });
}

export function drawTimeSlots({
  timeWindow,
  context,
  bpm,
  pixelsPerSecond,
  waveMargin,
  matrixItems,

  color = "deepskyblue",
  lineWidth = 2,
}: {
  context: CanvasRenderingContext2D;
  matrixItems: Array<MatrixItem>;
  timeWindow: TimeWindow;
  bpm: number;
  pixelsPerSecond: number;
  waveMargin: number;
  lineWidth?: number;
  color?: string;
}): void {
  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  const slots = getTimeSlotsInRangeForMatrixItems({
    matrixItems,
    bpm,
    timeWindow,
  });

  const drawData = getDrawDataForTimeSlots(
    context,
    timeWindow,
    slots,
    bpm,
    pixelsPerSecond,
    waveMargin
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
  timeWindow: TimeWindow,
  slots: Array<TimeWindow>,
  bpm: number,
  pixelsPerSecond: number,
  waveMargin: number
): { linePoints: Array<Position> } {
  const linePoints: Array<Position> = [];
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
      pixelsPerSecond
    );
    endX = getPositionXInCanvasForTime(
      context,
      slot.end,
      timeWindow.start,
      pixelsPerSecond
    );

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
  scaleToPixelRatio = true
): void {
  const scale = scaleToPixelRatio ? window.devicePixelRatio : 1;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * scale;
  canvas.height = height * scale;
}

export function drawBeats({
  bpm,
  pixelsPerSecond,
  beatLabelType,
  beatLabelRepeat,
  context,
  timeWindow,
  color = "dodgerblue",
  lineWidth = 1,
}: {
  context: CanvasRenderingContext2D;
  timeWindow: TimeWindow;
  bpm: number;
  pixelsPerSecond: number;
  beatLabelType: string;
  beatLabelRepeat: number;
  color?: string;
  lineWidth?: number;
}): void {
  const secondsPerBeat = 60 / bpm;

  const firstBeatAfterStart =
    Math.floor(timeWindow.start / secondsPerBeat) * secondsPerBeat;
  if (firstBeatAfterStart > timeWindow.end) {
    // so much zoomed in that the first beat isn't in view
    return;
  }

  context.strokeStyle = color;
  context.fillStyle = color;
  context.textAlign = "center";
  context.lineWidth = lineWidth;

  const fontSize = 11 * window.devicePixelRatio;
  const verticalMargin = 2;
  context.font = `${fontSize}px 'Noto Sans KR'`;
  // context.font = `${fontSize}px monospace`;

  let time = firstBeatAfterStart;
  while (time < timeWindow.end) {
    const x = getPositionXInCanvasForTime(
      context,
      time,
      timeWindow.start,
      pixelsPerSecond
    );
    let bottomY = context.canvas.height;

    const beatIndex = Math.round(time / secondsPerBeat);
    if (beatLabelType && beatIndex > 0 && beatIndex % beatLabelRepeat === 0) {
      context.fillText(
        beatLabelType === BeatLabelType.SECONDS
          ? time.toFixed(2)
          : (beatIndex + 1).toString(),
        x,
        context.canvas.height - 2 * verticalMargin
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
  pixelsPerSecond: number
): number {
  return pixelsPerSecond * (time - windowStartTime);
}
