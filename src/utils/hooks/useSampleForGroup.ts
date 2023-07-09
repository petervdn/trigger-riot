import { useSampleStore } from "@/src/data/sampleStore";
import { MatrixItemGroupIdentifier } from "@/src/types/matrix.types";
import { matrixItemGroupIdentifierToString } from "@/src/utils/matrixItemGroup.utils";

export function useSampleForGroup(groupIdentifier: MatrixItemGroupIdentifier) {
  return useSampleStore(
    (state) =>
      state.samplesByGroup[matrixItemGroupIdentifierToString(groupIdentifier)]
  );
}
