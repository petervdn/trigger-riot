import { useMatrixStore } from "@/src/data/matrixStore";
import { StyledMatrixRow } from "@/src/components/matrix/Matrix.styles";
import { MatrixInputItem } from "@/src/components/matrix-input-item/MatrixInputItem";
import { MatrixGroupControls } from "@/src/components/matrix-group-controls/MatrixGroupControls";
import { MatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem";
import { shallow } from "zustand/shallow";

export function Matrix() {
  const { rows, columns } = useMatrixStore(
    ({ rows, columns }) => ({
      rows,
      columns,
    }),
    shallow
  );

  return (
    <>
      {rows.map((row, rowIndex) => {
        return (
          <StyledMatrixRow key={row.stringId}>
            {columns.map((column, columnIndex) => {
              const position = { x: columnIndex, y: rowIndex };

              return (
                <MatrixRowItem key={columnIndex} position={position}>
                  <MatrixInputItem position={position} />
                </MatrixRowItem>
              );
            })}
            <MatrixRowItem position={{ x: columns.length, y: rowIndex }}>
              <MatrixGroupControls groupType="row" groupIndex={rowIndex} />
            </MatrixRowItem>
          </StyledMatrixRow>
        );
      })}
      <StyledMatrixRow>
        {columns.map((column, columnIndex) => (
          <MatrixRowItem
            key={column.stringId}
            position={{ x: columnIndex, y: columns.length }}
          >
            <MatrixGroupControls groupType="column" groupIndex={columnIndex} />
          </MatrixRowItem>
        ))}
      </StyledMatrixRow>
    </>
  );
}
