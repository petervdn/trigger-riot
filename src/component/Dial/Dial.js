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
      dialValue: this.value,
    };
  },
  watch: {
    value(value) {
      // set the dial to the correct value when set from outside
      this.dialValue = value;
      this.draw();
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    setTimeout(this.resize);
  },
  methods: {
    draw() {
      // draws the value as factor (0 to 1)
      drawDial(this.context, (this.dialValue - this.min) / (this.max - this.min));
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
      const dragValue = this.startDragData.value + fullRangeFactor * (this.max - this.min);
      this.dialValue = Math.min(this.max, Math.max(this.min, dragValue));

      if (this.integer) {
        this.dialValue = Math.trunc(this.dialValue);
      }

      this.draw();
      this.$emit('change', this.dialValue);
    },
  },
};
