<template>
	<div class="container login-container">
    <div class="logo"></div>
    <form>
      <div class="form-group">
        <label for="userName">用户名</label>
        <input v-validate="'required'" type="text" name="username" class="form-control" v-model="loginInfo.username" id="username" placeholder="请输入用户名" @keyup.enter="login()">
        <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" v-model="loginInfo.password" id="password" placeholder="请输入密码" @keyup.enter="login()">
      </div>
      <button type="button" class="btn btn-primary btn-block" @click="login()">登录</button>
      <div class="form-group bottom-label">
        <router-link to="/retrieve">忘记密码？</router-link>
        <router-link class="fr" to="/reg">注册</router-link>
      </div>
    </form>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      loginInfo: state => state.user.loginInfo
    })
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    }
  },
  watch: {
    userInfo (newValue, oldValue) {
      if (newValue._id) {
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({path: '/todos'})
      }
    }
  }
}
</script>
<style scoped>
.login-container{
  width: 350px;
}
.bottom-label{
  margin-top: 10px;
}
.fr{
  float: right;
}
</style>

