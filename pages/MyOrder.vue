<template>
    <div id="app">
      <top-title :need="true" style="background: white" title="我的订单"/>
      <div class="p404" v-if="myOrder.length===0" >
        <cuowu>
          您未下过订单
        </cuowu>
      </div>

      <div v-else class="order" v-for="(items,index) in myOrder" :key="index">



        <div style="border-bottom: 1px solid #ccc">
          <div class="userInfo">
            <div>{{items[0].realName}}</div>
            <div>{{items[0].userPhone}}</div>
          </div>


          {{items[0].address}}
          {{items[0].detailAddress}}

          <div class="time"> {{items[0].create  | dateformat('YYYY-MM-DD HH:mm:ss')}}</div>

        </div>


        <div class="one" @click="goto(item.shopId)" v-for="(item,i) in items" :key="i">
          <div class="img" :style="{backgroundImage:`url(http://snacks.jiawei1311.cn:7001/public/img/${item.img})`}"></div>

          <div class="content">
            <div class="name">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="dibu">
              <div class="price">￥{{item.price}}</div>
              <div class="num">购买数量:{{item.shopNum}}</div>
            </div>
          </div>


        </div>

        <div >
          <div class="bottom">
            <div >{{items[0].yhqId | yhq }}</div>
            <div>合计：<span>￥{{items[0].totalPrice}}</span></div>
          </div>

        </div>


      </div>



    </div>
</template>

<script>
    import topTitle from '@/components/top'
    import Cuowu from '../components/404'
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import moment from 'moment'
    export default {
        name: "MyOrder",
        data(){
            return{
                myOrder:{}
            }
        },
        filters:{
            dateformat(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
                return moment(dataStr).format(pattern)
            },
            yhq(a){
                if (a===1){
                    return '满59元减10元'
                }else if (a===2){
                    return '满99元减20元'
                }else if (a===3){
                    return '满199元减50元'
                }
            }
        },
        computed:{
            ...mapGetters({
                user: 'user/user'
            })
        },
        components:{
            'cuowu':Cuowu,
            topTitle
        },
        methods:{
            async getMyOrder(){
                // const {data} = await  axios.get(this.$api+'/order/lookOrder/'+this.user.id)
                const {data} = await  axios.get(this.$api+'/order/lookOrder/'+this.user.id)
                console.log(data);
                this.myOrder = this.SortOrder(data.data);
                console.log(this.myOrder);
            },
            SortOrder(data){
                // TODO 自己写的乐色
                let a = data.map(x=>{
                    return x.create;
                })
                let b = new Set(a)
                let d =[...b];
                let c =[];
                d.forEach((res,i,arr)=>{
                    c[i]=[];
                    data.forEach(item=>{
                        if(res==item.create){
                            c[i].push(item)
                        }
                    })
                })
                return c;
            },
            goto(id){
                this.$router.push({
                    path:'/shop',
                    query:{
                        id:id
                    }
                })
            }
        },
        mounted() {
            this.getMyOrder()
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  .order{
    background: white;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    .one{
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #ccc;
      margin: 5px 0;
      .img{
        background-position: center;
        background-size: cover;
        height: 80px;
        width: 80px;
      }
      .content{
        flex: 1;
        width: 0;
        padding: 10px;

        .name{

        }

        .description{
          @include shenglue;
          color: #999;
        }
        .dibu{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .price{
            color: orangered;
            font-size: 18px;
          }
          .num{
            color: #666;
           }
        }

      }

    }
    .bottom{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 10px 0 10px;
      span{
        color: orangered;
        font-size: 18px;
      }

    }
  }

  .userInfo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .time {
    color: #ccc;
  }
</style>
