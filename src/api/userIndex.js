import userRequest from "./userRequest"
const qs = require('qs')

// 获得用户信息
export const reqUserInfo = () => userRequest({url:'/userinfo',method:'GET'})

// 获取用户收藏
export const reqUserCollect = (datas) => userRequest({url:'/collect',data:qs.stringify(datas),method:'POST'})

// 用户行为
// 用户点赞
export const reqGiveLike = (id) => userRequest({url:`/like/${id}`,method:'POST'})
// 取消点赞
export const reqCancelLike = (id) => userRequest({url:`/cancelLike/${id}`,method:'POST'})
// 用户收藏
export const reqCollect = (id) => userRequest({url:`/collect/${id}`,method:'POST'})
// 用户取消收藏
export const reqCancelCollect = (id) => userRequest({url:`/cancelCollect/${id}`,method:'POST'})

// 用户评论
export const reqUserComment = (datas) => userRequest({url:'/comment',data:qs.stringify(datas),method:'POST'})

// 用户回复评论
export const reqAnwserComment = (datas) => userRequest({url:'/anwser',data:qs.stringify(datas),method:'POST'})

// 更换用户头像
export const userAvatar = (datas) => userRequest({url:'/update/avatar',data:qs.stringify(datas),method:'POST'})

// 修改密码
export const reqUserPassword = (datas) => userRequest({url:'/updatepwd',data:qs.stringify(datas),method:'POST'})

// 修改个人信息
export const reqChangeUserInfo = (datas) => userRequest({url:'/userinfo',data:qs.stringify(datas),method:'POST'})
