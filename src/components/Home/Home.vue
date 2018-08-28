<template>
  <div class="home">
    <sign-in></sign-in>
  </div>
</template>

<script>
import SignIn from '../SignIn/index'

export default {
  components: {
    SignIn
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
.home, .swiper-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
