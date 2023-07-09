import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useMatrixStore } from "@/src/data/matrixStore";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { useElementWidth } from "@/src/utils/hooks/useElementWidth";
import { useCallback, useMemo } from "react";
import { SampleSelect } from "@/src/components/sample-select/SampleSelect";
import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { RowOrColumn } from "@/src/types/misc.types";
import { useMatrixItemsForGroup } from "@/src/utils/hooks/useMatrixItemsForGroup";

type Props = {
  groupType: RowOrColumn;
  groupIndex: number;
};

export function MatrixGroupControls({ groupType, groupIndex }: Props) {
  const groupIdentifier: MatrixItemsGroupIdentifier = useMemo(() => {
    return { type: groupType, index: groupIndex };
  }, [groupType, groupIndex]);

  const { elementRef, width } = useElementWidth();
  const setSelectedItemPositions = useMatrixStore(
    ({ setSelectedItemPositions }) => setSelectedItemPositions
  );

  const { numberOfRows, numberOfColumns } = useNumberOfRowsAndColumns();

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

  const matrixItemsForGroup = useMatrixItemsForGroup(groupIdentifier);

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
