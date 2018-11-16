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
      <span>viewing: {{ selectedViewLabel }}</span>
      <span>
        window: {{ timeWindow }}s
      </span>
    </div>
  </div>
</template>
