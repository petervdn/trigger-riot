import { RowOrColumn } from "@/src/types/misc.types";
import { MatrixItem, MatrixItemGroup } from "@/src/types/matrix.types";
import {
  getPositionsForGroup,
  matrixItemGroupIdentifierToString,
} from "@/src/utils/matrixItemGroup.utils";
import { getPositionForIndex } from "@/src/utils/matrixItem.utils";
import { positionIsInPositions } from "@/src/utils/misc.utils";

/**
 * Gets the label for the "steps" dial, where certain values
 * are shown as their relation to the tempo.
 *
 * @param value
 */
function getLabelForStepValue(value: number): string | number {
  const labels: Record<number, string> = {
    [6]: "64th",
    [8]: "32t",
    [12]: "32nd",
    [16]: "16t",
    [18]: "32d",
    [24]: "16th",
    [32]: "8t",
    [36]: "16d",
    [48]: "8th",
    [64]: "4t",
    [72]: "8d",
    [96]: "4th",
  };

  return labels[value] || value;
}

/**
 * Creates rows and columns for a list of matrix items.
 *
 * @param numberOfRows
 * @param numberOfColumns
 * @param matrixItems
 */
export function createRowAndColumns({
  numberOfRows,
  numberOfColumns,
  matrixItems,
}: {
  matrixItems: Array<MatrixItem>;
  numberOfRows: number;
  numberOfColumns: number;
}): { rows: Array<MatrixItemGroup>; columns: Array<MatrixItemGroup> } {
  return {
    rows: createMatrixGroups({
      type: "row",
      numberOfRows,
      numberOfColumns,
      matrixItems,
    }),
    columns: createMatrixGroups({
      type: "column",
      numberOfRows,
      numberOfColumns,
      matrixItems,
    }),
  };
}

/**
 * Creates either rows or columns from a given list of
 * matrix items.
 *
 * @param type
 * @param numberOfRows
 * @param numberOfColumns
 * @param matrixItems
 */
export function createMatrixGroups({
  type,
  numberOfRows,
  numberOfColumns,
  matrixItems,
}: {
  type: RowOrColumn;
  matrixItems: Array<MatrixItem>;
  numberOfRows: number;
  numberOfColumns: number;
}): Array<MatrixItemGroup> {
  return Array.from({
    length: type === "row" ? numberOfRows : numberOfColumns,
  }).map((_, index) => {
    const identifier = { type, index };
    const positions = getPositionsForGroup({
      groupIdentifier: identifier,
      numberOfRows,
      numberOfColumns,
    });
    return {
      items: matrixItems.filter(({ position }) =>
        positionIsInPositions(position, positions)
      ),
      identifier,
      stringId: matrixItemGroupIdentifierToString(identifier),
    };
  });
}

/**
 * Creates a list of matrix items.
 *
 * @param numberOfRows
 * @param numberOfColumns
 */
export function createMatrixItems({
  numberOfRows,
  numberOfColumns,
}: {
  numberOfRows: number;
  numberOfColumns: number;
}): Array<MatrixItem> {
  return Array.from({ length: numberOfRows * numberOfColumns }, (_, index) => ({
    index,
    position: getPositionForIndex(index, numberOfColumns),
    division: {
      type: "number" as const,
      min: 1,
      max: 8,
      value: 1,
      isInteger: true,
    },
    pulseWidth: {
      type: "number" as const,
      min: 0,
      max: 1,
      value: 0.5,
      isInteger: false,
    },
    steps: {
      type: "number" as const,
      min: 2,
      max: 96,
      value: 24,
      isInteger: true,
      getLabel: getLabelForStepValue,
    },
  }));
}
