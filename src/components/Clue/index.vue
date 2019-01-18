<template>
  <div class="clue">
    <div class="text-wrap">
      <p class="text">
        <span class="label">
          投票规则：
        </span>
        <span class="value">
          每人每天10次投票机会
        </span>
      </p>
      <p class="text">
        <span class="label">
          投票时间：
        </span>
        <span class="value">
          2019年1月18日--2月19日
        </span>
      </p>
      <p
        class="text"
        style="text-align:left;"
      >
        获得投票最多的前三名球队，将受邀参观河南广播电视台并和嘉宁、韩佳一起参与都市频道打鱼晒网节目的录制。这三支球队都将获得球队专属梦联赛精彩集锦＋短视频一份，给孩子们留下一份最美好的篮球回忆！
      </p>
    </div>

  </div>
</template>
<script>
export default {
  name: "Clue"
};
</script>
<style lang="scss" scoped>
.clue {
  width: 750px;
  padding: 10px 30px;
  background: transparent;
  box-sizing: border-box;
  .text-wrap {
    width: 650px;
    margin: auto;
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    .text {
      display: flex;
      justify-content: flex-start;
      line-height: 1.6;
      font-size: 28px;
      .label {
        text-align: left;
        width: 150px;
        flex: 0 0 150px;
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>


