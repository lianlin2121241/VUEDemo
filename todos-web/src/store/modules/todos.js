import todosApi from '../../api/todos'
import _ from 'lodash'

const state = {
  newLabel: '',
  finishedList: [],
  unFinishedList: [],
  currentPage: 0,
  editItemList: [],
  finishedCount: 0
}

const getters = {
  unFinishedListCount: (state, getters) => {
    return state.unFinishedList.length
  },
  sortFinishedData: (state, getters) => {
    var dataList = state.finishedList
    var obj = {}
    if (dataList.length === 0) {
      return obj
    }
    var sortData = _.cloneDeep(dataList).sort(function (pre, next) {
      return new Date(next.meta.overTime) - new Date(pre.meta.overTime)
    })
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
}

const actions = {
  saveTodo: async ({ commit, state, dispatch }, todo) => {
    var saveResult = null
    if (todo._id) {
      saveResult = await todosApi.updateTodo({
        _id: todo._id,
        label: todo.label
      })
    } else {
      saveResult = await todosApi.addTodo({
        label: todo.label
      })
    }
    if (saveResult.data.success) {
      commit('deleteEditItem', todo)
      dispatch('queryUnfinishedTodos')
    }
  },
  queryFinishedTodos: async ({ commit, state }) => {
    commit('incrementFinishedPage')
    const todosFinished = await todosApi.getTodosFinished()
    commit('setFinishedList', todosFinished.data.data.resultData)
    commit('setFinishedCount', todosFinished.data.data.totalCount)
  },
  queryUnfinishedTodos: async ({ commit, state }) => {
    const todosUnfinished = await todosApi.getTodosUnfinished()
    commit('setUnfinishedList', todosUnfinished.data.data)
  },
  deleteTodo: async ({ commit, state, dispatch }, todo) => {
    const deleteResult = await todosApi.deleteTodos(todo)
    if (deleteResult.data.success) {
      dispatch('queryUnfinishedTodos')
    }
  },
  finishTodo: async ({ commit, state, dispatch }, todo) => {
    const finishResult = await todosApi.finishTodos(todo)
    if (finishResult.data.success) {
      commit('resetFinishedPage')
      commit('emptyFinishedList')
      dispatch('queryUnfinishedTodos')
      dispatch('queryFinishedTodos')
    }
  },
  updateSort: async ({ commit, state, dispatch }, ids) => {
    const updateSortResult = await todosApi.updateSort(ids)
  }
}

const mutations = {
  emptyFinishedList (state) {
    state.finishedList = []
  },
  setFinishedList (state, finishedList) {
    state.finishedList.push(...finishedList)
  },
  setUnfinishedList (state, UnfinishedList) {
    state.unFinishedList = UnfinishedList
  },
  setFinishedCount (state, count) {
    state.finishedCount = count
  },
  incrementFinishedPage (state) {
    state.currentPage++
  },
  resetFinishedPage (state) {
    state.currentPage = 0
  },
  addEditItem (state, item) {
    state.editItemList.push(item._id)
  },
  deleteEditItem (state, item) {
    state.editItemList.splice(state.editItemList.indexOf(item._id), 1)
  },
  resetState (state) {
    state.newLabel = ''
    state.finishedList = []
    state.unFinishedList = []
    state.currentPage = 0
    state.editItemList = []
    state.finishedCount = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
