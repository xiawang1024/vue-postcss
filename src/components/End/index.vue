<template>
  <div class="end">
    <div class="top">
      <div class="logo ani" swiper-animate-effect="flip" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      <div class="text ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0s">2018年广播融媒体技术专业委员会年会</div>
      <div class="img ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
    </div>
    <div class="title ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div class="map ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.85s"></div>
    <button class="btn ani" @click="go" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s" swiper-animate-delay="1.35s">去导航</button>
    <div class="bottom ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="1.5s"></div>
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
.end{
  width: 100%;
  height: 100%;
  text-align: center;
  // background:url('../../common/imgs/star.png') center center no-repeat ;
  background-size: contain;
  .top{
    position: relative;
    width: 100%;
    height: 165px;
    .logo{
      position: absolute;
      top:40px;
      left: 35px;
      width: 80px;
      height: 64px;
      // background: url('../../common/imgs/logo.png') center center no-repeat;
      background-size:cover;
    }
    .text{
      // position: absolute;
      padding-top: 57px;
      font-size: 23px;
      color:#fff;
    }
    .img{
      position: absolute;
      top:0;
      right:0;
      width: 423px;
      height: 165px;
      // background:url('../../common/imgs/top.png') center center no-repeat;
      background-size: cover;
    }
  }
  .title{
    margin-top: 20px;
    width: 100%;
    height: 220px;
    // background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .map{
    position: relative;
    z-index: 1024;
    margin-top: 40px;
    width: 100%;
    height: 460px;
    // background: url('../../common/imgs/map.png') center center no-repeat;
    background-size: contain;
  }
  .btn{
    position: relative;
    z-index: 1024;
    margin-top: 50px;
    width: 250px;
    height: 70px;
    border:none;
    border-radius: 70px;
    outline: none;
    font-size: 32px;
    color:#0081dc;
    background:#fff;
    user-select: none;
    &:active{
      background:rgba(255,255,255,0.5);
    }
  }
  .bottom{
    position: absolute;
    bottom:0;
    left:0;
    right: 0;
    width: 100%;
    height: 239px;
    // background: url('../../common/imgs/bottom.png') center center no-repeat;
    background-size: cover;
  }
}
</style>
