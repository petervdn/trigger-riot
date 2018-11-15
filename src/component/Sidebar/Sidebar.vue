<style src="./Sidebar.scss" module lang="scss"></style>
<script src="./Sidebar.js"></script>

<template>
  <div>
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

    <div :class="$style.content">
      content
    </div>
  </div>
</template>
