import { create } from "zustand";
import { DEFAULT_BPM, SCHEDULE_INTERVAL } from "@/src/data/consts";
import { audioContext } from "@/src/sound/audioContext";
import { schedule } from "@/src/sound/schedule";
import { getScheduleProps } from "@/src/sound/getScheduleProps";
import { samplePlayer } from "@/src/sound/SamplePlayer";

type PlayStoreState = {
  bpm: number;
  start: () => void;
  stop: () => void;
  audioContextStartTime: number | undefined; // context's time when user hit play
  scheduleIntervalId: number | undefined;
  isPlaying: boolean;
  getCurrentTime: () => number;
};

export const usePlayStore = create<PlayStoreState>((set, get) => {
  return {
    bpm: DEFAULT_BPM,
    audioContextStartTime: undefined,
    isPlaying: false,
    scheduleIntervalId: undefined,
    start: async () => {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // startTime needs to be set first
      set(() => {
        return {
          audioContextStartTime: audioContext.currentTime,
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
      samplePlayer.stopAll();
      clearInterval(get().scheduleIntervalId);

      console.log("stop");
      set(() => {
        return {
          audioContextStartTime: undefined,
          scheduleIntervalId: undefined,
          startTime: undefined,
          isPlaying: false,
        };
      });
    },
    getCurrentTime: () => {
      const { audioContextStartTime } = get();
      return audioContextStartTime !== undefined
        ? audioContext.currentTime - audioContextStartTime
        : 0;
    },
  };
});
