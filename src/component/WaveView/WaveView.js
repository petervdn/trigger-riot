import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import SliderValueMapper from 'map-slider-value';
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
    if (this.showInfoBar) {
      this.mapper = new SliderValueMapper(1, 30);
      this.$refs.zoom.value = this.mapper.reverseMap(this.timeWindow);
    }
    this.context = this.$refs.canvas.getContext('2d');
    this.frame = new AnimationFrame(this.onFrame);
    this.draw();
  },
  methods: {
    onZoomSliderChange(event) {
      this.timeWindow = this.mapper.map(parseInt(event.target.value, 10));
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
