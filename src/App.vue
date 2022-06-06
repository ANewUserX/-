<template>
  <div id="app">
    <BasketHearder v-show="$route.meta.isShowHeader" />
    <router-view :key="$route.fullPath"></router-view>
    <BasketFooter v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import BasketHearder from "./components/Header";
import BasketFooter from "./components/Footer";
import {mapState} from "vuex"
import common from "./utils/common";
export default {
  name: "App",
  data() {
    return {
      screenWidth: document.body.clientWidth,
    };
  },
  components: {
    BasketHearder,
    BasketFooter,
  },
  computed: {
    ...mapState({
      recommendList: (state) => state.common.recommendList,
    })
  },
  beforeMounte() {
    const that = this;
    window.onresize = common.debounce(() => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    },1000)
    this.$store.dispatch("watchScreenWidth", this.screenWidth);
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler() {
        this.$store.dispatch("watchScreenWidth", this.screenWidth);
        if (this.screenWidth > 997 && !this.recommendList) {
          this.$store.dispatch("getRecommendList");
        }
      },
    },
  },
};
</script>

<style>
@import url("assets/css/reset.css");
body {
  background-color: #f3f3f3;
}
#app {
  /* padding-top: 90px; */
}
</style>
