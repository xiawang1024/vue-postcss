import axios from 'axios'
import Qs from 'qs'
import store from 'store'

import STORE_NAME from 'conf/store_conf'
import { WeChat_Conf_Url, GetOpenIdByCode_Url } from 'conf/weChat_conf'
/**
 * 通过code 获取openId
 * @param {*} url GetOpenIdByCode_Url
 * @param {*} code code
 * @param {*} state 附加参数 默认当前公众号appId
 * @param {*} subscribe: false 是否关注公众号的，false:否，true:是
 */
const GetOpenIdByCode = (code, state, subscribe = false) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: GetOpenIdByCode_Url,
			data: Qs.stringify({ code, state, subscribe })
		})
			.then((res) => {
				let { data, status } = res.data
				if (status === 'ok') {
					store.set(STORE_NAME, data)
					resolve(0)
				} else {
					resolve(1)
				}
			})
			.catch((err) => {
				reject(1)
				console.log(err)
			})
	})
}

const WeChat_Conf_Init = () => {
	return new Promise((resolve, reject) => {
		axios
			.post(WeChat_Conf_Url, Qs.stringify({ url: window.location.href }))
			.then((res) => {
				let data = res.data
				resolve(data)
			})
			.catch((err) => {
				console.log(err)
				reject(1)
			})
	})
}

export { GetOpenIdByCode, WeChat_Conf_Init }
