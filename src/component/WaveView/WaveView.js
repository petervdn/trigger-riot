import VueTypes from 'vue-types';
import { mapState } from 'vuex';
// import AnimationFrame from '../../util/AnimationFrame';
import WaveViewControls from '../WaveViewControls/WaveViewControls';
import Dial from '../Dial/Dial';
import CachedWaveDrawer from '../../util/CachedWaveDrawer';
import { globalPlayFrame } from '../../util/globalPlayFrame';

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
    useCache: VueTypes.bool.def(true),
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
        this.draw(true);
      },
      deep: true,
    },
    isPlaying(value) {
      if (value) {
        // this.frame.start();
      } else {
        // this.frame.stop();
        this.draw(true);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.drawer = new CachedWaveDrawer();
      // todo fix these 2 timeouts
      this.width = this.$refs.wrap.offsetWidth;
      this.context = this.$refs.canvas.getContext('2d');
      // this.frame = new AnimationFrame(this.onFrame);
      globalPlayFrame.addCallback(this.onFrame);
      setTimeout(this.draw);
    });
  },
  methods: {
    onTimeWindowChange(value) {
      this.timeWindow = value;
      this.draw(true);
    },
    onFrame() {
      this.draw();
    },
    draw(forceRedraw) {
      this.drawer.draw(
        this.context,
        this.matrixItems,
        this.bpm,
        {
          start: this.$soundManager.currentPlayTime,
          end: this.$soundManager.currentPlayTime + this.timeWindow,
        },
        this.waveMargin,
        this.drawIndexLabels,
        forceRedraw,
      );
    },
  },
};
