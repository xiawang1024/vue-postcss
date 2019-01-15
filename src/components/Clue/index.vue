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
          2018年1月15日--1月20日
        </span>
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
    width: 550px;
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


