import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { shallow } from "zustand/shallow";
import { getIndexForPosition } from "@/src/utils/matrixItem.utils";

export function useMatrixItemForPosition(position: Position) {
  const { numberOfRows } = useNumberOfRowsAndColumns();

  return useMatrixStore(
    (state) => state.matrixItems[getIndexForPosition(position, numberOfRows)]
  );
}

export function useMatrixItemsForPositions(positions: Array<Position>) {
  const { numberOfRows } = useNumberOfRowsAndColumns();

  return useMatrixStore(
    (state) =>
      positions.map(
        (position) =>
          state.matrixItems[getIndexForPosition(position, numberOfRows)]
      ),
    shallow
  );
}
