import { MatrixItemGroupIdentifier } from "@/src/types/matrix.types";
import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { useMemo } from "react";
import { useMatrixItemsForPositions } from "@/src/utils/hooks/useMatrixItemForPosition";
import { getPositionsForGroup } from "@/src/utils/matrixItemGroup.utils";

export function useMatrixItemsForGroup(
  groupIdentifier: MatrixItemGroupIdentifier
) {
  const { numberOfRows, numberOfColumns } = useNumberOfRowsAndColumns();
  const positions = useMemo(
    () =>
      getPositionsForGroup({
        groupIdentifier,
        numberOfRows,
        numberOfColumns,
      }),
    [groupIdentifier, numberOfColumns, numberOfRows]
  );

  return useMatrixItemsForPositions(positions);
}
