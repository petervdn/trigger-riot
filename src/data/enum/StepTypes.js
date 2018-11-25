const stepTypes = {
  QUARTER: '4th',
  EIGHTH_D: '8d',
  QUARTER_T: '4t',
  EIGHTH: '8th',
  SIXTEENTH_D: '16d',
  EIGHTH_T: '8t',
  SIXTEENTH: '16th',
  THIRTYSECOND_D: '32d',
  SIXTEENTH_T: '16t',
  THIRTYSECOND: '32',
  THIRTYSECOND_T: '32t',
  SIXTYFOURTH: '64th',
};

export default stepTypes;

export const orderedStepTypes = [
  stepTypes.QUARTER,
  stepTypes.EIGHTH_D,
  stepTypes.QUARTER_T,
  stepTypes.EIGHTH,
  stepTypes.SIXTEENTH_D,
  stepTypes.EIGHTH_T,
  stepTypes.SIXTEENTH,
  stepTypes.THIRTYSECOND_D,
  stepTypes.SIXTEENTH_T,
  stepTypes.THIRTYSECOND_T,
  stepTypes.SIXTYFOURTH,
];
