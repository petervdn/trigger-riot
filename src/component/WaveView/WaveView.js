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
  },
  data() {
    return {
      width: 0,
      startTime: 0,
      timeWindow: this.initialTimeWindow,
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
    },
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
