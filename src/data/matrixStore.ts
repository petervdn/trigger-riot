import { create } from "zustand";

import {
  MatrixItem,
  MatrixItemEditableProperty,
  MatrixItemGroup,
} from "@/src/types/matrix.types";
import { Position } from "@/src/types/misc.types";
import { produce } from "immer";
import {
  createMatrixItems,
  createRowAndColumns,
} from "@/src/utils/matrixStore.utils";

type MatrixStoreState = {
  rows: Array<MatrixItemGroup>;
  columns: Array<MatrixItemGroup>;
  matrixItems: Array<MatrixItem>;
  setValue: (
    type: MatrixItemEditableProperty,
    index: number,
    value: number
  ) => void;
  editMode: MatrixItemEditableProperty;
  setEditMode: (mode: MatrixItemEditableProperty) => void;
  setSelectedItemPositions: (positions: Array<Position>) => void;
  selectedItemPositions: Array<Position>;
};

export const createMatrixStore = ({
  numberOfRows,
  numberOfColumns,
}: {
  numberOfRows: number;
  numberOfColumns: number;
}) => {
  return create<MatrixStoreState>((set) => {
    const matrixItems = createMatrixItems({
      numberOfRows,
      numberOfColumns,
    });

    const { rows, columns } = createRowAndColumns({
      numberOfColumns,
      matrixItems,
      numberOfRows,
    });

    return {
      setValue: (type, index, value) => {
        set(({ matrixItems }) => {
          matrixItems[index] = produce(matrixItems[index], (draft) => {
            draft[type].value = value;
          });

          return {
            matrixItems,
          };
        });
      },
      rows,
      columns,
      editMode: "division",
      setEditMode: (editMode) => set(() => ({ editMode })),
      setSelectedItemPositions: (positions) =>
        set(() => ({ selectedItemPositions: positions })),
      selectedItemPositions: [],

      matrixItems,
    };
  });
};

export const useMatrixStore = createMatrixStore({
  numberOfRows: 4,
  numberOfColumns: 4,
});
