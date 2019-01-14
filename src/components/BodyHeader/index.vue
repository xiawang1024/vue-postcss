<template>
  <div class="bd-header">
    <img
      class="img"
      :src="currentImg"
      alt=""
    >
  </div>
</template>
<script>
const IMG_LIST = [
  {
    type: "1",
    url: require("./head/1.png")
  },
  {
    type: "2",
    url: require("./head/2.png")
  }
];
export default {
  name: "BdHeader",
  props: {
    type: {
      type: String,
      default: "1"
    }
  },

  computed: {
    currentImg: function() {
      let filterImg = IMG_LIST.filter(item => item.type === this.type);
      return filterImg[0].url;
    }
  }
};
</script>
<style lang="scss" scoped>
.bd-header {
  width: 750px;
  margin: 20px auto;
  text-align: center;
  box-sizing: border-box;
  .img {
    width: 550px;
    height: auto;
  }
}
</style>


