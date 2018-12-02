<style src="./MatrixItem.scss" module lang="scss">
</style>
<script src="./MatrixItem.js">
</script>

<template>
  <Dial
    :size="80"
    :min="valueData.metaData.min"
    :max="valueData.metaData.max"
    :integer="valueData.metaData.isInteger"
    :options="valueData.metaData.options"
    :pixels-for-full-range="200"
    :value="valueData.value"
    :formatter="null"
    style="margin: 0 auto"
    @change="onValueChange"
  />
</template>
