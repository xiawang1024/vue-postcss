<template>
  <div class="g-bd">
    <Banner />
    <BodyHeader />
    <BodyText :textList="textList" />
    <BodyHeader type="2" />
    <Clue />
    <WaterFall />
    <Footer />
    <Drag clickType="0" />
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
  components: { Banner, BodyHeader, BodyText, WaterFall, Clue, Footer, Drag },
  data() {
    return {
      textList: [
        {
          id: 1,
          text:
            "为梦想而战！梦联赛·河南首届少儿篮球精英赛由河南广播电视台主办，河南广播电视台都市频道承办。"
        },
        {
          id: 2,
          text:
            "《打鱼晒网》全程录制、播出。“小篮球 大梦想”青春的汗水挥洒球场，孩子们正以肉眼可见的速度和无限的活力成长。用镜头记录下他们拼搏的瞬间，在球场上挥洒汗水积极向上，在朋友圈晒出最精彩的高光时刻，完成两代人的篮球梦想。这就是“梦联赛”河南首届少儿篮球精英赛的目标。"
        }
      ]
    };
  }
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

