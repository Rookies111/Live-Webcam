<script setup>
import { ref } from 'vue'
import Screen from '@/components/Screen.vue'
import SidebarPanel from '@/components/SidebarPanel.vue'
import SettingButton from '@/assets/icons/Setting Button.vue'
import RecordButton from '@/assets/icons/Record Button.vue'
import CaptureButton from '@/assets/icons/Snapshot Button.vue'
import StopButton from '@/assets/icons/Stop Button.vue'
import PauseButton from '@/assets/icons/Pause Button.vue'
import ResumeButton from '@/assets/icons/Resume Button.vue'

const mode = ref('video')

function changeMode(newMode) {
  const record_btn = document.querySelector('.record')
  const capture_btn = document.querySelector('.capture')

  document.getElementById(mode.value).classList.remove('select')
  mode.value = newMode
  document.getElementById(mode.value).classList.add('select')

  if (!capture_btn.classList.contains('active') && !record_btn.classList.contains('active')) {
    return 0
  }

  if (mode.value === 'video') {
    record_btn.classList.add('active')
    capture_btn.classList.remove('active')
  } else {
    record_btn.classList.remove('active')
    capture_btn.classList.add('active')
  }
}

function startRecord() {
  const record_btn = document.querySelector('.record')
  const stop_btn = document.querySelector('.stop')
  const pause_btn = document.querySelector('.pause')

  record_btn.classList.remove('active')
  stop_btn.classList.add('active')
  pause_btn.classList.add('active')
}

function stopRecord() {
  const record_btn = document.querySelector('.record')
  const stop_btn = document.querySelector('.stop')
  const pause_btn = document.querySelector('.pause')

  stop_btn.classList.remove('active')
  pause_btn.classList.remove('active')
  record_btn.classList.add('active')
}

function pauseRecord() {
  const pause_btn = document.querySelector('.pause')
  const resume_btn = document.querySelector('.resume')

  pause_btn.classList.remove('active')
  resume_btn.classList.add('active')
}

function resumeRecord() {
  const pause_btn = document.querySelector('.pause')
  const resume_btn = document.querySelector('.resume')

  resume_btn.classList.remove('active')
  pause_btn.classList.add('active')
}
</script>

<template>
  <Screen />
  <div id="camera_control">
    <RecordButton class="record active" @click="startRecord()" />
    <CaptureButton class="capture" @click="capturePhoto()" />
    <StopButton class="stop" @click="stopRecord()" />
    <PauseButton class="pause" @click="pauseRecord()" />
    <ResumeButton class="resume" @click="resumeRecord()" />
  </div>
  <SettingButton class="setting" @click="this.$refs.sidebarPanel.toggleSidebarPanel()" />
  <div id="mode_selector">
    <div class="select" id="video" @click="changeMode('video')">Video</div>
    <div id="photo" @click="changeMode('photo')">Photo</div>
  </div>
  <SidebarPanel ref="sidebarPanel" title="Setting"></SidebarPanel>
</template>

<style scoped>
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
  display: table;
}

#camera_control svg {
  margin: 0 1rem;
  display: none;
  cursor: pointer;
  transition: all 0.5s;
}

#camera_control svg:active {
  transform: scale(0.9);
}

#camera_control .active {
  display: table-column;
}
</style>
