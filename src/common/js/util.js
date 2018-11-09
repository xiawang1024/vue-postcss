/**
 * 判断是不是微信浏览器
 */
const isWeChatBrowser = () => {
	var agent = navigator.userAgent.toLowerCase();
	if (agent.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
};
const audioAutoPlay = (id = 'audio') => {
	let audio = document.getElementById(id),
		play = function() {
			audio.play();
			document.removeEventListener('touchstart', play, false);
		};
	audio.play();
	document.addEventListener(
		'WeixinJSBridgeReady',
		function() {
			play();
		},
		false
	);
	document.addEventListener(
		'YixinJSBridgeReady',
		function() {
			play();
		},
		false
	);
	document.addEventListener('touchstart', play, false);
};

export { isWeChatBrowser, audioAutoPlay };
