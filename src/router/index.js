import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ErrorPage from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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

export default router
