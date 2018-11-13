import { mapState } from 'vuex';
import WaveView from '../../component/WaveView/WaveView';
import Matrix from '../../component/Matrix/Matrix';
import ModeSelector from '../../component/ModeSelector/ModeSelector';
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
      bpm: 120,
      time: 0,
      viewWindow: 20,
      isPlaying: false,
    };
  },
  computed: {
    ...mapState({
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  mounted() {
    this.frame = new AnimationFrame(this.onFrame);
    this.context = new AudioContext();
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
    },
    onFrame() {
      this.time = this.context.currentTime - this.startTime;
    },
    start() {
      this.startTime = this.context.currentTime;
      this.frame.start();
      this.isPlaying = true;
    },
    stop() {
      this.frame.stop();
      this.isPlaying = false;
      this.time = 0;
    },
  },
};
