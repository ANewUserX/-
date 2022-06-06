<template>
  <div class="RecommendTab">
    <div class="container">
      <TitleNav title="热门标签" color="red" borderColor="red" />
      <ul class="tabList" v-if="tagRecommendList">
        <li
          v-for="(tab, index) in tagRecommendList"
          :key="index"
          @mouseenter="mouseEnter(index)"
          @mouseleave="mouseLeave"
          :class="index == currentIndex ? 'active' : ''"
          @click="goSearch(tab.tag_name)"
        >
          {{ tab.tag_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TitleNav from "../TitleNav";
import { mapGetters } from "vuex";
export default {
  name: "RecommendTab",
  components: { TitleNav },
  data() {
    return {
      tabrecommendList: [],
      currentIndex: -1,
    };
  },
  computed: {
    ...mapGetters(['tagRecommendList']),
  },
  methods: {
    mouseEnter(index) {
      this.currentIndex = index;
    },
    mouseLeave() {
      this.currentIndex = -1;
    },
    goSearch(keyword){
      this.$router.push({name:'search',query:{key:keyword}})
    }
  }
};
</script>

<style lang="less" scoped>
.RecommendTab {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 40px 25px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .tabList {
      width: 100%;
      // padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 7px 4px;
        border: 1px solid #fdd9d9;
        margin: 0 6px 6px 0;
        border-radius: 3px;
        font-size: 12px;
        color: rgb(160, 147, 147);
        cursor: pointer;
        transition: all 0.2s linear;
      }
      .active {
        background-color: black;
        color: #fff;
        border: 1px solid black;
      }
    }
  }
}
</style>