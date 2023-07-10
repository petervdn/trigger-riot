import { create } from "zustand";

import {
  MatrixItem,
  MatrixItemEditableProperty,
} from "@/src/types/matrix.types";
import { Position } from "@/src/types/misc.types";
import { produce } from "immer";
import { createMatrixItems } from "@/src/utils/matrixStore.utils";
import { getPositionsForGroup } from "@/src/utils/matrixItemGroup.utils";

type MatrixStoreState = {
  // rows: Array<MatrixItemGroup>;
  // columns: Array<MatrixItemGroup>;
  numberOfRows: number;
  numberOfColumns: number;
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

    const selectedItemPositions = getPositionsForGroup({
      groupIdentifier: { type: "row", index: 0 },
      numberOfRows,
      numberOfColumns,
    });

    return {
      matrixItems,
      selectedItemPositions,
      numberOfRows,
      numberOfColumns,
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
