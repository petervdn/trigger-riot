// @vue/component
import VueTypes from 'vue-types';
import { mapMutations } from 'vuex';
import WaveView from '../WaveView/WaveView';
import SampleSelector from '../SampleSelector/SampleSelector';
import { SET_ACTIVE_ITEMS, SET_SAMPLE_FOR_GROUP } from '../../store/module/matrix/matrix';

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
    onSampleChange(sample) {
      this.setSampleForGroup({ sample, group: this.matrixItemsGroup });
    },
    ...mapMutations({
      setActiveItems: SET_ACTIVE_ITEMS,
      setSampleForGroup: SET_SAMPLE_FOR_GROUP,
    }),
  },
};
