import { create } from "zustand";
import { produce } from "immer";
import { createMatrix, getMatrixItemsForGroup } from "@/src/utils/matrixUtils";
import {
  Matrix,
  MatrixItem,
  MatrixItemEditableProperty,
  MatrixItemsGroupIdentifier,
} from "@/src/types/matrix.types";
import { RowOrColumn, Position } from "@/src/types/misc.types";

type MatrixStoreState = {
  matrix: Matrix;
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

export const useMatrixStore = create<MatrixStoreState>((set, get) => {
  return {
    matrix: createMatrix({ numberOfRows: 4, numberOfColumns: 4 }),
    setValue: (type, index, value) =>
      set(({ matrix }) => {
        return {
          matrix: produce(matrix, (draft) => {
            draft.items[index][type].value = value;
          }),
        };
      }),
    editMode: "division",
    setEditMode: (editMode) => set(() => ({ editMode })),
    setSelectedItemPositions: (positions) =>
      set(() => ({ selectedItemPositions: positions })),
    selectedItemPositions: [],
  };
});
