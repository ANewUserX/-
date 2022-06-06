import { reqLifeList } from "../../api"
const state = {
  infoList:{}
}
const mutations = {
  GETINFOLIST(state,infoList){
    state.infoList = infoList
  }
}
const actions = {
  async getInfoList({commit}){
    let result = await reqLifeList()
    if(result.code == 200){
      commit('GETINFOLIST',result.data)
    }else{
      return new Promise(new Error('请求数据失败'))
    }
  }
}
const getters = {
  lifeInfoList(state){
    return state.infoList.lifeInfoList || {}
  },
  starsInfoList(state){
    return state.infoList.starsInfoList || {}
  }
} 
export default {
  state,
  mutations,
  actions,
  getters
}