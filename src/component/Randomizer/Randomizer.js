import { mapState, mapMutations } from 'vuex';
import { UPDATE_ITEM_VALUE } from '../../store/module/matrix/matrix';

import {
  createRandomizeData,
  randomizeMatrixItems,
  matrixItemValueTypeIsEnabled,
} from '../../util/matrixUtils';
import { matrixItemValues, MatrixItemValueType } from '../../data/enum/MatrixItemValue';

const ApplyToMode = {
  ALL: 'all',
  SELECTION: 'selection',
};

// @vue/component
export default {
  name: 'Randomizer',
  data() {
    return {
      ApplyToMode,
      valueTypes: matrixItemValues,
      applyToMatrixItems: ApplyToMode.SELECTION,
      activeValueTypes: [MatrixItemValueType.DIVISION, MatrixItemValueType.PULSE_WIDTH], // todo rename activeValueTypes
      randomizeData: createRandomizeData(),
    };
  },
  computed: {
    ...mapState({
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  methods: {
    ...mapMutations({
      updateMatrixItemValue: UPDATE_ITEM_VALUE,
    }),
    onValueTypeItemClick(type) {
      const index = this.activeValueTypes.indexOf(type);
      if (index === -1) {
        this.activeValueTypes.push(type);
      } else {
        this.activeValueTypes.splice(index, 1);
      }
    },
    randomize() {
      randomizeMatrixItems(
        this.applyToMatrixItems === ApplyToMode.ALL ? this.matrix.items : this.activeMatrixItems,
        this.randomizeData,
        this.activeValueTypes,
        this.$store,
      );
    },
    typeIsEnabled(type) {
      return matrixItemValueTypeIsEnabled(type);
    },
  },
};
