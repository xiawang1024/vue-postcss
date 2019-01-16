<template>
  <div class="bd-text">
    <p
      class="text"
      v-for="item of textList"
      :key='item.id'
      v-html="item.text"
    />
    <div
      class="text"
      v-if="imgList.length"
    >
      <p class="img-wrap">
        <img
          v-for="item of imgList"
          :key="item.id"
          :src="item.src"
          alt=""
          class="img"
        />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "FtText",
  props: {
    textList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.bd-text {
  width: 750px;
  margin: 60px auto;
  background: transparent;
  box-sizing: border-box;
  .text {
    width: 650px;
    margin: 0 auto;
    padding: 8px 16px;
    line-height: 1.75;
    font-size: 28px;
    text-indent: 2em;
    text-align: left;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.65);
    box-sizing: border-box;
    &:last-child {
      text-indent: 0;
    }
    .img-wrap {
      padding-bottom: 30px;
      text-align: center;
      font-size: 0;
      .img {
        width: 200px;
      }
    }
  }
}
</style>


