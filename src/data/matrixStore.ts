import { create } from "zustand";
import { produce } from "immer";
import { createMatrix } from "@/src/utils/matrixUtils";
import { Matrix, MatrixItemEditableProperty } from "@/src/types/matrix.types";

type MatrixStoreState = {
  matrix: Matrix;
  setValue: (
    type: MatrixItemEditableProperty,
    index: number,
    value: number
  ) => void;
  editMode: MatrixItemEditableProperty;
  setEditMode: (mode: MatrixItemEditableProperty) => void;
};

export const useMatrixStore = create<MatrixStoreState>((set) => {
  return {
    matrix: createMatrix({ rows: 4, columns: 4 }),
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
  };
});
