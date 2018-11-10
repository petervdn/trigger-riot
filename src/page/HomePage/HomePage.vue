<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div style="padding: 20px">
    <h2>{{ time }}</h2>
    <button @click="togglePlay">{{ isPlaying ? 'stop' : 'start' }}</button>
    <WaveView
      :start-time="time"
      :grid-item="grid.items[0]"
      :end-time="time + viewWindow"
    />
    <input v-model.number="bpm">
    <ModeSelector />
    <Grid />
  </div>
</template>
