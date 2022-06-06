import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 注册路由
Vue.use(VueRouter)

// 重写路由
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject ){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

const router = new VueRouter({
  mode:'history',
  routes,
  // 定义路由跳转时路由滚动的位置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y : 0 }
  },
})

export default router