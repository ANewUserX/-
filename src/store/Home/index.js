import { reqBannerList,reqHotNewsList,reqNewNewsList,reqRecomInfoList } from "../../api"
const state = {
  bannerList:[],
  hotNewsList:[],
  newNewsList:[]
}
const mutations = {
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETHOTNEWSLIST(state,hotNewsList){
    state.hotNewsList = hotNewsList
  },
  GETNEWNEWSLIST(state,newNewsList){
    state.newNewsList = newNewsList
  }
}
const actions = {
  // 请求轮播图数据
  async getBannerList({commit}){
    let result = await reqBannerList()
    if(result.code == 200){
      commit('GETBANNERLIST',result.data)
    }else{
      return new Promise(new Error('获取数据失败'))
    }
  },
  // 请求热门新闻数据
  async getHotNewsList({commit}){
    let result = await reqHotNewsList()
    if(result.code == 200){
      commit('GETHOTNEWSLIST',result.data)
    }else{
      return new Promise(new Error('获取热门新闻数据失败'))
    }
  },
  // 请求最新新闻数据
  async getNewNewsList({commit}){
    let result = await reqNewNewsList()
    if(result.code == 200){
      commit('GETNEWNEWSLIST',result.data)
    }else{
      return new Promise(new Error('请求最新新闻数据失败'))
    }
  },
}
const getters = {
  lifeRecommendList(state){
    return state.newNewsList.lifeRecommendList || []
  },
  newsRecommendList(state){
    return state.newNewsList.newsRecommendList || []
  },
  starRecommendList(state){
    return state.newNewsList.starRecommendList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
