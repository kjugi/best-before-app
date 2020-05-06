import Vue from 'vue'
import VueRouter from 'vue-router'
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
  let name = false

  if (store.getters.isUserLogged) {
    if (to.name === 'Login' || to.name === 'Register') {
      name = 'Home'
    } else {
      name = false
    }
  } else {
    if (to.name === 'Login' || to.name === 'Register') {
      name = false
    } else {
      name = 'Login'
    }
  }

  name ? next({ name }) : next()
})

export default router
