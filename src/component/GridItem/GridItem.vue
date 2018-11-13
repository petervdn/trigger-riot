<style src="./GridItem.scss" module lang="scss">
</style>
<script src="./GridItem.js">
</script>

<template>
  <div :class="[$style.wrap, isActive ? $style.active : null]">
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
