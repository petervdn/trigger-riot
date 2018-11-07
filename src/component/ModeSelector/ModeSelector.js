// @vue/component
import { mapState, mapMutations } from 'vuex';
import GridMode from '../../data/enum/GridMode';
import { SET_ACTIVE_GRID_MODE } from '../../store/module/app/app';

export default {
  name: 'ModeSelector',
  data() {
    return {
      modes: [GridMode.DIVISION, GridMode.PULSE_WIDTH],
    };
  },
  computed: {
    ...mapState({
      activeGridMode: state => state.app.activeGridMode,
    }),
  },
  methods: {
    ...mapMutations({
      setActiveGridMode: SET_ACTIVE_GRID_MODE,
    }),
  },
};