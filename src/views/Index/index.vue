<template>
  <div class="g-bd">
    <Banner></Banner>
    <WaterFall></WaterFall>
  </div>
</template>
<script>
import Banner from "components/Banner";
import WaterFall from "components/WaterFall";
export default {
  name: "IndexWrap",
  components: { Banner, WaterFall },
  data() {
    return {};
  }
};
</script>
