import { StyledMatrixRow } from "@/src/components/matrix/Matrix.styles";
import { MatrixInputItem } from "@/src/components/matrix-input-item/MatrixInputItem";
import { MatrixGroupControls } from "@/src/components/matrix-group-controls/MatrixGroupControls";
import { MatrixRowItem } from "@/src/components/matrix-row-item/MatrixRowItem";
import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { usePositionIsSelected } from "@/src/utils/hooks/usePositionIsSelected";

export function Matrix() {
  const { numberOfRows, numberOfColumns } = useNumberOfRowsAndColumns();
  const positionIsSelected = usePositionIsSelected();

  return (
    <>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
        return (
          <StyledMatrixRow key={rowIndex}>
            {Array.from({ length: numberOfColumns }).map((_, columnIndex) => {
              const position = { x: columnIndex, y: rowIndex };

              return (
                <MatrixRowItem
                  key={columnIndex}
                  isSelected={positionIsSelected(position)}
                >
                  <MatrixInputItem position={position} />
                </MatrixRowItem>
              );
            })}
            <MatrixRowItem>
              <MatrixGroupControls groupType="row" groupIndex={rowIndex} />
            </MatrixRowItem>
          </StyledMatrixRow>
        );
      })}
      <StyledMatrixRow>
        {Array.from({ length: numberOfColumns }).map((_, columnIndex) => (
          <MatrixRowItem key={columnIndex}>
            <MatrixGroupControls groupType="column" groupIndex={columnIndex} />
          </MatrixRowItem>
        ))}
      </StyledMatrixRow>
    </>
  );
}
