<template>
  <div>
    <shopCars/>
    <nuxt/>
    <div style="height: 55px;"></div>

    <div class="footBar">
        <mu-bottom-nav v-model="PageIndex"  >
          <mu-bottom-nav-item to="/" value="/" title="首页" icon=":iconfont icon-homepage_fill"></mu-bottom-nav-item>
          <mu-bottom-nav-item to="/fenlei" value="/fenlei" title="分类" icon=":iconfont icon-manage_fill"></mu-bottom-nav-item>
          <mu-bottom-nav-item to="/user" value="/user" title="个人中心" icon=":iconfont icon-mine_fill"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </div>
  </div>
</template>

<script>
    import shopCars from '../components/shopCar'
    export default {
        name: "BottomNavigation",
        components:{
            shopCars
        },
        data () {
            return {
                PageIndex:'/'
            }
        },
        methods:{
            fetchData(newKey,old){
                this.PageIndex=newKey.path
            }
        },
        watch:{
            "$route":"fetchData"
        },
        mounted() {
            this.PageIndex=this.$route.path
            console.log(this.$route.path);
        }
    }
</script>

<style lang="scss">
  @import "../assets/css/main";
  .iconfont{
    font-size: 18px;
  }
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
  .footBar{
    position:fixed;
    width:100%;
    left:0;
    z-index:105;
    bottom:0;
    right: 0;
    i{
      /*color: yellow;*/
    }

  }
</style>

