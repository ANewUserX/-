import requests from "./requests";
import mockRequest from "./mockRequest"
const qs = require('qs')

// 轮播图请求
export const reqBannerList = () => requests({url:'/banner',method:'GET'})

// 热门新闻
export const reqHotNewsList = () => requests({url:'/hotnews',method:'GET'})

// 最新新闻
export const reqNewNewsList = () => requests({url:'/newrecomend',method:'GET'})

// // 推荐数据
export const reqRecommendList = () => requests({url:'/hotrecommend',method:'GET'})

// 新闻
export const reqNewsList = (datas) => requests({url:'/news',data:qs.stringify(datas),method:'POST'})

// 资讯
export const reqLifeList = (datas) => requests({url:'/info/lifeinfo',data:qs.stringify(datas),method:'POST'})

// 资讯
export const reqStarList = (datas) => requests({url:'/info/starinfo',data:qs.stringify(datas),method:'POST'})

// 收藏
export const reqCollectList = () => mockRequest({url:'/collect',method:'GET'})

// 登录
export const userlogin = (datas) => requests({url:'/login',data:qs.stringify(datas),method:'POST'})

// 注册用户
export const userRegister = (datas) => requests({url:'/register',data:qs.stringify(datas),method:'POST'})


// 详情页数据
export const reqNewDetail = (id) => requests({url:`/detail/${id}`,method:'GET'})

// 获得评论
export const reqCommentList = (datas) => requests({url:'/comment',data:qs.stringify(datas),method:'POST'})

// 搜索
export const reqSearchList = (datas) => requests({url:'/search',data:qs.stringify(datas),method:'POST'})


