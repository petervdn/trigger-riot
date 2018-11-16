import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import { drawWaveForItems } from '../../util/drawUtils';
import AnimationFrame from '../../util/AnimationFrame';
import Dial from '../Dial/Dial';

// @vue/component
export default {
  name: 'WaveView',
  components: {
    Dial,
  },
  props: {
    matrixItems: VueTypes.array.isRequired,
    width: VueTypes.number.isRequired,
    height: VueTypes.number.isRequired,
    initialTimeWindow: VueTypes.number.isRequired,
    waveMargin: VueTypes.number.isRequired,
    showInfoBar: VueTypes.bool.def(false),
  },
  data() {
    return {
      startTime: 0,
      timeWindow: this.initialTimeWindow,
      zoomDial: {
        min: 1,
        max: 30,
        value: 10,
      },
    };
  },
  computed: {
    selectedViewLabel() {
      if (this.matrixItems.length === 0) {
        return 'nothing';
      }
      if (this.matrixItems.length === 1) {
        return `${this.matrixItems[0].position.x + 1}.${this.matrixItems[0].position.y + 1}`;
      }

      if (this.matrixItems[0].position.x === this.matrixItems[1].position.x) {
        return `column-${this.matrixItems[0].position.x + 1}`;
      }
      return `row-${this.matrixItems[0].position.y + 1}`;
    },
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
