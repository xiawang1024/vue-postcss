import axios from 'axios';
import Qs from 'qs';
const voteFetch = (id, openId, code, title) =>
	axios.post(
		'https://a.weixin.hndt.com/boom/api/battle/entrevoteadd',
		Qs.stringify({
			id,
			openId,
			code,
			title
		})
	);
const voteNumFetch = () => axios.get('https://a.weixin.hndt.com/boom/api/battle/entrevoteshowlist');
export { voteFetch, voteNumFetch };
