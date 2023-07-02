import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { matrixItemsGroupIdentifierToString } from "@/src/data/sampleStore.utils";
import { create } from "zustand";

type Sample = {
  filename: string;
  name?: string;
  buffer?: AudioBuffer;
};

type SampleStoreState = {
  samples: Array<Sample>;
  samplesByGroup: Record<string, Sample | undefined>;
  getSampleForGroup: (id: MatrixItemsGroupIdentifier) => Sample | undefined;
  setSampleForGroup: (
    id: MatrixItemsGroupIdentifier,
    sample: Sample | undefined
  ) => void;
};

export const useSampleStore = create<SampleStoreState>((set, get) => {
  return {
    setSampleForGroup: (groupIdentifier, sample) => {
      const idString = matrixItemsGroupIdentifierToString(groupIdentifier);
      set(() => {
        return {
          samplesByGroup: { ...get().samplesByGroup, [idString]: sample },
        };
      });
    },
    getSampleForGroup: (groupIdentifier) => {
      const idString = matrixItemsGroupIdentifierToString(groupIdentifier);
      return get().samplesByGroup[idString];
    },
    samplesByGroup: {},
    samples: [
      {
        filename: "plok.wav",
        name: "plok",
      },
      {
        filename: "kick.wav",
        name: "kick",
      },
    ],
  };
});
