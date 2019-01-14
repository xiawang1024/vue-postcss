<template>
  <div class="g-bd">
    <Banner />
    <BodyHeader />
    <BodyText />
    <BodyHeader type="2" />
    <WaterFall />
  </div>
</template>
<script>
import Banner from "components/Banner";
import BodyHeader from "components/BodyHeader";
import BodyText from "components/BodyText";
import WaterFall from "components/WaterFall";
export default {
  name: "IndexWrap",
  components: { Banner, BodyHeader, BodyText, WaterFall }
};
</script>
<style lang="scss" scoped>
.g-bd {
  width: 750px;
  background: url("./bg.jpg") center top 886px repeat-y;
  background-size: 100% auto;
}
</style>

