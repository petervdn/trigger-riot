import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import { drawWaveForItems } from '../../util/drawUtils';
import AnimationFrame from '../../util/AnimationFrame';
import WaveViewControls from '../WaveViewControls/WaveViewControls';
import Dial from '../Dial/Dial';

// @vue/component
export default {
  name: 'WaveView',
  components: {
    Dial,
    WaveViewControls,
  },
  props: {
    matrixItems: VueTypes.array.isRequired,
    height: VueTypes.number.isRequired,
    initialTimeWindow: VueTypes.number.isRequired,
    waveMargin: VueTypes.number.isRequired,
    showControls: VueTypes.bool.def(false),
    drawIndexLabels: VueTypes.bool.def(false),
  },
  data() {
    return {
      width: 0, // todo rename
      timeWindow: this.initialTimeWindow,
    };
  },
  computed: {
    ...mapState({
      bpm: state => state.app.bpm,
      isPlaying: state => state.app.isPlaying,
    }),
  },
  watch: {
    matrixItems: {
      handler() {
        this.draw();
      },
      deep: true,
    },
    isPlaying(value) {
      if (value) {
        this.frame.start();
      } else {
        this.frame.stop();
        this.draw();
      }
    },
  },
  mounted() {
    setTimeout(() => {
      // todo fix these 2 timeouts
      this.width = this.$refs.wrap.offsetWidth;
      this.context = this.$refs.canvas.getContext('2d');
      this.frame = new AnimationFrame(this.onFrame);
      setTimeout(this.draw);
    });
  },
  methods: {
    onTimeWindowChange(value) {
      this.timeWindow = value;
      this.draw();
    },
    onFrame() {
      this.draw();
    },
    draw() {
      drawWaveForItems(
        this.context,
        this.matrixItems,
        this.bpm,
        {
          start: this.$soundManager.currentPlayTime,
          end: this.$soundManager.currentPlayTime + this.timeWindow,
        },
        this.waveMargin,
        this.drawIndexLabels,
      );
    },
  },
};
