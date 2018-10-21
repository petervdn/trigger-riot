import WaveView from '../../component/WaveView/WaveView';
import Grid from '../../component/Grid/Grid';
import ModeSelector from '../../component/ModeSelector/ModeSelector';

// @vue/component
export default {
  name: 'HomePage',
  components: {
    WaveView,
    Grid,
    ModeSelector,
  },
  data() {
    return {
      bpm: 120,
    };
  },
};
