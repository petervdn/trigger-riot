// @vue/component
export default {
  name: 'SampleSelector',
  data() {
    return {
      samples: this.$soundManager.sampleManager.getAllSamples(), // todo move to store
      selectedName: null,
      isLoading: false,
    };
  },
  computed: {
    selectedSample() {
      return this.samples.find(sample => sample.name === this.selectedName);
    },
  },
  watch: {
    selectedSample(sample) {
      if (!sample) {
        this.$emit('change', null);
      } else if (!sample.audioBuffer) {
        this.isLoading = true;
        this.$soundManager.sampleManager
          .loadSamplesByName([sample.name])
          .then(() => {
            this.isLoading = false;
            this.$emit('change', sample);
          })
          .catch(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
