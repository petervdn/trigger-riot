<style src="./WaveViewControls.scss" module lang="scss"></style>
<script src="./WaveViewControls.js"></script>

<template>
  <div
    :class="$style.controls">
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
</template>
