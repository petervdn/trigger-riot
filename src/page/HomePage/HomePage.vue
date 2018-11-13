<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div style="padding: 20px">
    <h1>{{ time.toFixed(2) }}</h1>
    <button @click="start">start</button>
    <button @click="stop">stop</button>
    <WaveView
      :matrix-items="activeMatrixItems"
      :time-window="20"
      :width="700"
      :height="100"
      :wave-margin="20"
    />
    <!--<input v-model.number="bpm">-->
    <ModeSelector />
    <Matrix />
  </div>
</template>
