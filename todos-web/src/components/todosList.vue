<template>
	<div>
    <ul class="list-group" v-if="notOverCount > 0">
      <draggable v-model="list">
        <li v-for="item in list" @dblclick="editTodo(item)" class="list-group-item my-handle" v-if="!item.isFinished&&!item.isOver">
          <div class="input-group" v-bind:class="{'div-block':(editItemList.indexOf(item._id)>-1)}">
            <p v-show="(editItemList.indexOf(item._id)==-1)">{{item.label}}</p>
            <p v-show="(editItemList.indexOf(item._id)>-1)"><input type="text" class="form-control" @keydown.enter="updateTodo(item)" v-model="item.label"></p>
            <span class="input-group-btn" v-show="(editItemList.indexOf(item._id)==-1)">
              <button class="btn btn-primary btn-xs btn-table-list" @click="overTodo(item)" type="button" title="完成任务"><span class="glyphicon glyphicon-ok"></span></button>
            </span>
            <span class="input-group-btn" v-show="(editItemList.indexOf(item._id)==-1)">
              <button class="btn btn-danger btn-xs btn-table-list" @click="delTodo(item)" type="button" title="删除任务"><span class="glyphicon glyphicon-remove"></span></button>
            </span>
          </div>
        </li>
      </draggable>
    </ul>
    <div class="no-data" v-else><span>无待完成任务</span></div>
	</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import util from '../assets/util'
import draggable from 'vuedraggable'  // 拖拽组件
export default {
  computed: {
    list: {
      get: function () {
        return this.$store.state.todos.unFinishedList
      },
      set: function (value) {
        this.$store.commit('setUnfinishedList', value)
      }
    },
    ...mapState({
      editItemList: state => state.todos.editItemList
    }),
    ...mapGetters({
      notOverCount: 'unFinishedListCount'
    })
  },
  methods: {
    overTodo (item) {
      this.$store.dispatch('finishTodo', item)
    },
    delTodo (item) {
      this.$store.dispatch('deleteTodo', item)
    },
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
  watch: {
    list: {
      handler (newValue, oldValue) {
        console.log(newValue)
        const ids = newValue.map((item) => {
          return item._id
        })
        this.$store.dispatch('updateSort', ids)
      },
      deep: true
    }
  },
  components: {
    draggable
  },
  created () {
    this.$store.dispatch('queryUnfinishedTodos')
  }
}
</script>
<style>
.btn-table-list{
  margin: 0px 4px; 
}
.no-data{
  text-align: center;
  font-size: 18px;
  padding: 8px 0px;
  border: 1px solid #dddddd;
  border-radius: 8px;
}
.div-block{
  display: block;
}
.div-block{
  display: block;
}
.div-block.input-group .form-control{
  display: block;
  float: none;
}
.no-data span{
  display: inline-block;
  animation: mymove 2s linear infinite;
}
@keyframes mymove {
  0%{
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(7deg);
  }
  75%{
    transform: rotate(-7deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
</style>
