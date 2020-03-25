<template>
  <div>
    <top-title :need="true" style="background: white" title="购物车"/>
    <div class="card-goods">
      <div class="p404" v-if="shopCarNumber==0">
        <cuowu>
          当前购物车是空的
        </cuowu>
      </div>
      <div
        v-else
        class="card-goods__item"
        v-for="item in shopCar"
        :key="item.id"
        :name="item.dishesName"
      >

        <div class="img" :style="{backgroundImage:'url(' +$api+'/public/img/'+ item.img + ')'}"></div>
        <!--        <img :src="item.thumb">-->
        <div class="content">
          <div class="shengluehao">{{item.name}}</div>
          <div>
            <div class="shengluehao">
              {{item.description}}
            </div>
          </div>
          <div class="geshu">
            <div class="money">￥{{item.price}}</div>
            <div class="caozuo">
              <div @click="reduce(item)">—</div>
              <div>{{item.num}}</div>
              <div @click="addNum(item)">＋</div>
            </div>
          </div>

        </div>

      </div>


    </div>
    <div style="height: 50px"></div>

    <div class="OrderDibu">
      <div class="yhq" v-if="yhq.id" @click="openScrollDialog">
        {{yhq.yhqId|SetLabel}}
      </div>
      <div class="yhq" v-else @click="openScrollDialog">
        点击使用优惠券
      </div>

      <div class="right">
        <div v-if="realMoney!=totalMoney">
          <del>￥{{totalMoney}}</del> <span>￥{{realMoney}}</span>
        </div>
        <div v-else>
          合计：<span>￥{{realMoney}}</span>
        </div>

        <div @click="jiesuan" class="btn">
          结算({{shopCarNumber}})
        </div>
      </div>
    </div>

    <mu-dialog title="请选择优惠券" width="360" scrollable :open.sync="openScroll">
      <mu-list>
        <mu-list-item :key="option.id" v-for="option in options">
          <mu-list-item-content>
            <mu-radio  :label="option.yhqId|SetLabel" :value="option" v-model="yhq"></mu-radio>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <mu-button slot="actions" flat color="primary" @click="closeScrollDialog">ok</mu-button>
    </mu-dialog>


  </div>
</template>

<script>
    import Cuowu from '../components/404'
    import topTitle from '@/components/top'
    import {mapActions, mapGetters} from 'vuex'

    let moment = require("moment");
    import axios from 'axios'

    export default {
        components: {
            'cuowu': Cuowu,
            topTitle
        },
        data() {
            return {
                openScroll: false,
                yhq:[],
                options: [{id:-1,yhqId:-1}]
            }

        },
        computed: {
            ...mapGetters('shopCar', ['totalMoney', 'shopCarNumber', 'shopCar']),
            ...mapGetters('user', ['user']),
            realMoney(){
                this.canYhq()
                if(this.yhq.yhqId===1){
                    return (this.totalMoney-10).toFixed(1)
                }
                if(this.yhq.yhqId===2){
                    return (this.totalMoney-20).toFixed(1)
                }
                if(this.yhq.yhqId===3){
                    return (this.totalMoney-50).toFixed(1)
                }
                return this.totalMoney
            }

        },
        filters: {
            SetLabel: function (value) {
                if(value===1){
                    return '满59减10'
                }else if(value===2){
                    return '满99减20'
                }else if(value===3){
                    return '满199减50'
                }else if(value===-1){
                    return '不使用优惠券'
                }
            }
        },
        methods: {
            ...mapActions('shopCar', ['deleteGoods', 'reduceNum', 'addNum', 'emptyShopCar']),
            reduce(item) {
                if (item.num == 1) {
                    this.confrim(item);
                    return
                }
                this.reduceNum(item)
            },
            back() {
                this.$router.go(-1);//返回上一层
            },
            formatPrice(price) {
                return (price / 100).toFixed(2);
            },
            async jiesuan() {
                let Order = {}
                let _this = this;
                const date = new Date().getTime();
                console.log(this.shopCar);
                if (!this.user.id) {
                    this.$dialog.toast({
                        mes: '您未登陆或者登陆超时！',
                        timeout: 1500
                    });
                    this.$router.push('/user')
                    return;
                }
                if (!this.user.addressId) {
                    this.$dialog.toast({
                        mes: '您未选择下单地址！',
                        timeout: 1500
                    });
                    this.$router.push('/myAddress')
                    return;
                }
                console.log(this.yhq.yhqId);
                let shop = []
                this.shopCar.forEach(res => {
                    shop.push({
                        shopId: res.id,
                        shopNum: res.num,
                        buyPrice: res.price
                    })
                })
                Order = {
                    userId: _this.user.id,
                    totalPrice: _this.totalMoney,
                    realPrice: _this.realMoney,
                    address: _this.user.address,
                    create: date,
                    shop,
                    yhqId:_this.yhq.id,
                    addressId:_this.user.addressId
                }
                console.log(Order);
                const {data} = await axios.post(this.$api+'/order/addOrder',Order)
                console.log(data);
                if(data.data){
                    this.emptyShopCar();
                    this.$dialog.toast({
                        mes: '下单成功！',
                        timeout: 1500
                    });
                    this.$router.replace('/myOrder')
                }
            },
            confrim(item) {
                this.$dialog.confirm({
                    title: '提示',
                    mes: `你确定要删除${item.name}吗？`,
                    opts: () => {
                        this.deleteGoods(item)
                        this.$dialog.toast({mes: '删除成功', timeout: 1000});
                    }
                });
            },

            openScrollDialog () {
                this.getMyCoupon()
                this.openScroll = true;
            },
            closeScrollDialog () {
                this.openScroll = false;
            },
            async getMyCoupon(){
                // const {data} = await  axios.get(this.$api+'/yhq/lookYhq/'+this.user.id)
                this.options=[{id:-1,yhqId:-1}]
                const {data} = await  axios.get(this.$api+'/yhq/lookYhq/'+this.user.id)
                data.data.forEach(res=>{
                    if(res.used===1){
                        return;
                    }
                    this.options.push(res)
                })
                console.log(this.options);

            },
            canYhq(){
                if(this.yhq.yhqId===1&&this.totalMoney<59){
                    /*this.$dialog.toast({
                        mes: '当前价格未达到59元</br>不能使用该优惠券！',
                        timeout: 2000
                    });*/
                    this.yhq=[];
                }
                if(this.yhq.yhqId===2&&this.totalMoney<99){
                    /*this.$dialog.toast({
                        mes: '当前价格未达到99元</br>不能使用该优惠券！',
                        timeout: 2000
                    });*/
                    this.yhq=[];
                }
                if(this.yhq.yhqId===3&&this.totalMoney<199){
                   /* this.$dialog.toast({
                        mes: '当前价格未达到199元</br>不能使用该优惠券！',
                        timeout: 2000
                    });*/
                    this.yhq=[];
                }
            }

        }
    };
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  * {
    color: black;
  }

  .caozuo {
    display: flex;
    flex-direction: row;
    width: 100px;

    div {
      text-align: center;
      line-height: 28px;
      width: 33px;
      background: #f5f5f5;
      border-right: 1px solid #ccc;

      &:last-child {
        border: none;
      }
    }
  }

  .card-goods {
    background-color: #fff;

    &__item {
      display: flex;
      flex-direction: row;
      padding: 10px 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;

      .img {
        width: 100px;
        height: 70px;
        margin-right: 20px;
        background-size: cover;
        background-position: center;
      }

      .content {
        width: 80%;
        overflow: hidden;
      }

      .geshu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .money {
          color: red;
          font-size: 18px;
        }
      }
    }
  }

  .OrderDibu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    font-size: 14px;
    padding: 10px;

    .yhq{
      margin-top: 5px;
    }

    .btn {
      width: 100px;
      font-size: 14px;
      padding: 5px 0;
      color: white;
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        color: orangered;
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }
</style>
