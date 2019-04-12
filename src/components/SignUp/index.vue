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
        <p class="item">
          <label for>部门</label>
          <span @click="pickDepart">{{department}}</span>
        </p>
      </div>
      <button
        class="btn ani"
        swiper-animate-effect="fadeInUp"
        swiper-animate-duration="1s"
        swiper-animate-delay="1.25s"
        @click="postData"
      >签&nbsp;&nbsp;到</button>
    </div>
    <user-info v-else :userInfo="userInfo"></user-info>
    <simplert :useRadius="true" :useIcon="true" ref="simplert"></simplert>
  </div>
</template>

<script>
import { WeChat } from "weChat/util";
const weChat = new WeChat();
import { signUp, getUserInfo } from "api/index";

import weui from "weui.js";

import companyData from "./data3.js";
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
      company: "",
      position: "",
      isSingUp: true,
      userInfo: null
    };
  },
  computed: {
    department: function() {
      if (!this.company) {
        return "点击选择部门";
      } else {
        return `${this.company}--${this.position}`;
      }
    }
  },
  mounted() {
    BUS.$on("attention", () => {
      let msg = `<p>长按二维码关注"河南广播电视台"公众号</p><p style='color:#f8011e'>（关注后请重新刷新页面）</p>`;
      this._attention(msg);
    });
  },
  methods: {
    pickDepart() {
      weui.picker(companyData, {
        className: "signUp-weui",
        defaultValue: [0, 0],
        onChange: result => {
          let [company, position] = result;
          this.company = company.label;
          this.position = position.label;
        },
        onConfirm: result => {
          console.log(result);
        },
        id: "doubleLinePicker"
      });
    },
    postData() {
      if (!this.userName) {
        this._warnTips("请填写您的姓名");
        return;
      }
      if (!this.company) {
        this._warnTips("请选择您的部门");
        return;
      }
      if (!this.position) {
        this._warnTips("请选择您的部门");
        return;
      }
      let userInfo = JSON.parse(weChat.getStorage(weChatName));

      signUp(
        userInfo.openid,
        this.userName,
        userInfo.headimgurl,
        this.company,
        this.position
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
        onClose: this._onClose,
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
      function attent() {
        // window.location =
        // "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2MzMzNjg0OQ==&scene=126&sessionid=1543280791&subscene=0#wechat_redirect";
        return false;
      }
      let obj = {
        message,
        type: "info",
        // onClose: attent,
        customIconUrl: "http://www.hndt.com/nh5/hngd/imgs/qr.jpg",
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
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("../../common/imgs/bg.png") center center no-repeat;
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

  .form {
    width: 560px;
    margin: 150px auto 0;
    .item {
      display: flex;
      height: 90px;
      align-items: center;
      margin-bottom: 80px;
      padding-bottom: 8px;
      font-size: 32px;

      line-height: 1.215;
      // border-bottom: 1px solid #e7d401;
      label {
        flex: 0 0 120px;
        width: 120px;
        font-size: 36px;
        font-weight: bold;
        color: #fff;
      }
      input {
        flex: 0 0 440px;
        width: 440px;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        outline: none;
        color: #333;
        padding-left: 20px;
        border-radius: 10px;
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
  .btn {
    margin-top: 50px;
    margin-bottom: 150px;
    width: 400px;
    height: 96px;
    border: none;
    border-radius: 70px;
    outline: none;
    font-size: 40px;
    color: #fff;
    // letter-spacing: 10px;
    background: linear-gradient(#f29837, #e15e14);
    user-select: none;
    &:active {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
