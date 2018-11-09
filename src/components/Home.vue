<template>
  <div class="home">
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
    <live-player :src='src' :poster='poster'></live-player>
    <comment></comment>
  </div>
</template>

<script>
import Simplert from 'vue2-simplert'
import LivePlayer from 'base/livePlayer/index'
import Comment from 'base/comment/index'
export default {
  name: 'home',
  components:{
    Simplert,
    LivePlayer,
    Comment
  },
  data() {
	  return {
		  src:'http://ivi.bupt.edu.cn/hls/chchd.m3u8',
		  poster:'https://a.weixin.hndt.com/h5/1066/live/livePost.jpg'
	  }
  },
  methods:{
    successTips() {
      let obj = {
        title: '报名成功',
        type: 'success',
        onClose: this._onClose,
        customCloseBtnText:'关闭'
      }
      this.$refs.simplert.openSimplert(obj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>