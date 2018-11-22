import { DeviceStateEvent } from 'seng-device-state-tracker';
import { mapMutations, mapState, mapActions } from 'vuex';
import { SET_DEVICE_STATE } from '../store/module/app/app';
import { INIT } from '../store/module/matrix/matrix';
import { globalPlayFrame } from '../util/globalPlayFrame';

// @vue/component
export default {
  name: 'App',
  computed: {
    ...mapState({
      deviceState: state => state.app.deviceState,
      isPlaying: state => state.app.isPlaying,
    }),
  },
  watch: {
    isPlaying(value) {
      if (value) {
        globalPlayFrame.start();
      } else {
        globalPlayFrame.stop();
      }
    },
  },
  created() {
    this.$deviceStateTracker.addEventListener(
      DeviceStateEvent.STATE_UPDATE,
      this.handleDeviceStateUpdate,
    );
    this.setDeviceState(this.$deviceStateTracker.currentState);

    this.init();
  },
  methods: {
    ...mapActions({
      init: INIT,
    }),
    ...mapMutations({
      setDeviceState: SET_DEVICE_STATE,
    }),
    handleDeviceStateUpdate(event) {
      this.setDeviceState(event.data.state);
    },
  },
};
