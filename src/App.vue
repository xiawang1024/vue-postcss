<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Slide.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="scss">
#app {
  width: 750px;
  position: fixed;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
