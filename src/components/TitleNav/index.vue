<template>
  <div class="container">
    <div class="list_title" :style="{color:`${color}`,borderColor:`${borderColor}`}">
      {{title}}
      <i v-if="showI" @click="goRoute">更多</i>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TitleNav',
    props:{
      title:{
        type:String,
        default:''
      },
      color:{
        type:String,
        default:'black'
      },
      borderColor:{
        type:String,
        default:'black'
      },
      showI:{
        type:Boolean,
        default:false
      },
      pushRoute:{
        type:String,
        default:'file'
      }
    },
    methods:{
      goRoute(){
        this.$router.push(`/${this.pushRoute}`)
      }
    }
  }
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  margin: 10px 0px;
  .list_title{
    width: 100%;
    border-bottom: 2px solid black;
    padding: 20px 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    i{
      font-size: 14px;
      color: #00A7EB;
      cursor: pointer;
      float: right;
      position: relative;
      top: 5px;
    }
  }
}
</style>