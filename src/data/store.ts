import { create } from "zustand";
import { produce } from "immer";
import { createMatrix } from "@/src/utils/matrixUtils";
import { Matrix, SettingType } from "@/src/types/matrix.types";

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
      set((state) => {
        return produce(state, (draft) => {
          draft.matrix.items[index][type].value.value = value;
        });
      }),
    editMode: "division",
    setEditMode: (editMode) => set((state) => ({ ...state, editMode })),
  };
});
