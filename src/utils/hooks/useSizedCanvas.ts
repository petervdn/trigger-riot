import { RefObject, useEffect } from "react";

type Props = {
  width: number;
  height: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export function useSizedCanvas({ canvasRef, height, width }: Props) {
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
    canvasRef.current.width = width * window.devicePixelRatio;
    canvasRef.current.height = height * window.devicePixelRatio;
  }, [width, height, canvasRef]);
}
