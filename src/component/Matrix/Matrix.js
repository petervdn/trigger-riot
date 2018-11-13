import { mapState } from 'vuex';
import MatrixItem from '../MatrixItem/MatrixItem';

// @vue/component
export default {
  name: 'Matrix',
  components: {
    MatrixItem,
  },
  computed: {
    ...mapState({
      matrix: state => state.matrix.matrix,
    }),
  },
};
