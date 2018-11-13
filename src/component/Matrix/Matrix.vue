<style src="./Matrix.scss" module lang="scss">
</style>
<script src="./Matrix.js">
</script>

<template>
  <div>
    <div
      v-for="(row, index) in matrix.rows"
      :key="index"
      :class="$style.row"
    >
      <div
        v-for="item in row"
        :key="`${item.position.x}-${item.position.y}`"
        :class="$style.rowItem"
      >
        <MatrixItem :matrix-item="item" />
      </div>
      <div :class="[$style.rowItem, $style.rowGroupItem]">
        row
      </div>
    </div>
    <div :class="$style.row">
      <div
        v-for="(column, index) in matrix.columns"
        :key="index"
        :class="[$style.rowItem, $style.columnGroupItem]"
      >
        column
      </div>
    </div>
  </div>
</template>
