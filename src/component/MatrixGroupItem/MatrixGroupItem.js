// @vue/component
import VueTypes from 'vue-types';
import { mapMutations } from 'vuex';
import { SET_ACTIVE_ITEMS } from '../../store/module/matrix/matrix';

export default {
  name: 'MatrixGroupItem',
  props: {
    matrixItems: VueTypes.array.isRequired, // todo define better
  },
  methods: {
    onActivateClick() {
      this.setActiveItems(this.matrixItems);
    },
    ...mapMutations({
      setActiveItems: SET_ACTIVE_ITEMS,
    }),
  },
};
