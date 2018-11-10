import VueTypes from 'vue-types';
import { mapState } from 'vuex';
import { clearContext, drawWaveForItems } from '../../util/drawUtils';

// @vue/component
export default {
  name: 'WaveView',
  props: {
    start: VueTypes.number.isRequired,
    end: VueTypes.number.isRequired,
  },
  data() {
    return {
      startTime: 2,
      endTime: 11,
    };
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
    clearContext(this.context);
    this.draw();
  },
  methods: {
    draw() {
      drawWaveForItems(this.context, [], this.bpm, this.startTime, this.endTime);
    },
  },
};
