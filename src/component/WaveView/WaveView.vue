<style src="./WaveView.scss" module lang="scss">
</style>
<script src="./WaveView.js">
</script>

<template>
  <div :style="{width: `${width}px`}">
    <canvas
      ref="canvas"
      :width="`${width}px`"
      :height="`${height}px`"
    />
    <div
      v-if="showInfoBar"
      :class="$style.infoBar">
      <div>viewing: {{ selectedViewLabel }}</div>
      <div>
        window: {{ timeWindow.toFixed(2) }}s
      </div>
      <div>
        <input
          ref="zoom"
          type="range"
          @input="onZoomSliderChange"
        >
      </div>
    </div>
  </div>
</template>
