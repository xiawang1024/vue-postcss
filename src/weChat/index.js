import { WeChatConf } from './util'
// import { isWeChatBrowser } from 'common/js/util'
const weChatConf = new WeChatConf()

weChatConf.init()
/**
 * 是否非微信客户端也可以打开
 */
// if (isWeChatBrowser()) {
// 	weChatConf.init()
// }
