import { PropsWithChildren } from "react";
import { StyledMatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem.styles";
import { MATRIX_ITEM_MARGIN, MATRIX_ITEM_WIDTH } from "@/src/data/consts";
import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { shallow } from "zustand/shallow";

type Props = {
  position: Position;
} & PropsWithChildren;

export function MatrixRowItem({ position, children }: Props) {
  const { numberOfRows, numberOfColumns } = useMatrixStore(
    (state) => ({
      numberOfRows: state.numberOfRows,
      numberOfColumns: state.numberOfColumns,
    }),
    shallow
  );

  const selectedItemPositions = useMatrixStore(
    (state) => state.selectedItemPositions
  );
  const isSelected = selectedItemPositions.some(
    ({ x, y }) => position && x === position.x && y === position.y
  );

  return (
    <StyledMatrixRowItem
      isSelected={isSelected}
      style={{
        width: MATRIX_ITEM_WIDTH,
        marginRight: MATRIX_ITEM_MARGIN,
        marginBottom: MATRIX_ITEM_MARGIN,
      }}
    >
      {children}
    </StyledMatrixRowItem>
  );
}
