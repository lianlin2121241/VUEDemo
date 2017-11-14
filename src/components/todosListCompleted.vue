<template>
	<div>
    <ul class="list-group">
      <li v-for="item in list" @dblclick="editTodo(item)" class="list-group-item" v-if="item.isOver">
        <p v-show="item.id!=tempItem.id||!tempItem.isEdit">{{item.label}}</p>
        <p v-show="item.id==tempItem.id&&tempItem.isEdit"><input type="text" class="form-control" @keydown.enter="updateTodo(item)" v-model="tempItem.label"></p>
      </li>
    </ul>
	</div>
</template>
<script>
import bus from '../assets/eventBus'
import storage from '../assets/storage'
export default {
  name: 'todosListCompleted',
  data () {
    return {
      list: storage.fetch(),
      tempItem: {}
    }
  },
  methods: {
    editTodo (item) {
      this.tempItem = JSON.parse(JSON.stringify(item))
      this.tempItem.isEdit = true
    },
    updateTodo () {
      bus.$emit('updateTodo', this.tempItem)
      this.tempItem = {}
    }
  },
  mounted () {
    bus.$on('completeTodo', () => {
      this.list = storage.fetch()
    })
  }
}
</script>
<style>
.list-group-item p{
  margin-bottom: 0px;
}
</style>
