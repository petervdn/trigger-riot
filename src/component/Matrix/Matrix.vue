<style src="./Matrix.scss" module lang="scss">
</style>
<script src="./Matrix.js">
</script>

<template>
  <div :class="$style.wrap">
    <template v-if="matrix">
      <div
        v-for="(row, index) in matrix.rows"
        :key="`${row.type}-${index}`"
        :class="$style.row"
      >
        <MatrixElement
          v-for="item in row.items"
          :key="`${item.position.x}-${item.position.y}`"
          :class="[$style.rowItem, itemIsActive(item) ? $style.active : null]"
          :data="item"
        />

        <MatrixElement
          :data="row"
          :class="[$style.rowItem, $style.rowGroupItem]"
        />
      </div>
      <div :class="$style.row">
        <MatrixElement
          v-for="(column, index) in matrix.columns"
          :data="column"
          :key="index"
          :class="[$style.rowItem, $style.columnGroupItem]"
        />
      </div>
    </template>
  </div>
</template>
