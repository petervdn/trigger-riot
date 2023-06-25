export type MatrixItem = {
  index: number;
  // position: Position;
  division: MatrixItemValue;
  pulseWidth: MatrixItemValue;
  // steps: IMatrixItemOptionsValue;
};

export type MatrixItemValue = {
  type: "number";
  value: NumberValue;
};

export type SettingType = "pulseWidth" | "division";

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
