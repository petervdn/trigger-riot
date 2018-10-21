<style src="./GridItem.scss" module lang="scss"></style>
<script src="./GridItem.js"></script>

<template>
  <div :class="$style.wrap">
    <input v-model.number="gridItem.division">
    <input v-model.number="gridItem.pulseWidth">
  </div>
</template>
