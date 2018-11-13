export interface IPosition {
  x: number;
  y: number;
}

export interface ITimeSlot {
  start: number;
  end: number;
}

export interface IGridItem {
  index: number;
  position: IPosition;
  division: number;
  pulseWidth: number;
}

export interface IGridData {
  rows: Array<Array<IGridItem>>;
  columns: Array<Array<IGridItem>>;
  items: Array<IGridItem>;
}
