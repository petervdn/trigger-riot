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
 * Uses original drawWave functions to draw the same wave on a wider buffer-canvas (so with
 * a larger timeWindow). After that, the wider image is used for a while by copying (and positioning) it into
 * the destination canvas until it has moved too far too the left and cannot be used anymore.
 */
export default class CachedWaveDrawer {
  private cache: ICachedCanvas | undefined;
  private refreshTime = 2;

  draw(
    context: CanvasRenderingContext2D,
    matrixItems: IMatrixItem[],
    bpm: number,
    timeWindow: ITimeSlot,
    waveMargin: number,
    drawIndexLabels: boolean,
    forceRedraw: boolean,
  ) {
    if (!this.cacheIsUsable(context, timeWindow) || forceRedraw) {
      this.cache = this.createCache(
        context,
        matrixItems,
        bpm,
        timeWindow,
        waveMargin,
        drawIndexLabels,
      );
    }

    if (this.cache) {
      context.drawImage(
        this.cache.context.canvas,
        getXPositionForCachedCanvas(this.cache, timeWindow),
        0,
      );
    }
  }

  private cacheIsUsable(originalContext: CanvasRenderingContext2D, timeWindow: ITimeSlot): boolean {
    if (!this.cache) {
      return false;
    }

    const xPos = getXPositionForCachedCanvas(this.cache, timeWindow);
    return xPos + this.cache.context.canvas.width > originalContext.canvas.width;
  }

  private createCache(
    context: CanvasRenderingContext2D,
    matrixItems: IMatrixItem[],
    bpm: number,
    timeWindow: ITimeSlot,
    waveMargin: number,
    drawIndexLabels: boolean,
  ): ICachedCanvas {
    const pixelsPerSecond = context.canvas.width / (timeWindow.end - timeWindow.start);
    // we want to draw a wider canvas (so we can use this to copy instead of redraw every frame)
    const extendedWidth = context.canvas.width + Math.floor(pixelsPerSecond * this.refreshTime);
    // calculate time window (can be off since we floor the new width of the canvas)
    const extendedTimeWindow = {
      start: timeWindow.start,
      end: timeWindow.start + (1 / pixelsPerSecond) * extendedWidth,
    };

    const bufferContext = document
      .createElement('canvas')
      .getContext('2d') as CanvasRenderingContext2D;
    setCanvasSize(bufferContext.canvas, extendedWidth, context.canvas.height, false);

    drawWaveForItems(
      bufferContext,
      matrixItems,
      bpm,
      extendedTimeWindow,
      waveMargin,
      drawIndexLabels,
    );

    return {
      context: bufferContext,
      timeWindow: extendedTimeWindow,
    };
  }
}
