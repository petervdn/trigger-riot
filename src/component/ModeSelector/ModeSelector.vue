<style src="./ModeSelector.scss" module lang="scss">
</style>
<script src="./ModeSelector.js">
</script>

<template>
  <div>
    <ul>
      <li
        v-for="type in types"
        :class="{[$style.active]: type === activeMatrixItemValueType, [$style.disabled]: !typeIsEnabled(type)}"
        :key="type"
        @click="typeIsEnabled(type) ? setActiveMatrixItemValueType(type) : null"
      >{{ type }}</li>
    </ul>
  </div>
</template>
