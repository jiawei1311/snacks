<template>
  <div id="app">
    <div class="top">
      <z-search/>
      <i @click="goBack" class="back iconfont icon-fanhui"/>
    </div>

    <div style="height: 50px;"/>
    <van-tabs @click="clickChangeType()" v-model="activeName">
      <van-tab style="background: #f5f5f5" v-for="(item,index) in fenlei" :key="index" :name="item.name"
               :title="item.name">
      </van-tab>
    </van-tabs>
    <div class="list">
      <z-list class="one" :shop="item" @click.native="goto(item.id)" v-for="item in shopList" :key="item.id"></z-list>
    </div>
  </div>
</template>

<script>
    import zList from '../components/List'
    import zSearch from '../components/Search'
    import zTop from '../components/top'
    import axios from "axios";
    export default {
        name: "fenleiShopList",
        components: {
            zList,
            zSearch,
            zTop
        },
        data() {
            return {
                shopList: [],
                activeName: '',
                fenlei: [
                    {
                        name: '坚果',
                        img: 'lingshiKaixinguo.png'
                    }, {
                        name: '水果干',
                        img: 'lingshiGuoshugan.png'
                    }, {
                        name: '肉脯',
                        img: 'roushi.png'
                    }, {
                        name: '糕点',
                        img: 'lingshiMianbao.png'
                    }, {
                        name: '糖果',
                        img: 'lingshiTangguo.png'
                    }, {
                        name: '肉类',
                        img: 'lingshiKaochang.png'
                    }, {
                        name: '膨化食品',
                        img: 'latiao.png'
                    }, {
                        name: '饼干',
                        img: 'lingshiDougan.png'
                    },
                ],
            }
        },
        methods: {
            goto(id) {
                this.$router.push({
                    path: '/shop',
                    query: {
                        id: id
                    }
                })
            },
            goBack() {
                this.$router.go(-1)
            },
            async getFenleiShop(type) {
                let searchList = type || this.$route.query.type;
                // const {data} =await axios.get(this.$api+'/shop/getFenleiShop/'+this.$route.query.type)
                const {data} = await axios.get(this.$api + '/shop/getFenleiShop/' + searchList)
                this.shopList = data.data
            },
            clickChangeType() {
                this.getFenleiShop(this.activeName)
            }

        },
        mounted() {
            this.getFenleiShop();
            this.activeName = this.$route.query.type;
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";

  .list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    .one {
      flex: 1 1 auto;
      margin: 10px;
      max-width: 400px;
    }
  }

  .back {
    position: fixed;
    font-size: 24px;
    left: 10px;
    top: 10px;
    font-weight: 600;
  }

  .top {
    background: white;
    height: 50px;
    position: fixed;
    width: 100%;

  }
</style>
