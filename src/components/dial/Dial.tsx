"use client";

import { useEffect, useRef } from "react";
import { drawDial } from "@/src/utils/dialUtils";
import { useDrag } from "@use-gesture/react";
import { clampValue } from "@/src/utils/numberUtils";
import { DialKnob } from "@/src/components/dial-knob/DialKnob";
import {
  StyledDialWrapper,
  StyledKnobLabel,
  StyledKnobWrapper,
  StyledRelativePositioner,
} from "@/src/components/dial/Dial.styles";

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

  const labelValue = value.toFixed(integer ? 0 : 2);

  return (
    <StyledDialWrapper width={size}>
      <StyledRelativePositioner size={size}>
        <StyledKnobWrapper leftTopOffset={size * 0.5 - buttonSize * 0.5}>
          <DialKnob size={buttonSize} />
        </StyledKnobWrapper>
        <canvas
          {...bind()}
          width={size * window.devicePixelRatio}
          height={size * window.devicePixelRatio}
          ref={canvasRef}
          style={{
            position: "absolute",
            width: size,
            height: size,
            touchAction: "none",
          }}
        />
      </StyledRelativePositioner>
      <StyledKnobLabel>{labelValue}</StyledKnobLabel>
    </StyledDialWrapper>
  );
}
