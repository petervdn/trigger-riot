// @vue/component
import { mapState, mapMutations } from 'vuex';
import MatrixMode from '../../data/enum/MatrixMode';
import { SET_ACTIVE_MATRIX_MODE } from '../../store/module/matrix/matrix';

export default {
  name: 'ModeSelector',
  data() {
    return {
      modes: [
        MatrixMode.DIVISION,
        MatrixMode.STEPS,
        MatrixMode.PROBABILITY,
        MatrixMode.SPEED,
        MatrixMode.CLOCK_SHIFT,
        MatrixMode.TIME_SHIFT,
        MatrixMode.PULSE_WIDTH,
      ],
    };
  },
  computed: {
    ...mapState({
      activeMatrixMode: state => state.matrix.activeMatrixMode,
    }),
  },
  methods: {
    modeIsEnabled(mode) {
      return mode === MatrixMode.DIVISION || mode === MatrixMode.PULSE_WIDTH;
    },
    ...mapMutations({
      setActiveMatrixMode: SET_ACTIVE_MATRIX_MODE,
    }),
  },
};
