import { mapState, mapMutations } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import MatrixMode from '../../data/enum/MatrixMode';
import { SET_PULSE_WIDTH, SET_DIVISION } from '../../store/module/matrix/matrix';

// @vue/component
export default {
  name: 'MatrixItem',
  components: {
    Dial,
  },
  props: {
    matrixItem: VueTypes.any.isRequired, // todo define better
  },
  computed: {
    dialData() {
      return this.activeMatrixMode === MatrixMode.DIVISION
        ? {
            value: this.matrixItem.division,
            min: 0,
            max: 255,
            integer: true,
          }
        : {
            value: this.matrixItem.pulseWidth,
            min: 0,
            max: 1,
          };
    },
    ...mapState({
      activeMatrixMode: state => state.matrix.activeMatrixMode,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  watch: {},
  methods: {
    onValueChange(value) {
      if (this.activeMatrixMode === MatrixMode.DIVISION) {
        // todo move logic to store
        this.setDivision({ matrixItemIndex: this.matrixItem.index, division: value });
      } else if (this.activeMatrixMode === MatrixMode.PULSE_WIDTH) {
        this.setPulseWidth({ matrixItemIndex: this.matrixItem.index, pulseWidth: value });
      }
    },
    ...mapMutations({
      setPulseWidth: SET_PULSE_WIDTH,
      setDivision: SET_DIVISION,
    }),
  },
};
