<template>
  <div class="footer">
    <div class="footer-wrap">
      <img
        src="./qrcode.png"
        alt=""
        class="qrcode"
      >
      <div class="v-line"></div>
      <p class="text">
        更多活动详情可关注打鱼晒网官方微信公众号
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer"
};
</script>
<style lang="scss" scoped>
.footer {
  width: 750px;
  margin: auto;
  padding: 30px;
  box-sizing: border-box;
  .footer-wrap {
    width: 600px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 12px;
    padding: 20px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    .qrcode {
      position: relative;
      width: 160px;
      height: 160px;
      flex: 0 0 160px;
    }
    .text {
      width: 340px;
      flex: 0 0 340px;
      line-height: 1.6;
      text-align: left;
      font-size: 30px;
    }
  }
}
</style>

