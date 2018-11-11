import GridMode from '../../../data/enum/GridMode';
import { createGridData } from '../../../util/miscUtils';

const namespace = 'app';

export const SET_DEVICE_STATE = `${namespace}/setDeviceState`;
export const SET_BPM = `${namespace}/setBPM`;
export const SET_ACTIVE_GRID_MODE = `${namespace}/setActiveGridMode`;
export const SET_PULSE_WIDTH = `${namespace}/setPulseWidth`;
export const SET_DIVISION = `${namespace}/setDivision`;

export default {
  state: {
    deviceState: null,
    bpm: 120,
    activeGridMode: GridMode.PULSE_WIDTH,
    grid: createGridData(), // todo move to separate store
  },
  getters: {},
  mutations: {
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
    [SET_DEVICE_STATE](state, deviceState) {
      state.deviceState = deviceState;
    },
    [SET_BPM](state, bpm) {
      state.deviceState = bpm;
    },
    [SET_ACTIVE_GRID_MODE](state, mode) {
      state.activeGridMode = mode;
    },
  },
  actions: {},
};
