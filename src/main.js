import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'


// 引入图标
import 'assets/css/iconfont.css'

// 引入mock数据
import "@/mock/mockServer"

// 使用element-ui
import {Card,Button,Message} from 'element-ui';
Vue.use(Card)
Vue.use(Button)
Vue.prototype.$message = Message

// 导入api接口
import * as api from "api"
import * as action from "api/userIndex"

Vue.config.productionTip = false

// 导入mixin
import globalMixin from './utils/globalMixin'
Vue.mixin(globalMixin)

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 全局事件总线注册
    Vue.prototype.$API = api,
    Vue.prototype.$ACTION = action,
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
