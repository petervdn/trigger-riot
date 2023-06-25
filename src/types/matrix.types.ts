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
  numberOfRows: number;
  numberOfColumns: number;
  items: Array<MatrixItem>;
};

export type MatrixItemsGroupIdentifier = {
  index: number;
  type: RowOrColumn;
};
