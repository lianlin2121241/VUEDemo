<template>
	<div>
    <ul class="list-group">
      <draggable v-model="list">
        <li v-for="item in list" @dblclick="editTodo(item)" class="list-group-item" v-if="!item.isFinished&&!item.isOver">
          <div class="input-group">
            <p v-show="item.id!=tempItem.id||!tempItem.isEdit">{{item.label}}</p>
            <p v-show="item.id==tempItem.id&&tempItem.isEdit"><input type="text" class="form-control" @keydown.enter="updateTodo(item)" v-model="tempItem.label"></p>
            <span class="input-group-btn">
              <button class="" @click="overTodo(item)" class="glyphicon glyphicon-ok" type="button"></button>
            </span>
            <span class="input-group-btn">
              <button class="" @click="delTodo(item)" type="button" class="glyphicon glyphicon-remove"></button>
            </span>
          </div>
        </li>
      </draggable>
    </ul>
	</div>
</template>
<script>
import bus from '../assets/eventBus'
import storage from '../assets/storage'
import util from '../assets/util'
import draggable from 'vuedraggable'  // 拖拽组件
export default {
  name: 'todosList',
  data () {
    return {
      list: storage.fetch(),
      tempItem: {}
    }
  },
  methods: {
    overTodo (item) {
      item.isOver = true
      item.meta.overTime = new Date().getTime()
    },
    delTodo (item) {
      item.isFinished = true
      item.meta.deleteTime = new Date().getTime()
    },
    editTodo (item) {
      this.tempItem = JSON.parse(JSON.stringify(item))
      this.tempItem.isEdit = true
    },
    updateTodo (item) {
      item.label = this.tempItem.label
      item.meta.updateTime = new Date().getTime()
      this.tempItem = {}
    }
  },
  watch: {
    list: {
      handler (newValue, oldValue) {
        storage.save(newValue)
        bus.$emit('completeTodo')
      },
      deep: true
    }
  },
  components: {
    draggable
  },
  mounted () {
    bus.$on('addTodo', msg => {
      let uuil = util.uuid()
      this.list.push({
        id: uuil,
        label: msg,
        isFinished: false,
        isOver: false,
        meta: {
          createTime: new Date().getTime(),
          updateTime: 0,
          overTime: 0,
          deleteTime: 0
        }
      })
    })
    bus.$on('updateTodo', item => {
      for (let i = 0, len = this.list.length; i < len; i++) {
        if (this.list[i].id === item.id) {
          this.list[i].label = item.label
          this.list[i].meta.updateTime = new Date().getTime()
          break
        }
      }
    })
  }
}
</script>