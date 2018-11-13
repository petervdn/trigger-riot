import { mapState, mapActions } from 'vuex';
import WaveView from '../../component/WaveView/WaveView';
import Matrix from '../../component/Matrix/Matrix';
import ModeSelector from '../../component/ModeSelector/ModeSelector';
import { START_PLAY, STOP_PLAY } from '../../store/module/app/app';
import AnimationFrame from '../../util/AnimationFrame';

// @vue/component
export default {
  name: 'HomePage',
  components: {
    WaveView,
    Matrix,
    ModeSelector,
  },
  data() {
    return {
      time: 0,
      isPlaying: false,
    };
  },
  computed: {
    ...mapState({
      playStartTime: state => state.app.playStartTime,
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  watch: {
    playStartTime(time) {
      if (time === -1) {
        this.frame.stop();
        this.time = 0;
      } else {
        this.frame.start();
      }
    },
  },
  mounted() {
    this.frame = new AnimationFrame(this.onFrame);
  },
  methods: {
    ...mapActions({
      start: START_PLAY,
      stop: STOP_PLAY,
    }),
    onFrame() {
      this.time = this.$soundManager.context.currentTime - this.playStartTime;
    },
  },
};
