<template>
  <div class="home">
    <!-- <sign-up></sign-up> -->
    <sign-up v-show="!isSignUp"></sign-up>
    <List v-show="isSignUp"></List>
  </div>
</template>

<script>
const { swiperAnimateCache, swiperAnimate } = require("common/js/animate.js");

import SignUp from "../SignUp/index";

import List from "../List/index";
import { getUserInfo } from "api/index";
import { WeChat } from "weChat/util";
const weChat = new WeChat();
import BUS from "common/js/bus.js";
import { weChatName } from "../../config.js";
export default {
  components: {
    SignUp,
    List
  },
  data() {
    return {
      isSignUp: false
    };
  },
  mounted() {
    BUS.$on("getUserInfo", () => {
      this._getUserInfo();
    });
    BUS.$on("toList", () => {
      this.isSignUp = true;
    });
  },
  methods: {
    _getUserInfo() {
      let userInfo = JSON.parse(weChat.getStorage(weChatName));
      if (userInfo) {
        getUserInfo(userInfo.openid)
          .then(res => {
            let { status, data } = res.data;
            if (status === "ok") {
              this.isSignUp = true;
            } else {
              this.isSignUp = false;
            }
          })
          .catch(error => {
            this.isSignUp = true;
          });
      }
    }
  }
};
</script>

<style lang="scss">
.home,
.swiper-container {
  // position: absolute;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
  // background: url("../../common/imgs/bg.png") top center no-repeat;
  // background-size: cover;
}
</style>
