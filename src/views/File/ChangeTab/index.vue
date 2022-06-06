<template>
  <div class="ChangeTab">
    <div class="container">
      <ul class="tabBtn" @click="changIndex">
        <li :class="isActive ? 'active' : ''" data-tabinfo="life" ref="life">看生活资讯</li>
        <li :class="isActive ? '' : 'active'" data-tabinfo="star" ref="star">看球星资讯</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeTab",
  data(){
    return {
      isActive:true,
    }
  },
  methods:{
    changIndex(event){
      let tabInfo = event.target.dataset.tabinfo
      if(tabInfo == 'life'){
        this.isActive = true
        this.$emit('activeName',1)
      }else{
        this.isActive = false,
        this.$emit('activeName',2)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ChangeTab {
  // width: 100%;
  margin: 15px;
  .container {
    margin: 0 auto;
    // width: 1150px;
    display: flex;
    justify-content: space-around;
    .tabBtn {
      display: flex;
      border-radius: 10px;
      // border: 1px solid red;
      margin: 0 auto;
      overflow: hidden;
      background-color: #f3f3f3;
      li {
        padding: 16px;
        border-radius: 10px;
        cursor: pointer;
        background-color: black;
        color: #ffff;
        font-size: 14px;
        &:first-child {
          margin-right: 5px;
        }
      }
      .active {
        background-color: orange;
        color: black;
      }
    }
  }
}
</style>