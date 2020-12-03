export default function (state) {
    return {
        addTodo() {
            const val = this.newTodo && this.newTodo.trim()
            if (!val) {
                return
            }
            state.todoList.push({
                id: state.todoList.length + 1,
                title: val,
                completed: false
            })
            state.newTodo = ''
        },
        removeTodo(item) {
            let index = this.todoList.indexOf(item)
            state.todoList.splice(index, 1)
        },
        removeCompleted() {
            state.todoList = state.todoList.filter(item => !item.completed)
        },
        editTodo(item) {
            state.beforeEditCache = item.title
            state.editedTodo = item
        },
        doneEdit(item) {
            if (!state.editedTodo) {
                return
            }
            state.editedTodo = null
            item.title = item.title.trim()
            if (!item.title) {
                removeTodo(item)
            }
        },
        cancelEdit(item) {
            state.editedTodo = null
            item.title = state.beforeEditCache
        },
        changeTodoStatus(status) {
            state.currTodoStatus = status
        }
    }
}
