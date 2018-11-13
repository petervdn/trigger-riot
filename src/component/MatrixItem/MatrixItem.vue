<style src="./MatrixItem.scss" module lang="scss">
</style>
<script src="./MatrixItem.js">
</script>

<template>
  <div :class="$style.wrap">
    <Dial
      :min="dialData.min"
      :max="dialData.max"
      :integer="dialData.integer"
      :value="dialData.value"
      @change="onValueChange"
    />
    <button @click="onActivateClick">activate</button>
    <!--<input v-model.number="gridItem.division">-->
    <!--<input v-model.number="gridItem.pulseWidth">-->
  </div>
</template>
