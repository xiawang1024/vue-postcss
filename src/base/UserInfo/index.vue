<template>
  <div class="userInfo">
    <h3 class="title">您已报名</h3>
    <div class="wrap">
      <p class="name">姓名：{{userInfo.name}}</p>
      <p class="mobile">手机：{{userInfo.mobile}}</p>
      <p class="company">单位：{{userInfo.company}}</p>
      <p class="position">职务：{{userInfo.position}}</p>
    </div>
    <p class="tips">请您准时参加</p>
  </div>
</template>

<script>
export default {
  name:'Info',
  props:{
    userInfo:{
      type:Object,
      default:() => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo{
  width: 500px;
  margin: 60px auto 0;
  padding:40px 30px;
  border-radius: 10px;
  font-size: 32px;
  background:rgba(255,255,255,0.7);
  box-sizing: border-box;
  .title{
    font-size: 36px;
    color:#000;
  }
  .wrap{
    margin-top: 40px;
    font-size: 30px;
    p{
      margin-bottom: 20px;
      padding-bottom: 16px;
      line-height: 1.4125;
      border-bottom:1px solid #eee;
    }
  }
  .tips{
    margin-top: 40px;
    font-size: 30px;
    color:firebrick
  }
}
</style>
