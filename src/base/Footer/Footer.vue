<template>
  <div class="g-footer">
    <!-- <div aspectratio w-16-9>
      <div aspectratio-content></div>
    </div> -->
    <div class="g-download">
      <a href="http://www.hndt.com/app/download/index.html" class="down">下载河南广播APP</a>
      <p class="desc">关注身边发生的事 河南人自己的APP</p>
    </div>

    <div class="g-ft">
      <div class="m-version">
        <a href="http://www.hndt.com/index.mb.html">触摸版</a> |
        <a href="http://www.hndt.com">电脑版</a> |
        <a href="http://www.hndt.com/index.mb.html">APP版</a>
      </div>
      <div class="m-copyright">
        手机河南广播网 ICP：豫ICP备14003020号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'g-footer',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/wap/mixin.scss';
.g-download {
  width: 100%;
  margin-top: 80px;
  text-align: center;
  .down {
    display: inline-block;
    padding: 20px 60px 20px 100px;
    font-size: 28px;
    color: #fff;
    border-radius: 100px;
    background: url('./icon-phone.png') left 60px center no-repeat #0081dc;
    background-size: auto 40px;
  }
  .desc {
    margin-top: 20px;
    font-size: 24px;
  }
}
.g-ft {
  width: 100%;
  margin-top: 40px;
  padding: 28px 0;
  @include tp-1px(#eee);
  text-align: center;
  font-size: 27px;
  .m-copyright {
    margin-top: 20px;
  }
}
</style>



