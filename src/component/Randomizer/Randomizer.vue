<style src="./Randomizer.scss" module lang="scss">
</style>
<script src="./Randomizer.js">
</script>

<template>
  <div>
    <ul :class="$style.valueRanges">
      <li
        v-for="data in randomizeData"
        :key="data.valueType"
        :class="{ [$style.active]: activeValueTypes.includes(data.valueType) }"
      >
        <a
          href="#"
          @click="onValueTypeItemClick(data.type)"
        >
          {{ data.valueType }}
        </a>
        <input
          :class="$style.min"
          :value="data.dialData.min"
          type="text"
        >
        <span>-</span>
        <input
          :class="$style.max"
          :value="data.dialData.max"
          type="text"
        >
      </li>
    </ul>

    <div>
      apply to
      <input
        :value="ApplyToMode.SELECTION"
        v-model="applyTo"
        type="radio"
      > selection
      <input
        :value="ApplyToMode.ALL"
        v-model="applyTo"
        type="radio"
      > all dials
    </div>

    <button @click="randomize">randomize</button>
    <!--<button @click="reset">reset</button>-->

  </div>
</template>
