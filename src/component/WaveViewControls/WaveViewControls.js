// @vue/component
import SliderValueMapper from 'map-slider-value';
import VueTypes from 'vue-types';

export default {
  name: 'WaveViewControls',
  props: {
    matrixItems: VueTypes.array.isRequired,
    timeWindow: VueTypes.number.isRequired,
  },
  mounted() {
    this.mapper = new SliderValueMapper(1, 30);
    this.$refs.zoom.value = this.mapper.reverseMap(this.timeWindow);
  },
  methods: {
    onZoomSliderChange(event) {
      this.$emit('timeWindowChange', this.mapper.map(parseInt(event.target.value, 10)));
    },
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
  },
};
