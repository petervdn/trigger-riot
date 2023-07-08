import {
  MatrixItemsGroupIdentifier,
  MatrixItemsGroupIdentifierString,
} from "@/src/types/matrix.types";
import { RowOrColumn } from "@/src/types/misc.types";

export function matrixItemsGroupIdentifierToString({
  index,
  type,
}: MatrixItemsGroupIdentifier): MatrixItemsGroupIdentifierString {
  return `${type}-${index}`;
}
