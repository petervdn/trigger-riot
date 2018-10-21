import VueTypes from 'vue-types';
import { drawDial } from '../../util/dialUtils';

// @vue/component
export default {
  name: 'Dial',
  props: {
    min: VueTypes.number.isRequired,
    max: VueTypes.number.isRequired,
    float: VueTypes.bool.def(true),
    value: VueTypes.number.isRequired,
    arcRange: VueTypes.number.def(0.75),
    arcWidth: VueTypes.number.def(6),
    arcRotation: VueTypes.number.def(Math.PI / 2),
    arcColor: VueTypes.string.def('orange'),
    arcBgColor: VueTypes.string.def('black'),
    pixelsForFullRange: VueTypes.number.def(200),
  },
  data() {
    return {
      dialValue: this.value,
    };
  },
  watch: {
    value(value) {
      if (value !== this.dialValue) {
        this.setValue(value);
        console.log('update');
      }
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    this.setValue(this.value); // makes sure it is between bounds
    setTimeout(() => {
      this.resize();
    }, 0);
  },
  methods: {
    setValue(value) {
      this.dialValue = Math.min(this.max, Math.max(this.min, value));
      this.draw();
      this.$emit('change', this.dialValue);
    },
    draw() {
      drawDial(this.context, this.dialValue);
    },
    resize() {
      this.size = this.$refs.wrap.offsetWidth;

      const scale = window.devicePixelRatio;
      this.context.canvas.style.width = `${this.size}px`;
      this.context.canvas.style.height = `${this.size}px`;
      this.context.canvas.width = `${this.size * scale}`;
      this.context.canvas.height = `${this.size * scale}`;

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
      this.setValue(
        this.startDragData.value + (this.startDragData.y - event.pageY) / this.pixelsForFullRange,
      );
      event.preventDefault();
    },
  },
};
