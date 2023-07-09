import { useMatrixStore } from "@/src/data/matrixStore";
import { MATRIX_WIDTH } from "@/src/data/consts";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { shallow } from "zustand/shallow";
import { useMatrixItemsForPositions } from "@/src/utils/hooks/useMatrixItemForPosition";

export function MainWaveView() {
  const { selectedItemPositions } = useMatrixStore((state) => {
    return {
      selectedItemPositions: state.selectedItemPositions,
      matrixItems: state.matrixItems,
    };
  }, shallow);

  const selectedMatrixItems = useMatrixItemsForPositions(selectedItemPositions);

  return (
    <>
      <WaveView
        width={MATRIX_WIDTH}
        height={80}
        matrixItems={selectedMatrixItems}
        lookaheadTime={4}
      />
      {/*<WaveViewControls />*/}
    </>
  );
}
