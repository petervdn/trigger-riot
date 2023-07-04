import { useSizedCanvas } from "@/src/utils/hooks/useSizedCanvas";
import { useEffect, useRef } from "react";
import {
  drawStartButton,
  drawStopButton,
} from "@/src/components/play-button/PlayButton.utils";

type Props = {
  size: number;
  isPlaying: boolean;
  onClick?: () => void;
};

export function PlayButton({ size, isPlaying, onClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSizedCanvas({ width: size, height: size, canvasRef });

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (isPlaying) {
      drawStopButton(canvasRef.current.getContext("2d")!);
    } else {
      drawStartButton(canvasRef.current.getContext("2d")!);
    }
  }, [isPlaying]);

  return (
    <div style={{ cursor: "pointer" }} onClick={() => onClick?.()}>
      <canvas ref={canvasRef} />
    </div>
  );
}
