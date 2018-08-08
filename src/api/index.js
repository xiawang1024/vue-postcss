import axios from 'axios';
import Qs from 'qs';
import { id } from 'postcss-selector-parser';

const voteFetch = (id, openid, code, title) =>
	axios.post(
		'http://a.weixin.hndt.com/boom/api/battle/entrevoteadd',
		Qs.stringify({
			id,
			openid,
			code,
			title
		})
	);
export { voteFetch };
