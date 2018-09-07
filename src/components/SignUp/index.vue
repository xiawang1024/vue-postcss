<template>
  <div class="signUp">
    <div class="one">
      <div class="logo ani" swiper-animate-effect="rotateIn" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      <img class="qrcode" src="../../common/imgs/qrcode.png" />
      <div class="moon-wrap">
        <div class="light ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.5s"></div>
        <div class="moon ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      </div>
      <div class="flower ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="1s" swiper-animate-delay="0.25s"></div>
      <div class="bird ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.5s"></div>
      <div class="leaf ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.75s"></div>
      <div class="cloud ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="1s"></div>
      <div class="title ani" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="0.75s"></div>
      <div class="text-wrap ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s" swiper-animate-delay="1s">
        <!-- <p class="name">送祝福的人</p> -->
        <div class="item">
          <span class="label">姓名</span>
          <input type="text" class="ipt" v-model="userName" placeholder="填写真实姓名">
        </div>
        <div class="item">
          <span class="label">电话</span>
          <input type="tel" class="ipt" v-model="mobile" placeholder="填写真实手机号">
        </div>

        <div class="item">
          <span class="label"></span>
          <div class="ipt btn">
            <p class="tips">录下 i 想说的话</p>
            <button class="submit" :class="isRecord ? 'isrecord':''" @touchstart="touchStart" @touchend='touchEnd'>{{btnInfo}}</button>
          </div>
        </div>
      </div>
      <div class="logo-text">魅力881河南广播电视台音乐广播</div>
      <div class="bottom"></div>
    </div>
    <div v-show="isRecord" class="voice">
      <img src="../../common/imgs/voice-recording.gif" alt="" class="img">
      <p class="tips">正在录音...</p>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  </div>
</template>

<script>
import { WeChat } from 'weChat/util'
const weChat = new WeChat()
import { signUp, getUserInfo,uploadVoice } from 'api/index'
const wx = require('weixin-js-sdk')
/**
 * Bus
 */
import BUS from 'common/js/bus.js';

import Simplert from 'vue2-simplert'

export default {
  name:'signUp',
  components:{
    Simplert
  },
  data() {
    return {
      userName:'',
      mobile:'',
      btnInfo:'长按录音',
      isRecord:false,
      userInfo:null
    }
  },
  mounted() {
    BUS.$on('emitVoiceUpload',(localId) => {
      this.voiceLocalId = localId
      this._uploadVoice()
    })
    this.initRecord()
    this.startId = 0;
    this.endId = 0;
  },
  beforeDestroy() {
    clearTimeout(this.timeId)
  },
  methods:{
    initRecord() {
      if(!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true'){
        wx.startRecord({
          success:() => {
            localStorage.rainAllowRecord = 'true'
            wx.stopRecord()
          },
          cancel:() => {
            alert('用户拒绝授权录音')
          }
        })
      }
    },
    _onClose() {
      // this._clearIpt()
    },
    _successTips() {
      let obj = {
        title: '发送成功',
        type: 'success',
        onClose: this._onClose,
        customCloseBtnText:'关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _warnTips(message) {
      let obj = {
        message,
        type: 'warning',
        customCloseBtnText:'关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _errorTips(message) {
      let obj = {
        message,
        type: 'error',
        customCloseBtnText:'关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _getUserInfo() {
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'));
      getUserInfo(userInfo.openid).then(res => {
        let { status,data } = res.data
        if(status === 'ok') {
          this.userInfo = data
        }else {
          this.userInfo = null;
        }
      }).catch(error => {
        this._errorTips('网络错误，请重试')
        console.log(error)
      })
    },
    _clearIpt() {
      let obj = {name:this.userName,mobile:this.mobile}

      this.$nextTick(() => {
        this.userInfo = obj
      })
      setTimeout(() => {
        this.userName = ''
        this.mobile = ''
      },500)
    },
    _checkPhone(phone) {
      if(!(/^1[345678]\d{9}$/.test(phone))){
          return false;
      }else{
          return true
      }
    },

    onConfirm() {

    },
    _voiceTips() {
      const onUploadVoice = () => {
        this._uploadVoice()
      }
      let obj = {
        title:'回听录音',
        type:'info',
        onClose:onUploadVoice,
        customCloseBtnText:'发送',
        useConfirmBtn:true,
        customConfirmBtnText:'重新录制',
        onConfirm:this.onConfirm
      }
      this.$refs.simplert.openSimplert(obj)
    },
    _checkIpt() {
      if(!this.userName){
        this._warnTips('请填写送祝福人的真实姓名')
        return false
      }
      if(!this.mobile){
        this._warnTips('请填写送祝福人的真实手机号')
        return false
      }
      if(!this._checkPhone(this.mobile.trim())){
        this._warnTips('手机号不正确，请重新填写')
        return false
      }
      return true
    },
    _isRecord() {
      this.btnInfo = '松开停止录音'
      this.isRecord = true
    },
    _isNotRecord() {
      this.btnInfo = '长按录音'
      this.isRecord = false
    },
    touchStart() {
      // this._voiceTips()
      let isOkRecord = this._checkIpt()
      if(isOkRecord) {
        this.startId = Date.parse(new Date())
        this.timeId = setTimeout(() => {
          this._isRecord()
          this.recordTimer = setTimeout(() => {
            wx.startRecord({
              success: () => {
                localStorage.rainAllowRecord = 'true';
              },
              cancel: () => {
                alert('用户拒绝授权录音');
              }
            });
          })
        },500)
      }else {
        return
      }
    },
    touchEnd() {
      let isOkRecord = this._checkIpt()
      if(isOkRecord) {
        this.endId = Date.parse(new Date())
        this._isNotRecord()
        let _this = this
        console.log('------------------------------------');
        console.log(this.endId);
        console.log(this.startId);
        if(this.endId - this.startId < 1500 ) {
          this.startId = this.endId = 0
          alert('时间过短，请重新录制！')
          clearTimeout(this.recordTimer)
          return
        }else {
          console.log('end')
          wx.stopRecord({
            success: (res) => {
              let  voiceLocalId  = res.localId;
              _this.voiceLocalId = voiceLocalId
              wx.playVoice({
                localId: voiceLocalId // 需要播放的音频的本地ID，由stopRecord接口获得
              });
              _this._voiceTips()

            },
            fail: (res) => {
              console.log(JSON.stringify(res));
            }
          });
        }
      }else {
        return false
      }

    },
    _uploadVoice() {
      wx.uploadVoice({
        localId: this.voiceLocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: (res) => {
          let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'));

          let openId = userInfo.openid;
          let username = userInfo.nickname || '';
          let icon = userInfo.headimgurl || '';
          uploadVoice(res.serverId,openId,username,this.userName,this.mobile,icon).then(() => {
            this._successTips()
          })
        }
      });
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
  .qrcode{
    position: absolute;
    z-index: 10;
    top:980px;
    right: 40px;
    width: 120px;
    height: 120px;
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
    top:0px;
    left:0;
    width: 250px;
    height: 509px;
    background: url('../../common/imgs/flower.png') left center no-repeat;
    background-size: contain;
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
    top:280px;
    left: 0;
    width: 100%;
    height: 126px;
    background: url('../../common/imgs/title1.png') center center no-repeat;
    background-size: contain;
  }
  .text-wrap{
    position: absolute;
    top:480px;
    left:90px;
    width: 480px;
    color:#fff;
    .name{
      margin-left: 90px;
      margin-bottom: 20px;
      color:#f08;
      font-size: 28px;
    }
    .item{
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      margin-bottom: 50px;
      box-sizing: border-box;
      .label{
        width: 105px;
        flex: 0 0 105px;
        font-size: 28px;
      }
      .ipt{
        flex:1;
        height: 100%;
        padding-left: 16px;
        border: 1px solid #fff;
        border-radius: 8px;
        outline: none;
        color:#fff;
        background: none;
        box-sizing: border-box;
        appearance: none;
        font-size: 28px;
        &.btn{
          border:none;
          .tips{
            width: 100%;
            font-size: 22px;
            color: #ccc;
            text-align: center;
          }
          .submit{
            margin-top: 30px;
            width: 100%;
            height:90px;
            border-radius: 90px;
            border:none;
            font-size: 28px;
            color: #fff;
            background:#395bbb;
            user-select: none;
            &.isrecord{
              background: #ca1717;
            }
          }
        }
      }
    }
  }
  .logo-text{
    position: absolute;
    top:1030px;
    left:150px;
    font-size: 28px;
    color: #eee;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    height: 170px;
    background: url('../../common/imgs/bottom.png') center center no-repeat;
    background-size: contain;
  }
}
.voice{
  position: absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  width: 200px;
  height: 140px;
  margin: auto;
  padding:40px;
  border-radius: 10px;
  text-align: center;
  background: #eee;
  .img{
    width: 120px;
  }
  .tips{
    margin-top: 20px;
    font-size: 28px;
  }
}
</style>
