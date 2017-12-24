import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Todos from '@/components/todos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    }
  ]
})
