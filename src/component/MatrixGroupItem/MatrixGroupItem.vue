<style src="./MatrixGroupItem.scss" module lang="scss"></style>
<script src="./MatrixGroupItem.js"></script>

<template>
  <div>
    <WaveView
      :matrix-items="matrixItemsGroup.items"
      :initial-time-window="5"
      :height="30"
      :wave-margin="7"
      :show-beats="false"
    />
    <SampleSelector @change="onSampleChange" />
  </div>
</template>
