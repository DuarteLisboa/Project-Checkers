import { createRouter, createWebHistory } from 'vue-router'
import LaravelPage from '@/pages/laravel/LaravelPage.vue'
import WebsocketsPage from '@/pages/websockets/WebsocketsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/laravel',
    },
    {
      path: '/laravel',
      name: 'laravel',
      component: LaravelPage,
    },
    {
      path: '/websockets',
      name: 'websockets',
      component: WebsocketsPage,
    },
  ],
})

export default router
