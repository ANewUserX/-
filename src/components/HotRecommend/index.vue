<template>
  <div class="HotRecommend">
    <div class="container">
      <TitleNav title="热门推荐" color="#ef2f09" borderColor="#ef2f09" />
      <RecommendItem v-if="mostRead" :itemList="mostRead" />
    </div>
  </div>
</template>

<script>
import TitleNav from "../TitleNav";
import RecommendItem from "../RecommendItem";
import { mapGetters } from "vuex";
export default {
  name: "HotRecommend",
  components: {
    TitleNav,
    RecommendItem,
  },
  computed: {
    ...mapGetters(['mostRead'])
  }
};
</script>

<style lang="less" scoped>
.HotRecommend {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 40px 25px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
}
</style>