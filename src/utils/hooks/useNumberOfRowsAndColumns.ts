import { useMatrixStore } from "@/src/data/matrixStore";
import { shallow } from "zustand/shallow";

export function useNumberOfRowsAndColumns() {
  return useMatrixStore(
    (state) => ({
      numberOfRows: state.rows.length,
      numberOfColumns: state.columns.length,
    }),
    shallow
  );
}
