import { ComponentProps } from "react";
import { ValueSlider } from "@/src/components/value-slider/ValueSlider";

type Props = {
  label: string;
} & ComponentProps<typeof ValueSlider>;

export function SettingsSlider({ label, ...restProps }: Props) {
  return (
    <>
      <label>
        <small>{label}</small>
      </label>
      <ValueSlider {...restProps} />
    </>
  );
}
