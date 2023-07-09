import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";
import { useMemo } from "react";
import { useMatrixItemsForPositions } from "@/src/utils/hooks/useMatrixItemForPosition";

export function useMatrixItemsForGroup(
  groupIdentifier: MatrixItemsGroupIdentifier
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
