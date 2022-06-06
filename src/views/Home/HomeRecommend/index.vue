<template>
  <div class="HomeRecommend">
    <div class="container">
      <RecomHotNews v-if="hotNewsList" :recommendList="hotNewsList"/>
      <NewNewsNav/>
    </div>
  </div>
</template>

<script>
import TitleNav from "components/TitleNav";
import RecomHotNews from './RecomHotNews'
import NewNewsNav from '../NewNewsNav'

import {mapState} from "vuex"
export default {
  name: "HomeRecommend",
  components: {
    TitleNav,
    RecomHotNews,
    NewNewsNav
  },
  mounted(){
    this.$store.dispatch('getHotNewsList')
  },
  computed:{
    ...mapState({
      hotNewsList:state => state.home.hotNewsList
    })
  }
};
</script>

<style lang="less" scoped>
.HomeRecommend {
  width: 100%;
  .container {
    margin-top: 10px;
    width: 1150px;
    margin: 0 auto;
  }
}

@media screen and(min-width: 1200px) {
  .HomeRecommend {
    width: 100%;
    .container {
      width: 1150px;
    }
  }
}
@media screen and(min-width: 997px) and(max-width:1200px) {
  .HomeRecommend {
    width: 100%;
    .container {
      width: 970px;
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .HomeRecommend {
    width: 100%;
    .container {
      width: 720px;
    }
  }
}
@media screen and(max-width: 767px) {
  .HomeRecommend {
    width: 100%;
    .container {
      width: 97%;
    }
  }
}
</style>