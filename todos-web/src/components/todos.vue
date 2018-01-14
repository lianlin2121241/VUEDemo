<template>
	<div class="container">
    <div class="col-lg-12">
      <div class="dropup pull-right">
        <span>欢迎您：<span>{{username}}</span></span>
        <ul class="dropdown-menu">
          <li><a href="#">修改密码</a></li>
          <li><a href="#">退出</a></li>
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
export default {
  name: 'todos',
  data () {
    return {
      username: 'limingle'
    }
  },
  components: { TodosInput, TodosList, TodosListCompleted }
}
</script>

