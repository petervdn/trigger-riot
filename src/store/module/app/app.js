import { getValue } from '../../../util/injector';
import { SOUND_MANAGER } from '../../../data/Injectables';

const namespace = 'app';

export const SET_DEVICE_STATE = `${namespace}/setDeviceState`;
export const SET_BPM = `${namespace}/setBPM`;
export const START_PLAY = `${namespace}/startPlay`;
export const STOP_PLAY = `${namespace}/stopPlay`;
export const SET_PLAY_START_TIME = `${namespace}/setPlayStartTime`;

export default {
  state: {
    deviceState: null,
    bpm: 120,
    playStartTime: -1,
  },
  getters: {},
  mutations: {
    [SET_DEVICE_STATE](state, deviceState) {
      state.deviceState = deviceState;
    },
    [SET_BPM](state, bpm) {
      state.deviceState = bpm;
    },
    [SET_PLAY_START_TIME](state, time) {
      state.playStartTime = time;
    },
  },
  actions: {
    [START_PLAY](context) {
      if (context.state.playStartTime === -1) {
        context.commit(SET_PLAY_START_TIME, getValue(SOUND_MANAGER).context.currentTime);
      }
    },
    [STOP_PLAY](context) {
      context.commit(SET_PLAY_START_TIME, -1);
    },
  },
};
