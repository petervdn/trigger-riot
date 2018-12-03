import { ISample } from 'sample-manager';
import { MatrixItemValueId } from './enum/MatrixItemValue';

export interface IStore {
  commit: (mutation: string, payload: any) => void;
  state: IStoreState;
}

export interface IStoreState {
  matrix: IMatrixStoreState;
  app: IAppStoreState;
}

export interface IMatrixStoreState {
  matrix: IMatrixData;
}

export interface IAppStoreState {
  bpm: number;
}

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
  division: IMatrixItemNumberValue;
  pulseWidth: IMatrixItemNumberValue;
  steps: IMatrixItemOptionsValue;
}

export interface IMatrixData {
  rows: IMatrixItemGroup[];
  columns: IMatrixItemGroup[];
  items: IMatrixItem[];
}

export interface IMatrixItemGroup {
  // can be any collection of matrixItems, but is used for a row or column
  sample?: ISample;
  id: string;
  items: IMatrixItem[];
}

export enum IMatrixItemValueType {
  NUMBER = 'number',
  OPTIONS = 'options',
}

// export interface IMatrixItemValue<T extends string | number = string | number> {
//   value: T;
//   metaData: T extends number ? IMatrixItemNumberValueMetaData : IMatrixItemOptionsValueMetaData; // todo
// }
export interface IMatrixItemNumberValue {
  value: number;
  metaData: IMatrixItemNumberValueMetaData;
}

export interface IMatrixItemOptionsValue {
  value: string;
  metaData: IMatrixItemOptionsValueMetaData;
}

export type IMatrixItemValue = IMatrixItemNumberValue | IMatrixItemOptionsValue;

export interface IMatrixItemValueMetaData {
  id: MatrixItemValueId;
  type: IMatrixItemValueType;
}

export interface IMatrixItemNumberValueMetaData extends IMatrixItemValueMetaData {
  min: number;
  max: number;
  isInteger: boolean;
}

export interface IMatrixItemOptionsValueMetaData extends IMatrixItemValueMetaData {
  options: string[];
}
