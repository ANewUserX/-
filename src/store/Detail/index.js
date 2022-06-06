import { reqNewDetail } from "../../api"

const state = {
  detailList:[],
  index:0
}
const mutations = {
  GETDETAILLIST(state,detailList){
    state.detailList = detailList
  },
  ADDDETAIL(state,index){
    state.index = index
  }
}
const actions = {
  async getDetailList({commit},id){
    let result = await reqNewDetail(id)
    if(result.code == 200){
      commit('GETDETAILLIST',result.data)
    }else{
      return '获取详情页数据失败'
    }
  },
  addDetail({commit},index){
    commit('ADDDETAIL',index)
  }
}
const getters = {
  newsDetail(state){
    return state.detailList.articleDetailList || {}
  },
  hotList(state){
    return state.detailList.hotList || []
  },
  likeList(state){
    return state.detailList.likeList || []
  },
  lastAndNextNews(state){
    return state.detailList.lastAndNextNews || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}