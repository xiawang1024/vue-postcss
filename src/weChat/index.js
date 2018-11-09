import { WeChatConf } from './util';
import { isWeChatBrowser } from 'common/js/util';
const weChatConf = new WeChatConf();

if (isWeChatBrowser()) {
	// weChatConf.init();
}
