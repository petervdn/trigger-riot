// @vue/component
import { mapState, mapMutations } from 'vuex';
import { SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE } from '../../store/module/matrix/matrix';
import { MatrixItemValueType } from '../../data/enum/MatrixItemValue';

export default {
  name: 'ModeSelector',
  data() {
    return {
      types: Object.values(MatrixItemValueType),
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
        MatrixItemValueType.PULSE_WIDTH, // todo this is already defined elsewhere
        MatrixItemValueType.DIVISION,
        MatrixItemValueType.STEPS,
      ].includes(type);
    },
    ...mapMutations({
      setActiveMatrixItemValueType: SET_ACTIVE_MATRIX_ITEM_VALUE_TYPE,
    }),
  },
};
