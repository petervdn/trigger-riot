// @vue/component
import VueTypes from 'vue-types';

export default {
  name: 'MatrixItemValueRandomizer',
  props: {
    isActive: VueTypes.bool.isRequired,
    data: VueTypes.any.isRequired,
  },
  data() {
    return {
      minValue: this.data.min,
      maxValue: this.data.max,
    };
  },
  methods: {
    onMinInputBlur() {
      this.minValue = Math.min(this.minValue, this.maxValue);
      this.data.min = this.minValue; // todo: better to dispatch changes to parent?
    },
    onMaxInputBlur() {
      this.maxValue = Math.max(this.minValue, this.maxValue);
      this.data.max = this.maxValue;
    },
    onItemClick() {
      this.$emit('toggleActive', this.data.valueId);
    },
  },
};
