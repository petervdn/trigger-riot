const namespace = 'app';

export const SET_DEVICE_STATE = `${namespace}/setDeviceState`;
export const SET_BPM = `${namespace}/setBPM`;

export default {
  state: {
    deviceState: null,
    bpm: 120,
  },
  getters: {},
  mutations: {
    [SET_DEVICE_STATE](state, deviceState) {
      state.deviceState = deviceState;
    },
    [SET_BPM](state, bpm) {
      state.deviceState = bpm;
    },
  },
  actions: {},
};
