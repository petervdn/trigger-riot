import VueTypes from 'vue-types';
import { drawDial } from '../../util/dialUtils';
import { setCanvasSize } from '../../util/drawUtils';

// @vue/component
export default {
  name: 'Dial',
  props: {
    min: VueTypes.number.isRequired,
    max: VueTypes.number.isRequired,
    integer: VueTypes.bool.def(false),
    value: VueTypes.number.isRequired,
    pixelsForFullRange: VueTypes.number.def(200),
  },
  data() {
    return {
      dialValue: 0,
    };
  },
  computed: {
    dialValueFactor() {
      return (this.dialValue - this.min) / (this.max - this.min);
    },
  },
  watch: {
    value(value) {
      // set the dial to the correct value
      this.dialValue = value;
    },
    dialValue(value) {
      this.dialValue = Math.min(this.max, Math.max(this.min, value));
      this.draw();
      this.$emit('change', this.dialValue);
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');

    setTimeout(() => {
      // otherwise canvas is not ready?
      this.resize();
      this.dialValue = this.value; // triggers watcher
    }, 0);
  },
  methods: {
    draw() {
      drawDial(this.context, this.dialValueFactor);
    },
    resize() {
      const size = this.$refs.wrap.offsetWidth;
      setCanvasSize(this.context.canvas, size, size);
      this.draw();
    },
    onCanvasMouseDown(event) {
      this.startDragData = { value: this.dialValue, x: event.pageX, y: event.pageY };
      document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('mouseup', this.onDoucumentMouseUp);

      event.preventDefault(); // prevents selecting stuff in page
    },
    onDoucumentMouseUp() {
      document.removeEventListener('mousemove', this.onDocumentMouseMove);
      document.removeEventListener('mouseup', this.onDoucumentMouseUp);
    },
    onDocumentMouseMove(event) {
      const fullRangeFactor = (this.startDragData.y - event.pageY) / this.pixelsForFullRange;
      this.dialValue = this.startDragData.value + fullRangeFactor * (this.max - this.min);

      if (this.integer) {
        this.dialValue = Math.trunc(this.dialValue);
      }

      // event.preventDefault(); todo why was this
    },
  },
};
