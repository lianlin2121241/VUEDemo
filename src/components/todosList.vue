<template>
	<div>
    <ul class="list-group">
      <draggable v-model="list">
        <li v-for="item in list" class="list-group-item" v-if="!item.isFinished">
          <div class="input-group">
            <p>{{item.label}}</p>
            <span class="input-group-btn">
              <button class="" @click="delTodo(item)" type="button">X</button>
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
import draggable from 'vuedraggable'  // 拖拽组件
export default {
  name: 'todosList',
  data () {
    return {
      list: storage.fetch()
    }
  },
  methods: {
    delTodo (item) {
      item.isFinished = true
    }
  },
  watch: {
    list: {
      handler (newValue, oldValue) {
        storage.save(newValue)
      },
      deep: true
    }
  },
  components: {
    draggable
  },
  mounted () {
    bus.$on('addTodo', msg => {
      this.list.push({
        label: msg,
        isFinished: false
      })
    })
  }
}
</script>