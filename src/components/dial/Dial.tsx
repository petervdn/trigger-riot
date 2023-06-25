"use client";

import {
  MouseEventHandler,
  useEffect,
  useRef,
  MouseEvent,
  useState,
} from "react";
import { drawDial } from "@/src/components/dial/dialUtils";
import { useDrag } from "@use-gesture/react";
import { clampValue } from "@/src/utils/numberUtils";
import { DialCircle } from "@/src/components/dial/DialCircle";

type Props = {
  min: number;
  max: number;
  onChange?: (value: number) => void;
  value: number;
  size: number;
  pixelsForFullRange?: number;
  integer?: boolean;
  buttonSize: number;
};

type DragData = {
  value: number;
  x: number;
  y: number;
};
export function Dial({
  size,
  value,
  min,
  max,
  pixelsForFullRange = 100,
  onChange,
  buttonSize,

  integer = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startDragDataRef = useRef<{ value: number; y: number }>();

  const bind = useDrag((state) => {
    if (state.first) {
      startDragDataRef.current = { value, y: state.xy[1] };
    }
    const offset = state.xy[1] - startDragDataRef.current!.y;
    const deltaValue = (offset / pixelsForFullRange) * (max - min);
    const newValue = startDragDataRef.current!.value - deltaValue;

    onChange?.(clampValue(integer ? Math.trunc(newValue) : newValue, min, max));
  }, {});

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    drawDial({
      context: canvasRef.current.getContext("2d")!,
      valueFactor: (value - min) / (max - min),
    });
  }, [value]);

  return (
    <div style={{ width: size, marginRight: 20 }}>
      <div
        style={{
          width: size,
          height: size,
          // backgroundColor: "cadetblue",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: size * 0.5 - buttonSize * 0.5,
            top: size * 0.5 - buttonSize * 0.5,
          }}
        >
          <DialCircle size={buttonSize} />
        </div>
        <canvas
          {...bind()}
          width={size * window.devicePixelRatio}
          height={size * window.devicePixelRatio}
          ref={canvasRef}
          style={{
            position: "absolute",
            width: size,
            height: size,
            // pointerEvents: "none",
          }}
        />
      </div>
      <p style={{ textAlign: "center", color: "#aaa" }}>
        {value.toFixed(integer ? 0 : 2)}
      </p>
    </div>
  );
}
