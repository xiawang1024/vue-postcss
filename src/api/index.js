import axios from "axios";
import Qs from "qs";
axios.defaults.baseURL = "http://a.weixin.hndt.com/boom";
const voteFetch = (id, openId, code, title) =>
  axios.post(
    "/api/battle/entrevoteadd",
    Qs.stringify({
      id,
      openId,
      code,
      title
    })
  );
const voteNumFetch = () => axios.get("/api/battle/entrevoteshowlist");
/**
 * 报名
 * @param {*} openId
 * @param {*} name
 * @param {*} avatar
 * @param {*} company
 * @param {*} position
 * @param {*} signId
 */
const signUp = (openId, name, avatar, company, position, signId = 7) =>
  axios.post(
    "/openapi/sign/add",
    Qs.stringify({
      openId,
      name,
      avatar,
      company,
      position,
      signId
    })
  );
/**
 * 获取用户报名信息
 * @param {*} openId
 * @param {*} signId
 */
const getUserInfo = (openId, signId = 7) =>
  axios.post(
    "/openapi/sign/info",
    Qs.stringify({
      openId,
      signId
    })
  );
/**
 * 点赞
 */
const AddCount = id =>
  axios.get(
    `https://a.weixin.hndt.com/boom/openapi/visit/add?name=WM&channelId=${id}`
  );
/**
 * 点赞列表
 */
const GetListCount = () =>
  axios.get(`https://a.weixin.hndt.com/boom/openapi/visit/list?name=WM`);

/**
 * 是否点赞
 */
const isOkZan = () => {
  return new Promise(resolve => {
    let list = localStorage.getItem("ZanList");
    let JsonList = JSON.parse(list);
    if (JsonList && JsonList.length == 0) {
      resolve(0);
    } else {
      resolve(JsonList);
    }
  });
};

export {
  voteFetch,
  voteNumFetch,
  signUp,
  getUserInfo,
  AddCount,
  GetListCount,
  isOkZan
};
