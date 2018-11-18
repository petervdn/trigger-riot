// @vue/component
import VueTypes from 'vue-types';
import { mapMutations } from 'vuex';
import WaveView from '../WaveView/WaveView';
import SampleSelector from '../SampleSelector/SampleSelector';
import { SET_ACTIVE_ITEMS } from '../../store/module/matrix/matrix';

export default {
  name: 'MatrixGroupItem',
  components: {
    WaveView,
    SampleSelector,
  },
  props: {
    matrixItemsGroup: VueTypes.any.isRequired, // todo define better, is IMatrixGroup
  },
  methods: {
    ...mapMutations({
      setActiveItems: SET_ACTIVE_ITEMS,
    }),
  },
};
