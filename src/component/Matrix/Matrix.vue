<style src="./Matrix.scss" module lang="scss">
</style>
<script src="./Matrix.js">
</script>

<template>
  <div :class="$style.wrap">
    <template v-if="matrix">
      <div
        v-for="(row, index) in matrix.rows"
        :key="index"
        :class="$style.row"
      >
        <MatrixElement
          v-for="item in row"
          :key="`${item.position.x}-${item.position.y}`"
          :class="[$style.rowItem, itemIsActive(item) ? $style.active : null]"
          :items="[item]"
        />

        <MatrixElement
          :items="row"
          :class="[$style.rowItem, $style.rowGroupItem]"
        />
      </div>
      <div :class="$style.row">
        <MatrixElement
          v-for="(column, index) in matrix.columns"
          :items="column"
          :key="index"
          :class="[$style.rowItem, $style.columnGroupItem]"
        />
      </div>
    </template>
  </div>
</template>
