import VueTypes from 'vue-types';
import { clearContext, drawWaveForItems } from '../../util/drawUtils';

// @vue/component
export default {
  name: 'WaveView',
  props: {
    start: VueTypes.number.isRequired,
    end: VueTypes.number.isRequired,
  },
  computed: {
    // ...mapState({
    //   gridItem
    // }),
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    clearContext(this.context);
  },
  methods: {
    draw() {
      drawWaveForItems(this.context, [], this.start, this.end);
    },
  },
};
