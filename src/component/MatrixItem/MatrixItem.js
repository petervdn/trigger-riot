import { mapState, mapMutations } from 'vuex';
import VueTypes from 'vue-types';
import Dial from '../Dial/Dial';
import { UPDATE_ITEM_VALUE } from '../../store/module/matrix/matrix';
import { matrixItemValues, MatrixItemValueType } from '../../data/enum/MatrixItemValue';

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
      // todo rename
      // return dialDataByType[this.activeMatrixItemValueType];
      return matrixItemValues.find(value => value.type === this.activeMatrixItemValueType); // todo maybe set full object instead of only type?
    },
    ...mapState({
      activeMatrixItemValueType: state => state.matrix.activeMatrixItemValueType,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  watch: {},
  methods: {
    onValueChange(value) {
      this.updateItemValue({
        value,
        itemIndex: this.matrixItem.index,
        valueType: this.activeMatrixItemValueType,
      });
    },
    ...mapMutations({
      updateItemValue: UPDATE_ITEM_VALUE,
    }),
  },
};
