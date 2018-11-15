import { mapState } from 'vuex';
import WaveView from '../../component/WaveView/WaveView';
import Sidebar from '../../component/Sidebar/Sidebar';
import Header from '../../component/Header/Header';
import Matrix from '../../component/Matrix/Matrix';
import ModeSelector from '../../component/ModeSelector/ModeSelector';

// @vue/component
export default {
  name: 'HomePage',
  components: {
    WaveView,
    Matrix,
    ModeSelector,
    Sidebar,
    Header,
  },
  computed: {
    ...mapState({
      // playStartTime: state => state.app.playStartTime,
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
};
