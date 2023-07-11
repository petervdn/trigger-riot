import { create } from "zustand";
import { DEFAULT_WAVEVIEW_RANGE } from "@/src/data/consts";

type WaveViewRangeValues = {
  small: number;
  large: number;
};

type PlayStoreState = {
  waveViewRange: WaveViewRangeValues;
  setWaveViewRange: (value: number, type: "small" | "large") => void;
};

export const useSettingsStore = create<PlayStoreState>((set, get) => {
  return {
    waveViewRange: DEFAULT_WAVEVIEW_RANGE,
    setWaveViewRange: (value, type) => {
      set((state) => {
        return {
          waveViewRange: { ...state.waveViewRange, [type]: value },
        };
      });
    },
  };
});
