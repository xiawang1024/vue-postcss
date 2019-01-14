<template>
  <div class="water-fall">
    <div class="column">
      <div
        class="item"
        v-for="item of oddList"
        :key="item.id"
        @click="handlerClick(item.id)"
      >
        <img
          class="img"
          v-lazy="item.icon"
          alt=""
        />
        <h3 class="name">{{item.title}}</h3>
        <p class="vote-num">票数：20</p>
        <button class="vote">投票</button>
      </div>
    </div>
    <div class="column">
      <div
        class="item"
        v-for="item of evenList"
        :key="item.id"
        @click="handlerClick(item.id)"
      >
        <img
          class="img"
          v-lazy="item.icon"
          alt=""
        />
        <h3 class="name">{{item.title}}</h3>
        <p class="vote-num">票数：20</p>
        <button class="vote">投票</button>
      </div>
    </div>
  </div>
</template>
<script>
import DATA_LIST from "./data.js";
export default {
  name: "WaterFall",
  data() {
    return {
      itemList: DATA_LIST
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
  },
  methods: {
    handlerClick(id) {
      this.$router.push({ path: "/detail", query: { id } });
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
  background: transparent;
  box-sizing: border-box;
  .column {
    display: flex;
    flex-direction: column;
    .item {
      width: 345px;
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
      font-size: 0;
      background: #fff;
      box-sizing: border-box;
      .img {
        width: 100%;
      }
      .name,
      .vote-num,
      .vote {
        font-size: 28px;
        margin: 12px 0;
      }
      .name {
        line-height: 1.25;
        font-weight: bold;
      }
      .vote-num {
      }
      .vote {
        outline: none;
        border: none;
        color: #fff;
        padding: 4px 16px;
        background: orange;
      }
    }
  }
}
</style>


