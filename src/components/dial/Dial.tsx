"use client";

import { useEffect, useMemo, useRef } from "react";
import { drawDial } from "@/src/utils/dial.utils";
import { useDrag } from "@use-gesture/react";
import { clampValue } from "@/src/utils/number.utils";
import { DialKnob } from "@/src/components/dial-knob/DialKnob";
import {
  StyledDialWrapper,
  StyledKnobLabel,
  StyledKnobWrapper,
  StyledRelativePositioner,
} from "@/src/components/dial/Dial.styles";
import { PRIMARY_COLOR } from "@/src/data/consts";
import { useSizedCanvas } from "@/src/utils/hooks/useSizedCanvas";

export type DialProps = {
  min: number;
  max: number;
  onChange?: (value: number) => void;
  value: number;
  size: number;
  pixelsForFullRange?: number;
  integer?: boolean;
  buttonSize: number;
  getLabel?: (value: number, isInteger: boolean) => string | number;
};

const defaultGetLabel = (value: number, integer: boolean) =>
  value.toFixed(integer ? 0 : 2);

export function Dial({
  size,
  value,
  min,
  max,
  pixelsForFullRange = 100,
  onChange,
  buttonSize,
  integer = false,
  getLabel,
}: DialProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSizedCanvas({ width: size, height: size, canvasRef });
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
      color: PRIMARY_COLOR,
      bgColor: "#555",
    });
  }, [value, max, min]);

  const labelValue = useMemo(
    () =>
      getLabel ? getLabel(value, integer) : defaultGetLabel(value, integer),
    [value, integer, getLabel]
  );

  return (
    <StyledDialWrapper width={size}>
      <StyledRelativePositioner size={size}>
        <StyledKnobWrapper leftTopOffset={size * 0.5 - buttonSize * 0.5}>
          <DialKnob size={buttonSize} />
        </StyledKnobWrapper>
        <canvas
          {...bind()}
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
