<template>
  <div class="wrapper">
    <section class="todoapp">
      <header class="header">
        <h1>TodoMVC • Vue2</h1>
        <input class="new-todo" placeholder="请输入待办事项并按回车键" autofocus
               v-model="newTodo"
               @keyup.enter="addTodo">
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main" v-show="showTodoList.length">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li v-for="item in showTodoList" :key="item.id" :class="{'completed': item.completed, 'editing': item === editedTodo}">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed">
              <label @dblclick="editTodo(item)">{{item.title}}</label>
              <button class="destroy" @click="removeTodo(item)"></button>
            </div>
            <input class="edit"
                   v-model="item.title"
                   v-todo-focus="item === editedTodo"
                   @blur="doneEdit(item)"
                   @keyup.enter="doneEdit(item)"
                   @keyup.esc="cancelEdit(item)">
          </li>
        </ul>
      </section>
      <!-- This footer should be hidden by default and shown when there are todos -->
      <footer class="footer" v-show="todoList.length">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count">还有<strong>{{remainingNum}}</strong>条待办</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li v-for="(sItem,i) in statusList" :key="i">
            <span class="btn" :class="{'selected': currTodoStatus === sItem.status}" @click="changeTodoStatus(sItem.status)">{{sItem.title}}</span>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="removeCompleted" v-show="todoList.length > remainingNum">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>点击左上角下拉箭头，可全部标记为已完成。</p>
      <p>鼠标双击事项文本，会激活输入框，可进行修改文本内容。</p>
      <p>当输入框激活时，可以按 esc 退出，不保存输入的内容。</p>
      <p>输入框失去焦点/按回车 则自动保存新文本。</p>
      <p>如果在输入框中清除了所有文本，则自动删除这条待办事项</p>
    </footer>
  </div>

</template>
<script>
import Storage from './local'
export default {
  name: 'Main',
  data () {
    return {
      newTodo: '',
      editedTodo: null, // 正在编辑的事项item
      todoList: Storage.get(),
      currTodoStatus: 0, // 当前激活显示的todos状态 0:all|1:active|2:completed
      // todoList: [
      //   { id: 1, title: '吃饭', completed: true },
      //   { id: 2, title: '学习', completed: false },
      // ]
      statusList: [
        { title: '全部', status: 0 },
        { title: '待办', status: 1 },
        { title: '已完成', status: 2 }
      ]
    }
  },
  computed: {
    remainingNum () {
      return this.todoList.filter(item => !item.completed).length
    },
    allDone: {
      get () {
        return this.remainingNum === 0
      },
      set (value) {
        this.todoList.forEach(item => {
          item.completed = value
        })
      }
    },
    showTodoList () {
      switch (this.currTodoStatus) {
        case 1:
          return this.todoList.filter(item => !item.completed)
        case 2:
          return this.todoList.filter(item => item.completed)
        default:
          return this.todoList
      }
    }
  },
  directives: {
    'todo-focus': (el, binding) => {
      if (binding.value) {
        el.focus()
      }
    }
  },
  methods: {
    changeTodoStatus (status) {
      this.currTodoStatus = status
    },
    addTodo () {
      const val = this.newTodo && this.newTodo.trim()
      if (!val) {
        return
      }
      this.todoList.push({
        id: this.todoList.length + 1,
        title: val,
        completed: false
      })
      this.newTodo = ''
      // 存入localStorage
      Storage.set(this.todoList)
    },
    editTodo (item) {
      this.beforeEditCache = item.title
      this.editedTodo = item
      Storage.set(this.todoList)
    },
    removeTodo (item) {
      const index = this.todoList.indexOf(item)
      this.todoList.splice(index, 1)
      Storage.set(this.todoList)
    },
    doneEdit (item) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      item.title = item.title.trim()
      if (!item.title) {
        this.removeTodo(item)
      }
      Storage.set(this.todoList)
    },
    cancelEdit (item) {
      this.editedTodo = null
      item.title = this.beforeEditCache
    },
    removeCompleted () {
      this.todoList = this.todoList.filter(item => !item.completed)
      Storage.set(this.todoList)
    }
  }
}
</script>
<style scoped>
  @import "./index.css";
  .wrapper{
    margin: 0 auto;
    min-width: 230px;
    max-width: 550px;
  }
</style>
