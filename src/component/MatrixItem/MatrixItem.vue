<style src="./MatrixItem.scss" module lang="scss">
</style>
<script src="./MatrixItem.js">
</script>

<template>
  <Dial
    :width="80"
    :min="dialData.min"
    :max="dialData.max"
    :integer="dialData.integer"
    :value="dialData.value"
    style="margin: 0 auto"
    @change="onValueChange"
  />
</template>
