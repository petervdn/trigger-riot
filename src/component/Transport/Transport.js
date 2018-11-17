// @vue/component
import { mapActions, mapState } from 'vuex';
import { START_PLAY, STOP_PLAY } from '../../store/module/app/app';
import { drawStartButton, drawStopButton } from '../../util/drawUtils';
import AnimationFrame from '../../util/AnimationFrame';

export default {
  name: 'Transport',
  mounted() {
    drawStartButton(this.$refs.start.getContext('2d'), this.startStopButtonSize);
    drawStopButton(this.$refs.stop.getContext('2d'), this.startStopButtonSize);
    this.frame = new AnimationFrame(this.onFrame);
  },
  data() {
    return {
      time: 0,
      startStopButtonSize: 45,
    };
  },
  computed: {
    isPlaying() {
      return this.playStartTime !== -1;
    },
    ...mapState({
      bpm: state => state.app.bpm,
      playStartTime: state => state.app.playStartTime,
    }),
  },
  methods: {
    startPlay() {
      this.start();
      this.frame.start();
    },
    stopPlay() {
      this.stop();
      this.frame.stop();
      this.time = 0;
    },
    onFrame() {
      this.time = this.$soundManager.context.currentTime - this.playStartTime;
    },
    ...mapActions({
      start: START_PLAY,
      stop: STOP_PLAY,
    }),
  },
};
