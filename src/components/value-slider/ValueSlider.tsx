import { Slider } from "@mui/material";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  isDisabled?: boolean;
};

export function ValueSlider({ value, onChange, min, max, isDisabled }: Props) {
  return (
    <Slider
      valueLabelDisplay={"auto"}
      value={value}
      min={min}
      max={max}
      step={0.01}
      disabled={isDisabled}
      onChange={(_, value) => {
        if (typeof value === "number") {
          onChange?.(value);
        }
      }}
    />
  );
}
