import axiosInstance from '../assets/http'

export default {
  addTodo (obj) {
    return axiosInstance.post('/addTodo', {
      label: obj.label
    })
  },
  updateTodo (item) {
    return axiosInstance.post('/updateTodo', {
      id: item._id,
      label: item.label
    })
  },
  finishTodos (item) {
    return axiosInstance.post('/finishTodos', {
      id: item._id
    })
  },
  deleteTodos (item) {
    return axiosInstance.post('/deleteTodos', {
      id: item._id
    })
  },
  getTodosUnfinished () {
    return axiosInstance.post('/getTodosUnfinished', {})
  },
  getTodosFinished () {
    return axiosInstance.post('/getTodosFinished', {})
  },
  updateSort (idArr) {
    return axiosInstance.post('/updateSort', {
      sorts: idArr
    })
  }
}
