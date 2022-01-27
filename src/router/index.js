import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: () => import('../views/Contacto.vue')
  },
  {
    path: '/geolocalizacion',
    name: 'Geolocalizacion',
    component: () => import('../views/Geolocalizacion.vue')
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: () => import('../views/Catalogo.vue')
  },
  {
    path: '/specie',
    name: 'Specie',
    component: () => import('../views/specie/Specie.vue')
  },
  {
    path: `/specie/specie-:id`,
    name: 'Arbore',
    component: () => import('@/views/Arbore.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router