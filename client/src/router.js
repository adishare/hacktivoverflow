import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/threads',
      components: {
        sidebar: () => import('./components/Sidebar.vue'),
        threads: () => import('./components/Threads.vue')
      }
    },
    {
      path: '/threads/:id',
      name: 'threaddetail',
      component: () => import('./views/threaddetail.vue')
    },
    {
      path: '/creator',
      name: 'creator',
      component: () => import('./views/Creator.vue')
    },
  ]
})
