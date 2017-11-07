const STORAGE_KEY = 'todos-storage'

export default {
  fetch () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  },
  save (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}
