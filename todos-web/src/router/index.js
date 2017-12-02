import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Todos from '@/components/todos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todos',
      component: Todos
    }
  ]
})
