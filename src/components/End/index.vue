<template>
  <div class="end">
    <div class="one">
      <div class="logo ani" swiper-animate-effect="rotateIn" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      <img class="qrcode" src="../../common/imgs/qrcode.jpg" />
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
        <div class="item">
          <span class="label">姓名</span>
          <input type="text" class="ipt" v-model="userName">
        </div>
        <div class="item">
          <span class="label">电话</span>
          <input type="tel" class="ipt" v-model="mobile">
        </div>
        <div class="item">
          <span class="label"></span>
          <div class="ipt btn">
            <p class="tips">收听给你的语音</p>
            <button class="submit" @click="fetchDownVoice">播放录音</button>
          </div>
        </div>
        <!-- <img class="qrcode" src="../../common/imgs/qrcode.jpg" alt="">
        <p class="tips">河南广播电视台音乐广播</p> -->
      </div>
      <div class="logo-text">魅力881河南广播电视台音乐广播</div>
      <div class="bottom"></div>
    </div>
    <audio src="https://a.weixin.hndt.com/boom/uploads/voice/2018/9/6/bd7b8efa2cab4a6a972a13ab8ceda5fb.mp3" id="voice" style="display:none" @play='voicePlay' @pause='voicePause'></audio>
    <div class="voice" v-show='isPlay'>
      <img src="../../common/imgs/voice-recording.gif" alt="" class="img">
      <p class="tips">正在播放...</p>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  </div>
</template>

<script>
import { signUp, getUserInfo,downVoice } from 'api/index'
import Simplert from 'vue2-simplert'
export default {
  name:'end',
  components:{
    Simplert
  },
  data() {
    return {
      userName:'',
      mobile:'',
      isPlay:false
    }
  },
  mounted() {
    this.voice = document.getElementById('voice')
  },
  methods:{

    fetchDownVoice() {

      if(!this.userName){
        this._warnTips('请填写您的姓名')
        return
      }
      if(!this.mobile){
        this._warnTips('请填写您的手机号')
        return
      }
      if(!this._checkPhone(this.mobile.trim())){
        this._warnTips('手机号不正确，请重新填写')
        return
      }
      downVoice(this.userName,this.mobile).then((res) => {
        let {data,status} = res.data

        if(status === 'ok'){
          let src = data.files
          this.playVoice(src)
        }else {
          this._errorTips('暂未收到祝福语音')
        }
      })
    },
    _checkPhone(phone) {
      if(!(/^1[345678]\d{9}$/.test(phone))){
          return false;
      }else{
          return true
      }
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
    _successTips() {
      const voicePlay = () => {
        this.voice.play()
      }
      let obj = {
        title: '播放给你的语音',
        type: 'success',
        onClose: voicePlay,
        customCloseBtnText:'播放'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    voicePlay() {
      this.isPlay = true
    },
    voicePause() {
      this.isPlay = false
    },
    playVoice(voiceSrc) {
      let src = `https://a.weixin.hndt.com/boom${voiceSrc}`

      this.voice.setAttribute('src',src)
      this._successTips()
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
    top :86px;
    left:0;
    width: 338px;
    height: 509px;
    background: url('../../common/imgs/flower.png') center center no-repeat;
    background-size: cover;
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
    height: 115px;
    background: url('../../common/imgs/title2.png') center center no-repeat;
    background-size: contain;
  }
  .text-wrap{
    position: absolute;
    top:480px;
    left:90px;
    width: 480px;
    color:#fff;
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
    font-size: 28px;
    color:#888;
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
