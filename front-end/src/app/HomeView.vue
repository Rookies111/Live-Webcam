<script setup>
import { ref } from 'vue'
import Screen from '@/components/Screen.vue'
import SidebarPanel from '@/components/SidebarPanel.vue'
import RecordButton from '@/assets/icons/Record Button.vue'
import SettingButton from '@/assets/icons/Setting Button.vue'
import CaptureButton from '@/assets/icons/Snapshot Button.vue'

const mode = ref('video')

function changeMode(newMode) {
  document.getElementById(mode.value).classList.remove('select')
  mode.value = newMode
  document.getElementById(mode.value).classList.add('select')
  // if (mode.value === 'video') {
  //   console.log(document.querySelector('.record').src)
  //   document.querySelector('.record').src = record_btn.value
  // } else {
  //   document.querySelector('.record').src = capture_btn.value
  // }
}
</script>

<template>
  <Screen />
  <div id="camera_control">
    <CaptureButton class="capture" />
    <RecordButton class="record" />
  </div>
  <SettingButton class="setting" @click="this.$refs.sidebarPanel.toggleSidebarPanel()" />
  <div id="mode_selector">
    <div class="select" id="video" @click="changeMode('video')">Video</div>
    <div id="photo" @click="changeMode('photo')">Photo</div>
  </div>
  <SidebarPanel ref="sidebarPanel" title="Setting"></SidebarPanel>
</template>

<style scoped>
/* .screen {
  width: 60vw;
  border-radius: 15px;
  position: absolute;
  top: 47.5%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
} */

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

#camera_control {
  position: absolute;
  bottom: 2.5%;
  left: 50%;
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

#camera_control svg {
  cursor: pointer;
  transition: all 0.5s;
}

#camera_control svg:active {
  transform: scale(0.9);
}
</style>
