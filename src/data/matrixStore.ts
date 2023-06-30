import { create } from "zustand";
import {
  createMatrixItems,
  getIndexForPosition,
} from "@/src/utils/matrixUtils";
import {
  MatrixItem,
  MatrixItemEditableProperty,
} from "@/src/types/matrix.types";
import { Position } from "@/src/types/misc.types";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "@/src/data/consts";
import { produce } from "immer";

type MatrixStoreState = {
  numberOfRows: number;
  numberOfColumns: number;
  matrixItems: Array<MatrixItem>;
  setValue: (
    type: MatrixItemEditableProperty,
    index: number,
    value: number | string
  ) => void;
  editMode: MatrixItemEditableProperty;
  setEditMode: (mode: MatrixItemEditableProperty) => void;
  setSelectedItemPositions: (positions: Array<Position>) => void;
  selectedItemPositions: Array<Position>;
  getItemForPosition: (position: Position) => MatrixItem;
};

export const useMatrixStore = create<MatrixStoreState>((set, get) => {
  return {
    setValue: (type, index, value) => {
      set(({ matrixItems }) => {
        return {
          matrixItems: produce(matrixItems, (draft) => {
            draft[index][type].value = value;
          }),
        };
      });
    },
    numberOfRows: NUMBER_OF_ROWS,
    numberOfColumns: NUMBER_OF_COLUMNS,
    editMode: "division",
    setEditMode: (editMode) => set(() => ({ editMode })),
    setSelectedItemPositions: (positions) =>
      set(() => ({ selectedItemPositions: positions })),
    selectedItemPositions: [],
    getItemForPosition: (position) => {
      return get().matrixItems[
        getIndexForPosition(position, get().numberOfRows)
      ];
    },

    matrixItems: createMatrixItems({
      numberOfRows: NUMBER_OF_ROWS,
      numberOfColumns: NUMBER_OF_COLUMNS,
    }),
  };
});
