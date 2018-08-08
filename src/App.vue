<template>
  <div id="app">
    <wxhd></wxhd>
    <wxft></wxft>
  </div>
</template>

<script>
import wxhd from './base/Header/Header'
import wxft from './base/Footer/Footer'

export default {
  name: 'App',
  components: {
    wxhd,
    wxft
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>




