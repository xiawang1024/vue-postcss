<template>
  <div class="audio-wrap music" :class="noMusic ? 'no-music' : ''" @click="pauseAudio">
    <audio id="audio" autoplay loop width="0" height="0" src="http://www.hndt.com/h5/show/show.mp3"></audio>
  </div>
</template>

<script>
import audioAutoPlay from 'common/js/autoPlay'
export default {
    name:'Audio',
    data() {
        return {
            noMusic:false
        }
    },
	mounted () {
        audioAutoPlay('audio')
        this.audio = document.getElementById('audio')
    },
    methods:{
        pauseAudio() {
            if(!this.noMusic) {
                this.noMusic = true
                this.audio.pause()
            }else{
                this.noMusic = false
                this.audio.play()
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@keyframes music {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.music {
  animation: music 2.5s linear infinite;
}

.audio-wrap {
  // display: none;
  position: absolute;
  z-index: 2041;
  right: 30px;
  top: 30px;
  width: 60px;
  height: 60px;
  background: url('./music.png') center center no-repeat;
  background-size: cover;

  &.no-music {
    animation-play-state: paused;
    animation: none;
  }
}
</style>
