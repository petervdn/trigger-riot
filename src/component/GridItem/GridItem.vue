<style src="./GridItem.scss" module lang="scss"></style>
<script src="./GridItem.js"></script>

<template>
  <div :class="$style.wrap">
    <Dial
      :min="dialData.min"
      :max="dialData.max"
      :integer="dialData.integer"
      :value="dialData.value"
      @change="onValueChange"
    />
    <!--<input v-model.number="gridItem.division">-->
    <!--<input v-model.number="gridItem.pulseWidth">-->
  </div>
</template>
