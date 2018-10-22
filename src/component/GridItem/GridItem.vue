<style src="./GridItem.scss" module lang="scss"></style>
<script src="./GridItem.js"></script>

<template>
  <div :class="$style.wrap">
    <Dial
      :min="dialData.min"
      :max="dialData.max"
      :value="dialData.value"
      @change="onDialChange"
    />
    <!--<input v-model.number="gridItem.division">-->
    <!--<input v-model.number="gridItem.pulseWidth">-->
  </div>
</template>
