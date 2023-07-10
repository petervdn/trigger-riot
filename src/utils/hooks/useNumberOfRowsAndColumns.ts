import { useMatrixStore } from "@/src/data/matrixStore";
import { shallow } from "zustand/shallow";

// todo: maybe remove
export function useNumberOfRowsAndColumns() {
  return useMatrixStore(
    (state) => ({
      numberOfRows: state.numberOfRows,
      numberOfColumns: state.numberOfColumns,
    }),
    shallow
  );
}
