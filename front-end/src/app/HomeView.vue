<script setup>
import { ref } from 'vue'

const mode = ref('video')

function changeMode(newMode) {
  console.log(newMode)
  mode.value = newMode
}
</script>

<template>
  <img src="../assets/no_signal.jpg" class="screen" />
  <img src="../assets/icons/Record Button.svg" class="button" />
  <img src="../assets/icons/Setting Button.svg" class="button" />
  <div id="mode_selector">
    <div class="select" @click="changeMode('video')">Video</div>
    <div @click="changeMode('photo')">Photo</div>
  </div>
</template>

<style>
.screen {
  width: 65vw;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#mode_selector {
  display: table;
  background-color: #000;
  color: #fff;
  padding: 0.75rem;
  border-radius: 15px;
  float: right;
}

#mode_selector div {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 15px;
  cursor: pointer;
}

.select {
  background-color: #fff;
  color: #000;
}

.active {
  display: block;
}
</style>
