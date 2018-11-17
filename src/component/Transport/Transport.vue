<style src="./Transport.scss" module lang="scss"></style>
<script src="./Transport.js"></script>

<template>
  <div :class="$style.transport">
    <div :class="$style.time">
      0.0s
    </div>
    <div :class="$style.bpm">
      120bpm
    </div>
    <div :class="$style.playstop">
      <button @click="start">start</button>
      <button @click="stop">stop</button>
    </div>
  </div>
</template>
