"use client";

import { Dial } from "@/src/components/dial/Dial";
import { useState } from "react";
import { DialCircle } from "@/src/components/dial/DialCircle";

import { SettingType, StoreState, useMatrixStore } from "@/src/data/store";
import { MatrixItem } from "@/src/components/MatrixItem";

export function MainView() {
  const { matrix, setEditMode, editMode } = useMatrixStore();

  const editModes = ["division" as const, "pulseWidth" as const];

  return (
    <div>
      <div className="flex">
        {editModes.map((mode) => (
          <button
            // className="bg-blue-500"
            key={mode}
            onClick={() => setEditMode(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
      <div>
        {Array.from({ length: matrix.rows }).map((_, index) => {
          const startIndex = index * matrix.columns;
          const endIndex = startIndex + matrix.columns;
          const rowItems = matrix.items.slice(startIndex, endIndex);
          return (
            <div
              key={index}
              className="flex space-x-2"
              style={{ marginBottom: 10 }}
            >
              {rowItems.map((item, index) => {
                return <MatrixItem matrixItem={item} key={index} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
