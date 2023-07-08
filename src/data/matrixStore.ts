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
  getIndexForPosition,
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
  getItemForPosition: (position: Position) => MatrixItem;
};

export const createMatrixStore = ({
  numberOfRows,
  numberOfColumns,
}: {
  numberOfRows: number;
  numberOfColumns: number;
}) => {
  return create<MatrixStoreState>((set, get) => {
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
          return {
            matrixItems: produce(matrixItems, (draft) => {
              draft[index][type].value = value;
            }),
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
      getItemForPosition: (position) => {
        return get().matrixItems[
          getIndexForPosition(position, get().rows.length)
        ];
      },

      matrixItems,
    };
  });
};

export const useMatrixStore = createMatrixStore({
  numberOfRows: 4,
  numberOfColumns: 4,
});
