import { mapState, mapMutations } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import { UPDATE_ITEM_VALUE } from '../../store/module/matrix/matrix';
import { getMatrixItemValueById } from '../../util/matrixItemValueUtils';

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
      console.log(this.valueData);
      return this.valueData ? this.valueData.value : 0;
    },
    valueData() {
      return getMatrixItemValueById(this.matrixItem, this.activeMatrixItemValueId);
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
        matrixItem: this.matrixItem,
        id: this.activeMatrixItemValueId,
      });
    },
    ...mapMutations({
      updateItemValue: UPDATE_ITEM_VALUE,
    }),
  },
};
