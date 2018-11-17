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
    items: VueTypes.array.isRequired, // todo define better
  },
  computed: {
    isGroup() {
      return this.items.length > 1;
    },
  },
  methods: {
    ...mapMutations({
      setActiveItems: SET_ACTIVE_ITEMS,
    }),
    onActivateClick() {
      this.setActiveItems(this.items);
    },
  },
};
