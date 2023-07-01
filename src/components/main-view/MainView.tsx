"use client";

import { useMatrixStore } from "@/src/data/matrixStore";
import { Matrix } from "@/src/components/matrix/Matrix";
import { editableMatrixItemProperties } from "@/src/types/matrix.types";

// todo: better name
export function MainView() {
  const setEditMode = useMatrixStore((state) => state.setEditMode);

  return (
    <>
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
