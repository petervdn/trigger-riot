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

      <div :class="[$style.columns, $style.modeAndTransport]">
        <ModeSelector :class="$style.mainColumn" />
        <Transport :class="$style.sideColumn" />
      </div>

      <div :class="$style.columns">
        <Matrix :class="$style.mainColumn" />
        <Sidebar :class="$style.sideColumn" />
      </div>

    </div>
  </div>
</template>
