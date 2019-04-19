<template>
  <div class="signUp">
    <div class="top">
      <div
        class="logo ani"
        swiper-animate-effect="flip"
        swiper-animate-duration="1s"
        swiper-animate-delay="0s"
      ></div>
    </div>
    <div
      class="title ani"
      swiper-animate-effect="fadeInDown"
      swiper-animate-duration="1s"
      swiper-animate-delay="0.5s"
    ></div>
    <!-- <div
      class="titlec ani"
      swiper-animate-effect="fadeInDown"
      swiper-animate-duration="1s"
      swiper-animate-delay="0.5s"
    ></div>-->
    <!-- <div class="list-title ani"></div> -->

    <img src="http://www.hndt.com/nh5/hngd/imgs/zuo.png" alt class="img" @click="openImg">
  </div>
</template>

<script>
import VueStar from "vue-star";
import ListData from "./data.js";
import wx from "weixin-js-sdk";
export default {
  name: "list",
  components: {
    VueStar
  },
  data() {
    return {
      dataList: ListData,
      zanList: []
    };
  },
  mounted() {},
  methods: {
    openImg() {
      wx.previewImage({
        current: "http://www.hndt.com/nh5/hngd/imgs/zuo.png", // 当前显示图片的http链接
        urls: ["http://www.hndt.com/nh5/hngd/imgs/zuo.png"] // 需要预览的图片http链接列表
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.signUp {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("../../common/imgs/bg.png") top center no-repeat;
  background-size: cover;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
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
      background: url("../../common/imgs/logo.png") center center no-repeat;
      background-size: cover;
    }
  }
  .title {
    margin-top: 120px;
    width: 100%;
    height: 335px;
    background: url("../../common/imgs/title.png") center center no-repeat;
    background-size: contain;
  }
  // .titlec {
  //   width: 100%;
  //   height: 36px;
  //   background: url("../../common/imgs/titlec.png") center center no-repeat;
  //   background-size: contain;
  // }
  // .list-title {
  //   margin-top: 40px;
  //   width: 100%;
  //   height: 80px;
  //   background: url("../../common/imgs/listTitle.png") center center no-repeat;
  //   background-size: contain;
  // }
  .img {
    margin-top: 80px;
    width: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
  }
}
</style>
