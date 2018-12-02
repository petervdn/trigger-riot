import { createMatrixData } from '../../../util/matrixUtils';
import { MatrixItemValueId } from '../../../data/enum/MatrixItemValue';

const namespace = 'matrix';
export const SET_ACTIVE_MATRIX_ITEM_VALUE_ID = `${namespace}/setActiveMatrixItemValueId`;
export const SET_ACTIVE_ITEMS = `${namespace}/setActiveItems`;
export const SET_MATRIX = `${namespace}/setMatrix`;
export const SET_SAMPLE_FOR_GROUP = `${namespace}/setSampleForGroup`;
export const UPDATE_ITEM_VALUE = `${namespace}/updateItemValue`;
export const INIT = `${namespace}/init`;

export default {
  state: {
    activeMatrixItemValueId: MatrixItemValueId.DIVISION,
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
    [SET_ACTIVE_MATRIX_ITEM_VALUE_ID](state, id) {
      state.activeMatrixItemValueId = id;
    },
    [UPDATE_ITEM_VALUE](state, { itemIndex, id, value }) {
      // todo switch should be removed? just pass full item
      const item = state.matrix.items[itemIndex];
      switch (id) {
        case MatrixItemValueId.DIVISION: {
          item.division.value = value;
          break;
        }
        case MatrixItemValueId.PULSE_WIDTH: {
          item.division.value = value;
          break;
        }
        case MatrixItemValueId.STEPS: {
          item.division.value = value;
          break;
        }
        default: {
          throw new Error(`Unknown value id: ${id}`);
        }
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
