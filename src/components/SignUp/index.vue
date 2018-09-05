<template>
  <div class="signUp">
    <div class="one">
      <div class="logo ani" swiper-animate-effect="rotateIn" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      <!-- <img class="qrcode" src="../../common/imgs/qrcode.png" /> -->
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
        <p class="name">送祝福的人</p>
        <div class="item">
          <span class="label">姓名</span>
          <input type="text" class="ipt">
        </div>
        <div class="item">
          <span class="label">电话</span>
          <input type="text" class="ipt">
        </div>
        <p class="name">收祝福的人</p>
        <div class="item">
          <span class="label">姓名</span>
          <input type="text" class="ipt">
        </div>
        <div class="item">
          <span class="label">电话</span>
          <input type="text" class="ipt">
        </div>
        <div class="item">
          <span class="label"></span>
          <div class="ipt btn">
            <p class="tips">录下想说的话</p>
            <button class="submit">录音</button>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  </div>
</template>

<script>
import { WeChat } from 'weChat/util'
const weChat = new WeChat()
import { signUp, getUserInfo } from 'api/index'
/**
 * Bus
 */
import BUS from 'common/js/bus.js';

import Simplert from 'vue2-simplert'
import UserInfo from 'base/UserInfo/index'
export default {
  name:'signUp',
  components:{
    Simplert,
    UserInfo
  },
  data() {
    return {
      userName:'',
      mobile:'',
      company:'',
      position:'',
      isSingUp:true,
      userInfo:null
    }
  },
  mounted() {
    // this._successTips()
    BUS.$on('getUserInfo',() => {
      setTimeout(() => {
        this._getUserInfo()
      },300)
    })
    this.startId = 0;
    this.endId = 0;
  },
  methods:{
    postData() {
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
      if(!this.company){
        this._warnTips('请填写您的单位')
        return
      }
      if(!this.position){
        this._warnTips('请填写您的职务')
        return
      }
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'))

      signUp(userInfo.openid,this.userName,this.mobile,this.company,this.position).then(res => {
        let { status } = res.data
        if(status === 'ok') {
          this._successTips()
        }else {
          this._errorTips('报名失败，请重试！')
        }
      }).catch(err => {
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
      let obj = {name:this.userName,mobile:this.mobile,company:this.company,position:this.position}

      this.$nextTick(() => {
        this.userInfo = obj
      })
      setTimeout(() => {
        this.userName = ''
        this.mobile = ''
        this.company = ''
        this.position = ''
      },500)
    },
    _checkPhone(phone) {
      if(!(/^1[345678]\d{9}$/.test(phone))){
          return false;
      }else{
          return true
      }
    },
    touchStart() {
      this.startId = Date.parse(new Date())
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
    },
    touchEnd() {
      this.endId = Date.parse(new Date())
      if(this.endId - this.startId < 2000) {
        this.startId = this.endId = 0
        alert('时间过短，请重新录制！')
        clearTimeout(this.recordTimer)
        return
      }else {
        wx.stopRecord({
          success: (res) => {
            let { voiceLocalId } = res.localId;
            wx.playVoice({
              localId: voiceLocalId // 需要播放的音频的本地ID，由stopRecord接口获得
            });

            weui.confirm('回听已录制的歌曲', {
              buttons: [
                {
                  label: '重新录制',
                  type: 'default',
                  onClick: () => {
                    console.log('no');
                  }
                },
                {
                  label: '确定上传',
                  type: 'primary',
                  onClick: () => {
                    this._uploadVoice(voiceLocalId);
                  }
                }
              ]
            });
          },
          fail: (res) => {
            console.log(JSON.stringify(res));
          }
        });
      }
    },
    _uploadVoice(voiceLocalId) {
      wx.uploadVoice({
        localId: voiceLocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: (res) => {
          var userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'));

          var openId = userInfo.openid;
          var username = userInfo.nickname || '';
          var icon = userInfo.headimgurl || '';
          var songName = $('#selectSong').html();
          var origin = weChat.getQueryString('cid') || '';
          //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
          $.ajax({
            url: 'https://a.weixin.hndt.com/boom/api/wx/radio/download',
            type: 'get',
            data: {
              mediaId: res.serverId,
              openId: openId,
              name: songName,
              username: username,
              icon: icon,
              origin: origin
            },
            dataType: 'json',
            success: (data) => {
              weui.toast('上传成功！');
            },
            error: (xhr, errorType, error) => {
              console.log(error);
            }
          });
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
    bottom:60px;
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
    top:180px;
    left: 0;
    width: 100%;
    height: 126px;
    background: url('../../common/imgs/title1.png') center center no-repeat;
    background-size: contain;
  }
  .text-wrap{
    position: absolute;
    top:360px;
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
      height: 65px;
      margin-bottom: 40px;
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
          }
        }
      }
    }
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
</style>
