<template>
	<div class="container">
    <el-dialog title="修改密码" width="600px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input type='password' v-model="form.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type='password' v-model="form.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPassword">
          <el-input type='password' v-model="form.checkPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="col-lg-12">
      <div class="dropdown pull-right" v-bind:class="{'open': (tagShowMenu === 1)}">
        <span @click.stop='showMenuList()'>欢迎您：<span>{{userInfo?userInfo.name:""}}</span></span>
        <ul v-click-outside='hideMenuList' class="dropdown-menu">
          <li><a @click="showDialog()">修改密码</a></li>
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
import userApi from '../api/user'
import { mapState } from 'vuex'
export default {
  name: 'todos',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tagShowMenu: 0,
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
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
    },
    changePassword () {
      var self = this
      userApi.changePassword({
        oldPassword: this.form.oldPassword,
        newPassword: this.form.newPassword,
        checkPassword: this.form.checkPassword
      })
      .then(function (response) {
        var data = response.data
        if (data.success) {
          self.$message({
            showClose: true,
            message: '修改密码成功',
            type: 'success'
          })
          self.dialogFormVisible = false
        } else {
          self.$message({
            showClose: true,
            message: data.message,
            type: 'warning'
          })
        }
      })
    },
    showDialog: function () {
      this.form.oldPassword = ''
      this.form.newPassword = ''
      this.form.checkPassword = ''
      this.dialogFormVisible = true
      this.tagShowMenu = 0
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

