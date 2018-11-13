// @vue/component
import { mapState, mapMutations } from 'vuex';
import GridMode from '../../data/enum/GridMode';
import { SET_ACTIVE_GRID_MODE } from '../../store/module/grid/grid';

export default {
  name: 'ModeSelector',
  data() {
    return {
      modes: [GridMode.DIVISION, GridMode.PULSE_WIDTH],
    };
  },
  computed: {
    ...mapState({
      activeGridMode: state => state.grid.activeGridMode,
    }),
  },
  methods: {
    ...mapMutations({
      setActiveGridMode: SET_ACTIVE_GRID_MODE,
    }),
  },
};
