<template>
  <div class="signUp">
    <div class="top">
      <div class="logo ani" swiper-animate-effect="flip" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
    </div>
    <div class="title ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div class="titlec ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div v-if="!userInfo">
      <div class="form ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.85s">
        <p class="item">
          <label for="">姓名：</label>
          <input type="text" v-model="userName">
        </p>
        <p class="item">
          <label for="">部门：</label>
          <span @click="pickDepart">{{department}}</span>
        </p>
      </div>
      <button class="btn ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s" swiper-animate-delay="1.25s" @click="postData">提交</button>
    </div>
    <user-info v-else :userInfo="userInfo"></user-info>
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  </div>
</template>

<script>
import { WeChat } from 'weChat/util'
const weChat = new WeChat()
import { signUp, getUserInfo } from 'api/index'

import weui from 'weui.js'

import companyData from './data.js'
/**
 * Bus
 */
import BUS from 'common/js/bus.js'

import Simplert from 'vue2-simplert'
import UserInfo from 'base/UserInfo/index'
export default {
  name: 'signUp',
  components: {
    Simplert,
    UserInfo
  },
  data() {
    return {
      userName: '',
      mobile: '',
      company: '',
      position: '',
      isSingUp: true,
      userInfo: null
    }
  },
  computed: {
    department: function() {
      if (!this.company) {
        return '请选择您的部门'
      } else {
        return `${this.company}--${this.position}`
      }
    }
  },
  mounted() {
    // this._successTips()
    BUS.$on('getUserInfo', () => {
      setTimeout(() => {
        this._getUserInfo()
      }, 300)
    })
  },
  methods: {
    pickDepart() {
      weui.picker(companyData, {
        className: 'signUp-weui',
        defaultValue: [1, 3],
        onChange: result => {
          let [company, position] = result
          this.company = company.label
          this.position = position.label
        },
        onConfirm: result => {
          console.log(result)
        },
        id: 'doubleLinePicker'
      })
    },
    postData() {
      if (!this.userName) {
        this._warnTips('请填写您的姓名')
        return
      }
      if (!this.company) {
        this._warnTips('请选择您的部门')
        return
      }
      if (!this.position) {
        this._warnTips('请选择您的部门')
        return
      }
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'))

      signUp(
        userInfo.openid,
        this.userName,
        userInfo.headimgurl,
        this.company,
        this.position
      )
        .then(res => {
          let { status } = res.data
          if (status === 'ok') {
            this._successTips()
          } else {
            this._errorTips('报名失败，请重试！')
          }
        })
        .catch(err => {
          console.log(err)
          // this._errorTips('网络错误，请重试')
        })
    },
    _onClose() {
      this._clearIpt()
    },
    _successTips() {
      let obj = {
        title: '报名成功',
        type: 'success',
        onClose: this._onClose,
        customCloseBtnText: '关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _warnTips(message) {
      let obj = {
        message,
        type: 'warning',
        customCloseBtnText: '关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _errorTips(message) {
      let obj = {
        message,
        type: 'error',
        customCloseBtnText: '关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _getUserInfo() {
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'))
      getUserInfo(userInfo.openid)
        .then(res => {
          let { status, data } = res.data
          if (status === 'ok') {
            this.userInfo = data
          } else {
            this.userInfo = null
          }
        })
        .catch(error => {
          this._errorTips('网络错误，请重试')
          console.log(error)
        })
    },
    _clearIpt() {
      let obj = {
        name: this.userName,
        mobile: this.mobile,
        company: this.company,
        position: this.position
      }

      this.$nextTick(() => {
        this.userInfo = obj
      })
      setTimeout(() => {
        this.userName = ''
        this.mobile = ''
        this.company = ''
        this.position = ''
      }, 500)
    },
    _checkPhone(phone) {
      if (!/^1[345678]\d{9}$/.test(phone)) {
        return false
      } else {
        return true
      }
    }
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
  .form {
    width: 515px;
    margin: 120px auto 0;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      padding-bottom: 8px;
      font-size: 32px;

      line-height: 1.215;
      border-bottom: 1px solid #e7d401;
      label {
        flex: 0 0 100px;
        width: 100px;
        color: #e7d401;
      }
      input {
        background: none;
        border: none;
        outline: none;
        color: #ddd;
      }
      span {
        display: inline-block;
        width: 100%;
        text-align: left;
        color: #ddd;
      }
    }
  }
  .btn {
    margin-top: 50px;
    width: 300px;
    height: 70px;
    border: none;
    border-radius: 70px;
    outline: none;
    font-size: 32px;
    color: #0081dc;
    background: #fff;
    user-select: none;
    &:active {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
