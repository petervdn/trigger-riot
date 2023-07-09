import { create } from "zustand";

import {
  MatrixItem,
  MatrixItemEditableProperty,
  MatrixItemGroup,
} from "@/src/types/matrix.types";
import { Position } from "@/src/types/misc.types";
import { produce } from "immer";
import { createInitialMatrixStoreState } from "@/src/utils/matrixStore.utils";

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
    const initialState = createInitialMatrixStoreState({
      numberOfColumns,
      numberOfRows,
    });

    return {
      ...initialState,
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
      editMode: "division",
      setEditMode: (editMode) => set(() => ({ editMode })),
      setSelectedItemPositions: (positions) =>
        set(() => ({ selectedItemPositions: positions })),
    };
  });
};

export const useMatrixStore = createMatrixStore({
  numberOfRows: 4,
  numberOfColumns: 4,
});
