import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import { drawWaveForItems } from '../../util/drawUtils';
import AnimationFrame from '../../util/AnimationFrame';

// @vue/component
export default {
  name: 'WaveView',
  props: {
    // startTime: VueTypes.number.isRequired,
    matrixItems: VueTypes.array.isRequired,
    width: VueTypes.number.isRequired,
    height: VueTypes.number.isRequired,
    timeWindow: VueTypes.number.isRequired,
    waveMargin: VueTypes.number.isRequired,
  },
  data() {
    return {
      startTime: 0,
    };
  },
  computed: {
    ...mapState({
      bpm: state => state.app.bpm,
      playStartTime: state => state.app.playStartTime,
    }),
  },
  watch: {
    matrixItems() {
      this.draw();
    },
    playStartTime(time) {
      // todo duplicate time stuff from homepage, move to soundmanager?
      if (time === -1) {
        this.frame.stop();
        this.startTime = 0;
        this.draw();
      } else {
        this.frame.start();
      }
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    this.frame = new AnimationFrame(this.onFrame);
    this.draw();
  },
  methods: {
    onFrame() {
      // todo duplicate time stuff
      this.startTime = this.$soundManager.context.currentTime - this.playStartTime;
      this.draw();
    },
    draw() {
      drawWaveForItems(
        this.context,
        this.matrixItems,
        this.bpm,
        {
          start: this.startTime,
          end: this.startTime + this.timeWindow,
        },
        this.waveMargin,
      );
    },
  },
};
