import VueTypes from 'vue-types';

// @vue/component
export default {
  name: 'WaveView',
  props: {
    start: VueTypes.number.isRequired,
    end: VueTypes.number.isRequired,
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    this.clear();
  },
  methods: {
    clear() {
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    draw() {
      this.clear();
    },
  },
};
