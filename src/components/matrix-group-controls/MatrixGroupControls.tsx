import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useMatrixStore } from "@/src/data/matrixStore";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { useElementWidth } from "@/src/utils/hooks/useElementWidth";
import { useMemo } from "react";
import { SampleSelect } from "@/src/components/sample-select/SampleSelect";

type Props = {
  groupIdentifier: MatrixItemsGroupIdentifier;
};

export function MatrixGroupControls({ groupIdentifier }: Props) {
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

  const onSelectClick = () => {
    setSelectedItemPositions(
      getPositionsForGroup({ groupIdentifier, numberOfRows, numberOfColumns })
    );
  };

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
