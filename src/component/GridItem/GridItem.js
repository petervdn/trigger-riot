import { mapState } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import GridMode from '../../data/enum/GridMode';

// @vue/component
export default {
  name: 'GridItem',
  components: {
    Dial,
  },
  props: {
    gridItem: VueTypes.any,
  },
  computed: {
    dialData() {
      return this.activeGridMode === GridMode.DIVISION
        ? {
            value: this.gridItem.division,
            min: 0,
            max: 16,
            integer: true,
          }
        : {
            value: this.gridItem.pulseWidth,
            min: 0,
            max: 1,
          };
    },
    ...mapState({
      activeGridMode: state => state.app.activeGridMode,
    }),
  },
  watch: {},
  methods: {
    // onDialChange(value) {
    //   this.gridItem.pulseWidth = value;
    // },
  },
};
