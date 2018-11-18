const namespace = 'app';

export const SET_DEVICE_STATE = `${namespace}/setDeviceState`;
export const SET_BPM = `${namespace}/setBPM`;
export const SET_IS_PLAYING = `${namespace}/setIsPlaying`;

export default {
  state: {
    deviceState: null,
    bpm: 120,
    isPlaying: false,
  },
  getters: {},
  mutations: {
    [SET_DEVICE_STATE](state, deviceState) {
      state.deviceState = deviceState;
    },
    [SET_BPM](state, bpm) {
      state.deviceState = bpm;
    },
    [SET_IS_PLAYING](state, value) {
      state.isPlaying = value;
    },
  },
};
