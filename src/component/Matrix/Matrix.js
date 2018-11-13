import { mapState } from 'vuex';
import MatrixItem from '../MatrixItem/MatrixItem';
import MatrixGroupItem from '../MatrixGroupItem/MatrixGroupItem';

// @vue/component
export default {
  name: 'Matrix',
  components: {
    MatrixItem,
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
