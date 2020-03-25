<template>
  <div id="app">
    <!-- <yd-scrolltab>
      <div v-for="(items,i) in fenleiShopList" :key="i">
        <yd-scrolltab-panel :label="items.title" icon="demo-icons-category1">
          <div class="List">
            <div @click="goto(item.id)" class="one" v-for="(item,index) in items.shopList" :key="index">
              <div>
                <div :style="{backgroundImage:'url(http://snacks.jiawei1311.cn:7001/public/img/'+item.img+')'}"
                     class="img"/>
              </div>
              <div class="content">
                <div>
                  <div class="sale">{{item.name}}</div>
                  <div>销售量{{item.sale}}</div>
                </div>
                <div class="money">￥<span>{{item.price}}</span></div>
              </div>

            </div>

          </div>
        </yd-scrolltab-panel>
      </div>
      <div style="height: 55px;"></div>
    </yd-scrolltab> -->

    <FenleiShop
    ></FenleiShop>
  </div>
</template>

<script>
    import FenleiShop from '../components/FenleiShop'
    export default {
        name: "fenlei",
        layout: 'withBar',
        components:{
          FenleiShop
        },
        methods: {
            goto(id) {
                this.$router.push({
                    path: '/shop',
                    query: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/common";

  .List {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .one {
    flex: 1 1 auto;
    border-radius: 5px;
    position: relative;
    box-shadow: 2px 2px 4px #ccc;
    overflow: hidden;
    margin: 10px;
    max-width: 400px;

    .img {
      height: 200px;
      background-position: center;
      background-size: cover;
    }

    .name {
      position: absolute;
      top: 0;
      left: 0;
    }

    .content {
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      justify-content: space-between;
      background-image: url("../static/img/fenlei.Backjpg.jpg");
      background-position: center;
      background-size: cover;
    }

    .sale {
      @include shenglue;
      max-width: 160px;
    }

    .money {
      font-size: 14px;

      span {
        font-size: 24px;
        color: orange;
      }
    }

  }
</style>
