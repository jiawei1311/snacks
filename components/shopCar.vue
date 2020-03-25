<template>
  <div class="shopCar" @click="clickShopCar">
    <mu-badge v-if="shopCarNumber>0" :content="shopCarNumber+''" circle color="secondary"  class="demo-icon-badge">
      <i class="iconfont icon-gouwuche"></i>
    </mu-badge>
    <i v-else class="iconfont icon-gouwuche"></i>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "shopCar",
        computed:{
            ...mapGetters('shopCar',['shopCarNumber']),
        },
        methods:{
            clickShopCar(){
                this.$router.push('/shopCar')
            }
        }
    }
</script>

<style scoped lang="scss">
  .shopCar{
    background: rgba(0,0,0,.6);
    z-index: 999;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 40px;
    height: 40px;
    i{
      color: whitesmoke;
      text-align: center;
      font-size: 24px;
      margin-left: 8px;
      line-height: 40px;
    }
  }
</style>
