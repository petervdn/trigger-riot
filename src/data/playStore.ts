import { create } from "zustand";

type PlayStoreState = {
  bpm: number;
};

export const usePlayStore = create<PlayStoreState>((set, get) => {
  return {
    bpm: 120,
  };
});
