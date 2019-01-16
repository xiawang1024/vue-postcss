<template>
  <div class="g-prize">
    <Banner />
    <h2 class="clue-title">
      抽奖规则
    </h2>
    <BodyText
      :textList="textList"
      :imgList="imgList"
    />
    <FooterText :textList="footerText" />
    <Drag clickType="1" />
  </div>
</template>
<script>
import Banner from "components/Banner";
import BodyText from "components/BodyText";
import FooterText from "components/FooterText";
import Drag from "components/Drag";

import { textList, imgList, footerText } from "./data.js";
export default {
  name: "Prize",
  components: { Banner, BodyText, FooterText, Drag },
  data() {
    return {
      textList: textList,
      imgList: imgList,
      footerText
    };
  }
};
</script>
<style lang="scss" scoped>
.g-prize {
  width: 750px;
  margin: auto;
  background: url("./img/bg-pure.png") center top 886px repeat;
  overflow: hidden;
  .clue-title {
    padding: 30px 0;
    font-size: 42px;
  }
}
</style>

