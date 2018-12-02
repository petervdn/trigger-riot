<style src="./ModeSelector.scss" module lang="scss">
</style>
<script src="./ModeSelector.js">
</script>

<template>
  <div>
    <ul :class="$style.modeselector">
      <li
        v-for="id in ids"
        :class="{[$style.active]: id === activeMatrixItemValueId, [$style.disabled]: !valueIdIsEnabled(id), [$style.item]: true }"
        :key="id"
        @click="valueIdIsEnabled(id) ? setActiveMatrixItemValueId(id) : null"
      >{{ id }}</li>
    </ul>
  </div>
</template>
