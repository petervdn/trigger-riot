import { RowOrColumn } from "@/src/types/misc.types";
import { Position } from "../types/misc.types";

export type MatrixItem = {
  index: number;
  division: NumberValue;
  pulseWidth: NumberValue;
  steps: NumberValue;
  position: Position;
};

export const editableMatrixItemProperties: Array<
  keyof Pick<MatrixItem, "division" | "pulseWidth" | "steps">
> = ["division", "pulseWidth", "steps"];

export type MatrixItemEditableProperty =
  (typeof editableMatrixItemProperties)[number];

export type NumberValue = {
  type: "number";
  value: number;
  min: number;
  max: number;
  isInteger: boolean;
  getLabel?: (value: number) => string | number;
};

export type MatrixItemGroupIdentifier = {
  index: number;
  type: RowOrColumn;
};

export type MatrixItemGroupIdentifierString = `${RowOrColumn}-${number}`;

export type MatrixItemGroup = {
  identifier: MatrixItemGroupIdentifier;
  stringId: MatrixItemGroupIdentifierString;
  items: Array<MatrixItem>;
};
