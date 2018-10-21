import { createGridData } from '../../util/miscUtils';
import GridItem from '../GridItem/GridItem';

// @vue/component
export default {
  name: 'Grid',
  components: {
    GridItem,
  },
  data() {
    return {
      gridData: createGridData(),
      bpm: 120,
    };
  },
};
