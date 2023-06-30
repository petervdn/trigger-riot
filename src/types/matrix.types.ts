import { RowOrColumn } from "@/src/types/misc.types";
import { Position } from "../types/misc.types";

export type MatrixItem = {
  index: number;
  division: NumberValue;
  pulseWidth: NumberValue;
  steps: StringValue;
  position: Position;
};

export const editableMatrixItemProperties: Array<
  keyof Pick<MatrixItem, "division" | "pulseWidth" | "steps">
> = ["division", "pulseWidth", "steps"];

export type MatrixItemEditableProperty =
  (typeof editableMatrixItemProperties)[number];

// export type MatrixItemValue = NumberValue | StringValue;

export type NumberValue = {
  type: "number";
  value: number;
  min: number;
  max: number;
  isInteger: boolean;
};

type StringValue = {
  type: "string";
  value: string;
  options: Array<string>;
};

export type MatrixItemsGroupIdentifier = {
  index: number;
  type: RowOrColumn;
};
