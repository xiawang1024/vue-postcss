<template>
  <div>
    <div class="water-fall">
      <div class="column">
        <div
          class="item"
          v-for="item of oddList"
          :key="item.id"
        >
          <img
            class="img"
            v-lazy="item.icon"
            alt=""
          />
          <h3 class="name">{{item.title}}</h3>
          <p class="vote-num">票数：{{voteList[item.id] || 0}}</p>
          <button
            class="vote"
            @click="handlerClick(item.id)"
          >投票</button>
        </div>
      </div>
      <div class="column">
        <div
          class="item"
          v-for="item of evenList"
          :key="item.id"
        >
          <img
            class="img"
            v-lazy="item.icon"
            alt=""
          />
          <h3 class="name">{{item.title}}</h3>
          <p class="vote-num">票数：{{voteList[item.id] || 0}}</p>
          <button
            class="vote"
            @click="handlerClick(item.id)"
          >投票</button>
        </div>
      </div>
    </div>
    <simplert
      :useRadius="true"
      :useIcon="false"
      ref="simplert"
    />
  </div>
</template>
<script>
import store from "store";
import Simplert from "vue2-simplert";
import DATA_LIST from "./data.js";
import STORE_NAME from "conf/store_conf";
import { postVote, getVoteNum } from "@api/index.js";
export default {
  name: "WaterFall",
  components: {
    Simplert
  },
  data() {
    return {
      itemList: DATA_LIST,
      voteList: { 2291113: 1, "2291114": 2 }
    };
  },
  computed: {
    oddList: function() {
      let list = this.itemList.filter((item, index) => {
        return !!!(index % 2);
      });
      list.push(this.itemList[this.itemList.length - 1]);
      return list;
    },
    evenList: function() {
      let list = this.itemList.filter((item, index) => {
        return !!(index % 2);
      });
      list.pop();
      return list;
    }
  },
  mounted() {
    this.listPushVote();
    store.set(STORE_NAME, {
      createTime: null,
      updateTime: null,
      creater: null,
      updater: null,
      createrId: 0,
      updaterId: 0,
      id: 55022,
      uid: null,
      openid: "oaYgpwAWb44JGI4rdW8NCEgEMnJ8",
      appid: "wx5f789dea59c6c2c5",
      nickname: "冰糖先生",
      sex: 1,
      subscribe: 1,
      city: "郑州",
      country: "中国",
      province: "河南",
      headimgurl:
        "http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLBoiccOrhP8bWINo3LVmuyk1ntubZea7EvcyuI2ZhmFbFBbKfuTa7PLmAiaa0wBjW2BQv90iciaFo1Sog/132",
      unionid: "o-sTd1fwmgwOZrohX2G9rLtpD8CM",
      remark: "",
      isNewInfo: false
    });
  },
  methods: {
    handlerClick(id) {
      this.fetchVote(id);
    },
    fetchVote(id) {
      let userInfo = store.get(STORE_NAME);
      let { appid, openid } = userInfo;
      postVote(id, openid).then(res => {
        let { success, message } = res.data;
        if (success) {
          this.listPushVote();
        }
        this.tips(message);
      });
    },
    listPushVote() {
      getVoteNum().then(res => {
        let { result } = res.data;
        this.voteList = result;
      });
    },
    tips(message) {
      let obj = {
        message,
        customCloseBtnText: "确定"
      };
      this.$refs.simplert.openSimplert(obj);
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
      margin-bottom: 30px;
      border-radius: 8px;
      overflow: hidden;
      font-size: 0;
      background: #fff;
      box-shadow: 2px 2px 20px 2px #999;
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
        border-radius: 4px;
        padding: 4px 20px;
        color: #fff;
        background: orange;
      }
    }
  }
}
</style>


