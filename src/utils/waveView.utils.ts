import { TimeWindow } from "@/src/types/misc.types";
import { BeatLabelType } from "@/src/data/consts";
import { Position } from "../types/misc.types";
import { MatrixItem } from "@/src/types/matrix.types";
import {
  getTimeSinceLastTimeSlotStart,
  getTimeSlotsInRangeForMatrixItems,
} from "@/src/utils/timeslots.utils";

export function drawWaveForItems({
  waveMargin = 0.2,
  bpm,
  matrixItems,
  context,
  beatLabelRepeat,
  beatLabelType,
  timeWindow,
  showBeats,
  color,
  backgroundColor = "black",
  currentTime,
}: {
  context: CanvasRenderingContext2D;
  matrixItems: Array<MatrixItem>;
  bpm: number;
  timeWindow: TimeWindow;
  waveMargin?: number;
  currentTime: number;
  showBeats: boolean;
  beatLabelType: string;
  beatLabelRepeat: number;
  color: string;
  backgroundColor?: string;
}) {
  context.fillStyle = backgroundColor;
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
  const timeSlots = getTimeSlotsInRangeForMatrixItems({
    matrixItems,
    bpm,
    timeWindow,
  });

  drawTimeSlots({
    context,
    timeSlots,
    timeWindow,
    pixelsPerSecond,
    waveMargin: context.canvas.height * waveMargin,
    color,
  });
  const timeSinceLastTimeSlotStart = getTimeSinceLastTimeSlotStart(
    timeSlots,
    currentTime
  );

  drawCurrentTime({
    context,
    currentTime,
    pixelsPerSecond,
    windowStartTime: timeWindow.start,
    timeSinceLastTimeSlotStart,
  });
}

function drawCurrentTime({
  currentTime,
  context,
  pixelsPerSecond,
  windowStartTime,
  timeSinceLastTimeSlotStart,
}: {
  context: CanvasRenderingContext2D;
  currentTime: number;
  pixelsPerSecond: number;
  windowStartTime: number;
  timeSinceLastTimeSlotStart?: number;
}) {
  const timeRange = 0.15;
  const lineWidthRange = [1, 6];
  const opacityRange = [0.8, 1];
  let opacity: number | undefined;
  let lineWidth: number | undefined;

  if (
    timeSinceLastTimeSlotStart !== undefined &&
    timeSinceLastTimeSlotStart < timeRange
  ) {
    const scale = 1 - timeSinceLastTimeSlotStart / timeRange;
    lineWidth =
      lineWidthRange[0] + scale * (lineWidthRange[1] - lineWidthRange[0]);
    opacity = opacityRange[0] + scale * (opacityRange[1] - opacityRange[0]);
  } else {
    opacity = opacityRange[0];
    lineWidth = lineWidthRange[0];
  }

  const x = getPositionXInCanvasForTime(
    context,
    currentTime,
    windowStartTime,
    pixelsPerSecond
  );
  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, context.canvas.height);

  context.strokeStyle = `rgba(255,255,255, ${opacity})`;
  context.lineWidth = lineWidth;
  context.stroke();
}

function drawTimeSlots({
  timeWindow,
  context,
  pixelsPerSecond,
  waveMargin,
  timeSlots,
  color,
  lineWidth = 2,
}: {
  context: CanvasRenderingContext2D;
  timeSlots: Array<TimeWindow>;
  timeWindow: TimeWindow;
  pixelsPerSecond: number;
  waveMargin: number;
  lineWidth?: number;
  color: string;
}): void {
  const linePoints = getLinePointsForTimeSlots({
    context,
    timeWindow,
    timeSlots,
    pixelsPerSecond,
    waveMargin,
  });

  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.beginPath();
  for (let i = 0; i < linePoints.length; i += 1) {
    if (i === 0) {
      context.moveTo(linePoints[i].x, linePoints[i].y);
    } else {
      context.lineTo(linePoints[i].x, linePoints[i].y);
    }
  }
  context.stroke();
}

/**
 * Returns both the positions for the pulse-wave
 * @param context
 * @param timeWindow
 * @param slots
 * @param pixelsPerSecond
 * @param waveMargin
 */
function getLinePointsForTimeSlots({
  timeWindow,
  context,
  timeSlots,
  pixelsPerSecond,
  waveMargin,
}: {
  context: CanvasRenderingContext2D;
  timeWindow: TimeWindow;
  timeSlots: Array<TimeWindow>;
  pixelsPerSecond: number;
  waveMargin: number;
}): Array<Position> {
  const linePoints: Array<Position> = [];
  const yTop = waveMargin;
  const yBottom = context.canvas.height - waveMargin;
  let endX: number = 0;

  const numSlots = timeSlots.length;
  for (let i = 0; i < numSlots; i += 1) {
    const slot = timeSlots[i];
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
    // when there are no results, draw a low line
    linePoints.push({ x: 0, y: yBottom });
    linePoints.push({ x: context.canvas.width, y: yBottom });
  }

  return linePoints;
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
  // context.fillStyle = color;
  // context.textAlign = "center";
  context.lineWidth = lineWidth;

  // const fontSize = 11 * window.devicePixelRatio;
  // const verticalMargin = 2;
  // context.font = `${fontSize}px 'Noto Sans KR'`;
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

    // const beatIndex = Math.round(time / secondsPerBeat);
    // if (beatLabelType && beatIndex > 0 && beatIndex % beatLabelRepeat === 0) {
    //   context.fillText(
    //     beatLabelType === BeatLabelType.SECONDS
    //       ? time.toFixed(2)
    //       : (beatIndex + 1).toString(),
    //     x,
    //     context.canvas.height - 2 * verticalMargin
    //   ); // that 2 * margin shouldn't be there, but it seems to center it better todo probably fix with measuring the text?
    //
    //   bottomY = context.canvas.height - 2 * verticalMargin - fontSize;
    // }

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
