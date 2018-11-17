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
        window: {{ timeWindow }}s
      </div>
      <div>
        <input type="range">
      </div>
    </div>
  </div>
</template>
