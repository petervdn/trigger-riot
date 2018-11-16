<style src="./HomePage.scss" module lang="scss">
</style>
<script src="./HomePage.js">
</script>

<template>
  <div>
    <Header />
    <div :class="$style.wrap">

      <div :class="$style.matrix">
        <WaveView
          :matrix-items="activeMatrixItems"
          :time-window="20"
          :width="580"
          :height="80"
          :wave-margin="20"
          :show-info-bar="true"
        />
        <!--<input v-model.number="bpm">-->
        <ModeSelector />
        <Matrix />
      </div>

      <div :class="$style.sidebar">
        <Sidebar />
      </div>

    </div>
  </div>
</template>
