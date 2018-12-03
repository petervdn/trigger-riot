// @vue/component
import { mapState, mapMutations } from 'vuex';
import { SET_ACTIVE_MATRIX_ITEM_VALUE_ID } from '../../store/module/matrix/matrix';
import { matrixItemValueIdsList } from '../../data/enum/MatrixItemValue';
import { matrixItemValueIdIsEnabled } from '../../util/matrixItemValueUtils';

export default {
  name: 'ModeSelector',
  data() {
    return {
      ids: matrixItemValueIdsList,
    };
  },
  computed: {
    ...mapState({
      activeMatrixItemValueId: state => state.matrix.activeMatrixItemValueId,
    }),
  },
  methods: {
    valueIdIsEnabled(id) {
      return matrixItemValueIdIsEnabled(id);
    },
    ...mapMutations({
      setActiveMatrixItemValueId: SET_ACTIVE_MATRIX_ITEM_VALUE_ID,
    }),
  },
};
