<template>
	<div v-if="finishedCount > 0">
    <div v-for="(value,key) in list">
      <h4>{{key}}</h4>
      <ul class="list-group">
        <li v-for="item in value" @dblclick="editTodo(item)" class="list-group-item" v-if="item.isOver">
          <p v-show="(editItemList.indexOf(item._id)==-1)">{{item.label}}</p>
          <p v-show="(editItemList.indexOf(item._id)>-1)"><input type="text" class="form-control" @keydown.enter="updateTodo(item)" v-model="item.label"></p>
        </li>
      </ul>
    </div>
	</div>
  <div class="no-data" v-else><span>无已完成任务</span></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import util from '../assets/util'
export default {
  computed: {
    ...mapState({
      editItemList: state => state.todos.editItemList,
      finishedCount: state => state.todos.finishedCount
    }),
    ...mapGetters({
      list: 'sortFinishedData'
    })
  },
  methods: {
    editTodo (item) {
      this.$store.commit('addEditItem', item)
    },
    updateTodo (item) {
      if (!item.label) {
        return
      }
      this.$store.dispatch('saveTodo', item)
    }
  },
  created () {
    this.$store.dispatch('queryFinishedTodos')
  }
}
</script>
<style>
.list-group-item p{
  margin-bottom: 0px;
}
.no-data{
  text-align: center;
  font-size: 18px;
  padding: 8px 0px;
  border: 1px solid #dddddd;
  border-radius: 8px;
}
</style>
