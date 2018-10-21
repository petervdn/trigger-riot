<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div style="padding: 20px">
    <WaveView
      :start="0"
      :end="10"
    />
    <input v-model.number="bpm">
    <ModeSelector />
    <Grid />
  </div>
</template>
