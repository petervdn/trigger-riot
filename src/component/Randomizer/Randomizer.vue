<style src="./Randomizer.scss" module lang="scss">
</style>
<script src="./Randomizer.js">
</script>

<template>
  <div>
    <div :class="$style.randomizeItems">
      <MatrixItemValueRandomizer
        v-for="data in randomizeData"
        :is-active="valueIdsToRandomize.includes(data.valueId)"
        :data="data"
        :key="data.valueId"
        @toggleActive="onToggleActiveValueId"
      />
    </div>

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
