<style src="./ModeSelector.scss" module lang="scss">
</style>
<script src="./ModeSelector.js">
</script>

<template>
  <div>
    <ul>
      <li
        v-for="mode in modes"
        :class="{[$style.active]: mode === activeMatrixMode, [$style.disabled]: !modeIsEnabled(mode)}"
        :key="mode"
        @click="modeIsEnabled(mode) ? setActiveMatrixMode(mode) : null"
      >{{ mode }}</li>
    </ul>
  </div>
</template>
