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
  rows: Array<Array<IMatrixItem>>;
  columns: Array<Array<IMatrixItem>>;
  items: Array<IMatrixItem>;
}
