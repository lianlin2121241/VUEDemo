<template>
	<div v-if="isOverCount > 0">
    <div v-for="(value,key) in list">
      <h4>{{key}}</h4>
      <ul class="list-group">
        <li v-for="item in value" @dblclick="editTodo(item)" class="list-group-item" v-if="item.isOver">
          <p v-show="item.id!=tempItem.id||!tempItem.isEdit">{{item.label}}</p>
          <p v-show="item.id==tempItem.id&&tempItem.isEdit"><input type="text" class="form-control" @keydown.enter="updateTodo(item)" v-model="tempItem.label"></p>
        </li>
      </ul>
    </div>
	</div>
  <div class="no-data" v-else><span>无已完成任务</span></div>
</template>
<script>
import bus from '../assets/eventBus'
import storage from '../assets/storage'
import util from '../assets/util'
export default {
  name: 'todosListCompleted',
  data () {
    return {
      list: this.sortData(),
      tempItem: {}
    }
  },
  methods: {
    editTodo (item) {
      this.tempItem = JSON.parse(JSON.stringify(item))
      this.tempItem.isEdit = true
    },
    updateTodo () {
      if (!this.tempItem.label) {
        this.tempItem = {}
        return
      }
      bus.$emit('updateTodo', this.tempItem)
      this.tempItem = {}
    },
    sortData () {
      var dataList = storage.fetch()
      var sortData = dataList.sort(function (pre, next) {
        return next.meta.overTime - pre.meta.overTime
      })
      var obj = {}
      sortData.forEach(function (item) {
        if (item.meta.overTime) {
          let date = new Date(item.meta.overTime).Format('yyyy-MM-dd')
          if (obj[date]) {
            obj[date].push(item)
          } else {
            obj[date] = [item]
          }
        }
      })
      return obj
    }
  },
  computed: {
    isOverCount: function () {
      return Object.keys(this.list).length
    }
  },
  mounted () {
    bus.$on('completeTodo', () => {
      this.list = this.sortData()
    })
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
