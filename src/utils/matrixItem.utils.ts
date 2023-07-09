import { Position } from "@/src/types/misc.types";

/**
 * Retrieves the position of a matrix item for a given index.
 *
 * @param index
 * @param numberOfColumns
 */
export function getPositionForIndex(
  index: number,
  numberOfColumns: number
): Position {
  return {
    x: index % numberOfColumns,
    y: Math.floor(index / numberOfColumns),
  };
}

/**
 * Gets the index of a matrix item for a given position.
 *
 * @param position
 * @param numberOfRows
 */
export function getIndexForPosition(
  position: Position,
  numberOfRows: number
): number {
  return position.y * numberOfRows + position.x;
}
