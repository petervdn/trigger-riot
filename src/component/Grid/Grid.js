import { mapState } from 'vuex';
import GridItem from '../GridItem/GridItem';

// @vue/component
export default {
  name: 'Grid',
  components: {
    GridItem,
  },
  computed: {
    ...mapState({
      grid: state => state.app.grid,
    }),
  },
};
