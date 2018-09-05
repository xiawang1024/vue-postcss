<template>
  <div class="one">
    <div class="logo"></div>
    <div class="moon-wrap">
      <div class="light"></div>
      <div class="moon"></div>
    </div>
    <div class="flower"></div>
    <div class="bird"></div>
    <div class="leaf"></div>
    <div class="cloud"></div>
    <div class="title"></div>
    <div class="text-wrap">
      <div class="name"></div>
      <div class="namec"></div>
      <div class="text1"></div>
      <div class="text2"></div>
      <div class="text3"></div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>


export default {
  name:'one',
  data() {
    return {

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.one{
  width: 100%;
  height: 100%;
  text-align: center;
  background:url('../../common/imgs/bg.png'),url('../../common/imgs/bg1.png') ;
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
    top:338px;
    left: 0;
    width: 100%;
    height: 398px;
    background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .text-wrap{
    position: absolute;
    top:800px;
    left:0;
    width: 100%;
    .name{
      width: 100%;
      height: 50px;
      background: url('../../common/imgs/name.png') center center no-repeat;
      background-size: contain;
    }
    .namec{
      margin-top: 40px;
      width: 100%;
      height: 22px;
      background: url('../../common/imgs/namec.png') center center no-repeat;
      background-size: contain;
    }
    .text1{
      margin-top: 36px;
      width: 100%;
      height: 20px;
      background: url('../../common/imgs/text1.png') center center no-repeat;
      background-size: contain;
    }
    .text2{
      margin-top: 17px;
      width: 100%;
      height: 20px;
      background: url('../../common/imgs/text2.png') center center no-repeat;
      background-size: contain;
    }
    .text3{
      margin-top: 17px;
      width: 100%;
      height: 20px;
      background: url('../../common/imgs/text3.png') center center no-repeat;
      background-size: contain;
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
