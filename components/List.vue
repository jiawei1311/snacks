<template>
  <div class="one">
    <div :style="{backgroundImage:`url(http://snacks.jiawei1311.cn:7001/public/img/${shop.img})`}" class="img"></div>
    <div class="text">
      <div class="name">
        {{shop.name}}
      </div>
      <div class="price">
        <div>¥{{shop.price}}</div>
        <div>销售量{{shop.sale}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "List",
        props: [
            'shop'
        ]
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";

  .one {
    background: lighten($SecondaryGreen, 0%);
    color: white;
    width: 170px;
    height: 250px;
    margin: 5px 0;
    border-radius: 5px;
    overflow: hidden;

    .img {
      width: 100%;
      height: 200px;
      background-image: url('../static/img/cloth.jpg');
      background-size: cover;
      background-position: center;
    }

    .text {
      padding: 0 10px;

      .name {
        margin-top: 5px;
        @include shenglue
      }

      .price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

  }
</style>
