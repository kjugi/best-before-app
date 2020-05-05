import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../logic/Db.js'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ErrorPage from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/add-product',
    name: 'Add product',
    component: () => import(/* webpackChunkName: "add-product" */ '../views/Add-product.vue')
  },
  {
    path: '*',
    name: '404 page',
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(user => {
    store.commit('setUser', user)

    if (user && (to.name === 'Login' || to.name === 'Register')) {
      next({ name: 'Home' })
    } else if (!user && to.name !== 'Login') {
      next({ name: 'Login' })
    } else {
      next()
    }

    // else if (!user && to.name !== 'Register') {
    //   next({ name: 'Register' })
    // }
  })
})

export default router
