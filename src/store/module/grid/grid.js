import GridMode from '../../../data/enum/GridMode';
import { createGridData } from '../../../util/gridUtils';

const namespace = 'grid';
export const SET_ACTIVE_GRID_MODE = `${namespace}/setActiveGridMode`;
export const SET_PULSE_WIDTH = `${namespace}/setPulseWidth`;
export const SET_DIVISION = `${namespace}/setDivision`;

export default {
  state: {
    activeGridMode: GridMode.PULSE_WIDTH,
    grid: createGridData(),
  },
  getters: {},
  mutations: {
    [SET_ACTIVE_GRID_MODE](state, mode) {
      state.activeGridMode = mode;
    },
    [SET_PULSE_WIDTH](state, payload) {
      const item = state.grid.items[payload.gridItemIndex];
      if (item) {
        item.pulseWidth = payload.pulseWidth;
      }
    },
    [SET_DIVISION](state, payload) {
      const item = state.grid.items[payload.gridItemIndex];
      if (item) {
        item.division = payload.division;
      }
    },
  },
  actions: {},
};
