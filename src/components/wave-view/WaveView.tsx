"use client";

import { useEffect, useRef } from "react";
import { usePlayTime } from "@/src/utils/hooks/usePlayTime";
import { drawWaveForItems } from "@/src/utils/waveView.utils";
import { usePlayStore } from "@/src/data/playStore";
import { BeatLabelType, PRIMARY_COLOR } from "@/src/data/consts";
import { MatrixItem } from "@/src/types/matrix.types";
import { useSizedCanvas } from "@/src/utils/hooks/useSizedCanvas";

type Props = {
  width: number;
  height: number;
  matrixItems: Array<MatrixItem>;
  viewRange: number; // in seconds
};

export function WaveView({ height, width, matrixItems, viewRange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSizedCanvas({ width, height, canvasRef });
  const bpm = usePlayStore((state) => state.bpm);
  const playTime = usePlayTime();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    drawWaveForItems({
      context: canvasRef.current.getContext("2d")!,
      bpm,
      timeWindow: {
        start: playTime - 0.5 * viewRange,
        end: playTime + 0.5 * viewRange,
      },
      showBeats: true,
      matrixItems,
      beatLabelType: BeatLabelType.BEAT_INDEX,
      beatLabelRepeat: 0,
      color: PRIMARY_COLOR,
    });
  }, [playTime, matrixItems, viewRange, bpm]);

  return <canvas ref={canvasRef} style={{ width, height }} />;
}
