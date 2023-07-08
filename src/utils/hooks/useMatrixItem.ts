import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { getIndexForPosition } from "@/src/utils/matrixStore.utils";

export function useMatrixItem(position: Position) {
  const { numberOfRows } = useNumberOfRowsAndColumns();

  return useMatrixStore(
    (state) => state.matrixItems[getIndexForPosition(position, numberOfRows)]
  );
}
