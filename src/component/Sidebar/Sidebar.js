// @vue/component
import { mapActions } from 'vuex';
import { START_PLAY, STOP_PLAY } from '../../store/module/app/app';

export default {
  name: 'Sidebar',
  methods: {
    ...mapActions({
      start: START_PLAY,
      stop: STOP_PLAY,
    }),
    onFrame() {
      this.time = this.$soundManager.context.currentTime - this.playStartTime;
    },
  },
};
