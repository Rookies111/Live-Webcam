<script setup>
import { ref } from 'vue'

const mode = ref('video')

function changeMode(newMode) {
  console.log(newMode)
  document.getElementById(mode.value).classList.remove('select')
  mode.value = newMode
  document.getElementById(mode.value).classList.add('select')
}

function toggleSettingPanel() {
  const settingPanel = document.querySelector('.setting_panel')
  console.log(settingPanel.style.width)
  if (settingPanel.style.width === '0px') {
    settingPanel.style.width = '45vw'
  } else {
    settingPanel.style.width = '0px'
  }
}
</script>

<template>
  <img src="../assets/no_signal.jpg" class="screen" />
  <img src="../assets/icons/Record Button.svg" class="record" />
  <img src="../assets/icons/Setting Button.svg" class="setting" @click="toggleSettingPanel()" />
  <div id="mode_selector">
    <div class="select" id="video" @click="changeMode('video')">Video</div>
    <div id="photo" @click="changeMode('photo')">Photo</div>
  </div>
  <div class="setting_panel">
    <div class="title">
      <strong>Setting</strong>
      <img src="../assets/icons/Close Button.svg" @click="toggleSettingPanel()" />
    </div>
    <hr />
  </div>
</template>

<style scoped>
.screen {
  width: 60vw;
  border-radius: 15px;
  position: absolute;
  top: 47.5%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#mode_selector {
  display: table;
  background-color: #000;
  color: #fff;
  padding: 0.75rem;
  margin: 0.75rem 4.5rem;
  border-radius: 15px;
  position: absolute;
  top: 40%;
  right: 0%;
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
  transition: all 0.75s;
}

.setting {
  position: absolute;
  top: 15%;
  right: 5%;
  transition: all 0.25s;
  cursor: pointer;
}

.setting:active {
  transform: rotate(90deg) scale(0.9);
}

.record {
  position: absolute;
  bottom: 3%;
  left: 47%;
  cursor: pointer;
  transition: all 0.5s;
}

.record:active {
  transform: scale(0.9);
}

.setting_panel {
  width: 0;
  height: 100%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  right: -2rem;
  color: white;
  transition: all 0.5s;
  z-index: 1;
}

.setting_panel .title {
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: auto auto;
}

.setting_panel strong {
  font-size: 2.5rem;
}

.setting_panel img {
  width: 3rem;
  position: relative;
  left: 75%;
  cursor: pointer;
}

.setting_panel hr {
  width: 92.5%;
  height: 3px;
  position: relative;
  right: 1.5%;
  background-color: white;
  border: 0;
  margin: 0 auto;
}
</style>
