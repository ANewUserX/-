<template>
  <div>
    <Swiper v-if="bannerList" :bannerList="bannerList"/>
    <HomeRecommend/>
  </div>
</template>

<script>
import Swiper from 'components/Swiper'
import HomeRecommend from './HomeRecommend'
import {mapState} from 'vuex'
  export default {
    name:'Home',
    components:{
      Swiper,
      HomeRecommend
    },
    computed:{
      ...mapState({
        bannerList:state => state.home.bannerList
      })
    },
    mounted(){
      this.$store.dispatch('getBannerList')
    }
  }
</script>

<style lang="less" scoped>

</style>