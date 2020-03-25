<template>
    <div style="background: #f5f5f5;margin-top: 100px;">
      <img class="img" src="../static/icon/tip2.png">
      <div class="text"><slot></slot></div>
    </div>
</template>

<script>
    export default {
        name: "cuowu",
    }
</script>

<style scoped lang="scss">
  .img{
    width: 100px;
    height: 100px;
    margin:0 auto;
    display: block;
    margin-bottom: 20px;
  }
  .text{
    text-align: center;
    width: 100%;
    color: #999;
  }

</style>
