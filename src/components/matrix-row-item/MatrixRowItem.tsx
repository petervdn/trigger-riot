import { PropsWithChildren } from "react";
import { StyledMatrixRowItem } from "@/src/components/matrix-row-item/MatrixRowItem.styles";
import { MATRIX_ITEM_MARGIN, MATRIX_WIDTH } from "@/src/data/consts";
import { useMatrixStore } from "@/src/data/matrixStore";

type Props = {
  isSelected?: boolean;
} & PropsWithChildren;

const PADDING = 10;

export function MatrixRowItem({ children, isSelected }: Props) {
  const numberOfColumns = useMatrixStore((state) => state.numberOfColumns);

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
