import StepTypes from './StepTypes';

export enum MatrixItemValueType { // todo rename to id?
  DIVISION = 'divide',
  STEPS = 'steps',
  PROBABILITY = 'probability',
  SPEED = 'speed',
  CLOCK_SHIFT = 'clock-shift',
  TIME_SHIFT = 'time-shift',
  PULSE_WIDTH = 'pulse-width',
}

interface IMatrixItemValue {
  // todo rename (to property)?
  type: MatrixItemValueType;
  // todo add propname in matrixItem
  min?: number;
  max?: number;
  options?: string[] | number[] | { label: string; value: any }[];
  integer?: boolean;
  formatter?: (value: number) => string | number; // todo move elsewhere (is related to the dial)
  pixelsForFullRange?: number; // todo this one as well
}

export const matrixItemValues: IMatrixItemValue[] = [
  // todo rename?
  {
    type: MatrixItemValueType.DIVISION,
    min: 0,
    max: 255,
    integer: true,
    pixelsForFullRange: 1500, // todo this probably doesnt work very well on different screensizes/pixelratios etc
  },
  {
    type: MatrixItemValueType.STEPS,
    options: [
      StepTypes.QUARTER,
      StepTypes.EIGHTH_D, // todo write as full name,
      StepTypes.QUARTER_T,
      StepTypes.EIGHTH,
      StepTypes.SIXTEENTH_D,
      StepTypes.EIGHTH_T,
      StepTypes.SIXTEENTH,
      StepTypes.THIRTYSECOND_D,
      StepTypes.SIXTEENTH_T,
      StepTypes.THIRTYSECOND_T,
      StepTypes.SIXTYFOURTH,
    ],
    pixelsForFullRange: 150,
  },
  {
    type: MatrixItemValueType.PULSE_WIDTH,
    min: 0,
    max: 1,
    formatter: value => `${Math.round(value * 100)} %`,
  },
];
