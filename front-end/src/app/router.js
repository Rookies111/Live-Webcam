import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import GalleryView from './GalleryView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/gallery', component: GalleryView },
  { path: '/about', component: AboutView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
