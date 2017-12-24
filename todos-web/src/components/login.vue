<template>
	<div class="container login-container">
    <div class="logo"></div>
    <form>
      <div class="form-group">
        <label for="userName">用户名</label>
        <input v-validate="'required|email'" type="text" name="username" class="form-control" v-model="username" id="username" placeholder="请输入用户名">
        <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" v-model="password" id="password" placeholder="请输入密码">
      </div>
      <button type="button" class="btn btn-primary btn-block" @click="login()">登录</button>
    </form>
	</div>
</template>
<script>
import axiosInstance from '../assets/http'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      axiosInstance.post('/login', {
        name: this.username,
        password: this.password
      })
      .then((response) => {
        console.log(response)
        var responseData = response.data
        if (responseData.success) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({path: '/todos'})
        } else {
          this.$message({
            showClose: true,
            message: responseData.message,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style>
.login-container{
  width: 350px;
}
</style>

