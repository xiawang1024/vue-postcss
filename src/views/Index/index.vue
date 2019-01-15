<template>
  <div class="g-bd">
    <Banner />
    <BodyHeader />
    <BodyText />
    <BodyHeader type="2" />
    <WaterFall />
    <Footer />
    <Drag />
  </div>
</template>
<script>
import Banner from "components/Banner";
import BodyHeader from "components/BodyHeader";
import BodyText from "components/BodyText";
import WaterFall from "components/WaterFall";
import Footer from "components/Footer";
import Drag from "components/Drag";
export default {
  name: "IndexWrap",
  components: { Banner, BodyHeader, BodyText, WaterFall, Footer, Drag }
};
</script>
<style lang="scss" scoped>
.g-bd {
  width: 750px;
  margin: auto;
  background: url("./bg.jpg") center top 886px repeat-y;
  background-size: 100% auto;
}
</style>

