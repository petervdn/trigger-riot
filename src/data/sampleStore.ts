import {
  MatrixItemGroupIdentifier,
  MatrixItemGroupIdentifierString,
} from "@/src/types/matrix.types";
import { create } from "zustand";
import { matrixItemGroupIdentifierToString } from "@/src/utils/matrixItemGroup.utils";

export type Sample = {
  filename: string;
  name?: string;
  buffer?: AudioBuffer;
};

type SampleStoreState = {
  samples: Array<Sample>;
  samplesByGroup: Record<MatrixItemGroupIdentifierString, Sample | undefined>;
  getSampleForGroup: (id: MatrixItemGroupIdentifier) => Sample | undefined;
  setSampleForGroup: (
    id: MatrixItemGroupIdentifier,
    sample: Sample | undefined
  ) => void;
};

export const useSampleStore = create<SampleStoreState>((set, get) => {
  return {
    setSampleForGroup: (groupIdentifier, sample) => {
      const idString = matrixItemGroupIdentifierToString(groupIdentifier);
      set(() => {
        return {
          samplesByGroup: { ...get().samplesByGroup, [idString]: sample },
        };
      });
    },
    getSampleForGroup: (groupIdentifier) => {
      const idString = matrixItemGroupIdentifierToString(groupIdentifier);
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
