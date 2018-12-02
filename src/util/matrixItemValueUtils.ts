import { MatrixItemValueId } from '../data/enum/MatrixItemValue';
import StepType from '../data/enum/StepType';
import {
  IMatrixItem,
  IMatrixItemNumberValue,
  IMatrixItemOptionsValue,
  IMatrixItemValue,
  IMatrixItemValueType,
} from '../data/interface';

export const createDivisionValue = () =>
  createNumberValue(MatrixItemValueId.DIVISION, 0, 0, 255, true);
export const createPulseWidthValue = () =>
  createNumberValue(MatrixItemValueId.PULSE_WIDTH, 0.25, 0, 1, false);
export const createStepsValue = () =>
  createOptionsValue(MatrixItemValueId.STEPS, StepType.QUARTER, [
    StepType.QUARTER,
    StepType.EIGHTH_D,
    StepType.QUARTER_T,
    StepType.EIGHTH,
    StepType.SIXTEENTH_D,
    StepType.EIGHTH_T,
    StepType.SIXTEENTH,
    StepType.THIRTYSECOND_D,
    StepType.SIXTEENTH_T,
    StepType.THIRTYSECOND_T,
    StepType.SIXTYFOURTH,
  ]);

export const createNumberValue = (
  id: MatrixItemValueId,
  value: number,
  min: number,
  max: number,
  isInteger: boolean,
): IMatrixItemNumberValue => {
  // todo validate
  return {
    id,
    value,
    min,
    max,
    isInteger,
    type: IMatrixItemValueType.NUMBER,
  };
};

export const createOptionsValue = (
  id: MatrixItemValueId,
  value: string,
  options: string[],
): IMatrixItemOptionsValue => {
  // todo validate
  return {
    id,
    value,
    options,
    type: IMatrixItemValueType.OPTIONS,
  };
};

export const getMatrixItemValueDataById = (
  matrixItem: IMatrixItem,
  id: MatrixItemValueId,
): IMatrixItemValue | null => {
  switch (id) {
    case MatrixItemValueId.DIVISION: {
      return matrixItem.division;
    }
    case MatrixItemValueId.PULSE_WIDTH: {
      return matrixItem.pulseWidth;
    }
    case MatrixItemValueId.STEPS: {
      return matrixItem.steps;
    }
    default: {
      return null;
    }
  }
};
