import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";

export function matrixItemsGroupIdentifierToString({
  index,
  type,
}: MatrixItemsGroupIdentifier) {
  return `${type}-${index}`;
}
