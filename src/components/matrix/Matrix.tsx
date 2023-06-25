import { MatrixItem } from "@/src/components/matrix-item/MatrixItem";
import { useMatrixStore } from "@/src/data/matrixStore";
import {
  StyledMatrixRow,
  StyledMatrixWrapper,
} from "@/src/components/matrix/Matrix.styles";

export function Matrix() {
  const { matrix } = useMatrixStore();

  return (
    <StyledMatrixWrapper>
      {Array.from({ length: matrix.rows }).map((_, index) => {
        const startIndex = index * matrix.columns;
        const endIndex = startIndex + matrix.columns;
        const rowItems = matrix.items.slice(startIndex, endIndex);
        return (
          <StyledMatrixRow key={index}>
            {rowItems.map((item, index) => {
              return <MatrixItem matrixItem={item} key={index} />;
            })}
          </StyledMatrixRow>
        );
      })}
    </StyledMatrixWrapper>
  );
}
