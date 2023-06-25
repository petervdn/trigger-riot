"use client";

import { useMatrixStore } from "@/src/data/matrixStore";
import { Matrix } from "@/src/components/matrix/Matrix";
import { editableMatrixItemProperties } from "@/src/types/matrix.types";
import { WaveView } from "@/src/components/wave-view/WaveView";

export function MainView() {
  const { setEditMode } = useMatrixStore();

  return (
    <>
      <WaveView width={800} height={100} />
      <div>
        {editableMatrixItemProperties.map((property) => (
          <button key={property} onClick={() => setEditMode(property)}>
            {property}
          </button>
        ))}
      </div>
      <Matrix />
    </>
  );
}
