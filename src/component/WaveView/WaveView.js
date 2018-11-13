import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import { drawWaveForItems } from '../../util/drawUtils';

// @vue/component
export default {
  name: 'WaveView',
  props: {
    startTime: VueTypes.number.isRequired,
    endTime: VueTypes.number.isRequired,
    matrixItems: VueTypes.array.isRequired,
  },
  computed: {
    ...mapState({
      bpm: state => state.app.bpm,
    }),
  },
  watch: {
    startTime() {
      this.draw();
    },
    endTime() {
      this.draw();
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    this.draw();
  },
  methods: {
    draw() {
      drawWaveForItems(this.context, this.matrixItems, this.bpm, {
        start: this.startTime,
        end: this.endTime,
      });
    },
  },
};
