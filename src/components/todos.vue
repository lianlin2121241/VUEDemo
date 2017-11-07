<template>
	<div class="container">
		<todos-input></todos-input>
		<todos-list></todos-list>
	</div>
</template>
<script>
import TodosInput from './todosInput'
import TodosList from './todosList'
export default {
  name: 'todos',
  data () {
    return {
    }
  },
  components: { TodosInput, TodosList }
}
</script>

