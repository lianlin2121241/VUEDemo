<template>
	<div class="row search-form">
    <div class="col-lg-12">
      <div class="input-group">
        <input type="text" class="form-control" @keydown.enter="addTodo()" v-model="msg" placeholder="添加计划任务">
        <span class="input-group-btn">
          <button class="btn btn-default" @click="addTodo()" type="button">添加</button>
        </span>
      </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->
	</div>
</template>
<script>
import bus from '../assets/eventBus'
export default {
  name: 'todosInput',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    addTodo () {
      bus.$emit('addTodo', this.msg)
      this.msg = ''
    }
  }
}
</script>
<style>
.search-form{
  margin-bottom:20px;
}
</style>


