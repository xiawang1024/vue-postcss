import axios from 'axios'
import Qs from 'qs'
const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development') {
	/**
 * 开发环境
 */
	axios.defaults.baseURL = '/api'
} else {
	/**
 * 生产环境
 */
	axios.defaults.baseURL = 'https://talk.hndt.com'
}

const VOTE_ID = '27b9f805626b41ae822f41c1b7c361de'

const postVote = (itemid, phone, voteid = VOTE_ID) =>
	axios.post(
		'/dspdvote/tovote.do',
		Qs.stringify({
			itemid,
			phone,
			voteid
		})
	)
const getVoteNum = (voteid = VOTE_ID) =>
	axios.post(
		'/dspdvote/getvote.do',
		Qs.stringify({
			voteid
		})
	)

export { postVote, getVoteNum }
