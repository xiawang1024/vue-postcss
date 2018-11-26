<template>
  <div class="signUp">
    <div class="top">
      <div class="logo ani" swiper-animate-effect="flip" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
    </div>
    <div class="title ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div class="titlec ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>

    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  </div>
</template>

<script>
export default {
  name: 'list',

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.signUp {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url('../../common/imgs/bg.png') center center no-repeat;
  background-size: cover;
  .top {
    position: relative;
    width: 100%;
    height: 80px;
    text-align: center;
    .logo {
      position: absolute;
      top: 40px;
      left: 35px;
      width: 100px;
      height: 80px;
      background: url('../../common/imgs/logo.png') center center no-repeat;
      background-size: cover;
    }
  }
  .title {
    margin-top: 40px;
    width: 100%;
    height: 260px;
    background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .titlec {
    width: 100%;
    height: 36px;
    background: url('../../common/imgs/titlec.png') center center no-repeat;
    background-size: contain;
  }
}
</style>
