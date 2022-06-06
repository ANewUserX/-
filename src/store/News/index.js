import { reqNewsList } from "../../api"
const state = {
  newsLists:{}
}
const mutations = {
  GETNEWSLIST(state,newsLists){
    state.newsLists = newsLists
  }
}
const actions = {
  async getNewsList({commit}){
    let result = await reqNewsList()
    if(result.code == 200){
      commit('GETNEWSLIST',result.data)
    }else{
      return new Promise(new Error('请求数据失败'))
    }
  }
}
const getters = {
  newsList(state){
    return state.newsLists.newsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}