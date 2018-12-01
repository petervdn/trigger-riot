<style src="./Sidebar.scss" module lang="scss"></style>
<script src="./Sidebar.js"></script>

<template>
  <div :class="$style.content">
    <h2>Randomizer</h2>
    <p :class="$style.info">Click on a name to add it to the values that will be randomized.</p>
    <Randomizer/>
  </div>
</template>
