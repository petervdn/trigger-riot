import { mapState, mapMutations } from 'vuex';
import { UPDATE_ITEM_VALUE } from '../../store/module/matrix/matrix';
import MatrixItemValueRandomizer from '../MatrixItemValueRandomizer/MatrixItemValueRandomizer';
import { createRandomizeData, randomizeMatrixItems } from '../../util/matrixItemValueUtils';

const ApplyToMode = {
  ALL: 'all',
  SELECTION: 'selection',
};

// @vue/component
export default {
  name: 'Randomizer',
  components: {
    MatrixItemValueRandomizer,
  },
  data() {
    return {
      ApplyToMode,
      applyToMatrixItems: ApplyToMode.SELECTION,
      valueIdsToRandomize: ['division', 'pulse-width'],
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
    onToggleActiveValueId(id) {
      const index = this.valueIdsToRandomize.indexOf(id);
      if (index === -1) {
        this.valueIdsToRandomize.push(id);
      } else {
        this.valueIdsToRandomize.splice(index, 1);
      }
    },
    ...mapMutations({
      updateMatrixItemValue: UPDATE_ITEM_VALUE,
    }),
    randomize() {
      randomizeMatrixItems(
        this.applyToMatrixItems === ApplyToMode.ALL ? this.matrix.items : this.activeMatrixItems,
        this.randomizeData,
        this.valueIdsToRandomize,
        this.$store,
      );
    },
  },
};
