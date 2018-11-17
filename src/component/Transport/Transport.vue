<style src="./Transport.scss" module lang="scss"></style>
<script src="./Transport.js"></script>

<template>
  <div>
    <div :class="$style.info">
      <div :class="$style.controls">
        <canvas
          v-show="!isPlaying"
          ref="start"
          :width="startStopButtonSize"
          :height="startStopButtonSize"
          @click="startPlay"
        />
        <canvas
          v-show="isPlaying"
          ref="stop"
          :width="startStopButtonSize"
          :height="startStopButtonSize"
          @click="stopPlay"
        />
      </div>
      <div :class="$style.time">
        {{ time.toFixed(1) }}<small>s</small>
      </div>
      <div :class="$style.bpm">
        120<small>bpm</small>
      </div>
    </div>
  </div>
</template>
