<template>
  <div class="g-qrcode">
    <div class="qrcode-wrap">
      <div class="qrcode-box">
        <img src="./icon-qrcode-1.jpg" alt="" class="qrcode">
        <p class="desc">国际频道（长按关注）</p>
      </div>
      <!-- <div class="qrcode-box second">
        <img src="./img/icon-qrcode-2.jpg" alt="" class="qrcode ">
        <p class="desc">Up radio1066</p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.g-qrcode {
  width: 100%;
  margin-top: 50px;
  .qrcode-wrap {
    width: 100%;
    display: flex;
    font-size: 0;
    justify-content: space-around;
    .qrcode-box {
      width: 220px;
      text-align: center;
      .qrcode {
        width: 200px;
        height: 200px
      }
      .desc {
        font-size: 20px;
      }
    }
  }
}
</style>

