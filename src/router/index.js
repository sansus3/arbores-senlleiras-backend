import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import users from '../store/users'

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
    component: () => import('../views/About.vue')
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: () => import('../views/users/Login.vue')
  }
  ,
  {
    path: '/new-specie',
    name: 'Specie',
    meta: { requiresAuth: true },
    component: () => import('../views/specie/Insert.vue')
  },
  {
    path: `/description-specie-:id`,
    name: 'Arbore',
    component: () => import('@/views/specie/SpecieDescription.vue')
  },
  {
    path: `/delete-specie-:id`,
    name: 'DeleteSpecie',
    meta: { requiresAuth: true },
    component: () => import('@/views/specie/SpecieDelete.vue')
  },
  {
    path: `/images-specie-:id`,
    name: 'SpecieImages',
    meta: { requiresAuth: true },
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

export default router;

//https://router.vuejs.org/guide/advanced/meta.html
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !users.state.user) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/sign-in',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
});