import { Position } from "../../types/misc.types";
import { PropsWithChildren } from "react";
import { StyledMatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem.styles";
import { useMatrixStore } from "@/src/data/matrixStore";

type Props = {
  position?: Position;
} & PropsWithChildren;

export function MatrixRowItem({ position, children }: Props) {
  const { selectedItemPositions } = useMatrixStore();

  const isSelected = selectedItemPositions.some(
    ({ x, y }) => position && x === position.x && y === position.y
  );

  return (
    <StyledMatrixRowItem isSelected={isSelected}>
      {children}
    </StyledMatrixRowItem>
  );
}
