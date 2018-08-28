import axios from 'axios';
import Qs from 'qs';
axios.defaults.baseURL = 'https://a.weixin.hndt.com/boom';
const voteFetch = (id, openId, code, title) =>
	axios.post(
		'/api/battle/entrevoteadd',
		Qs.stringify({
			id,
			openId,
			code,
			title
		})
	);
const voteNumFetch = () => axios.get('/api/battle/entrevoteshowlist');
/**
 * 报名
 * @param {*} openId
 * @param {*} name
 * @param {*} mobile
 * @param {*} company
 * @param {*} position
 * @param {*} signId
 */
const signUp = (openId, name, mobile, company, position, signId = 3) =>
	axios.post(
		'/openapi/sign/add',
		Qs.stringify({
			openId,
			name,
			mobile,
			company,
			position,
			signId
		})
	);
/**
 * 签到
 * @param {*} openId
 * @param {*} signIn
 */
const signIn = (openId, signId = 3) => axios.post('/openapi/sign/in', Qs.stringify({ openId, signId }));
/**
 * 获取用户报名信息
 * @param {*} openId
 * @param {*} signId
 */
const getUserInfo = (openId, signId = 3) =>
	axios.post(
		'/openapi/sign/info',
		Qs.stringify({
			openId,
			signId
		})
	);
export { voteFetch, voteNumFetch, signUp, signIn, getUserInfo };
