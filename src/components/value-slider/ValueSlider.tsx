import { Slider } from "@mui/material";

type Props = {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
};

export function ValueSlider({ value, label, onChange, min, max }: Props) {
  return (
    <Slider
      valueLabelDisplay={"auto"}
      value={value}
      min={min}
      max={max}
      onChange={(_, value) => {
        if (typeof value === "number") {
          onChange?.(value);
        }
      }}
    />
  );
}
