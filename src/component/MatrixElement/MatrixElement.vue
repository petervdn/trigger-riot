<style src="./MatrixElement.scss" module lang="scss">
</style>
<script src="./MatrixElement.js">
</script>

<template>
  <div :class="$style.matrixElement">
    <div :class="$style.controls">
      <button @click="onActivateClick">v</button>
      <button>m</button>
      <button>s</button>
    </div>

    <MatrixItem
      v-if="!isGroup"
      :class="$style.content"
      :matrix-item="data"
    />
    <MatrixGroupItem
      v-if="isGroup"
      :class="$style.content"
      :matrix-items-group="data"
    />
  </div>
</template>
