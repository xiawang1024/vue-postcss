<template>
  <div class="one">
    <div class="top">
      <div class="logo ani" swiper-animate-effect="flip" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>

      <div class="img ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
    </div>
    <div class="title ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div class="titlec ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="1s"></div>
    <div class="time ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="1.5s">
      <p class="item">2018年9月18日签到</p>
      <p class="item">会议时间</p>
      <p class="item">2018年9月19日--2018年9月21日</p>
    </div>
    <div class="person ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="1.75s">
      <p class="item">
        <span class="name">会议主办：</span>
        <span class="desc">中国电影电视技术学会</span>
      </p>
      <p class="item">
        <span class="name"></span>
        <span class="desc">广播融媒体技术专业委员会</span>
      </p>
      <p class="item">
        <span class="name"></span>
        <span class="desc">中西南地区省级广播电台技术协会</span>
      </p>
      <p class="item">
        <span class="name">会议承办：</span>
        <span class="desc">河南广播电视台</span>
      </p>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>


export default {
  name:'one',
  data() {
    return {

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.one{
  width: 100%;
  height: 100%;
  text-align: center;
  background:url('../../common/imgs/star.png') center center no-repeat ;
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
      background: url('../../common/imgs/logo.png') center center no-repeat;
      background-size:cover;
    }
    .text{

    }
    .img{
      position: absolute;
      top:0;
      right:0;
      width: 423px;
      height: 165px;
      background:url('../../common/imgs/top.png') center center no-repeat;
      background-size: cover;
    }
  }
  .title{
    margin-top: 20px;
    width: 100%;
    height: 220px;
    background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .titlec{
    margin-top: 36px;
    width: 100%;
    height: 102px;
    background: url('../../common/imgs/2018.png') center center no-repeat;
    background-size: contain;
  }
  .time{
    margin-top: 35px;
    font-size: 29px;
    text-align: center;
    color:#fff;
    .item{
      margin-bottom: 20px;
    }
  }
  .person{
    width: 630px;
    margin:70px auto 0;
    text-align: center;
    color: #fff;
    .item{
      display: flex;
      font-size: 29px;
      margin-bottom: 40px;
      .name{
        flex:0 0 165px;
      }
    }
  }
  .bottom{
    position: absolute;
    bottom:0;
    left:0;
    right: 0;
    width: 100%;
    height: 239px;
    background: url('../../common/imgs/bottom.png') center center no-repeat;
    background-size: cover;
  }
}
</style>
