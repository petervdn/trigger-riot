import { IMatrixItem, ITimeSlot } from '../data/interface';
import { drawWaveForItems, setCanvasSize } from './drawUtils';

interface ICachedCanvas {
  context: CanvasRenderingContext2D;
  timeWindow: ITimeSlot;
}

/**
 * Determines where to draw a cached canvas for a given timewindow.
 * @param cache
 * @param timeWindow
 */
function getXPositionForCachedCanvas(cache: ICachedCanvas, timeWindow: ITimeSlot): number {
  const cachePixelsPerSecond =
    cache.context.canvas.width / (cache.timeWindow.end - cache.timeWindow.start);
  return -(timeWindow.start - cache.timeWindow.start) * cachePixelsPerSecond;
}

/**
 * Creates a buffered canvas that is wider (set in seconds) than the requested (original) canvas.
 * @param context
 * @param matrixItems
 * @param bpm
 * @param timeWindow
 * @param waveMargin
 * @param drawIndexLabels
 * @param increaseTime
 */
function createCache(
  context: CanvasRenderingContext2D,
  matrixItems: IMatrixItem[],
  bpm: number,
  timeWindow: ITimeSlot,
  waveMargin: number,
  drawIndexLabels: boolean,
  increaseTime: number,
): ICachedCanvas {
  const pixelsPerSecond = context.canvas.width / (timeWindow.end - timeWindow.start);
  // we want to draw a wider canvas (so we can use this to copy instead of redraw every frame)
  const extendedWidth = context.canvas.width + Math.floor(pixelsPerSecond * increaseTime);
  // calculate time window (can be off since we floor the new width of the canvas)
  const extendedTimeWindow = {
    start: timeWindow.start,
    end: timeWindow.start + (1 / pixelsPerSecond) * extendedWidth,
  };

  // create the wider cache canvas
  const bufferContext = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D;
  setCanvasSize(bufferContext.canvas, extendedWidth, context.canvas.height, false);

  // draw into the cache
  drawWaveForItems(
    bufferContext,
    matrixItems,
    bpm,
    extendedTimeWindow,
    waveMargin,
    drawIndexLabels,
  );

  // return cache canvas,  including its time-window
  return {
    context: bufferContext,
    timeWindow: extendedTimeWindow,
  };
}

/**
 * Determines whether a given cache is still usable, if it is it returns the x-position it can be drawn at
 * @param originalContext
 * @param originalTimeWindow
 * @param cache
 */
function getCacheRedrawData(
  cache: ICachedCanvas | undefined,
  originalContext: CanvasRenderingContext2D,
  originalTimeWindow: ITimeSlot,
): { xPosition: number } | null {
  if (!cache) {
    return null;
  }

  const xPosition = getXPositionForCachedCanvas(cache, originalTimeWindow);
  return xPosition <= 0 && xPosition + cache.context.canvas.width > originalContext.canvas.width
    ? { xPosition }
    : null;
}

/**
 * Uses original drawWave functions to draw the same wave on a wider buffer-canvas (so with
 * a larger timeWindow). After that, the wider image is used for a while by copying (and positioning) it into
 * the destination canvas until it has moved too far too the left and cannot be used anymore.
 */
export default class CachedWaveDrawer {
  private cache: ICachedCanvas | undefined;
  private refreshTime = 3;

  draw(
    context: CanvasRenderingContext2D,
    matrixItems: IMatrixItem[],
    bpm: number,
    timeWindow: ITimeSlot,
    waveMargin: number,
    drawIndexLabels: boolean,
    forceRedraw: boolean,
  ) {
    const cacheRedrawData = getCacheRedrawData(this.cache, context, timeWindow);
    if (forceRedraw || !cacheRedrawData) {
      this.cache = createCache(
        context,
        matrixItems,
        bpm,
        timeWindow,
        waveMargin,
        drawIndexLabels,
        this.refreshTime,
      );
    }

    context.drawImage(
      this.cache!.context.canvas,
      cacheRedrawData ? cacheRedrawData.xPosition : 0,
      0,
    );
  }
}
