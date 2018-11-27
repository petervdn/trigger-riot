import VueTypes from 'vue-types';
import { mapMutations } from 'vuex';
import MatrixItem from '../MatrixItem/MatrixItem';
import MatrixGroupItem from '../MatrixGroupItem/MatrixGroupItem';
import { SET_ACTIVE_ITEMS } from '../../store/module/matrix/matrix';

// @vue/component
export default {
  name: 'MatrixElement',
  components: {
    MatrixItem,
    MatrixGroupItem,
  },
  props: {
    data: VueTypes.any.isRequired,
  },
  computed: {
    isGroup() {
      return !this.data.position; // todo change this approach
    },
  },
  methods: {
    onClick() {
      this.setActiveItems(this.isGroup ? this.data.items : [this.data]);
    },
    ...mapMutations({
      setActiveItems: SET_ACTIVE_ITEMS,
    }),
  },
};
