import GridMode from '../../../data/enum/GridMode';

const namespace = 'app';

export const SET_DEVICE_STATE = `${namespace}/setDeviceState`;
export const SET_BPM = `${namespace}/setBPM`;
export const SET_ACTIVE_GRID_MODE = `${namespace}/setActiveGridMode`;

export default {
  state: {
    deviceState: null,
    bpm: 120,
    activeGridMode: GridMode.DIVISION,
  },
  getters: {},
  mutations: {
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
