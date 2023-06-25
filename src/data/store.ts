import { create } from "zustand";
import { produce } from "immer";
import { createMatrix } from "@/src/utils/matrixUtils";
import { Matrix, SettingType } from "@/src/types/matrix.types";

// type EditMode = Pick<MatrixItem, ''>

export type StoreState = {
  matrix: Matrix;
  setValue: (type: SettingType, index: number, value: number) => void;
  editMode: SettingType;
  setEditMode: (mode: SettingType) => void;
};

export const useMatrixStore = create<StoreState>((set) => {
  return {
    matrix: createMatrix({ rows: 4, columns: 4 }),
    setValue: (type, index, value) =>
      set(({ matrix }) => {
        return {
          matrix: produce(matrix, (draft) => {
            draft.items[index][type].value.value = value;
          }),
        };
      }),
    editMode: "division",
    setEditMode: (editMode) => set(() => ({ editMode })),
  };
});
