<style src="./SampleSelector.scss" module lang="scss">
</style>
<script src="./SampleSelector.js">
</script>

<template>
  <div>
    <template v-if="isLoading">
      loading...
    </template>
    <template v-if="!isLoading">
      <select v-model="selectedName">
        <option :value="null">Choose a sample</option>
        <option
          v-for="sample in samples"
          :key="sample.name"
          :value="sample.name"
        >
          {{ sample.name }}
        </option>
      </select>
    </template>
  </div>
</template>
