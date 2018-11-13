import { mapState, mapMutations } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import GridMode from '../../data/enum/GridMode';
import { SET_PULSE_WIDTH, SET_DIVISION, SET_ACTIVE_ITEMS } from '../../store/module/grid/grid';

// @vue/component
export default {
  name: 'GridItem',
  components: {
    Dial,
  },
  props: {
    gridItem: VueTypes.any, // todo define better
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
      activeGridMode: state => state.grid.activeGridMode,
      activeGridItems: state => state.grid.activeItems,
    }),
  },
  watch: {},
  methods: {
    onValueChange(value) {
      if (this.activeGridMode === GridMode.DIVISION) {
        this.setDivision({ gridItemIndex: this.gridItem.index, division: value });
      } else if (this.activeGridMode === GridMode.PULSE_WIDTH) {
        this.setPulseWidth({ gridItemIndex: this.gridItem.index, pulseWidth: value });
      }
    },
    ...mapMutations({
      setPulseWidth: SET_PULSE_WIDTH,
      setDivision: SET_DIVISION,
      setActiveItems: SET_ACTIVE_ITEMS,
    }),
    onActivateClick() {
      this.setActiveItems([this.gridItem]);
    },
  },
};
