import wx from 'weixin-js-sdk';
import { shareLink, shareTitle, shareDesc, shareImg } from 'conf/weChatShare_conf';
/**
 * 微信sdk初始化
 * @param {*} data 微信配置信息
 */
const WeChat_init = (data) => {
	wx.config({
		debug: false,
		appId: data.appId,
		timestamp: data.timestamp,
		nonceStr: data.nonceStr,
		signature: data.signature,
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'chooseImage',
			'uploadImage',
			'previewImage',
			'startRecord',
			'playVoice',
			'stopRecord',
			'downloadVoice',
			'uploadVoice',
			'stopVoice',
			'openLocation'
		]
	});
	wx.ready(() => {
		wx.onMenuShareTimeline({
			title: shareTitle,
			link: shareLink,
			imgUrl: shareImg,
			success: function() {},
			cancel: function() {}
		});
		wx.onMenuShareAppMessage({
			title: shareTitle,
			link: shareLink,
			imgUrl: shareImg,
			desc: shareDesc,
			type: '',
			dataUrl: '',
			success: function() {},
			cancel: function() {}
		});
	});
};
export { WeChat_init };
