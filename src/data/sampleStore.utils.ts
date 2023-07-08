import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { RowOrColumn } from "@/src/types/misc.types";

export type MatrixItemsGroupIdentifierString = `${RowOrColumn}-${number}`;

export function matrixItemsGroupIdentifierToString({
  index,
  type,
}: MatrixItemsGroupIdentifier): MatrixItemsGroupIdentifierString {
  return `${type}-${index}`;
}
