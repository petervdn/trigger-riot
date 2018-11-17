<style src="./WaveView.scss" module lang="scss">
</style>
<script src="./WaveView.js">
</script>

<template>
  <div ref="wrap">
    <canvas
      ref="canvas"
      :width="`${width}px`"
      :height="`${height}px`"
    />
    <WaveViewControls
      v-if="showControls"
      :time-window="timeWindow"
      :matrix-items="matrixItems"
      @timeWindowChange="onTimeWindowChange"
    />
  </div>
</template>
