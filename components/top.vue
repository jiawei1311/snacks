<template>
  <div>
    <div class="top" :class="need?'backgroundWhite':''">
      <div @click="goBack" class="back"/>
      <div v-if="title" class="title">{{title}}</div>
      <div v-else class="title"></div>
    </div>
    <div style="height: 50px"></div>
  </div>

</template>

<script>
    export default {
        name: "top",
        props:['title','need'],
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  .backgroundWhite{
    background: white;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .top{
      position: fixed;
      top: 0px;
      left: 0;
      right: 0;
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: $SecondaryBlack;

    .back{
      margin-left: 20px;
      height: 30px;
      width: 30px;
      background-image:url("../static/icon/back.png");
      background-position: center;
      background-size: cover;
    }
    .title{
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
      font-size: 18px;
      margin-top: 2px;
      width: 70%;
      text-align: center;
      @include shenglue
    }

  }
</style>
