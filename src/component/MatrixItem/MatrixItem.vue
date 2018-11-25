<style src="./MatrixItem.scss" module lang="scss">
</style>
<script src="./MatrixItem.js">
</script>

<template>
  <Dial
    :size="80"
    :min="dialData.min"
    :max="dialData.max"
    :integer="dialData.integer"
    :value="dialData.value"
    :formatter="dialData.formatter"
    style="margin: 0 auto"
    @change="onValueChange"
  />
</template>
