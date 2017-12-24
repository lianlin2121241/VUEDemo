<template>
	<div>
    <ul class="list-group" v-if="notOverCount > 0">
      <draggable v-model="list">
        <li v-for="item in list" @dblclick="editTodo(item)" class="list-group-item my-handle" v-if="!item.isFinished&&!item.isOver">
          <div class="input-group" v-bind:class="{'div-block':(item.id==tempItem.id&&tempItem.isEdit)}">
            <p v-show="item.id!=tempItem.id||!tempItem.isEdit">{{item.label}}</p>
            <p v-show="item.id==tempItem.id&&tempItem.isEdit"><input type="text" class="form-control" @keydown.enter="updateTodo(item)" v-model="tempItem.label"></p>
            <span class="input-group-btn" v-show="item.id!=tempItem.id||!tempItem.isEdit">
              <button class="btn btn-primary btn-xs btn-table-list" @click="overTodo(item)" type="button" title="完成任务"><span class="glyphicon glyphicon-ok"></span></button>
            </span>
            <span class="input-group-btn" v-show="item.id!=tempItem.id||!tempItem.isEdit">
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
      if (!this.tempItem.label) {
        this.tempItem = {}
        return
      }
      item.label = this.tempItem.label
      item.meta.updateTime = new Date().getTime()
      this.tempItem = {}
    }
  },
  computed: {
    notOverCount: function () {
      var notOverList = this.list.filter(function (item) {
        return !item.isFinished && !item.isOver
      })
      return notOverList.length
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
