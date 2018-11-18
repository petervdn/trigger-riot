import { ISample } from 'sample-manager';

export interface IPosition {
  x: number;
  y: number;
}

export interface ITimeSlot {
  start: number;
  end: number;
}

export interface IMatrixItem {
  index: number;
  position: IPosition;
  division: number;
  pulseWidth: number;
}

export interface IMatrixData {
  rows: IMatrixItemGroup[];
  columns: IMatrixItemGroup[];
  items: IMatrixItem[];
}

export enum MatrixGroupType {
  ROW = 'row',
  COLUM = 'column',
}

export interface IMatrixItemGroup {
  // a row or colum
  sample?: ISample;
  type: MatrixGroupType;
  items: IMatrixItem[];
}
