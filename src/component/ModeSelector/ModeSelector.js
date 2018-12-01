// @vue/component
import { mapState, mapMutations } from 'vuex';
import MatrixItemValueType, { valueTypes } from '../../data/enum/MatrixItemValueType';
import { SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE } from '../../store/module/matrix/matrix';

export default {
  name: 'ModeSelector',
  data() {
    return {
      types: valueTypes,
    };
  },
  computed: {
    ...mapState({
      activeMatrixItemValueType: state => state.matrix.activeMatrixItemValueType,
    }),
  },
  methods: {
    typeIsEnabled(type) {
      return [
        MatrixItemValueType.PULSE_WIDTH,
        MatrixItemValueType.DIVISION,
        MatrixItemValueType.STEPS,
      ].includes(type);
    },
    ...mapMutations({
      setActiveMatrixItemValueType: SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE,
    }),
  },
};
