<style src="./ModeSelector.scss" module lang="scss">
</style>
<script src="./ModeSelector.js">
</script>

<template>
  <div>
    <h2>{{ activeGridMode }}</h2>
    <ul>
      <li
        v-for="mode in modes"
        :class="'active'"
        :key="mode"
        @click="setActiveGridMode(mode)"
      >{{ mode }}</li>
    </ul>
  </div>
</template>
