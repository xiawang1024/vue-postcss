<template>
  <div class="signUp">
    <div class="top">
      <div class="logo"></div>
      <div class="text">2018年广播融媒体技术专业委员会年会</div>
      <div class="img"></div>
    </div>
    <div class="title">

    </div>
    <div class="form">
      <p class="item">
        <label for="">姓名：</label>
        <input type="text" v-model="name">
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
    <button class="btn" @click="postData">提交</button>
  </div>
</template>

<script>
import { WeChat } from 'weChat/util'
const weChat = new WeChat()
import weui from 'weui.js'
import { signUp } from 'api/index'
export default {
  name:'signUp',
  data() {
    return {
      name:'',
      mobile:'',
      company:'',
      position:''
    }
  },
  methods:{
    postData() {
      if(!this.name){
        weui.topTips('请填写您的姓名！')
        return
      }
      if(!this.mobile){
        weui.topTips('请填写您的手机号！')
        return
      }
      if(!this._checkPhone(this.mobile)){
        weui.topTips('手机号不正确，请重新填写！')
        return
      }
      if(!this.company){
        weui.topTips('请填写您的单位！')
        return
      }
      if(!this.position){
        weui.topTips('请填写您的职务！')
        return
      }
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'))

      signUp(userInfo.openId,this,name,this.mobile,this.company,this.position).then(res => {

      }).catch(err => {
        console.log(err)
        weui.alert('error')
      })
    },
    _checkPhone(phone) {
      if(!(/^1[345678]\d{9}$/.test(phone))){
          return false;
      }else{
          return true
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.signUp{
  width: 100%;
  height: 100%;
  text-align: center;
  background:url('../../common/imgs/star.png') center center no-repeat #020c32;
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
