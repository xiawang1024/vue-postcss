<template>
  <div class="home">
    <sign-up></sign-up>
    <!-- <sign-up v-show="!isSignUp"></sign-up> -->
    <!-- <List v-show="isSignUp"></List> -->
  </div>
</template>

<script>

import SignUp from "../SignUp/index";

import { getUserInfo } from "api/index";
import { WeChat } from "weChat/util";
const weChat = new WeChat();
import BUS from "common/js/bus.js";
import { weChatName } from "../../config.js";
export default {
  components: {
    SignUp,
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
    // BUS.$on("toList", () => {
    //   // this.isSignUp = true;
    //   this._redirectLocation();
    // });
  },
  methods: {
    _getUserInfo() {
      let userInfo = JSON.parse(weChat.getStorage(weChatName));
      if (userInfo) {
        getUserInfo(userInfo.openid)
          .then(res => {
            let { status, data } = res.data;
            if (status === "ok") {
              // this.isSignUp = true;
              // this._redirectLocation();
            } else {
              this.isSignUp = false;
            }
          })
          .catch(error => {
            // this.isSignUp = true;
            // this._redirectLocation();
          });
      }
    },
    _redirectLocation() {
      window.location = "http://www.hndt.com/nh5/hndt/0423c/index.html";
    }
  }
};
</script>


