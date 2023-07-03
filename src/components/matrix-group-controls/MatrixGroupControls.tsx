import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useMatrixStore } from "@/src/data/matrixStore";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { useElementWidth } from "@/src/utils/hooks/useElementWidth";
import { useCallback, useMemo } from "react";
import { SampleSelect } from "@/src/components/sample-select/SampleSelect";

type Props = {
  groupType: MatrixItemsGroupIdentifier["type"];
  groupIndex: MatrixItemsGroupIdentifier["index"];
};

export function MatrixGroupControls({ groupType, groupIndex }: Props) {
  const groupIdentifier: MatrixItemsGroupIdentifier = useMemo(() => {
    return { type: groupType, index: groupIndex };
  }, [groupType, groupIndex]);

  const { elementRef, width } = useElementWidth();
  const setSelectedItemPositions = useMatrixStore(
    ({ setSelectedItemPositions }) => setSelectedItemPositions
  );
  const matrixItems = useMatrixStore(({ matrixItems }) => matrixItems);
  const { numberOfRows, numberOfColumns } = useMatrixStore(
    ({ numberOfColumns, numberOfRows }) => ({
      numberOfColumns,
      numberOfRows,
    })
  );

  const onSelectClick = useCallback(() => {
    setSelectedItemPositions(
      getPositionsForGroup({ groupIdentifier, numberOfRows, numberOfColumns })
    );
  }, [
    groupIdentifier,
    numberOfColumns,
    numberOfRows,
    setSelectedItemPositions,
  ]);

  const matrixItemsForGroup = useMemo(() => {
    const positions = getPositionsForGroup({
      groupIdentifier,
      numberOfRows,
      numberOfColumns,
    });
    return matrixItems.filter((item) => {
      return positions.some(
        ({ x, y }) => x === item.position.x && y === item.position.y
      );
    });
  }, [groupIdentifier, matrixItems, numberOfColumns, numberOfRows]);

  return (
    <div ref={elementRef}>
      {width && (
        <WaveView
          width={width}
          height={40}
          matrixItems={matrixItemsForGroup}
          lookaheadTime={1}
        />
      )}

      <button onClick={onSelectClick}>select</button>
      <SampleSelect groupIdentifier={groupIdentifier} />
    </div>
  );
}
