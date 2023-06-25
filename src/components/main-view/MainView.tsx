"use client";

import { useMatrixStore } from "@/src/data/store";
import { Matrix } from "@/src/components/matrix/Matrix";
import { editableMatrixItemProperties } from "@/src/types/matrix.types";

export function MainView() {
  const { setEditMode } = useMatrixStore();

  return (
    <div>
      <div>
        {editableMatrixItemProperties.map((property) => (
          <button key={property} onClick={() => setEditMode(property)}>
            {property}
          </button>
        ))}
      </div>
      <Matrix />
    </div>
  );
}
