<template>
  <div id="app">
    <nav>
      <router-link to="/">TodoMVC • Vue3</router-link> |
      <router-link to="/hello">Hello</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
