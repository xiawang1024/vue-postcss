<template>
  <div id="app">
    <vue-particles color="#dedede" class="particles" :moveSpeed="5"></vue-particles>
    <home></home>
    <up-arrow></up-arrow>
    <!-- <wx-audio></wx-audio> -->
  </div>
</template>

<script>
import Home from 'comp/Home/Home'
import UpArrow from 'base/UpArrow/index'
// import WxAudio from 'base/Audio/index'

export default {
  name: 'App',
  components: {
    Home,
    UpArrow
    // WxAudio
  }
}
</script>
<style lang="scss" scoped>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #020c32;
  overflow: hidden;
  .particles {
    height: 100%;
  }
}
</style>




