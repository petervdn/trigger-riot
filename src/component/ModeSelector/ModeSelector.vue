<style src="./ModeSelector.scss" module lang="scss">
</style>
<script src="./ModeSelector.js">
</script>

<template>
  <div>
    <ul>
      <li
        v-for="mode in modes"
        :class="{[$style.active]: mode === activeMatrixMode}"
        :key="mode"
        @click="setActiveMatrixMode(mode)"
      >{{ mode }}</li>
    </ul>
  </div>
</template>
