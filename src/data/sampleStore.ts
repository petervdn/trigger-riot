import {
  MatrixItemGroupIdentifier,
  MatrixItemGroupIdentifierString,
} from "@/src/types/matrix.types";
import { create } from "zustand";
import { matrixItemGroupIdentifierToString } from "@/src/utils/matrixItemGroup.utils";
import { loadSound } from "@/src/utils/sound.utils";

export type Sample = {
  filename: string;
  name?: string;
  audioBuffer?: AudioBuffer;
  isLoading?: boolean;
};

type SampleStoreState = {
  samples: Array<Sample>;
  samplesByGroupId: Record<MatrixItemGroupIdentifierString, Sample | undefined>;
  getSampleForGroup: (id: MatrixItemGroupIdentifier) => Sample | undefined;
  setSampleForGroup: (
    id: MatrixItemGroupIdentifier,
    sample: Sample | undefined
  ) => void;
  loadSample: (sample: Sample) => Promise<void>;
};

export const useSampleStore = create<SampleStoreState>((set, get) => {
  return {
    setSampleForGroup: (groupIdentifier, sample) => {
      const idString = matrixItemGroupIdentifierToString(groupIdentifier);
      set(({ samplesByGroupId }) => {
        samplesByGroupId[idString] = sample;
        return {
          samplesByGroupId,
        };
      });
    },
    getSampleForGroup: (groupIdentifier) => {
      const idString = matrixItemGroupIdentifierToString(groupIdentifier);
      return get().samplesByGroupId[idString];
    },
    samplesByGroupId: {},
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
    loadSample: async (sampleToLoad) => {
      if (!sampleToLoad.audioBuffer) {
        // todo: this should probably be done in a cleaner way

        // find index of sample to update
        const index = get().samples.findIndex(
          (sample) => sample === sampleToLoad
        );

        // set loading state
        set(({ samplesByGroupId }) => {
          get().samples[index].isLoading = true;
          return {
            samplesByGroupId: { ...samplesByGroupId },
          };
        });

        // load
        const audioBuffer = await loadSound(
          `/sounds/${sampleToLoad?.filename}`
        );

        // set loaded state
        set(({ samplesByGroupId }) => {
          get().samples[index].audioBuffer = audioBuffer;
          get().samples[index].isLoading = false;
          return {
            samplesByGroupId: { ...samplesByGroupId },
          };
        });
      } else {
        return Promise.resolve();
      }
    },
  };
});
