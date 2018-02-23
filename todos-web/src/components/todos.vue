<template>
	<div class="container">
    <div class="col-lg-12">
      <div class="dropdown pull-right" v-bind:class="{'open': (tagShowMenu === 1)}">
        <span @click='showMenuList()'>欢迎您：<span>{{username}}</span></span>
        <ul v-click-outside='hideMenuList' class="dropdown-menu">
          <li><a href="#">修改密码</a></li>
          <li><a @click="logout()">退出</a></li>
        </ul>
      </div>
      <div class=""></div>
    </div>
    <div class="col-lg-6">
      <h4>待完成</h4>
      <todos-input></todos-input>
      <todos-list></todos-list>
    </div>
    <div class="col-lg-6">
      <h4>已完成</h4>
      <todos-list-completed></todos-list-completed>
    </div>
	</div>
</template>
<script>
import TodosInput from './todosInput'
import TodosList from './todosList'
import TodosListCompleted from './todosListCompleted'
import axiosInstance from '../assets/http'
export default {
  name: 'todos',
  data () {
    return {
      username: 'limingle',
      tagShowMenu: 0
    }
  },
  methods: {
    showMenuList () {
      if (this.tagShowMenu === 1) {
        this.tagShowMenu = 0
      } else {
        this.tagShowMenu = 1
      }
    },
    hideMenuList: (e) => {
      console.log(this.tagShowMenu)
      this.tagShowMenu = 0
    },
    logout () {
      axiosInstance.post('/logout', {})
      .then((response) => {
        var responseData = response.data
        if (responseData.success) {
          this.$message({
            showClose: true,
            message: '退出成功',
            type: 'success'
          })
          this.$store.commit('resetState')
          this.$router.push({path: '/login'})
        } else {
          this.$message({
            showClose: true,
            message: responseData.message,
            type: 'warning'
          })
        }
      })
    }
  },
  components: { TodosInput, TodosList, TodosListCompleted }
}
</script>

