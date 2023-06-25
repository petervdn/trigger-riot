// import { MatrixItemValueId, matrixItemValueIdsList } from '../data/enum/MatrixItemValue';
// import {
//     IMatrixItem,
//     IMatrixItemNumberValue,
//     IMatrixItemNumberValueMetaData,
//     IMatrixItemOptionsValue,
//     IMatrixItemOptionsValueMetaData,
//     IMatrixItemValue,
//     IMatrixItemValueType,
//     IStore,
// } from '../data/interface';
// import { getRandomFloat, getRandomInt } from './numberUtils';
// import {StepType} from "@/src/data/consts";
//
// export function createMatrixItemValueMetaDataById(id: 'steps'): IMatrixItemOptionsValueMetaData;
// export function createMatrixItemValueMetaDataById(
//     id: MatrixItemValueId,
// ): IMatrixItemNumberValueMetaData;
// export function createMatrixItemValueMetaDataById(
//     id: MatrixItemValueId,
// ): IMatrixItemNumberValueMetaData | IMatrixItemOptionsValueMetaData {
//     // todo cache these meta-data objects for each type
//     switch (id) {
//         case 'division': {
//             return createNumberValueMetaData(id, 0, 255, true);
//         }
//         case 'pulse-width': {
//             return createNumberValueMetaData(id, 0, 1, false);
//         }
//         case 'steps': {
//             return createOptionsValueMetaData(id, [
//                 StepType.QUARTER,
//                 StepType.EIGHTH_D,
//                 StepType.QUARTER_T,
//                 StepType.EIGHTH,
//                 StepType.SIXTEENTH_D,
//                 StepType.EIGHTH_T,
//                 StepType.SIXTEENTH,
//                 StepType.THIRTYSECOND_D,
//                 StepType.SIXTEENTH_T,
//                 StepType.THIRTYSECOND_T,
//                 StepType.SIXTYFOURTH,
//             ]);
//         }
//         default: {
//             throw new Error(`Cannot create MatrixItemValueMetaData for id ${id}`);
//         }
//     }
// }
//
// export const createDivisionValue = (defaultValue = 0): IMatrixItemNumberValue => ({
//     value: defaultValue,
//     metaData: createMatrixItemValueMetaDataById('division'),
// });
//
// export const createPulseWidthValue = (defaultValue = 0.25): IMatrixItemNumberValue => ({
//     value: defaultValue,
//     metaData: createMatrixItemValueMetaDataById('pulse-width'),
// });
// export const createStepsValue = (defaultValue = StepType.QUARTER): IMatrixItemOptionsValue => ({
//     value: defaultValue,
//     metaData: createMatrixItemValueMetaDataById('steps'),
// });
//
// export const createNumberValueMetaData = (
//     id: MatrixItemValueId,
//     min: number,
//     max: number,
//     isInteger: boolean,
// ): IMatrixItemNumberValueMetaData => {
//     // todo validate?
//     return {
//         id,
//         max,
//         min,
//         isInteger,
//         type: IMatrixItemValueType.NUMBER,
//     };
// };
//
// export const createOptionsValueMetaData = (
//     id: MatrixItemValueId,
//     options: string[],
// ): IMatrixItemOptionsValueMetaData => {
//     return {
//         id,
//         options,
//         type: IMatrixItemValueType.OPTIONS,
//     };
// };
//
// export const getMatrixItemValueById = (
//     matrixItem: IMatrixItem,
//     id: MatrixItemValueId,
// ): IMatrixItemValue => {
//     switch (id) {
//         case 'division': {
//             return matrixItem.division;
//         }
//         case 'pulse-width': {
//             return matrixItem.pulseWidth;
//         }
//         case 'steps': {
//             return matrixItem.steps;
//         }
//         default: {
//             throw new Error(`Cannot find MatrixItemValue for id ${id}`);
//         }
//     }
// };
//
// interface IRandomizeData {
//     valueMetaData: IMatrixItemNumberValueMetaData;
//     valueId: MatrixItemValueId;
//     min: number;
//     max: number;
// }
//
// export function createRandomizeData(): IRandomizeData[] {
//     return matrixItemValueIdsList.filter(id => matrixItemValueIdIsEnabled(id)).map(id => {
//         const valueMetaData = createMatrixItemValueMetaDataById(id);
//         return {
//             valueMetaData,
//             min: valueMetaData.min,
//             max: valueMetaData.max,
//             valueId: id,
//         };
//     });
// }
//
// export function randomizeMatrixItems(
//     matrixItems: IMatrixItem[],
//     randomizeData: IRandomizeData[],
//     activeValueTypes: string[],
//     store: IStore,
// ) {
//     matrixItems
//         // loop through each matrix-item involved
//         .forEach(matrixItem => {
//             // for each item, loop through each valueType involved
//             randomizeData
//                 // .filter(randomizeEntry => activeValueTypes.includes(randomizeEntry.valueType))
//                 .forEach(randomizeEntry => {
//                     if (randomizeEntry.valueMetaData.type !== IMatrixItemValueType.NUMBER) {
//                         return; // todo for now, just randomize numbers
//                     }
//                     store.commit(UPDATE_ITEM_VALUE, {
//                         matrixItem,
//                         valueId: randomizeEntry.valueId,
//                         value: randomizeEntry.valueMetaData.isInteger
//                             ? getRandomInt(randomizeEntry.min, randomizeEntry.max)
//                             : getRandomFloat(randomizeEntry.min, randomizeEntry.max),
//                     });
//                 });
//         });
// }
//
// export function matrixItemValueIdIsEnabled(id: MatrixItemValueId) {
//     const enabled: MatrixItemValueId[] = ['pulse-width', 'division', 'steps'];
//     return enabled.includes(id);
// }
