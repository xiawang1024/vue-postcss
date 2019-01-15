<template>
  <div class="g-bd">
    <Banner />
    <BodyHeader />
    <BodyText />
    <BodyHeader type="2" />
    <Clue />
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
import Clue from "components/Clue";
import Footer from "components/Footer";
import Drag from "components/Drag";
export default {
  name: "IndexWrap",
  components: { Banner, BodyHeader, BodyText, WaterFall, Clue, Footer, Drag }
};
</script>
<style lang="scss" scoped>
.g-bd {
  width: 750px;
  margin: auto;
  background: url("./bg.jpg") center top 886px repeat-y;
  background-size: contain;
  overflow: hidden;
}
</style>

