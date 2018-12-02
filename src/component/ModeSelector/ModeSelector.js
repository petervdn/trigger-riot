// @vue/component
import { mapState, mapMutations } from 'vuex';
import { SET_ACTIVE_MATRIX_ITEM_VALUE_ID } from '../../store/module/matrix/matrix';
import { MatrixItemValueId } from '../../data/enum/MatrixItemValue';
import { matrixItemValueIsEnabled } from '../../util/matrixUtils';

export default {
  name: 'ModeSelector',
  data() {
    return {
      ids: Object.values(MatrixItemValueId),
    };
  },
  computed: {
    ...mapState({
      activeMatrixItemValueId: state => state.matrix.activeMatrixItemValueId,
    }),
  },
  methods: {
    valueIdIsEnabled(id) {
      return matrixItemValueIsEnabled(id);
    },
    ...mapMutations({
      setActiveMatrixItemValueId: SET_ACTIVE_MATRIX_ITEM_VALUE_ID,
    }),
  },
};
