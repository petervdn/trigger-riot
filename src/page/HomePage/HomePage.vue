<style src="./HomePage.scss" module lang="scss">
</style>
<script src="./HomePage.js">
</script>

<template>
  <div>
    <Header />

    <div :class="$style.wrap">
      <div :class="$style.columns">
        <WaveView
          :class="$style.mainColumn"
          :matrix-items="activeMatrixItems"
          :initial-time-window="10"
          :height="70"
          :wave-margin="20"
          :show-controls="true"
          :draw-beat-index="true"
          :beat-label-type="BeatLabelTypes.BEAT_INDEX"
        />

        <Transport :class="$style.sideColumn" />
      </div>

      <div :class="[$style.columns, $style.modeAndTransport]">
        <ModeSelector :class="$style.mainColumn" />
      </div>

      <div :class="$style.columns">
        <Matrix :class="$style.mainColumn" />
        <Sidebar :class="$style.sideColumn" />
      </div>

    </div>
  </div>
</template>
