<script>
import CloseButton from '@/assets/icons/Close Button.vue'

export default {
  name: 'SidebarPanel',
  components: {
    CloseButton
  },

  props: {
    title: {
      type: String,
      required: true
    }
  },

  methods: {
    toggleSidebarPanel() {
      const settingPanel = document.querySelector('.sidebar_panel')
      console.log(`sidepanel active ${settingPanel.style.width}`)
      if (settingPanel.style.width === '45vw') {
        settingPanel.style.width = '0px'
      } else {
        settingPanel.style.width = '45vw'
      }
    }
  }
}
</script>

<template>
  <div class="sidebar_panel">
    <div class="title">
      <strong>{{ title }}</strong>
      <CloseButton class="close-btn" @click="toggleSidebarPanel()" />
    </div>
    <hr />
    <slot />
  </div>
</template>

<style scoped>
.sidebar_panel {
  width: 0px;
  height: 100%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  right: -2rem;
  color: white;
  transition: all 0.5s;
  z-index: 1;
}

.title {
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: auto auto;
}

strong {
  font-size: 2.5rem;
}

.close-btn {
  width: 3rem;
  position: relative;
  left: 75%;
  cursor: pointer;
}

hr {
  width: 92.5%;
  height: 3px;
  position: relative;
  right: 1.5%;
  background-color: white;
  border: 0;
  margin: 0 auto;
}
</style>
