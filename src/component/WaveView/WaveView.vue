<style src="./WaveView.scss" module lang="scss">
</style>
<script src="./WaveView.js">
</script>

<template>
  <div>
    <div>
      <button @click="draw">draw</button>
    </div>
    <canvas
      ref="canvas"
      width="500px"
      height="100px"
    />
    <input v-model="startTime">
    <input v-model="endTime">
  </div>
</template>
