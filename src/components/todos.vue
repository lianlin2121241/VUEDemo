<template>
	<div class="container">
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
    }
  },
  components: { TodosInput, TodosList, TodosListCompleted }
}
</script>

