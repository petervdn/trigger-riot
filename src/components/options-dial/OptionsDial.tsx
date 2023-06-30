"use client";

import { Dial, DialProps } from "@/src/components/dial/Dial";
import { useMemo } from "react";

type Props = {
  value: string;
  options: Array<string>;
  onChange?: (value: string) => void;
} & Pick<DialProps, "size" | "buttonSize">;

export function OptionsDial({
  options,
  value,
  size,
  buttonSize,
  onChange,
}: Props) {
  const min = 0;
  const max = useMemo(() => options.length - 1, [options]);

  return (
    <>
      <Dial
        min={min}
        max={max}
        value={options.findIndex((option) => option === value)}
        size={size}
        integer={true}
        buttonSize={buttonSize}
        onChange={(value) => onChange?.(options[value])}
        getLabel={(value) => options[value]}
      />
    </>
  );
}
