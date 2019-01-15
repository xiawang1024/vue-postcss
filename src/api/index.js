import axios from 'axios'
import Qs from 'qs'
// axios.baseURL = 'https://talk.hndt.com'
axios.baseURL = '/api'
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
