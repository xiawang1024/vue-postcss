<template>
  <div class="live-player">
    <video id="video" class="v-hls" controls playsinline="playsinline" webkit-playsinline="true" :src="src" x5-playsinline="true" width="100%" height='100%' :poster='poster'></video>
  </div>
</template>

<script>
import Hls from 'hls.js'
export default {
  name:'livePlayer',
  props:{
    src:{
      type:String,
      default:''
    },
    poster:{
      type:String,
      default:''
    }
  }
}
</script>

<style lang="scss" scoped>
.live-player{
  width: 750px;
  height: 422px;
}
</style>

