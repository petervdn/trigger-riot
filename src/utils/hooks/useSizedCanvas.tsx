import { useEffect, useRef } from "react";

type Props = {
  width: number;
  height: number;
};

export function useSizedCanvas({ height, width }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
    canvasRef.current.width = width * window.devicePixelRatio;
    canvasRef.current.height = height * window.devicePixelRatio;
  }, [width, height]);

  return canvasRef;
}
