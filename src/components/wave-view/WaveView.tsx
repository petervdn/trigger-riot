import { useEffect, useRef } from "react";
import { usePlayTime } from "@/src/utils/hooks/usePlayTime";
import { drawWaveForItems } from "@/src/utils/waveViewUtils";
import { usePlayStore } from "@/src/data/playStore";
import { BeatLabelType } from "@/src/data/consts";
import { useMatrixStore } from "@/src/data/matrixStore";

type Props = {
  width: number;
  height: number;
};
export function WaveView({ height, width }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { bpm } = usePlayStore();
  const playTime = usePlayTime();
  const { selectedItemPositions, matrixItems } = useMatrixStore((state) => {
    return {
      selectedItemPositions: state.selectedItemPositions,
      matrixItems: state.matrixItems,
    };
  });

  const itemsToDraw = matrixItems.filter((item) => {
    return selectedItemPositions.some(
      ({ x, y }) => x === item.position.x && y === item.position.y
    );
  });

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    drawWaveForItems({
      context: canvasRef.current.getContext("2d")!,
      bpm,
      timeWindow: { start: playTime, end: playTime + 4 },
      waveMargin: 40,
      showBeats: true,
      matrixItems: itemsToDraw,
      beatLabelType: BeatLabelType.BEAT_INDEX,
      beatLabelRepeat: 0,
    });
  }, [playTime, itemsToDraw]); // todo: why does this rerender on item value change? + add exhaustive deps rule

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * window.devicePixelRatio}
        height={height * window.devicePixelRatio}
        style={{ width, height }}
      />
    </>
  );
}
