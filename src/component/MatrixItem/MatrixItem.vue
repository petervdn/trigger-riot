<style src="./MatrixItem.scss" module lang="scss">
</style>
<script src="./MatrixItem.js">
</script>

<template>
  <div
    class="matrixItem"
    @click="onActivateClick"
  >
    <Dial
      :width="60"
      :min="dialData.min"
      :max="dialData.max"
      :integer="dialData.integer"
      :value="dialData.value"
      @change="onValueChange"
    />
  </div>
</template>
