<style src="./WaveViewControls.scss" module lang="scss"></style>
<script src="./WaveViewControls.js"></script>

<template>
  <div
    :class="$style.controls">
    <div>viewing: <strong>{{ selectedViewLabel }}</strong></div>
    <div>
      window: <strong>{{ timeWindow.toFixed(2) }}s</strong>
    </div>
    <div>
      <input
        ref="zoom"
        type="range"
        @input="onZoomSliderChange"
      >
    </div>
    <div :class="$style.beatLabelOptions">
      show
      <a
        href="#"
        @click="changeBeatLabelType"
      >
        {{ beatLabelType }}</a>
      every
      <a
        href="#"
        @click="changeBeatLabelRepeat"
      >
        {{ beatLabelRepeat === 1 ? 'beat' : `${beatLabelRepeat} beats` }}</a>
    </div>
  </div>
</template>
