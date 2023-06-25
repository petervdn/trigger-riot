import { useMatrixStore } from "@/src/data/matrixStore";
import {
  StyledMatrixRow,
  StyledMatrixWrapper,
} from "@/src/components/matrix/Matrix.styles";
import { MatrixInputItem } from "@/src/components/matrix-input-item/MatrixInputItem";
import { MatrixGroupControls } from "@/src/components/matrix-group-controls/MatrixGroupControls";
import { MatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem";

export function Matrix() {
  const { matrix } = useMatrixStore();

  return (
    <StyledMatrixWrapper>
      {Array.from({ length: matrix.numberOfRows }).map((_, rowIndex) => {
        const startIndex = rowIndex * matrix.numberOfColumns;
        const endIndex = startIndex + matrix.numberOfColumns;
        const rowItems = matrix.items.slice(startIndex, endIndex);
        return (
          <StyledMatrixRow key={rowIndex}>
            {rowItems.map((item, columnIndex) => {
              return (
                <MatrixRowItem
                  key={columnIndex}
                  position={{ x: columnIndex, y: rowIndex }}
                >
                  <MatrixInputItem matrixItem={item} />
                </MatrixRowItem>
              );
            })}
            <MatrixRowItem>
              <MatrixGroupControls
                groupIdentifier={{ type: "row", index: rowIndex }}
              />
            </MatrixRowItem>
          </StyledMatrixRow>
        );
      })}
      <StyledMatrixRow>
        {Array.from({ length: matrix.numberOfColumns }).map((_, index) => (
          <MatrixRowItem key={index}>
            <MatrixGroupControls groupIdentifier={{ type: "column", index }} />
          </MatrixRowItem>
        ))}
      </StyledMatrixRow>
    </StyledMatrixWrapper>
  );
}
