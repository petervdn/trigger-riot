const matrixItemValueIds = {
  division: null,
  steps: null,
  probability: null,
  speed: null,
  'clock-shift': null,
  'time-shift': null,
  'pulse-width': null,
};

export type MatrixItemValueId = keyof (typeof matrixItemValueIds);

export const matrixItemValueIdsList = Object.keys(matrixItemValueIds) as MatrixItemValueId[];
