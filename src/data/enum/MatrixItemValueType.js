const types = {
  // toto better name? todo make enum
  DIVISION: 'divide',
  STEPS: 'steps',
  PROBABILITY: 'probability',
  SPEED: 'speed',
  CLOCK_SHIFT: 'clock-shift',
  TIME_SHIFT: 'time-shift',
  PULSE_WIDTH: 'pulse-width',
};

export default types;

// todo rename (MatrixItemValueTypes, orderedSomething?)
export const valueTypes = [
  types.DIVISION,
  types.STEPS,
  types.PROBABILITY,
  types.SPEED,
  types.CLOCK_SHIFT,
  types.TIME_SHIFT,
  types.PULSE_WIDTH,
];
