<template>
  <div class="ReadMoreNav">
    <div class="container">
      <button @click="readMore">加载更多</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:"ReadMoreNav",
    props:{
      dispatchName:{
        type:String,
        default:''
      },
      pushRoute:{
        type:String,
        default:'news'
      }
    },
    methods:{
      readMore(){
        if(this.$route.path == '/home'){
          this.$router.push(`/${this.pushRoute}`)
        }else{
          this.$store.dispatch(`${this.dispatchName}`)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.ReadMoreNav{
  width: 100%;
  margin: 30px 0;
  .container{
    width: 100%;
    text-align: center;
    button{
      display: inline-block;
      border: none;
      cursor: pointer;
      width: 150px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      border-radius: 5px;
      background-color: #ef2f09;
      border: 1px solid #b2afaf;
    }
  }
}
</style>