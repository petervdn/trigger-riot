export interface IPosition {
  x: number;
  y: number;
}

export interface ITimeSlot {
  start: number;
  end: number;
}

export interface IGridItem {
  position?: IPosition;
  division: number;
  pulseWidth: number;
}

export interface IGridData {
  items: Array<IGridItem>;
}
