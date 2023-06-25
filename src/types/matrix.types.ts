export type MatrixItem = {
  index: number;
  division: MatrixItemValue;
  pulseWidth: MatrixItemValue;
};

export const editableMatrixItemProperties: Array<
  keyof Pick<MatrixItem, "division" | "pulseWidth">
> = ["division", "pulseWidth"];

export type MatrixItemEditableProperty =
  (typeof editableMatrixItemProperties)[number];

export type MatrixItemValue = {
  type: "number";
  value: NumberValue;
};

type NumberValue = {
  value: number;
  min: number;
  max: number;
  isInteger: boolean;
};

export type Matrix = {
  rows: number;
  columns: number;
  items: Array<MatrixItem>;
};
