<style src="./Grid.scss" module lang="scss">
</style>
<script src="./Grid.js">
</script>

<template>
  <div>
    <div :class="$style.grid">
      <GridItem
        v-for="item in grid.items"
        :key="`${item.position.x}-${item.position.y}`"
        :grid-item="item"
      />
    </div>
  </div>
</template>
