import store from 'store'
import STORE_NAME from 'conf/store_conf'

import { WeChat_init } from './weChat_config';
import { GetOpenIdByCode, WeChat_Conf_Init } from '@api/weChat';
import { appId, shareLink } from 'conf/weChatShare_conf';

class WeChat {
	constructor() {
		this.baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
		this.appId = appId;
		this.redirect_uri = shareLink;
		this.response_type = 'code';
		this.scope = 'snsapi_userinfo'; //snsapi_base 只获取openId ，snsapi_userinfo 获取用户信息;
		this.state = Date.parse(new Date());
		this.weChat_Redirect = '#wechat_redirect';
	}
	getQueryString(name) {
		var url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var newUrl = window.location.search.substr(1).match(url);
		if (newUrl != null) {
			return unescape(newUrl[2]);
		} else {
			return false;
		}
	}
	redirectUrl() {
		let url =
			this.baseUrl +
			'appid=' +
			this.appId +
			'&redirect_uri=' +
			encodeURIComponent(this.redirect_uri) +
			'&response_type=' +
			this.response_type +
			'&scope=' +
			this.scope +
			'&state=' +
			this.state +
			this.weChat_Redirect;
		window.location = url;
	}
	hasCode() {
		if (!this.getQueryString('code')) {
			this.redirectUrl();
		} else {
			this.getOpenId();
		}
	}
	async getOpenId() {
		try {
			let code = await GetOpenIdByCode(this.getQueryString('code'), this.appId);
			if (code) {
				this.redirectUrl();
			}
		} catch (e) {
			console.log(e);
		}
	}
}

class WeChatConf extends WeChat {
	constructor(props) {
		super(props);
	}
	async init() {
		try {
			/**
			* 如果本地储存里没有用户信息，则授权获取用户信息流程
			*/
			if (!store.get(STORE_NAME)) {
				this.hasCode();
			}
			
			let data = await WeChat_Conf_Init();
			WeChat_init(data);
		} catch (e) {
			console.log(e);
		}
	}
}
export { WeChat, WeChatConf };
