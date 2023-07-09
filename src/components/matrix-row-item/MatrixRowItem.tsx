import { PropsWithChildren } from "react";
import { StyledMatrixRowItem } from "@/src/components/matrix-row-item/MatrixRowItem.styles";
import { MATRIX_ITEM_MARGIN, MATRIX_WIDTH } from "@/src/data/consts";
import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { positionIsInPositions } from "@/src/utils/misc.utils";

type Props = {
  position: Position;
} & PropsWithChildren;

const PADDING = 10;

export function MatrixRowItem({ position, children }: Props) {
  const selectedItemPositions = useMatrixStore(
    (state) => state.selectedItemPositions
  );
  const numberOfColumns = useMatrixStore((state) => state.columns.length);
  const isSelected = positionIsInPositions(position, selectedItemPositions);

  const width =
    (MATRIX_WIDTH - numberOfColumns * MATRIX_ITEM_MARGIN) /
    (numberOfColumns + 1);

  return (
    <StyledMatrixRowItem
      isSelected={isSelected}
      style={{
        width: width - 2 * PADDING,
        padding: PADDING,
        paddingBottom: 5,
      }}
    >
      {children}
    </StyledMatrixRowItem>
  );
}
