import MatrixMode from '../../../data/enum/MatrixMode';
import { createMatrixData } from '../../../util/matrixUtils';

const namespace = 'matrix';
export const SET_ACTIVE_MATRIX_MODE = `${namespace}/setActiveMatrixMode`;
export const SET_ACTIVE_ITEMS = `${namespace}/setActiveItems`;
export const SET_PULSE_WIDTH = `${namespace}/setPulseWidth`;
export const SET_DIVISION = `${namespace}/setDivision`;

export default {
  state: {
    activeMatrixMode: MatrixMode.PULSE_WIDTH,
    matrix: createMatrixData(),
    activeItems: [],
  },
  getters: {},
  mutations: {
    [SET_ACTIVE_ITEMS](state, items) {
      state.activeItems = items;
    },
    [SET_ACTIVE_MATRIX_MODE](state, mode) {
      state.activeMatrixMode = mode;
    },
    [SET_PULSE_WIDTH](state, payload) {
      const item = state.matrix.items[payload.matrixItemIndex];
      if (item) {
        item.pulseWidth = payload.pulseWidth;
      }
    },
    [SET_DIVISION](state, payload) {
      const item = state.matrix.items[payload.matrixItemIndex];
      if (item) {
        item.division = payload.division;
      }
    },
  },
  actions: {},
};
