import axios from 'axios';
import Qs from 'qs';
const postMsg = (page, cid = 4, creater = '', fromUid = '', content = '') =>
	axios.post(
		'http://talk.hndt.com/test/upRadio.do',
		Qs.stringify({
			page,
			cid,
			creater,
			fromUid,
			content
		})
	);

export { postMsg };
