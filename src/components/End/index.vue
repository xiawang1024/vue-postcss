<template>
  <div class="end">
    <div class="one">
      <div class="logo ani" swiper-animate-effect="rotateIn" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      <!-- <img class="qrcode" src="../../common/imgs/qrcode.jpg" /> -->
      <div class="moon-wrap">
        <div class="light ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.5s"></div>
        <div class="moon ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      </div>
      <div class="flower ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="1s" swiper-animate-delay="0.25s"></div>
      <div class="bird ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.5s"></div>
      <div class="leaf ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.75s"></div>
      <div class="cloud ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="1s"></div>
      <!-- <div class="title"></div> -->
      <div class="text-wrap ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s" swiper-animate-delay="1s">
        <!-- <div class="item">
          <span class="label">姓名</span>
          <input type="text" class="ipt">
        </div>
        <div class="item">
          <span class="label">电话</span>
          <input type="text" class="ipt">
        </div>
        <div class="item">
          <span class="label"></span>
          <div class="ipt btn">
            <p class="tips">收听给你的语音</p>
            <button class="submit">录音</button>
          </div>
        </div> -->
        <img class="qrcode" src="../../common/imgs/qrcode.jpg" alt="">
        <p class="tips">河南广播电视台音乐广播</p>
      </div>
      <div class="bottom">河南广播云提供技术支持</div>
    </div>
  </div>
</template>

<script>


export default {
  name:'end',
  data() {
    return {

    }
  },
  methods:{
    go() {
      let url = 'https://apis.map.qq.com/uri/v1/marker?marker=coord:34.775580,113.718900;title:中油花园酒店;addr:河南省郑州市金水区商务外环路11号中油花园酒店4楼(近黄河东路,毗邻会展中心)&referer=myapp';
      window.location.href = url;
    }
  }
}
</script>

<style lang="scss" scoped>
.one{
  width: 100%;
  height: 100%;
  text-align: center;
  background:url('../../common/imgs/bg.png');
  background-position: top 60px center,top 290px center;
  background-repeat: no-repeat,no-repeat;
  background-size:100% auto,auto 583px;
  .logo{
    position: absolute;
    top:40px;
    left:40px;
    width:96px;
    height: 96px;
    background: url('../../common/imgs/logo.png') center center no-repeat;
    background-size: cover;
  }

  .moon-wrap{
    position: relative;
    .light{
      width: 100%;
      height: 603px;
      background: url('../../common/imgs/light.png') center center no-repeat;
      background-size: contain;
    }
    .moon{
      position: absolute;
      top:0;
      right: 0;
      width: 357px;
      height: 374px;
      background: url('../../common/imgs/moon.png') center center no-repeat;
      background-size: cover;
    }
  }
  .flower{
    position: absolute;
    top :86px;
    left:0;
    width: 338px;
    height: 509px;
    background: url('../../common/imgs/flower.png') center center no-repeat;
    background-size: cover;
  }
  .bird{
    position: absolute;
    top:25px;
    left: 364px;
    width: 83px;
    height: 82px;
    background: url('../../common/imgs/bird.png') center center no-repeat;
    background-size: cover;
  }
  .leaf{
    position: absolute;
    top:66px;
    left: 420px;
    width: 188px;
    height: 317px;
    background: url('../../common/imgs/leaf.png') center center no-repeat;
    background-size: cover;
  }
  .cloud{
    position: absolute;
    top:120px;
    right: 0;
    width: 724px;
    height: 759px;
    background: url('../../common/imgs/cloud.png') center center no-repeat;
    background-size: cover;
  }
  .title{
    position: absolute;
    top:338px;
    left: 0;
    width: 100%;
    height: 115px;
    background: url('../../common/imgs/title2.png') center center no-repeat;
    background-size: contain;
  }
  .text-wrap{
    position: absolute;
    top:400px;
    left:135px;
    width: 480px;
    color:#fff;
    text-align: center;
    .qrcode{
      width: 300px;
      height: 300px;
    }
    .tips{
      margin-top: 20px;
      font-size: 30px;
    }
  }
  .bottom{
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    height: 170px;
    font-size: 28px;
    color:#888;
    background: url('../../common/imgs/bottom.png') center center no-repeat;
    background-size: contain;
  }
}
</style>
