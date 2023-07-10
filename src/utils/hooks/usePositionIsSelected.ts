import { Position } from "@/src/types/misc.types";
import { useMatrixStore } from "@/src/data/matrixStore";
import { positionIsInPositions } from "@/src/utils/misc.utils";

export function usePositionIsSelected() {
  const selectedItemPositions = useMatrixStore(
    (state) => state.selectedItemPositions
  );
  return (position: Position) =>
    positionIsInPositions(position, selectedItemPositions);
}
