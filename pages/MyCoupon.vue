<template>
  <div id="app">
    <top-title :need="true" style="background: white" title="我的优惠券"/>
<!--    <div class="getYHQ">
      <img src="../static/img/getYHQ.jpg" class="img"/>
    </div>-->
    <div v-if="myCoupon.length===0" class="p404" >
      <cuowu>
        您当前没有优惠券
        <div @click="goto" class="now">点击此处立即领取</div>
      </cuowu>
    </div>

    <div v-else>
      <div @click="goto" class="rightNow">立即领取优惠券</div>
      <div class="all" v-for="item in myCoupon" :key="item.id">
        <img :class="item.used?'used':''" class="YHQ" :src="require(`../static/img/YHQ${item.yhqId}.jpg`)">
      </div>
    </div>
  </div>
</template>

<script>
    import topTitle from '@/components/top'
    import Cuowu from '../components/404'
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        name: "MyCoupon",
        components:{
            'cuowu':Cuowu,
            topTitle
        },
        data(){
            return{
                myCoupon:[]
            }
        },
        computed:{
            ...mapGetters({
                user: 'user/user'
            })
        },
        methods:{
            goto(){
                this.$router.push('/getYHQ')
            },
            async getMyCoupon(){
                // const {data} = await  axios.get(this.$api+'/yhq/lookYhq/'+this.user.id)
                const {data} = await  axios.get(this.$api+'/yhq/lookYhq/'+this.user.id)
                this.myCoupon=data.data;
                console.log(this.myCoupon);
            }
        },
        mounted() {
            this.getMyCoupon()
        }

    }
</script>

<style scoped lang="scss">
.getYHQ{
  width: 100%;
  height: 250px;
  @media screen and (min-width: 600px) {
    height: 400px;
  }
  .img{
    width: 100%;
    height: 100%;
    /*background-position: center;
    background-size: cover;*/
  }
}
  .now{
    color: orange;
    cursor: pointer;
  }
  .rightNow{
    text-align: center;
    margin-top: 20px;
    @extend .now
  }
.all{
  margin: 0 auto;
  width: 330*0.9px;
  .YHQ{
    height: 130*0.9px;
    width: 330*0.9px;
    margin-top: 20px;

  }.used{
       -webkit-filter: grayscale(100%);
       -moz-filter: grayscale(100%);
       -ms-filter: grayscale(100%);
       -o-filter: grayscale(100%);

       filter: grayscale(100%);

       filter: gray;
   }
}

</style>
