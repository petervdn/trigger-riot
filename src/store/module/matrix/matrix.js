import MatrixItemValueType from '../../../data/enum/MatrixItemValueType';
import { createMatrixData } from '../../../util/matrixUtils';

const namespace = 'matrix';
export const SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE = `${namespace}/setActiveMatrixItemValueType`;
export const SET_ACTIVE_ITEMS = `${namespace}/setActiveItems`;
export const SET_PULSE_WIDTH = `${namespace}/setPulseWidth`; // todo combine into 1
export const SET_DIVISION = `${namespace}/setDivision`;
export const SET_MATRIX = `${namespace}/setMatrix`;
export const SET_SAMPLE_FOR_GROUP = `${namespace}/setSampleForGroup`;
export const INIT = `${namespace}/init`;

export default {
  state: {
    activeMatrixItemValueType: MatrixItemValueType.DIVISION, // todo consistent and better naming
    matrix: null,
    activeItems: [], // todo rename to selected?
  },
  getters: {},
  mutations: {
    [SET_SAMPLE_FOR_GROUP](state, { group, sample }) {
      group.sample = sample;
    },
    [SET_MATRIX](state, matrix) {
      state.matrix = matrix;
    },
    [SET_ACTIVE_ITEMS](state, items) {
      state.activeItems = items;
    },
    [SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE](state, mode) {
      state.activeMatrixItemValueType = mode;
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
  actions: {
    [INIT](context) {
      context.commit(SET_MATRIX, createMatrixData());

      // select first row
      context.commit(
        SET_ACTIVE_ITEMS,
        context.state.matrix.items.filter(item => item.position.y === 0),
      );
    },
  },
};
