"use client";

import { useMatrixStore } from "@/src/data/matrixStore";
import { StyledMatrixRow } from "@/src/components/matrix/Matrix.styles";
import { MatrixInputItem } from "@/src/components/matrix-input-item/MatrixInputItem";
import { MatrixGroupControls } from "@/src/components/matrix-group-controls/MatrixGroupControls";
import { MatrixRowItem } from "@/src/components/matrix-row/MatrixRowItem";
import { useEffect } from "react";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";
import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";

export function Matrix() {
  const { numberOfRows, numberOfColumns } = useNumberOfRowsAndColumns();

  const setSelectedItemPositions = useMatrixStore(
    ({ setSelectedItemPositions }) => setSelectedItemPositions
  );

  useEffect(() => {
    setSelectedItemPositions(
      getPositionsForGroup({
        groupIdentifier: { type: "row", index: 0 },
        numberOfRows,
        numberOfColumns,
      })
    );
  });

  return (
    <>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
        return (
          <StyledMatrixRow key={rowIndex}>
            {Array.from({ length: numberOfColumns }).map(
              (item, columnIndex) => {
                const position = { x: columnIndex, y: rowIndex };

                return (
                  <MatrixRowItem key={columnIndex} position={position}>
                    <MatrixInputItem position={position} />
                  </MatrixRowItem>
                );
              }
            )}
            <MatrixRowItem position={{ x: numberOfColumns, y: rowIndex }}>
              <MatrixGroupControls groupType="row" groupIndex={rowIndex} />
            </MatrixRowItem>
          </StyledMatrixRow>
        );
      })}
      <StyledMatrixRow>
        {Array.from({ length: numberOfColumns }).map((_, columnIndex) => (
          <MatrixRowItem
            key={columnIndex}
            position={{ x: columnIndex, y: numberOfColumns }}
          >
            <MatrixGroupControls groupType="column" groupIndex={columnIndex} />
          </MatrixRowItem>
        ))}
      </StyledMatrixRow>
    </>
  );
}
