const STORAGE_KEY = 'todos-vue2'
export default {
  get () {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    list.forEach((item, index) => {
      item.id = index + 1
    })
    return list
  },
  set (todoList) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
  }
}
