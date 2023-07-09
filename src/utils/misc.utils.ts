import { Position } from "@/src/types/misc.types";

/**
 * Checks if the given position exists in a list of positions.
 *
 * @param position
 * @param positions
 */
export function positionIsInPositions(
  position: Position,
  positions: Array<Position>
): boolean {
  return positions.some(({ x, y }) => position.x === x && position.y === y);
}
