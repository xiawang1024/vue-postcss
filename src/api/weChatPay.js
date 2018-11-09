import axios from 'axios';
/**
 * 微信付费api
 * @param {*} openId 
 * @param {*} source 
 */
const weChatPay = (openId, source = 100) =>
	axios.post(
		'http://a.weixin.hndt.com/passport/order/create.do',
		JSON.stringify({
			openId,
			source,
			orderDetailList: [
				{
					productId: 3,
					productQuantity: 1
				}
			]
		}),
		{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		}
	);
/**
 * check是否付费
 * @param {*} openId 
 */
const isPayed = (openId) =>
	axios.get(`http://a.weixin.hndt.com/passport/pay_to_live/pay_and_time_auth.do?openId=${openId}`);

export { weChatPay, isPayed };
