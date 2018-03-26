<template>
	<div class="container">
    <div class="col-lg-12">
      <div class="dropdown pull-right" v-bind:class="{'open': (tagShowMenu === 1)}">
        <span @click.stop='showMenuList()'>欢迎您：<span>{{userInfo?userInfo.name:""}}</span></span>
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
import { mapState } from 'vuex'
export default {
  name: 'todos',
  data () {
    return {
      tagShowMenu: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    showMenuList () {
      if (this.tagShowMenu === 1) {
        this.tagShowMenu = 0
      } else {
        this.tagShowMenu = 1
      }
    },
    hideMenuList () {
      this.tagShowMenu = 0
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  created () {
    this.$store.dispatch('getUserInfo')
  },
  watch: {
    userInfo (newValue, oldValue) {
      if (!newValue) {
        this.$message({
          showClose: true,
          message: '退出成功',
          type: 'success'
        })
        this.$store.commit('resetState')
        this.$router.push({path: '/login'})
      }
    }
  },
  components: { TodosInput, TodosList, TodosListCompleted }
}
</script>
<style scoped>
.dropdown>span,
.dropdown-menu>li{
  cursor:pointer;
}
</style>

