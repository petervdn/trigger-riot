import VueTypes from 'vue-types';
import { drawDial } from '../../util/dialUtils';
import { setCanvasSize } from '../../util/drawUtils';

// @vue/component
export default {
  name: 'Dial',
  props: {
    size: VueTypes.number.isRequired,
    min: VueTypes.number,
    max: VueTypes.number,
    integer: VueTypes.bool.def(false),
    value: VueTypes.number.isRequired,
    pixelsForFullRange: VueTypes.number.def(200),
    showValue: VueTypes.bool.def(true),
    formatter: VueTypes.func,
    options: VueTypes.array,
  },
  data() {
    return {
      // when there are options, and an invalid value, set value to 0 (when there are options, value is internally an integer)
      dialValue: this.options && !this.options.includes(this.value) ? 0 : this.value,
    };
  },
  computed: {
    minimum() {
      return this.options ? 0 : this.min;
    },
    maximum() {
      return this.options ? this.options.length - 1 : this.max;
    },
    displayValue() {
      const value = this.integer || this.options ? Math.trunc(this.dialValue) : this.dialValue;

      if (this.options) {
        return this.options[value];
      }
      return this.formatter ? this.formatter(value) : value;
    },
  },
  watch: {
    value(value) {
      // set the dial to the correct value when value changes from outside
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
      drawDial(this.context, (this.dialValue - this.minimum) / (this.maximum - this.minimum));
    },
    resize() {
      // const size = this.$refs.wrap.offsetWidth; todo why was it with offsetwidth
      setCanvasSize(this.context.canvas, this.size, this.size);
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
      const dragValue = this.startDragData.value + fullRangeFactor * (this.maximum - this.minimum);
      this.dialValue = Math.min(this.maximum, Math.max(this.minimum, dragValue));

      if (this.integer || this.options) {
        this.dialValue = Math.trunc(this.dialValue);
      }

      this.draw();
      this.$emit('change', this.dialValue);
    },
  },
};
