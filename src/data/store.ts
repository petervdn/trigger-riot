import { create } from "zustand";
import { produce } from "immer";

type Position = {
  x: number;
  y: number;
};

export type MatrixItem = {
  index: number;
  // position: Position;
  division: MatrixItemValue;
  pulseWidth: MatrixItemValue;
  // steps: IMatrixItemOptionsValue;
};

type MatrixItemValue = {
  type: "number";
  value: NumberValue;
};

export type SettingType = "pulseWidth" | "division";

type NumberValue = {
  value: number;
  min: number;
  max: number;
  isInteger: boolean;
};

type Matrix = {
  rows: number;
  columns: number;
  items: Array<MatrixItem>;
};

const createMatrix = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}): Matrix => {
  const items = Array.from({ length: rows * columns }, (_, index) => ({
    index,
    division: {
      type: "number" as const,
      value: {
        min: 1,
        max: 16,
        value: 1 + Math.round(Math.random() * 16),
        isInteger: true,
      },
    },
    pulseWidth: {
      type: "number" as const,
      value: {
        min: 0,
        max: 1,
        value: Math.random(),
        isInteger: false,
      },
    },
  }));

  return { rows, columns, items };
};

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
