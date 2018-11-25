import { mapState, mapMutations } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import MatrixItemValueType from '../../data/enum/MatrixItemValueType';
import { SET_PULSE_WIDTH, SET_DIVISION } from '../../store/module/matrix/matrix';
import { dialDataByType } from '../../util/matrixUtils';

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
    value() {
      switch (this.activeMatrixItemValueType) {
        case MatrixItemValueType.DIVISION: {
          return this.matrixItem.division;
        }
        case MatrixItemValueType.PULSE_WIDTH: {
          return this.matrixItem.pulseWidth;
        }
        case MatrixItemValueType.STEPS: {
          return this.matrixItem.steps;
        }
        default: {
          return 0;
        }
      }
    },
    dialData() {
      return dialDataByType[this.activeMatrixItemValueType];
    },
    ...mapState({
      activeMatrixItemValueType: state => state.matrix.activeMatrixItemValueType,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  watch: {},
  methods: {
    onValueChange(value) {
      if (this.activeMatrixItemValueType === MatrixItemValueType.DIVISION) {
        // todo move logic to store
        this.setDivision({ matrixItemIndex: this.matrixItem.index, division: value });
      } else if (this.activeMatrixItemValueType === MatrixItemValueType.PULSE_WIDTH) {
        this.setPulseWidth({ matrixItemIndex: this.matrixItem.index, pulseWidth: value });
      }
    },
    ...mapMutations({
      setPulseWidth: SET_PULSE_WIDTH,
      setDivision: SET_DIVISION,
    }),
  },
};
