<template>
  <div class="signUp">
    <div class="top">
      <div class="logo ani" swiper-animate-effect="flip" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
      <div class="text ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0s">2018年广播融媒体技术专业委员会年会</div>
      <div class="img ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
    </div>
    <div class="title ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div v-if="!userInfo">
      <div class="form ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.85s">
        <p class="item">
          <label for="">姓名：</label>
          <input type="text" v-model="userName">
        </p>
        <p class="item">
          <label for="">手机：</label>
          <input type="text" v-model="mobile">
        </p>
        <p class="item">
          <label for="">单位：</label>
          <input type="text" v-model="company">
        </p>
        <p class="item">
          <label for="">职务：</label>
          <input type="text" v-model="position">
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
.signUp{
  width: 100%;
  height: 100%;
  text-align: center;
  background:url('../../common/imgs/star.png') center center no-repeat ;
  background-size: contain;
  .top{
    position: relative;
    width: 100%;
    height: 165px;
    text-align: center;
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
    margin-top: 40px;
    width: 100%;
    height: 220px;
    background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .form{
    width: 515px;
    margin:60px auto 0;
    .item{
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 8px;
      font-size: 32px;
      border-bottom:1px solid #fff;
      label{
        flex:0 0 100px;
        width: 100px;
        color:#bbb;
      }
      input{
        background: none;
        border:none;
        outline: none;
        color:#fff;
      }
    }
  }
  .btn{
    margin-top: 50px;
    width: 250px;
    height: 70px;
    border:none;
    border-radius: 70px;
    outline: none;
    font-size: 32px;
    color:#0081dc;
    background:#fff;
    user-select: none;
    &:active{
      background:rgba(255,255,255,0.5);
    }
  }
}
</style>
