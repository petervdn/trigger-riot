<style src="./HomePage.scss" module lang="scss">
</style>
<script src="./HomePage.js">
</script>

<template>
  <div>
    <Header />

    <div :class="$style.wrap">
      <WaveView
        :matrix-items="activeMatrixItems"
        :initial-time-window="20"
        :height="70"
        :wave-margin="20"
        :show-controls="true"
      />
      <div :class="$style.columns">
        <div :class="$style.matrix">
          <ModeSelector />
          <Matrix />
        </div>

        <div :class="$style.sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  </div>
</template>
