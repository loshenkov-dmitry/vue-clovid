import Vue from 'vue'
import VueRouter from 'vue-router'
import Total from '../views/Total.vue'
import Countries from '../views/Countries.vue'
import Country from '../views/Country.vue'
import store from '@/store/index.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Total',
    component: Total
  },
  {
    path: '/countries',
    name: 'Countries stats',
    component: () => import(/* webpackChunkName: "about" */ '../views/Countries.vue'),
   
  },
  {
    path: '/country/:queryName',
    name: 'Country',
    component: () => import(/* webpackChunkName: "about" */ '../views/Country.vue'),
    props: true,
    beforeEnter(to, from, next) {
      let queryName = to.params.queryName
      store.dispatch('newCountryName', queryName)
      next()
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
