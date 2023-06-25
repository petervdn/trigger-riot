import { Matrix } from "@/src/types/matrix.types";

export const createMatrix = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}): Matrix => {
  const items = Array.from({ length: rows * columns }, (_, index) => ({
    index,
    division: {
      type: "number" as const,
      value: {
        min: 1,
        max: 8,
        value: 1 + Math.round(Math.random() * 7),
        isInteger: true,
      },
    },
    pulseWidth: {
      type: "number" as const,
      value: {
        min: 0,
        max: 1,
        value: Math.random(),
        isInteger: false,
      },
    },
  }));

  return { rows, columns, items };
};
