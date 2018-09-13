<template>
  <div class="signIn">
    <div class="top">
      <div class="logo"></div>
      <div class="text">2018年广播融媒体技术专业委员会年会</div>
      <div class="img"></div>
    </div>
    <div class="title">
    </div>
    <div class="userInfo">
      <!-- <div class="avatar-wrap">
        <img :src="userInfo.headimgurl" alt="avatar" class="avatar">
      </div>
      <p class="name">{{userInfo.nickname}}</p> -->
      <div class="success"></div>
      <div class="qrcode-wrap">
        <img src="../../common/imgs/qrcode.png" alt="" class="qrcode">
        <p class="tips">（长按二维码进群）</p>
      </div>
    </div>
    <div class="bottom"></div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  </div>
</template>

<script>
/**
 * Bus
 */
import BUS from 'common/js/bus.js';
import { WeChat } from 'weChat/util'
const weChat = new WeChat()
import { signIn,signUp } from 'api/index'
import Simplert from 'vue2-simplert'

export default {
  name:'SignIn',
  components:{
    Simplert
  },
  data() {
    return {
      userInfo:{},
      isSignIn:false
    }
  },
  mounted() {
    BUS.$on('SignIn', (userInfo) => {
      this.userInfo = userInfo;
      // this._signIn(userInfo.openid)
      this._singIn(userInfo)
    })
  },
  methods:{
    _singIn(userInfo) {
      let {openid,headimgurl,nickname} = userInfo
      signUp(openid,headimgurl,nickname).then(res => {
        let { status } = res.data
        if(status === 'ok') {
          this.isSignIn = true
        } else {
          // this._warnTips('请先报名，谢谢！')
          this.isSignIn = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // _signIn(openId) {
    //   signIn(openId).then(res => {
    //     let { status } = res.data
    //     if(status === 'ok') {
    //       this.isSignIn = true
    //     } else {
    //       this._warnTips('请先报名，谢谢！')
    //       this.isSignIn = false
    //     }
    //   })
    // },
    _signUp() {
      window.location.href = 'https://a.weixin.hndt.com/h5/signUp/20180918/index.html'
    },
    _warnTips(message) {
      let obj = {
        title:'签到失败',
        message,
        type: 'error',
        onClose:this._signUp,
        customCloseBtnText:'去报名'
      }
      this.$refs.simplert.openSimplert(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.signIn{
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
      background:url('../../common/imgs/top.png') center center no-repeat;
      background-size: cover;
    }
  }
  .title{
    margin-top: 10px;
    width: 100%;
    height: 220px;
    background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .userInfo{
    margin-top: 50px;
    .avatar-wrap{
      font-size: 0;
      .avatar{
        width: 260px;
        height: 260px;
        border-radius: 50%;
      }
    }
    .name{
      margin-top: 60px;
      font-size: 34px;
      color: #fff;
    }
    .success{
      margin-top: 80px;
      width: 100%;
      height: 118px;
      background: url('../../common/imgs/success.png') center center no-repeat;
      background-size: contain;
    }
    .qrcode-wrap{
      width: 400px;
      margin:100px auto;
      .qrcode{
        width: 260px;
      }
      .tips{
        margin-top: 20px;
        font-size: 30px;
        color:red
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
