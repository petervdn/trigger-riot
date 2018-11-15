<style src="./Sidebar.scss" module lang="scss"></style>
<script src="./Sidebar.js"></script>

<template>
  <div>
    <div :class="$style.playstop">
      <div :class="$style.playstop">
        <!--<h1>{{ time.toFixed(2) }}</h1>-->
        <button @click="start">start</button>
        <button @click="stop">stop</button>
      </div>
    </div>

    <div :class="$style.content">
      content
    </div>
  </div>
</template>
