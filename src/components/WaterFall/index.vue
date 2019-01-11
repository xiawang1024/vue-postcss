<template>
  <div class="water-fall">
    <div class="column">
      <div
        class="item"
        v-for="item of oddList"
        :key="item.url"
      >
        <img
          class="img"
          :src="item.url"
          alt=""
        >
      </div>
    </div>
    <div class="column">
      <div
        class="item"
        v-for="item of evenList"
        :key="item.url"
      >
        <img
          class="img"
          :src="item.url"
          alt=""
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WaterFall",
  data() {
    return {
      itemList: [
        {
          url: "http://www.hndt.com/brand/612/res/pi3F3ZID.jpg?1497345245233"
        },
        {
          url: "http://67.218.146.247:8090/3b8646ede7c3caa7aea13fde1ac2000d.jpg"
        },
        {
          url: "http://www.hndt.com/brand/612/res/pi3F3ZID.jpg?1497345245233"
        },
        {
          url: "http://67.218.146.247:8090/3b8646ede7c3caa7aea13fde1ac2000d.jpg"
        },
        {
          url: "http://www.hndt.com/carrier/20181219/5/12751992084615462509.jpg"
        }
      ]
    };
  },
  computed: {
    oddList: function() {
      return this.itemList.filter((item, index) => {
        return !!!(index % 2);
      });
    },
    evenList: function() {
      return this.itemList.filter((item, index) => {
        return !!(index % 2);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.water-fall {
  width: 750px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  .column {
    display: flex;
    flex-direction: column;
    .item {
      width: 345px;
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
      box-sizing: border-box;
      .img {
        width: 100%;
      }
    }
  }
}
</style>


