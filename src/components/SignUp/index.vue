<template>
  <div class="signUp">
    <div
      class="title ani"
      swiper-animate-effect="fadeInDown"
      swiper-animate-duration="1s"
      swiper-animate-delay="0.5s"
    ></div>

    <div v-if="!userInfo">
      <div
        class="form ani"
        swiper-animate-effect="fadeIn"
        swiper-animate-duration="1s"
        swiper-animate-delay="0.85s"
      >
        <p class="item">
          <label for>姓名</label>
          <input type="text" v-model="userName">
        </p>
      </div>
      <div
        class="form ani"
        swiper-animate-effect="fadeIn"
        swiper-animate-duration="1s"
        swiper-animate-delay="0.85s"
      >
        <p class="item">
          <label for>手机号</label>
          <input type="text" v-model="mobile">
        </p>
      </div>
      <div class="btn-wrap">
        <button
          class="btn"
          swiper-animate-effect="fadeInUp"
          swiper-animate-duration="1s"
          swiper-animate-delay="1.25s"
          @click="postData"
        >
          <span class="text">签&nbsp;到</span>
        </button>
      </div>
    </div>
    <user-info v-else :userInfo="userInfo"></user-info>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"></simplert>
  </div>
</template>

<script>
import { WeChat } from "weChat/util";
const weChat = new WeChat();
import { signUp, getUserInfo } from "api/index";


/**
 * Bus
 */
import BUS from "common/js/bus.js";

import Simplert from "vue2-simplert";
import UserInfo from "base/UserInfo/index";

import { weChatName } from "../../config.js";

export default {
  name: "signUp",
  components: {
    Simplert,
    UserInfo
  },
  data() {
    return {
      userName: "",
      mobile: "",
      isSingUp: true,
      userInfo: null
    };
  },

  mounted() {
    BUS.$on("attention", () => {
      let msg = `<p>长按二维码关注"河南广播"公众号</p><p style='color:#f8011e'>（关注后请重新刷新页面）</p>`;
      this._attention(msg);
    });
  },
  methods: {

    //提交数据
    postData() {
      if (!this.userName) {
        this._warnTips("请填写您的姓名");
        return;
      }
      if (!this.mobile) {
        this._warnTips("请填写您的手机号");
        return;
      }
      if (!this._checkPhone(this.mobile)) {
        this._warnTips("请填写正确的手机号");
        return;
      }
      let userInfo = JSON.parse(weChat.getStorage(weChatName));

      signUp(
        userInfo.openid,
        this.userName,
        this.mobile,
      )
        .then(res => {
          let { status } = res.data;
          if (status === "ok") {
            this._successTips();
          } else {
            this._errorTips("报名失败，请重试！");
          }
        })
        .catch(err => {
          console.log(err);
          // this._errorTips('网络错误，请重试')
        });
    },
    _onClose() {
      this._clearIpt();
      BUS.$emit("toList");
    },
    _successTips() {
      let obj = {
        title: "签到成功",
        type: "success",
        // message: "即将跳转到节目单",
        // onClose: this._onClose,
        customCloseBtnText: "确定"
      };
      this.$refs.simplert.openSimplert(obj);
    },
    _warnTips(message) {
      let obj = {
        message,
        type: "warning",
        customCloseBtnText: "关闭"
      };
      this.$refs.simplert.openSimplert(obj);
    },
    _errorTips(message) {
      let obj = {
        message,
        type: "error",
        customCloseBtnText: "关闭"
      };
      this.$refs.simplert.openSimplert(obj);
    },
    _attention(message) {

      let obj = {
        message,
        type: "info",
        customIconUrl: "http://www.hndt.com/nh5/hndt/0423/imgs/qr.jpg",
        hideAllButton: true,
        disableOverlayClick: true
      };
      this.$refs.simplert.openSimplert(obj);
    },
    _getUserInfo() {
      let userInfo = JSON.parse(weChat.getStorage(weChatName));
      getUserInfo(userInfo.openid)
        .then(res => {
          let { status, data } = res.data;
          if (status === "ok") {
            this.userInfo = data;
          } else {
            this.userInfo = null;
          }
        })
        .catch(error => {
          this._errorTips("网络错误，请重试");
          console.log(error);
        });
    },
    _clearIpt() {
      let obj = {
        name: this.userName,
        mobile: this.mobile,
        company: this.company,
        position: this.position
      };

      this.$nextTick(() => {
        this.userInfo = obj;
      });
      setTimeout(() => {
        this.userName = "";
        this.mobile = "";
        this.company = "";
        this.position = "";
      }, 500);
    },
    _checkPhone(phone) {
      if (!/^1[345678]\d{9}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
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
  background: #ca151d;

  background-size: cover;

  .title {
    margin-top: 30px;
    width: 100%;
    height: 589px;
    background: url("http://www.hndt.com/nh5/tech/20190701/imgs/title.png")
      center center no-repeat;
    background-size: contain;
  }

  .form {
    width: 500px;
    margin: 50px auto 0;
    .item {
      display: flex;
      height: 90px;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 8px;
      font-size: 32px;

      line-height: 1.215;
      // border-bottom: 1px solid #e7d401;
      label {
        display: inline-block;
        flex: 0 0 120px;
        width: 120px;

        font-size: 36px;
        // font-weight: bold;
        color: #fff;
        text-align: right;
      }
      input {
        margin-left: 16px;
        flex: 0 0 350px;
        width: 350px;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        outline: none;
        color: #333;
        padding-left: 20px;
        border-radius: 16px;
        box-sizing: border-box;
      }
      span {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 26px;
        background: rgba(255, 255, 255, 0.5);
        text-align: left;
        color: #333;
        padding: 0 10px;
        border-radius: 10px;
        box-sizing: border-box;
      }
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      margin-top: 50px;
      // margin-bottom: 150px;
      width: 418px;
      height: 114px;
      border: none;
      border-radius: 70px;
      outline: none;
      font-size: 40px;
      color: #fff;
      background: url("http://www.hndt.com/nh5/hndt/0423/imgs/btn.png") center
        center no-repeat;
      background-size: contain;
      user-select: none;
      .text {
        display: inline-block;
        margin-bottom: 14px;
      }
      &:active {
        background: url("http://www.hndt.com/nh5/hndt/0423/imgs/btn-active.png")
          center center no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
