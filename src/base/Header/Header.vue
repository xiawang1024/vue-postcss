<template>
  <div class="g-header">
    <div class="g-hd">
      <a href="http://www.hndt.com" class="link">
      </a>
    </div>
    <div class="g-banner"></div>
  </div>
</template>

<script>
export default {
  name:'g-header',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.g-hd {
  position: relative;
  width: 100%;
  height: 80px;
  background: url('./icon-logo-wap.png') center center no-repeat;
  background-size: auto 60px;
}
.g-banner {
  width: 100%;
  height: 400px;
  background: url('./icon-banner-wap.png') center center no-repeat;
  background-size: cover;
}
</style>

