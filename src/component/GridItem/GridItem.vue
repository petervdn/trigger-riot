<style src="./GridItem.scss" module lang="scss"></style>
<script src="./GridItem.js"></script>

<template>
  <div :class="$style.wrap">
    <Dial
      :min="0"
      :max="1"
      :value="gridItem.pulseWidth"
      @change="onDialChange"
    />
    <!--<input v-model.number="gridItem.division">-->
    <!--<input v-model.number="gridItem.pulseWidth">-->
  </div>
</template>
