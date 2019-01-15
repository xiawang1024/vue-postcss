<template>
  <div class="footer">
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  .qrcode {
    position: relative;
    width: 200px;
    height: 200px;
    flex: 0 0 200px;

    &::after {
      content: "span";
      display: inline-block;
      width: 4px;
      height: 200px;
      position: absolute;
      right: -20px;
      background: orange;
    }
  }

  .text {
    width: 400px;
    flex: 0 0 400px;
    line-height: 1.6;
    text-align: left;
    font-size: 30px;
  }
}
</style>

