import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import common from './Common'
import news from './News'
import info from './Info'
import detail from './Detail'
import user from './User'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    home,
    common,
    news,
    info,
    detail,
    user
  }
})