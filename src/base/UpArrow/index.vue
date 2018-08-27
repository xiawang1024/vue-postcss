<template>
  <div class="up-arrow"></div>
</template>


<script>
export default {
    name:'up-arrow'
}
</script>

<style lang="scss" scoped>
@keyframes upArrow {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, -80px, 0);
    opacity: 1;
  }
}

.up-arrow {
  position: absolute;
  bottom: 10px;
  left: 340px;
  z-index: 1024;
  width: 70px;
  height: 70px;
  opacity: 0;
  animation: upArrow 1.2s ease-in infinite;
  animation-delay: 1.5s;
  background: url('./arrow.png') center center no-repeat;
  background-size: contain;
}
</style>
