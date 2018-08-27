<template>
  <div id="app">
    <home></home>
    <up-arrow></up-arrow>
  </div>
</template>

<script>
import Home from 'comp/Home/Home'
import UpArrow from 'base/UpArrow/index'

export default {
  name: 'App',
  components:{
    Home,
    UpArrow
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>




