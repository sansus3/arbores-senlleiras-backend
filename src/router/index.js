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
    component: () => import('../views/specie/Catalogo.vue')
  },
  {
    path: '/login',
    name: 'Acceso',
    component: () => import('../views/users/Acceso.vue')
  },
  {
    path: '/specie',
    name: 'Specie',
    component: () => import('../views/specie/Specie.vue')
  },
  {
    path: `/description-specie-:id`,
    name: 'Arbore',
    component: () => import('@/views/specie/Arbore.vue')
  },
  {
    path: `/edit-specie-:id`,
    name: 'Edit',
    component: () => import('@/views/specie/Edit.vue')
  },
  {
    path: `/registro`,
    name: 'Registro',
    component: () => import('@/views/Registro.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router