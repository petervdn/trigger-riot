import { useMatrixStore } from "@/src/data/matrixStore";
import { MATRIX_WIDTH } from "@/src/data/consts";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { shallow } from "zustand/shallow";
import { WaveViewControls } from "@/src/components/wave-view-controls/WaveViewControls";

export function MainWaveView() {
  const { selectedItemPositions, matrixItems } = useMatrixStore((state) => {
    return {
      selectedItemPositions: state.selectedItemPositions,
      matrixItems: state.matrixItems,
    };
  }, shallow);

  const selectedMatrixItems = matrixItems.filter((item) => {
    return selectedItemPositions.some(
      ({ x, y }) => x === item.position.x && y === item.position.y
    );
  });

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
