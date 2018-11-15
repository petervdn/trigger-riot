<style src="./Matrix.scss" module lang="scss">
</style>
<script src="./Matrix.js">
</script>

<template>
  <div :class="$style.wrap">
    <div
      v-for="(row, index) in matrix.rows"
      :key="index"
      :class="$style.row"
    >
      <div
        v-for="item in row"
        :key="`${item.position.x}-${item.position.y}`"
        :class="[$style.rowItem, itemIsActive(item) ? $style.active : null]"
      >
        <MatrixItem :matrix-item="item" />
      </div>
      <div :class="[$style.rowItem, $style.rowGroupItem]">
        <MatrixGroupItem :matrix-items="row"/>
      </div>
    </div>
    <div :class="$style.row">
      <div
        v-for="(column, index) in matrix.columns"
        :key="index"
        :class="[$style.rowItem, $style.columnGroupItem]"
      >
        <MatrixGroupItem :matrix-items="column"/>
      </div>
    </div>
  </div>
</template>
