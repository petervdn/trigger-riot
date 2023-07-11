import { usePlayStore } from "@/src/data/playStore";
import { shallow } from "zustand/shallow";
import {
  MAX_BPM,
  MAX_WAVEVIEW_RANGE,
  MIN_BPM,
  MIN_WAVEVIEW_RANGE,
} from "@/src/data/consts";
import { useSettingsStore } from "@/src/data/settingsStore";
import { SettingsSlider } from "@/src/components/settings-slider/SettingsSlider";

export function Settings() {}
