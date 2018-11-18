// @vue/component
import { mapState } from 'vuex';
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
  watch: {
    isPlaying(value) {
      if (value) {
        this.frame.start();
      } else {
        this.frame.stop();
        this.time = 0; // todo find better way to do this?
      }
    },
  },
  computed: {
    ...mapState({
      bpm: state => state.app.bpm,
      isPlaying: state => state.app.isPlaying,
    }),
  },
  methods: {
    startPlay() {
      this.$soundManager.start();
    },
    stopPlay() {
      this.$soundManager.stop();
    },
    onFrame() {
      this.time = this.$soundManager.currentPlayTime;
    },
  },
};
