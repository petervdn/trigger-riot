import { useMatrixStore } from "@/src/data/matrixStore";
import { StyledMatrixRow } from "@/src/components/matrix/Matrix.styles";
import { MatrixInputItem } from "@/src/components/matrix-input-item/MatrixInputItem";
import { MatrixGroupControls } from "@/src/components/matrix-group-controls/MatrixGroupControls";
import { MatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem";
import { shallow } from "zustand/shallow";

export function Matrix() {
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

  return (
    <>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
        return (
          <StyledMatrixRow key={rowIndex}>
            {Array.from({ length: numberOfColumns }).map(
              (item, columnIndex) => {
                const position = { x: columnIndex, y: rowIndex };
                const isSelected = selectedItemPositions.some(
                  ({ x, y }) => position && x === position.x && y === position.y
                );
                return (
                  <MatrixRowItem key={columnIndex} isSelected={isSelected}>
                    <MatrixInputItem position={position} />
                  </MatrixRowItem>
                );
              }
            )}
            <MatrixRowItem>
              <MatrixGroupControls
                groupIdentifier={{ type: "row", index: rowIndex }}
              />
            </MatrixRowItem>
          </StyledMatrixRow>
        );
      })}
      <StyledMatrixRow>
        {Array.from({ length: numberOfColumns }).map((_, index) => (
          <MatrixRowItem key={index}>
            <MatrixGroupControls groupIdentifier={{ type: "column", index }} />
          </MatrixRowItem>
        ))}
      </StyledMatrixRow>
    </>
  );
}
