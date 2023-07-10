import { usePlayStore } from "@/src/data/playStore";
import { shallow } from "zustand/shallow";
import { MAX_BPM, MIN_BPM } from "@/src/data/consts";
import { ValueSlider } from "@/src/components/value-slider/ValueSlider";

export function Settings() {
  const { bpm, setBpm } = usePlayStore(
    (state) => ({
      bpm: state.bpm,
      setBpm: state.setBpm,
    }),
    shallow
  );

  return (
    <>
      <ValueSlider
        label={"test"}
        value={bpm}
        min={MIN_BPM}
        max={MAX_BPM}
        onChange={setBpm}
      />
    </>
  );
}
