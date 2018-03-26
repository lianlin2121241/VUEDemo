import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/register'
import Login from '@/components/login'
import Retrieve from '@/components/retrieve'
import Todos from '@/components/todos'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/reg',
      name: 'reg',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: Retrieve
    },
    {
      path: '/todos',
      meta: {
        requireAuth: true
      },
      name: 'todos',
      component: Todos
    }
  ]
})

export default router
