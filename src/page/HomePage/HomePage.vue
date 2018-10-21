<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div>
    <h2>HomePage</h2>
    <WaveView
      :start="0"
      :end="10"
    />
    <Grid />
  </div>
</template>
