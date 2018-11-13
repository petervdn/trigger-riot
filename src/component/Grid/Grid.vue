<style src="./Grid.scss" module lang="scss">
</style>
<script src="./Grid.js">
</script>

<template>
  <div>
    <div
      v-for="(row, index) in grid.rows"
      :key="index"
      :class="$style.gridRow"
    >
      <div
        v-for="item in row"
        :key="`${item.position.x}-${item.position.y}`"
        :class="$style.gridItem"
      >
        <GridItem :grid-item="item" />
      </div>
      <div :class="[$style.gridItem, $style.rowGroupItem]">
        row
      </div>
    </div>
    <div :class="$style.gridRow">
      <div
        v-for="(column, index) in grid.columns"
        :key="index"
        :class="[$style.gridItem, $style.columnGroupItem]"
      >
        column
      </div>
    </div>
  </div>
</template>
