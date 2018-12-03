<style src="./MatrixItemValueRandomizer.scss" module lang="scss"></style>
<script src="./MatrixItemValueRandomizer.js"></script>

<template>
  <div :class="{ [$style.active]: isActive, [$style.item]: true }">
    <a
      href="#"
      @click="onItemClick()"
    >
      {{ data.valueId }}
    </a>
    <template v-if="data.valueMetaData.type === 'number'">
      <input
        :class="$style.min"
        v-model="minValue"
        type="text"
        @blur="onMinInputBlur"
      >
      <span>-</span>
      <input
        :class="$style.max"
        v-model="maxValue"
        type="text"
        @blur="onMaxInputBlur"
      >
    </template>
  </div>
</template>
