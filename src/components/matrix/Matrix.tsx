import { useMatrixStore } from "@/src/data/matrixStore";
import {
  StyledMatrixRow,
  StyledMatrixWrapper,
} from "@/src/components/matrix/Matrix.styles";
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
  console.log("matrix", numberOfRows, numberOfColumns);
  return (
    <StyledMatrixWrapper>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
        return (
          <StyledMatrixRow key={rowIndex}>
            {Array.from({ length: numberOfColumns }).map(
              (item, columnIndex) => {
                return (
                  <MatrixRowItem
                    key={columnIndex}
                    position={{ x: columnIndex, y: rowIndex }}
                  >
                    <MatrixInputItem
                      position={{ x: columnIndex, y: rowIndex }}
                    />
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
    </StyledMatrixWrapper>
  );
}
