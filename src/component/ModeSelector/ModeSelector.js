// @vue/component
import { mapState, mapMutations } from 'vuex';
import MatrixItemValueType from '../../data/enum/MatrixItemValueType';
import { SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE } from '../../store/module/matrix/matrix';

export default {
  name: 'ModeSelector',
  data() {
    return {
      types: [
        MatrixItemValueType.DIVISION,
        MatrixItemValueType.STEPS,
        MatrixItemValueType.PROBABILITY,
        MatrixItemValueType.SPEED,
        MatrixItemValueType.CLOCK_SHIFT,
        MatrixItemValueType.TIME_SHIFT,
        MatrixItemValueType.PULSE_WIDTH,
      ],
    };
  },
  computed: {
    ...mapState({
      activeMatrixItemValueType: state => state.matrix.activeMatrixItemValueType,
    }),
  },
  methods: {
    typeIsEnabled(type) {
      return type === MatrixItemValueType.DIVISION || type === MatrixItemValueType.PULSE_WIDTH;
    },
    ...mapMutations({
      setActiveMatrixItemValueType: SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE,
    }),
  },
};
