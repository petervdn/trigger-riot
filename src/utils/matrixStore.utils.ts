import { Position, RowOrColumn } from "@/src/types/misc.types";
import { MatrixItem, MatrixItemGroup } from "@/src/types/matrix.types";
import { matrixItemsGroupIdentifierToString } from "@/src/data/sampleStore.utils";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";

export function positionIsInPositions(
  position: Position,
  positions: Array<Position>
): boolean {
  return positions.some(({ x, y }) => position.x === x && position.y === y);
}

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

export function createRowAndColumns({
  numberOfRows,
  numberOfColumns,
  matrixItems,
}: {
  matrixItems: Array<MatrixItem>;
  numberOfRows: number;
  numberOfColumns: number;
}) {
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
      stringId: matrixItemsGroupIdentifierToString(identifier),
    };
  });
}

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

export function getPositionForIndex(index: number, numberOfColumns: number) {
  return {
    x: index % numberOfColumns,
    y: Math.floor(index / numberOfColumns),
  };
}

export function getIndexForPosition(position: Position, numberOfRows: number) {
  return position.y * numberOfRows + position.x;
}
