<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div style="padding: 20px">
    <h1>{{ time.toFixed(2) }}</h1>
    <button @click="togglePlay">{{ isPlaying ? 'stop' : 'start' }}</button>
    <WaveView
      :start-time="time"
      :matrix-items="activeMatrixItems"
      :end-time="time + viewWindow"
    />
    <input v-model.number="bpm">
    <ModeSelector />
    <Matrix />
  </div>
</template>
