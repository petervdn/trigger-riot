<style src="./Dial.scss" module lang="scss"></style>
<script src="./Dial.js"></script>

<template>
  <div
    ref="wrap"
    :class="$style.wrap"
  >
    <canvas
      ref="canvas"
      @mousedown="onCanvasMouseDown"
    />
    <p>{{ displayValue }}</p>
  </div>
</template>
