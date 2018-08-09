<template>
  <div class="g-list">
    <div class="g-bd">
      <h2 class="title">候选名单</h2>
      <ul class="list-wrap clearfix">
        <li class="list" v-for="item of dataList" :key="item.id">
          <span class="order">{{item.id}}、</span>
          <span class="name">{{item.name}}</span>
          <span class="num">{{voteNumList[item.id] || 0}} 票</span>
          <button class="vote" @click="voteHandler(item)">投票</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DATA from './internation.js'
import weui from 'weui.js'

import { WeChat } from 'weChat/util';
const weChat = new WeChat();
import { voteFetch, voteNumFetch } from 'api/index'
export default {
  name:'g-list',
  data() {
    return {
      dataList:DATA,
      voteNumList:null
    }
  },
  created() {
    this.voteNumDataFetch()
  },
  methods:{
    voteHandler(item) {
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'));
      voteFetch(item.id,userInfo.openid,weChat.getQueryString('code'),item.name).then(res => {
        let data = res.data
        let { status } = data;
        if(status === 'ok') {
          weui.toast('投票成功！');
          this.voteNumDataFetch()
        }else if(status === 'warn'){
          weui.alert('投票未开始！')
        }else if(status === 'error') {
          weui.alert('您的投票已用完，谢谢！')
        }else {
          weui.alert('请先关注《国际频道》公众号，再进行投票！谢谢！', {
						buttons: [
							{
								label: '去关注',
								type: 'primary',
								onClick: () => {
									console.log('ok');
									setTimeout(() => {
										let height = document.scrollingElement.scrollHeight;
										document.scrollingElement.scrollTop = height;
									}, 150);
								}
							}
						]
					});
        }
      }).catch(() => {
        weui.alert('投票失败，网络错误！')
      })
    },
    voteNumDataFetch() {
      voteNumFetch().then(res => {
        let data = res.data
        this.$nextTick(() => {
          this.voteNumList = data
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/wap/mixin.scss';
.g-bd {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  .title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 32px;
    color: #2481c5;
    border-bottom: 1px solid #2481c5;
  }
  .list-wrap {
    margin-top: 30px;
    width: 100%;
    .list{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100px;
      @include bt-1px(#ccc);
      .order{
        display: inline-block;
        width: 60px;
        text-align: right;
        font-size: 28px;
      }
      .name{
        flex:1;
        padding-left: 10px;
        font-size: 30px;
      }
      .num{
        display: inline-block;
        flex: 0 0 100px;
        width: 100px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 8px;
        font-size: 24px;
        color:white;
        background:#0081dc;
      }
      .vote{
        margin-left: 10px;
        display: inline-block;
        flex: 0 0 100px;
        width: 100px;
        height: 60px;
        color:white;
        border:none;
        outline: none;
        border-radius: 8px;
        background:#0081dc;
        &:active{
          background:#065690;
        }

      }
    }
  }
}
</style>

