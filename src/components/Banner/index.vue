<template>
  <div class="banner-wrap">
    <img
      v-if="imgUrl"
      :src="imgUrl"
      alt=""
      class="banner"
    >
  </div>
</template>
<script>
export default {
  name: "BannerWrap",
  data() {
    return {
      imgUrl: require("./banner.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.banner-wrap {
  width: 750px;
  font-size: 0;
  .banner {
    width: 100%;
  }
}
</style>

