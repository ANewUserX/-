import { reqRecommendList } from "../../api"
const state = {
  screenWidth:0,
  recommendList:null
}
const mutations = {
  WATCHSCREENWIDTH(state,screenWidth){
    state.screenWidth = screenWidth
  },
  GETRECOMMENDLIST(state,recommendList){
    state.recommendList = recommendList
  }
}
const actions = {
  watchScreenWidth({commit},screenWidth){
    commit('WATCHSCREENWIDTH',screenWidth)
  },
  async getRecommendList({commit}){
    let result = await reqRecommendList()
    if(result.code == 200){
      commit('GETRECOMMENDLIST',result.data)
    }else{
      return new Promise(new Error('请求数据失败'))
    }
  }
}
const getters = {
  mostRead(state){
    return state.recommendList.mostRead || undefined
  },
  mostTalk(state){
    return state.recommendList.mostTalk || undefined
  },
  tagRecommendList(state){
    return state.recommendList.tagRecommendList || undefined
  },
  firstItem(state){
    return state.recommendList.mostTalk.slice(0,1) || undefined
  },
  nextItem(state){
    return state.recommendList.mostTalk.slice(1) || undefined
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}