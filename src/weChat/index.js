import store from 'store'
import STORE_NAME from 'conf/store_conf'
import { WeChatConf } from './util'
import { isWeChatBrowser } from 'common/js/util'
const weChatConf = new WeChatConf()
console.log(store.get(STORE_NAME))
/**
 * 如果本地储存里没有用户信息，则授权获取用户信息流程
 */
// if (!store.get(STORE_NAME)) {
// 	weChatConf.init()
// }
/**
 * 是否非微信客户端也可以打开
 */
if (isWeChatBrowser()) {
	weChatConf.init()
}
