<style src="./Randomizer.scss" module lang="scss">
</style>
<script src="./Randomizer.js">
</script>

<template>
  <div>
    <ul :class="$style.valueRanges">
      <li
        v-for="data in randomizeData"
        :key="data.valueId"
        :class="{ [$style.active]: activeValueTypes.includes(data.valueId) }"
      >
        <a
          href="#"
          @click="onValueTypeItemClick(data.valueMetaData.type)"
        >
          {{ data.valueId }}
        </a>
        <input
          :class="$style.min"
          :value="data.min"
          type="text"
        >
        <span>-</span>
        <input
          :class="$style.max"
          :value="data.max"
          type="text"
        >
      </li>
    </ul>

    <div>
      apply to
      <input
        :value="ApplyToMode.SELECTION"
        v-model="applyToMatrixItems"
        type="radio"
      > selection
      <input
        :value="ApplyToMode.ALL"
        v-model="applyToMatrixItems"
        type="radio"
      > all dials
    </div>

    <button @click="randomize">randomize</button>
    <!--<button @click="reset">reset</button>-->

  </div>
</template>
