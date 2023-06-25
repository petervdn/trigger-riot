export type MatrixItem = {
  index: number;
  division: NumberValue;
  pulseWidth: NumberValue;
  steps: StringValue;
};

export const editableMatrixItemProperties: Array<
  keyof Pick<MatrixItem, "division" | "pulseWidth" | "steps">
> = ["division", "pulseWidth", "steps"];

export type MatrixItemEditableProperty =
  (typeof editableMatrixItemProperties)[number];

export type MatrixItemValue = NumberValue | StringValue;

type NumberValue = {
  type: "number";
  value: number;
  min: number;
  max: number;
  isInteger: boolean;
};

type StringValue = {
  type: "string";
  value: string;
};

export type Matrix = {
  rows: number;
  columns: number;
  items: Array<MatrixItem>;
};
