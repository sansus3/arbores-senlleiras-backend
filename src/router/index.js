import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: () => import('../views/specie/Catalogo.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/new-specie',
    name: 'Specie',
    component: () => import('../views/specie/Insert.vue')
  },
  {
    path: `/description-specie-:id`,
    name: 'Arbore',
    component: () => import('@/views/specie/SpecieDescription.vue')
  },
  {
    path: `/images-specie-:id`,
    name: 'SpecieImages',
    component: () => import('@/views/specie/Images.vue')
  },
  {
    path: `/edit-specie-:id`,
    name: 'Edit',
    component: () => import('@/views/specie/Edit.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router