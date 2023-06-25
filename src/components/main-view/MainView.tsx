"use client";

import { useMatrixStore } from "@/src/data/store";
import { Matrix } from "@/src/components/matrix/Matrix";

export function MainView() {
  const { setEditMode } = useMatrixStore();

  const editModes = ["division" as const, "pulseWidth" as const];

  return (
    <div>
      <div>
        {editModes.map((mode) => (
          <button key={mode} onClick={() => setEditMode(mode)}>
            {mode}
          </button>
        ))}
      </div>
      <Matrix />
    </div>
  );
}
