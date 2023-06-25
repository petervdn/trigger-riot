import { useMatrixStore } from "@/src/data/matrixStore";
import { useMemo } from "react";
import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { getMatrixItemsForGroup } from "@/src/utils/matrixUtils";

export function useGroupedItems(groupIdentifier: MatrixItemsGroupIdentifier) {
  const {
    matrix: { items, numberOfColumns },
  } = useMatrixStore();

  return useMemo(() => {
    return getMatrixItemsForGroup({
      items,
      groupIdentifier,
      numberOfColumns: numberOfColumns,
    });
  }, [groupIdentifier, items, numberOfColumns]);
}
