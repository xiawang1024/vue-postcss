<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <one></one>
      </swiper-slide>
      <swiper-slide>
        <sign-up></sign-up>
      </swiper-slide>
      <swiper-slide>
        <end></end>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
const { swiperAnimateCache, swiperAnimate } = require('common/js/animate.js')

import One from '../One/index'
import SignUp from '../SignUp/index'
import End from '../End/index'

export default {
  components: {
    One,
    SignUp,
    End
  },
  data() {
    return {
      swiperOption: {
				direction : 'vertical',
				loop : true,
				// pagination: {
				// 	el: '.swiper-pagination'
				// },
				on:{
					init(){
						swiperAnimateCache(this); //隐藏动画元素
						swiperAnimate(this); //初始化完成开始动画
					},
					slideChangeTransitionEnd(){
						swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
					}
				}
			}
    }
  }
}
</script>

<style lang="scss">
.home, .swiper-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
