<template>
  <div class="app">
    <header>共享直播间</header>
    <main class="position-box">
      <vue-better-scroll class="wrapper" ref="scroll" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <ul ref="list" class="list-content" style="min-height: 95vh">
          <li class="list-item" v-for="item in items">{{item}}</li>
        </ul>

      </vue-better-scroll>
    </main>
    <button class="go-top" @click="scrollTo">返回顶部</button>
  </div>
</template>

<script>
import VueBetterScroll from 'vue2-better-scroll'

export default {
  name: 'app',
  components: { VueBetterScroll },
  data() {
    return {
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: []
    }
  },
  mounted() {
    this.onPullingDown()
  },
  methods: {
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      )
    },
    // 模拟数据请求
    getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          const arr = []
          for (let i = 0; i < 20; i++) {
            arr.push(this.count++)
          }
          resolve(arr)
        }, 1000)
      })
    },
    onPullingDown() {
      // 模拟下拉刷新
      console.log('下拉刷新')
      this.count = 0
      this.getData().then(res => {
        this.items = res
        this.$refs.scroll.forceUpdate(true)
      })
    },
    onPullingUp() {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      this.getData().then(res => {
        this.items = this.items.concat(res)
        if (this.count < 50) {
          this.$refs.scroll.forceUpdate(true)
        } else {
          this.$refs.scroll.forceUpdate(false)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  height: 80px;
  line-height: 80px;
  color: #fff;
  background-color: #009a61;
}
.position-box {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
}
.wrapper {
  height: 100%;
  overflow: hidden;
}
.list-content {
  list-style: none;
  background: #fff;
}
.list-item {
  width: 100%;
  height: 120px;
  line-height: 120px;
  font-size: 18px;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
}
.go-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #009a61;
  border-radius: 5px;
  border: 1px solid #fff;
  color: #fff;
  padding: 10px 15px;
}
</style>