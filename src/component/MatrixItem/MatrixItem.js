import { mapState, mapMutations } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import { UPDATE_ITEM_VALUE } from '../../store/module/matrix/matrix';
import { getMatrixItemValueDataById } from '../../util/matrixItemValueUtils';

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
      if (this.valueData) {
        return this.valueData.value;
      }

      return 0;
    },
    valueData() {
      return getMatrixItemValueDataById(this.matrixItem, this.activeMatrixItemValueId);
    },
    ...mapState({
      activeMatrixItemValueId: state => state.matrix.activeMatrixItemValueId,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  watch: {},
  methods: {
    onValueChange(value) {
      this.updateItemValue({
        value,
        itemIndex: this.matrixItem.index,
        id: this.activeMatrixItemValueId,
      });
    },
    ...mapMutations({
      updateItemValue: UPDATE_ITEM_VALUE,
    }),
  },
};
