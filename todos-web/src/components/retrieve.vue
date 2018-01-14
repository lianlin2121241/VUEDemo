<template>
	<div class="container login-container">
    <div class="logo"></div>
    <form>
      <div class="form-group">
        <label for="password">邮箱</label>
        <input v-validate="'required|email'" type="email" class="form-control" v-model="email" id="txbEmail" placeholder="请输入邮箱">
        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
      </div>
      <div class="form-group bottom-label">
        <span>我们会向您的邮箱发送有关如何重置密码的信息。</span>
      </div>
      <button type="button" class="btn btn-primary btn-block" @click="retrieve()">重置密码</button>
      <div class="form-group bottom-label">
        <router-link to="/login">登录</router-link>
      </div>
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
      password: '',
      email: ''
    }
  },
  methods: {
    register () {
      return true
    }
  }
}
</script>
<style>
.login-container{
  width: 350px;
}
.bottom-label{
  margin-top: 10px;
}
</style>

