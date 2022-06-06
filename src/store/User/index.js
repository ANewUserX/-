import { reqUserInfo } from "../../api/userIndex";

const state = {
  userInfo:[]
}
const mutations = {
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  }
}
const actions = {
  async getUserInfo({commit}){
    let result = await reqUserInfo()
    if(result.code == 200){
      commit('GETUSERINFO',result.data)
      localStorage.setItem('userid',result.data.id)
    }else{
      return this.$message.error({
        message: `${result.message}`,
      });
    }
  }
}
const getters ={}

export default {
  state,
  mutations,
  actions,
  getters
}