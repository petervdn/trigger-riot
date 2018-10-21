import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';

// @vue/component
export default {
  name: 'GridItem',
  components: {
    Dial,
  },
  props: {
    gridItem: VueTypes.any,
  },
  methods: {
    onDialChange(value) {
      this.gridItem.pulseWidth = value;
    },
  },
};
