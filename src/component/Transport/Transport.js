// @vue/component
import { mapState } from 'vuex';
import { drawStartButton, drawStopButton } from '../../util/drawUtils';
import { globalPlayFrame } from '../../util/globalPlayFrame';

export default {
  name: 'Transport',
  mounted() {
    drawStartButton(this.$refs.start.getContext('2d'), this.startStopButtonSize);
    drawStopButton(this.$refs.stop.getContext('2d'), this.startStopButtonSize);
    globalPlayFrame.addCallback(this.onFrame);
  },
  data() {
    return {
      time: this.$soundManager.currentPlayTime,
      startStopButtonSize: 45,
    };
  },
  watch: {
    isPlaying(value) {
      if (!value) {
        this.onFrame(); // forces a draw after a stop with the correct time
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
