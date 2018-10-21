<style src="./GridItem.scss" module lang="scss"></style>
<script src="./GridItem.js"></script>

<template>
  <div :class="$style.wrap">
    <h2>{{ gridItem.position.x }}, {{ gridItem.position.y }}</h2>
    <input v-model.number="gridItem.division">
  </div>
</template>
