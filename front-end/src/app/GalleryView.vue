<script setup>
import Searchbar from '@/components/Searchbar.vue'
import DropdownMenu from '@/components/DropdownMenu.vue'
import SidebarPanel from '@/components/SidebarPanel.vue'

function toggleOrder() {
  const order_btn = document.querySelector('.order')
  if (order_btn.textContent === '▼') {
    order_btn.textContent = '▲'
  } else {
    order_btn.textContent = '▼'
  }
}
</script>

<template>
  <SidebarPanel ref="sidebarPanel" title="Filter"> </SidebarPanel>
  <div class="querybar">
    <Searchbar />
    <button class="order" @click="toggleOrder()">▼</button>
    <button class="filter" @click="this.$refs.sidebarPanel.toggleSidebarPanel()">Filter</button>
    <DropdownMenu title="Sort By" content="test,test,test,test" />
  </div>
</template>

<style scoped>
.querybar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
}

.querybar button {
  padding: 0.5rem 1rem;
  font-size: 1.9rem;
  cursor: pointer;
}

.querybar .order {
  background-color: rgba(0, 0, 0, 0);
  color: #000;
  border: none;
}

.filter {
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 15px;
  font-weight: bold;
}
</style>
