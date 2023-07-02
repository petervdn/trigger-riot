"use client";

import { useEffect, useRef } from "react";
import { usePlayTime } from "@/src/utils/hooks/usePlayTime";
import { drawWaveForItems } from "@/src/utils/waveViewUtils";
import { usePlayStore } from "@/src/data/playStore";
import { BeatLabelType, MAIN_COLOR } from "@/src/data/consts";
import { MatrixItem } from "@/src/types/matrix.types";
import { useSizedCanvas } from "@/src/utils/hooks/useSizedCanvas";

type Props = {
  width: number;
  height: number;
  matrixItems: Array<MatrixItem>;
  lookaheadTime: number;
};

export function WaveView({ height, width, matrixItems, lookaheadTime }: Props) {
  const canvasRef = useSizedCanvas({ width, height });
  const bpm = usePlayStore((state) => state.bpm);
  const playTime = usePlayTime();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    drawWaveForItems({
      context: canvasRef.current.getContext("2d")!,
      bpm,
      timeWindow: { start: playTime, end: playTime + lookaheadTime },
      waveMargin: 40,
      showBeats: true,
      matrixItems,
      beatLabelType: BeatLabelType.BEAT_INDEX,
      beatLabelRepeat: 0,
      color: MAIN_COLOR,
    });
  }, [playTime, matrixItems, lookaheadTime, bpm]);

  return <canvas ref={canvasRef} style={{ width, height }} />;
}
