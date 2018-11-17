import { mapState } from 'vuex';
import MatrixElement from '../MatrixElement/MatrixElement';
import MatrixGroupItem from '../MatrixGroupItem/MatrixGroupItem';

// @vue/component
export default {
  name: 'Matrix',
  components: {
    MatrixElement,
    MatrixGroupItem,
  },
  computed: {
    ...mapState({
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  methods: {
    itemIsActive(matrixItem) {
      return this.activeMatrixItems.includes(matrixItem);
    },
  },
};
