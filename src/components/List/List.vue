<template>
  <div class="g-list">
    <div class="g-bd">
      <h2 class="title">候选名单</h2>
      <ul class="list-wrap clearfix">
        <li class="list" v-for="item of dataList" :key="item.id">
          <span class="order">{{item.id}}、</span>
          <span class="name">{{item.name}}</span>
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
import { voteFetch } from 'api/index'
export default {
  name:'g-list',
  data() {
    return {
      dataList:DATA
    }
  },
  methods:{
    voteHandler(item) {
      let userInfo = JSON.parse(weChat.getStorage('WXHNDTOPENID'));
      voteFetch(item.id,userInfo.openid,weChat.getQueryString('code'),item.name).then(res => {
        let data = res.data
        let { status } = data;
        if(status === 'ok') {
          weui.toast('投票成功！');
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
        text-align: right
      }
      .vote{
        display: inline-block;
        width: 150px;
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

