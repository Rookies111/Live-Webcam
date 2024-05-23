<script setup>
defineProps(['title'])

const emit = defineEmits({
  toggleSidebarPanel: () => {
    const settingPanelWidth = document.querySelector('.setting_panel').style.width
    if (settingPanelWidth === '0px') {
      settingPanelWidth = '45vw'
    } else {
      settingPanelWidth = '0px'
    }
  }
})

function toggle() {
  emit('toggleSidebarPanel')
}
</script>

<template>
  <div class="setting_panel">
    <div class="title">
      <strong>{{ title }}</strong>
      <img src="../assets/icons/Close Button.svg" @click="toggleSidebarPanel()" />
    </div>
    <hr />
    <slot />
  </div>
</template>

<style scoped>
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
