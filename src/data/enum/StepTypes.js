const stepTypes = {
  QUARTER: '4th',
  EIGHT_D: '8d',
  QUARTER_T: '4t',
  EIGHT: '8th',
  SIXTEENTH_D: '16d',
  EIGHT_T: '8t',
  SIXTEENTH: '16th',
  THIRTYSECOND_D: '32d',
  SIXTEENTH_T: '16t',
  THIRTYSECOND: '32',
  THIRTYSECOND_T: '32t',
  SIXTYFOUR: '64th',
};

export default stepTypes;

export const orderedStepTypes = [
  stepTypes.QUARTER,
  stepTypes.EIGHT_D,
  stepTypes.QUARTER_T,
  stepTypes.EIGHT,
  stepTypes.SIXTEENTH_D,
  stepTypes.EIGHT_T,
  stepTypes.SIXTEENTH,
  stepTypes.THIRTYSECOND_D,
  stepTypes.SIXTEENTH_T,
  stepTypes.THIRTYSECOND_T,
  stepTypes.SIXTYFOUR,
];
