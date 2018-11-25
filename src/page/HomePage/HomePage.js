import { mapState } from 'vuex';
import WaveView from '../../component/WaveView/WaveView';
import Sidebar from '../../component/Sidebar/Sidebar';
import Header from '../../component/Header/Header';
import Dial from '../../component/Dial/Dial';
import Matrix from '../../component/Matrix/Matrix';
import Transport from '../../component/Transport/Transport';
import ModeSelector from '../../component/ModeSelector/ModeSelector';
import BeatLabelTypes from '../../data/enum/BeatLabelTypes';

// @vue/component
export default {
  name: 'HomePage',
  components: {
    WaveView,
    Dial,
    Matrix,
    ModeSelector,
    Sidebar,
    Header,
    Transport,
  },
  data() {
    return {
      BeatLabelTypes,
    };
  },
  computed: {
    ...mapState({
      // playStartTime: state => state.app.playStartTime,
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
