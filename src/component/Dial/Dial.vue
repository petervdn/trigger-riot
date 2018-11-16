<style src="./Dial.scss" module lang="scss"></style>
<script src="./Dial.js"></script>

<template>
  <div
    ref="wrap"
    :style="{ width: `${width}px` } "
    :class="$style.dial"
  >
    <canvas
      ref="canvas"
      @mousedown="onCanvasMouseDown"
    />
    <p v-if="showValue">{{ displayValue }}</p>
  </div>
</template>
