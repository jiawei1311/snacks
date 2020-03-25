<template>
    <div id="app">
      <shopCars/>
      <div class="shopBack" v-if="show" :style="{backgroundImage:'url(http://snacks.jiawei1311.cn:7001/public/img/'+shop.img+')'}">
        <div class="contentBackground">
          <top-title :title="shop.name"/>
          <div class="content">
            <div class="price">
              ¥{{shop.price}}
            </div>
            <div class="sale">
              销售量{{shop.sale}}
            </div>
            <div class="brand">
              {{shop.brand}}
            </div>
            <div class="miaoshu">
              {{shop.description}}
            </div>

            <div class="btn" @click="addGoods(shop)">
              立即购买
            </div>

          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import topTitle from '@/components/top'
  import {mapActions} from 'vuex'
  import shopCars from '../components/shopCar'
    export default {
        name: "shop",
        data(){
            return{
                shop:{},
                show:false
            }
        },
        components:{
            topTitle,
            shopCars
        },
        methods:{
            ...mapActions('shopCar',['addGoods']),
            async getOne(){
                const {data}  = await axios.get(this.$api+'/shop/getShop/'+this.$route.query.id)
                this.shop=data.data
                this.show=true
            }
        },
        mounted() {
            this.getOne()
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/theme";
  .shopBack{
    width: 100%;
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-image: url("../static/img/cloth.jpg");
    .contentBackground{
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(255,255,255,0),$PrimaryBlack);
      color: $SecondaryWhite;
      .content{
        width: 100%;
        position: absolute;
        padding: 20px;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        .price{
          font-size: 36px;
          font-weight: 600;
        }
        .miaoshu{
          color: $SecondaryGray;
          font-size: 14px;
        }
        .brand{
          font-size: 16px;
        }
        .sale{
          color: $SecondaryYellow;
          font-size: 16px;
        }
        .btn{
          padding: 3px 0 ;
          width: 50%;
          max-width: 200px;
          background: $PrimaryColorLG;
          border-radius: 20px;
          margin-top: 10px;
          text-align: center;
          font-size: 16px;
        }
      }
    }
  }
</style>
