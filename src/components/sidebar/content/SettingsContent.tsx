import { usePlayStore } from "@/src/data/playStore";
import { shallow } from "zustand/shallow";
import { useSettingsStore } from "@/src/data/settingsStore";
import { SettingsSlider } from "@/src/components/settings-slider/SettingsSlider";
import {
  MAX_BPM,
  MAX_WAVEVIEW_RANGE,
  MIN_BPM,
  MIN_WAVEVIEW_RANGE,
} from "@/src/data/consts";

export function SettingsContent() {
  const { bpm, setBpm } = usePlayStore(
    (state) => ({
      bpm: state.bpm,
      setBpm: state.setBpm,
    }),
    shallow
  );

  const { setWaveViewRange, waveViewRange } = useSettingsStore(
    (state) => ({
      waveViewRange: state.waveViewRange,
      setWaveViewRange: state.setWaveViewRange,
    }),
    shallow
  );

  return (
    <>
      <SettingsSlider
        label={"bpm"}
        value={bpm}
        min={MIN_BPM}
        max={MAX_BPM}
        onChange={setBpm}
      />

      <SettingsSlider
        label={"large wave range"}
        value={waveViewRange.large}
        min={MIN_WAVEVIEW_RANGE.large}
        max={MAX_WAVEVIEW_RANGE.large}
        onChange={(value) => setWaveViewRange(value, "large")}
      />

      <SettingsSlider
        label={"small wave range"}
        value={waveViewRange.small}
        min={MIN_WAVEVIEW_RANGE.small}
        max={MAX_WAVEVIEW_RANGE.small}
        onChange={(value) => setWaveViewRange(value, "small")}
      />
    </>
  );
}
