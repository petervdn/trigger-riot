<style src="./MatrixGroupItem.scss" module lang="scss"></style>
<script src="./MatrixGroupItem.js"></script>

<template>
  <div @click="onActivateClick">
    <WaveView
      :matrix-items="matrixItems"
      :time-window="5"
      :width="80"
      :height="30"
      :wave-margin="5"
    />
    <!--<button @click="onActivateClick">activate</button>-->
  </div>
</template>
