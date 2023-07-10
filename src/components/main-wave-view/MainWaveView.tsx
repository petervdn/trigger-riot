import { useMatrixStore } from "@/src/data/matrixStore";
import { MATRIX_WIDTH } from "@/src/data/consts";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { shallow } from "zustand/shallow";
import { useMatrixItemsForPositions } from "@/src/utils/hooks/useMatrixItemForPosition";

import { useSettingsStore } from "@/src/data/settingsStore";

export function MainWaveView() {
  const { selectedItemPositions } = useMatrixStore((state) => {
    return {
      selectedItemPositions: state.selectedItemPositions,
      matrixItems: state.matrixItems,
    };
  }, shallow);

  const selectedMatrixItems = useMatrixItemsForPositions(selectedItemPositions);

  const waveViewRange = useSettingsStore((state) => state.waveViewRange.large);

  return (
    <>
      <WaveView
        width={MATRIX_WIDTH}
        height={80}
        matrixItems={selectedMatrixItems}
        viewRange={waveViewRange}
      />
    </>
  );
}
