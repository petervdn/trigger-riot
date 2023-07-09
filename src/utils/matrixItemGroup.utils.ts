import {
  MatrixItemGroupIdentifier,
  MatrixItemGroupIdentifierString,
} from "@/src/types/matrix.types";
import { Position } from "@/src/types/misc.types";

export function matrixItemGroupIdentifierToString({
  index,
  type,
}: MatrixItemGroupIdentifier): MatrixItemGroupIdentifierString {
  return `${type}-${index}`;
}

export function getPositionsForGroup({
  groupIdentifier,
  numberOfRows,
  numberOfColumns,
}: {
  groupIdentifier: MatrixItemGroupIdentifier;
  numberOfRows: number;
  numberOfColumns: number;
}): Array<Position> {
  if (groupIdentifier.type === "row") {
    return Array.from({ length: numberOfColumns }).map((_, index) => ({
      x: index,
      y: groupIdentifier.index,
    }));
  }

  return Array.from({ length: numberOfRows }).map((_, index) => ({
    x: groupIdentifier.index,
    y: index,
  }));
}
