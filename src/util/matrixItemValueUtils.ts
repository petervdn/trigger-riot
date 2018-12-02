import { MatrixItemValueId } from '../data/enum/MatrixItemValue';
import StepType from '../data/enum/StepType';
import {
  IMatrixItem,
  IMatrixItemNumberValueMetaData,
  IMatrixItemOptionsValueMetaData,
  IMatrixItemValue,
  IMatrixItemValueType,
  IStore,
} from '../data/interface';

export const createDivisionValue = (defaultValue = 0): IMatrixItemValue<number> => ({
  value: defaultValue,
  metaData: createNumberValueMetaData(MatrixItemValueId.DIVISION, 0, 255, true),
});

export const createPulseWidthValue = (defaultValue = 0.25): IMatrixItemValue<number> => ({
  value: defaultValue,
  metaData: createNumberValueMetaData(MatrixItemValueId.PULSE_WIDTH, 0, 1, false),
});
export const createStepsValue = (defaultValue = StepType.QUARTER): IMatrixItemValue<string> => ({
  value: defaultValue,
  metaData: createOptionsValueMetaData(MatrixItemValueId.STEPS, [
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
  ]),
});

export const createNumberValueMetaData = (
  id: MatrixItemValueId,
  min: number,
  max: number,
  isInteger: boolean,
): IMatrixItemNumberValueMetaData => {
  // todo validate
  return {
    id,
    max,
    min,
    isInteger,
    type: IMatrixItemValueType.NUMBER,
  };
};

export const createOptionsValueMetaData = (
  id: MatrixItemValueId,
  options: string[],
): IMatrixItemOptionsValueMetaData => {
  // todo validate
  return {
    id,
    options,
    type: IMatrixItemValueType.OPTIONS,
  };
};

export const getMatrixItemValueById = (
  matrixItem: IMatrixItem,
  id: MatrixItemValueId,
): IMatrixItemValue<string | number> | null => {
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

interface IRandomizeData {
  // todo move
  // valueType: IMatrixItemValueTypeNew;
  // dialData: IDialData;
}

export function createRandomizeData(): IRandomizeData[] {
  return [];
  // return valueTypes.filter(type => dialDataByType[type] !== undefined).map(type => ({
  //   valueType: type,
  //   dialData: dialDataByType[type],
  // }));
}

export function randomizeMatrixItems(
  matrixItems: IMatrixItem[],
  randomizeData: IRandomizeData[],
  activeValueTypes: string[],
  store: IStore,
) {
  matrixItems
    // loop through each matrix-item involved
    .forEach(matrixItem => {
      // for each item, loop through each valueType involved
      randomizeData
        // .filter(randomizeEntry => activeValueTypes.includes(randomizeEntry.valueType))
        .forEach(randomizeEntry => {
          // set a value for this item, and for this valueType
          // if (
          //   randomizeEntry.dialData.min !== undefined &&
          //   randomizeEntry.dialData.max !== undefined
          // ) {
          //   store.commit(UPDATE_ITEM_VALUE, {
          //     itemIndex: matrixItem.index,
          //     valueType: randomizeEntry.valueType,
          //     value:
          //       randomizeEntry.dialData.integer !== undefined
          //         ? getRandomInt(randomizeEntry.dialData.min, randomizeEntry.dialData.max)
          //         : getRandomFloat(randomizeEntry.dialData.min, randomizeEntry.dialData.max),
          //   });
          // }
        });
    });
}
