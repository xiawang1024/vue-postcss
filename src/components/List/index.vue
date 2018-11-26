<template>
  <div class="signUp">
    <div class="top">
      <div class="logo ani" swiper-animate-effect="flip" swiper-animate-duration="1s" swiper-animate-delay="0s"></div>
    </div>
    <div class="title ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div class="titlec ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">

    </div>
    <div class="list-title ani"></div>
    <ul class="list-wrap">
      <li class="list" v-for="item of dataList" :key='item.id'>
        <div class="avatar-wrap">
          <img :src="item.src" alt="" class="avatar">
        </div>
        <div class="text-wrap">
          <h3 class="company">{{item.company}}</h3>
          <p class="desc">{{item.name}} 《{{item.title}}》</p>
        </div>
        <div class="zan-wrap">
          <span v-if="!item.isOkZan" class="icon-zan" @click="addCount(item.id)"></span>
          <span v-else class="icon-zan active"></span>

          <p class="num-zan">{{item.count || 0}}</p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import VueStar from 'vue-star'
import ListData from './data.js'
import { AddCount, GetListCount, isOkZan } from 'api/index'
export default {
  name: 'list',
  components: {
    VueStar
  },
  data() {
    return {
      dataList: ListData,
      zanList: []
    }
  },
  mounted() {
    this.getCountToList()
    this._getZanList()
  },
  methods: {
    getCountToList() {
      GetListCount()
        .then(res => {
          let { data } = res.data
          this.addCountToList(data)
        })
        .catch(err => console.log(err))
    },
    addCountToList(data) {
      let dataKeys = Object.keys(data)
      let len = this.dataList.length
      for (let key of dataKeys) {
        for (let i = 0; i < len; i++) {
          if (this.dataList[i].id == key) {
            this.$set(this.dataList[i], 'count', data[key])
            break
          }
        }
      }
    },
    addZanOkToList(data) {
      let len = this.dataList.length
      for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < len; i++) {
          if (this.dataList[i].id == data[j].id) {
            this.$set(this.dataList[i], 'isOkZan', data[j].isOkZan)
            break
          }
        }
      }
    },
    _addOne(id) {
      let add = this.dataList.filter(item => {
        return item.id == id
      })

      if (add[0].count) {
        add[0].count++
      } else {
        add[0].count = 1
      }
    },
    addCount(id) {
      AddCount(id).then(() => {
        this._setZanList(id)
        this._addOne(id)
      })
    },
    _getZanList() {
      isOkZan().then(list => {
        if (list) {
          this.zanList = list
          this.addZanOkToList(list)
        } else {
        }
      })
    },
    _setZanList(id) {
      let list = this.zanList
      let isHas = list.filter(item => {
        return item.id == id
      })
      if (isHas.length == 0) {
        list.push({
          id,
          isOkZan: true
        })
      }
      this.zanList = list
      this.addZanOkToList(list)
      localStorage.setItem('ZanList', JSON.stringify(list))
    }
  }
}
</script>

<style lang="scss" scoped>
.signUp {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url('../../common/imgs/bg.png') center center no-repeat;
  background-size: cover;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  .top {
    position: relative;
    width: 100%;
    height: 80px;
    text-align: center;
    .logo {
      position: absolute;
      top: 40px;
      left: 35px;
      width: 100px;
      height: 80px;
      background: url('../../common/imgs/logo.png') center center no-repeat;
      background-size: cover;
    }
  }
  .title {
    width: 100%;
    height: 260px;
    background: url('../../common/imgs/title.png') center center no-repeat;
    background-size: contain;
  }
  .titlec {
    width: 100%;
    height: 36px;
    background: url('../../common/imgs/titlec.png') center center no-repeat;
    background-size: contain;
  }
  .list-title {
    margin-top: 40px;
    width: 100%;
    height: 80px;
    background: url('../../common/imgs/listTitle.png') center center no-repeat;
    background-size: contain;
  }
  .list-wrap {
    margin-top: 30px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .list {
      display: flex;
      align-items: center;
      margin-bottom: 60px;
      font-size: 30px;

      .avatar-wrap {
        width: 150px;
        height: 225px;
        .avatar {
          width: 100%;
          height: 100%;
        }
      }
      .text-wrap {
        flex: 1;
        align-self: stretch;
        margin-left: 20px;
        text-align: left;
        color: #eee;
        line-height: 1.5;
        border-bottom: 1px solid #ccc;
        .company {
          margin-top: 10px;
          margin-bottom: 16px;
        }
      }
      .zan-wrap {
        align-self: stretch;
        position: relative;
        width: 100px;
        text-align: center;
        color: #eee;
        .icon-zan {
          margin-top: 60px;
          display: inline-block;
          width: 40px;
          height: 40px;
          background: url('../../common/imgs/icon-zan.png') center center
            no-repeat;
          background-size: contain;
          &.active {
            background: url('../../common/imgs/icon-zan-active.png') center
              center no-repeat;
            background-size: contain;
          }
        }
        .num-zan {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
