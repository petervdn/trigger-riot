import { PropsWithChildren } from "react";
import { StyledMatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem.styles";
import { MATRIX_ITEM_MARGIN, MATRIX_ITEM_WIDTH } from "@/src/data/consts";

type Props = {
  isSelected?: boolean;
} & PropsWithChildren;

export function MatrixRowItem({ isSelected = false, children }: Props) {
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
