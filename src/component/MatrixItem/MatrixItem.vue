<style src="./MatrixItem.scss" module lang="scss">
</style>
<script src="./MatrixItem.js">
</script>

<template>
  <Dial
    :size="80"
    :min="valueData.min"
    :max="valueData.max"
    :integer="valueData.isInteger"
    :options="valueData.options"
    :pixels-for-full-range="200"
    :value="valueData.value"
    :formatter="null"
    style="margin: 0 auto"
    @change="onValueChange"
  />
</template>
