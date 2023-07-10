import { create } from "zustand";
import {
  DEFAULT_BPM,
  SCHEDULE_INTERVAL,
  SCHEDULE_LOOKAHEAD,
} from "@/src/data/consts";
import { audioContext } from "@/src/sound/audioContext";
import { schedule } from "@/src/sound/schedule";
import { getScheduleProps } from "@/src/sound/getScheduleProps";
import { samplePlayer } from "@/src/sound/SamplePlayer";

type PlayStoreState = {
  bpm: number;

  start: () => void;
  stop: () => void;
  startTime: number | undefined; // context's time when user hit play todo: rename
  scheduleIntervalId: number | undefined;
  isPlaying: boolean;
  getCurrentTime: () => number;
};

// todo: rename?
export const usePlayStore = create<PlayStoreState>((set, get) => {
  return {
    bpm: DEFAULT_BPM,
    startTime: undefined,
    isPlaying: false,
    scheduleIntervalId: undefined,
    start: async () => {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // startTime needs to be set first
      set(() => {
        return {
          startTime: audioContext.currentTime,
        };
      });

      // force first schedule with time = 0, otherwise the first samples (on 0.0) will not fire
      // (playtime might be something like 0.000005 on first schedule)
      schedule(getScheduleProps(0));

      const scheduleIntervalId = window.setInterval(() => {
        schedule(getScheduleProps(get().getCurrentTime()));
      }, SCHEDULE_INTERVAL * 1000);

      set(() => {
        return {
          scheduleIntervalId,
          isPlaying: true,
        };
      });
    },
    stop: async () => {
      set(() => {
        samplePlayer.stopAll();
        clearInterval(get().scheduleIntervalId);

        return {
          scheduleIntervalId: undefined,
          startTime: undefined,
          isPlaying: false,
        };
      });
    },
    getCurrentTime: () => {
      const { startTime } = get();
      return startTime !== undefined ? audioContext.currentTime - startTime : 0;
    },
  };
});
