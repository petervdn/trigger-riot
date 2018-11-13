<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div style="padding: 20px">
    <h1>{{ time.toFixed(2) }}</h1>
    <button @click="togglePlay">{{ isPlaying ? 'stop' : 'start' }}</button>
    <WaveView
      :start-time="time"
      :grid-item="activeGridItems[0]"
      :end-time="time + viewWindow"
    />
    <input v-model.number="bpm">
    <ModeSelector />
    <Grid />
  </div>
</template>
