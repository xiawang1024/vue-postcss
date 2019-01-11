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
      imgUrl: require("./banner.jpg")
    };
  }
};
</script>
<style lang="scss" scoped>
.banner-wrap {
  width: 750px;
  .banner {
    width: 100%;
  }
}
</style>

