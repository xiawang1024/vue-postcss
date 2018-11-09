/**
 * 引入基础样式
 */
import 'common/scss/index.scss';

/**
 * 微信相关：sdk配置
 */
import 'weChat/index';

/* fastclick修复移动端点击延迟300ms */
import fastclick from 'fastclick';
fastclick.attach(document.body);

/**
 * 百度统计
 */
let _hmt = _hmt || [];
(function() {
	var hm = document.createElement('script');
	hm.src = 'https://hm.baidu.com/hm.js?8d8b13e4dff379c880b2436c9ae60cc8';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(hm, s);
})();
