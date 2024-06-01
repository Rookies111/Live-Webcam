<script setup>
import { proxyRefs, ref } from 'vue'
import SidebarPanel from '@/components/SidebarPanel.vue'
import Searchbar from '@/components/Searchbar.vue'
import DropdownMenu from '@/components/DropdownMenu.vue'
import VideoDisplayCard from '@/components/VideoDisplayCard.vue'

const sort_by = ref('name')
const order = ref('asc')

function toggleOrder() {
  const order_btn = document.querySelector('.order')
  if (order_btn.textContent === '▼') {
    order_btn.textContent = '▲'
    order.value = 'desc'
  } else {
    order_btn.textContent = '▼'
    order.value = 'asc'
  }
}

function sort_select() {
  console.log(`clicked ${sort_by.value}`)
}
</script>

<template>
  <SidebarPanel title="Filter"> </SidebarPanel>
  <div class="querybar">
    <Searchbar />
    <button class="order" @click="toggleOrder()">▼</button>
    <button class="filter" @click="proxyRefs(SidebarPanel).methods.toggleSidebarPanel()">
      Filter
    </button>
    <DropdownMenu title="Sort By" @click="sort_select()">
      <div @click="sort_by = 'test 1'">test 1</div>
      <div @click="sort_by = 'test 2'">test 2</div>
    </DropdownMenu>
  </div>
  <div class="video-display">
    <VideoDisplayCard />
    <VideoDisplayCard />
    <VideoDisplayCard />

    <VideoDisplayCard />
    <VideoDisplayCard />
    <VideoDisplayCard />
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

.dropdown-content div {
  display: block;
  background-color: #f9f9f9;
  color: #000;
  padding: 0.5rem;
  font-size: 1.4rem;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-content div:hover {
  background-color: #e0e0e0;
}

.video-display {
  height: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1rem;
  padding: 0 1.5rem;
  justify-content: center;
}
</style>
