<template>
    <div class="comment">
        <scroll class="list-wrap" ref="scroll" :data="commentList" :pullDownRefresh="pullDownRefresh" :pullUpLoad="pullUpLoad" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
            <div class="list" v-for="item of commentList" :key="item.id">
                <!-- {{item.comment.icon}} -->
                <img :src="item.comment.icon || defaultAvatar" alt="" class="avatar">
                <div class="text-wrap">
                    <span class="time">{{item.comment.create_time | timeStamp2LocalTime}}</span>
                    <h5 class="name">{{item.comment.creater}}</h5>
                    <div class="content">
                        <p v-if="item.comment.file_type == 'TEXT'" v-html="item.comment.content"></p>
                        <img class="img" width="300" v-if="item.comment.file_type == 'PIC'" :src="item.comment.content" />
                    </div>
                        <div class="anchor-reply" v-show="item.commentChildList && item.commentChildList.length > 0">
                            <span class="anchor">主播回复:</span>
                            <div class="child-list-wrap">
                                <div class="child-list" v-for="childItem of item.commentChildList" :key="childItem.create_time">
                                    {{childItem.content}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </scroll>
        <!-- <send-msg @sendMsg="onSendMsg"></send-msg> -->
    </div>
</template>


<script>
import Scroll from 'base/scroll/index'
import SendMsg from 'base/sendMsg/index'

import { postMsg } from '@api/index'

export default {
    name:'comment',
    components:{
       Scroll,
    //    SendMsg
    },
    data() {
        return {
            defaultAvatar:'http://www.hndt.com/res/logo_300.png',
            commentList:[],
            online:'',
            pullDownRefresh:{
				txt:'更新成功',
                stop:40,
                threshold:60
            },
            pullUpLoad:{
                txt:{
                    more:'玩命加载中',
                    noMore:'没有更多数据'
                },
                threshold:0
            },
            page:1,
            pages:0,
            openid:''
        }
    },
    created() {
        this._fetchData(1)
        this._fetchOnline(-1)
        postMsg(-2)
    },
    mounted() {
        // this.openid = this._getQueryString('openId')
        setInterval(() => {            
            this._fetchOnline()
            
        },15000)

        setInterval(() => {
            this._fetchData(1)
        },60000)
    },
    methods:{
        _fetchOnline() {
            postMsg(-1).then((res) => {
                // console.log(res)
                let data = res.data
                if(data.success) {
                    // this.commentList = data.result.list
                    this.pages = data.result.pages
                    this.online = data.message
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        _fetchData(page) {
            postMsg(page).then((res) => {
                // console.log(res)
                let data = res.data
                if(data.success) {
                    this.commentList = data.result.list
                    this.pages = data.result.pages                    
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        _getQueryString(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        onSendMsg() {
            // alert('fasongxinxi')
            this._fetchData(1)
        },
        onPullingDown() {
            // 模拟更新数据
            // console.log('pulling down and load data')
            // setTimeout(() => {
           
            // if (Math.random() > 0.5) {
            //     // 如果有新数据
            //     this.commentList.unshift(new Date())
            // } else {
            //     // 如果没有新数据
            //     this.$refs.scroll.forceUpdate()
            // }
            // }, 2000)
            this._fetchData(1)
        },
        onPullingUp() {
            // 更新数据
            console.log('pulling up and load data')

            this.page++;
            if(this.page <= this.pages) {
                postMsg(this.page).then((res) => {
                    // console.log(res)
                    let data = res.data
                    if(data.success) {
                        this.commentList = this.commentList.concat(data.result.list) 
                        this.pages = data.result.pages
                    }else{
                        this.$refs.scroll.forceUpdate()
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                 this.$refs.scroll.forceUpdate()
            }           
        }
    }
}
</script>


<style lang="scss" scoped>
.comment {
    position: absolute;
    top: 422px;
    left: 0;
    right: 0;
    bottom: 0px;
    .list-wrap {
        position: absolute;
        top: 40px;
        bottom: 120px;

        .list {
            display: flex;
            width: 100%;
            padding: 40px;
            box-sizing: border-box;
            border-bottom: 1px dashed #eee;

            .avatar {
                display: block;
                width: 40px;
                height: 40px;
                flex: 0 0 40;
                border-radius: 50%;
            }

            .text-wrap {
                position: relative;
                flex: 1;
                margin-left: 15px;
                padding-right: 10px;
                box-sizing: border-box;

                .time {
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 12px;
                    color: #999999;
                }

                .name {
                    font-size: 15px;
                    font-weight: 500;
                    color: #666666;
                }

                .content {
                    margin-top: 10px;
                    line-height: 1.6125;
                    font-size: 16px;
                    color: #000000;
                    word-wrap: break-word;
                    word-break: break-all;

                    .img {
                        display: inline-block;
                        height: 300px;
                        max-width: 400px;
                        border-radius: 20px;
                    }
                }

                .anchor-reply {
                    width: 100%;
                    margin-top: 10px;
                    padding-top: 8px;
                    border-top: 1px dashed #eee;

                    .anchor {
                        font-size: 15px;
                        color: #333;
                    }

                    .child-list-wrap {
                        width: 100%;
                        margin-top: 8px;

                        .child-list {
                            text-indent: 2em;
                            line-height: 1.8;
                        }
                    }
                }
            }
        }
    }
}
</style>
