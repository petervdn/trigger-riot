import { create } from "zustand";

type AudioContextStoreState = {
  audioContext: AudioContext | undefined;
  setAudioContext: (audioContext: AudioContext) => void;
};

export const useAudioContextStore = create<AudioContextStoreState>((set) => {
  return {
    audioContext: undefined,
    setAudioContext: (audioContext) => {
      set({ audioContext });
    },
  };
});
