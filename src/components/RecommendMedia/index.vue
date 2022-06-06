<template>
  <div class="RecommendMedia">
    <div class="container">
      <TitleNav title="推荐话题" color="#ef2f09" borderColor="#ef2f09"/>
      <RecomMediaItem/>
    </div>
  </div>
</template>

<script>
import TitleNav from "../TitleNav";
import RecomMediaItem from './RecomMediaItem'
import { mapGetters } from "vuex";
export default {
  name: "RecommendMedia",
  components: { TitleNav,RecomMediaItem },
};
</script>

<style lang="less" scoped>
.RecommendMedia{
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 40px 25px ;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  .container{
    width:100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
}
</style>