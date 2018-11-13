<style src="./WaveView.scss" module lang="scss">
</style>
<script src="./WaveView.js">
</script>

<template>
  <div>
    <canvas
      ref="canvas"
      :width="`${width}px`"
      :height="`${height}px`"
    />
  </div>
</template>
