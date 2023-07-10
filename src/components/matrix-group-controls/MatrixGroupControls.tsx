import { MatrixItemGroupIdentifier } from "@/src/types/matrix.types";
import { useMatrixStore } from "@/src/data/matrixStore";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { useElementWidth } from "@/src/utils/hooks/useElementWidth";
import { useCallback, useMemo } from "react";
import { SampleSelect } from "@/src/components/sample-select/SampleSelect";
import { useNumberOfRowsAndColumns } from "@/src/utils/hooks/useNumberOfRowsAndColumns";
import { RowOrColumn } from "@/src/types/misc.types";
import { useMatrixItemsForGroup } from "@/src/utils/hooks/useMatrixItemsForGroup";
import { getPositionsForGroup } from "@/src/utils/matrixItemGroup.utils";
import { useSettingsStore } from "@/src/data/settingsStore";

type Props = {
  groupType: RowOrColumn;
  groupIndex: number;
};

export function MatrixGroupControls({ groupType, groupIndex }: Props) {
  const groupIdentifier: MatrixItemGroupIdentifier = useMemo(() => {
    return { type: groupType, index: groupIndex };
  }, [groupType, groupIndex]);

  const { elementRef, width } = useElementWidth();
  const setSelectedItemPositions = useMatrixStore(
    ({ setSelectedItemPositions }) => setSelectedItemPositions
  );

  const { numberOfRows, numberOfColumns } = useNumberOfRowsAndColumns();

  const selectGroup = useCallback(() => {
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
  const waveViewRange = useSettingsStore((state) => state.waveViewRange.small);

  return (
    <div ref={elementRef}>
      {width && (
        <div onClick={selectGroup}>
          <WaveView
            width={width}
            height={40}
            matrixItems={matrixItemsForGroup}
            viewRange={waveViewRange}
          />
        </div>
      )}

      <SampleSelect groupIdentifier={groupIdentifier} />
    </div>
  );
}
