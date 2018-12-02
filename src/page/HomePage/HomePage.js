import { mapState } from 'vuex';
import WaveView from '../../component/WaveView/WaveView';
import Sidebar from '../../component/Sidebar/Sidebar';
import Header from '../../component/Header/Header';
import Dial from '../../component/Dial/Dial';
import Matrix from '../../component/Matrix/Matrix';
import Transport from '../../component/Transport/Transport';
import ModeSelector from '../../component/ModeSelector/ModeSelector';
import BeatLabelTypes from '../../data/enum/BeatLabelTypes';

/*
- reset button
- share
- metronome
- mobile dials
- mobile layout
- other browsers
- bpm adjustable (layout)
- loopable region
- use only 1 instance of valueItemData
- incorrect sound triggers (div 45 & 5 on first 2 dials, immediately in the first few beats)
- maybe cache pulsewaves for matrixitems (for a given timewindow?) they are now calculated more than once (because they exist in both row/column)
 */

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
      matrix: state => state.matrix.matrix,
      activeMatrixItems: state => state.matrix.activeItems,
    }),
  },
};
