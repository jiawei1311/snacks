<template>
  <div id="app">
    <z-search />

    <div class="swiper">
      <mu-carousel class="swiperAslice" :hide-indicators="true">
        <mu-carousel-item v-for="(item,index) in lunbo" :key="index">
          <div
            @click="goto(item.id)"
            class="swiperImage"
            :style="{backgroundImage:`url(http://snacks.jiawei1311.cn:7001/public/img/${item.img}.jpg)`}"
          ></div>
        </mu-carousel-item>
      </mu-carousel>
    </div>

    <!--    <yd-rollnotice style="margin-top: 10px;padding-left: 10px;" autoplay="3000">
      <yd-rollnotice-item @click.native="goto(4)"><span style="color:#F00;margin-right: 10px"> 荐 </span>有友山椒泡凤爪80g</yd-rollnotice-item>
      <yd-rollnotice-item @click.native="goto(13)"><span style="color:#F00;margin-right: 10px"> 荐 </span>三只松鼠 坚果大礼包1430g</yd-rollnotice-item>
      <yd-rollnotice-item @click.native="goto(15)"><span style="color:#F00;margin-right: 10px"> 荐 </span>百草味-芒果干120gx3袋</yd-rollnotice-item>
    </yd-rollnotice>-->

    <div class="fenlei">
      <div
        class="content"
        v-for="(item,index) in fenlei"
        @click="gotoFenlei(item.name)"
        :key="index"
      >
        <img :src="require(`../static/icon/${item.img}`)" />
        <div>{{item.name}}</div>
      </div>
    </div>

    <div style="background: white">
      <div class="hotSale">
        <img src="../static/icon/remen.png" />
        <div>热门销售</div>
      </div>
      <mu-grid-list class="gridlist-inline-demo" :cols="3">
        <mu-grid-tile v-for="item in hotShopList" :key="item.id" @click="goto(item.id)">
          <img :src="`http://snacks.jiawei1311.cn:7001/public/img/${item.img}`" />
          <span slot="title" style="font-size: 14px;">{{item.name}}</span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
    <div style="background: white">
      <div class="hotSale">
        <img src="../static/icon/lingshi.png" />
        <div>其他推荐</div>
      </div>
      <div class="shopList">
        <div v-for="item in otherShopList" :key="item.id" class="shop" @click="goto(item.id)">
          <div
            class="img"
            :style="{backgroundImage:`url(http://snacks.jiawei1311.cn:7001/public/img/${item.img})`}"
          >
            <div class="shopName">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import axios from "../api/axios";
import { mapGetters } from "vuex";
export default {
  components: {
    "z-search": Search
  },
  async asyncData(context) {
    if (context.app.store.state.shop.shopList.length == 0) {
      const { data } = await axios.get(
        "http://snacks.jiawei1311.cn:7001/shop/getAllShop"
      );
      console.log(data);
      context.store.commit("shop/setShopList", data.data);
      const { data: data2 } = await axios.get(
        "http://snacks.jiawei1311.cn:7001/shop/getHotShop"
      );
      context.store.commit("shop/setHotShopList", data.data);
      // return { shop: data.data , hotShop:data2.data}
    }
  },
  data() {
    return {
      fenlei: [
        {
          name: "坚果",
          img: "lingshiKaixinguo.png"
        },
        {
          name: "水果干",
          img: "lingshiGuoshugan.png"
        },
        {
          name: "肉脯",
          img: "roushi.png"
        },
        {
          name: "糕点",
          img: "lingshiMianbao.png"
        },
        {
          name: "糖果",
          img: "lingshiTangguo.png"
        },
        {
          name: "肉类",
          img: "lingshiKaochang.png"
        },
        {
          name: "膨化食品",
          img: "latiao.png"
        },
        {
          name: "饼干",
          img: "lingshiDougan.png"
        }
      ],
      lunbo: [
        {
          img: "big1",
          id: 7
        },
        {
          img: "blckwzmhgo1",
          id: 15
        },
        {
          img: "sjvissuujmgo2",
          id: 13
        },
        {
          img: "leuiuupm1",
          id: 21
        }
      ]
    };
  },
  layout: "withBar",
  computed: {
    ...mapGetters({
      shopList: "shop/shopList",
      hotShopList: "shop/hotShopList"
    }),
    otherShopList() {
      return this.shopList.slice(4, 14);
    }
  },
  methods: {
    goto(id) {
      this.$router.push({
        path: "/shop",
        query: {
          id: id
        }
      });
    },
    gotoFenlei(name) {
      this.$router.push({
        path: "/fenleiShopList",
        query: {
          type: name
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "../assets/css/main";
.gridlist-inline-demo {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.mu-carousel {
  height: 200px;
}
.swiperImage {
  height: 200px;
  width: 100%;
  background-image: url("../static/img/lunbo.jpg");
  background-size: cover;
  background-position: center;
}
@media screen and (min-width: 600px) {
  .mu-carousel {
    height: 400px;
  }
  .swiperImage {
    height: 400px;
  }
}
.fenlei {
  margin-top: 10px;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  .content {
    margin-bottom: 10px;
    width: 25%;
    text-align: center;
    /*     color: $SecondaryYellow;*/
    color: $PrimaryBlack;
    img {
      height: 40px;
      width: 40px;
    }
  }
}

.shopList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 95%;
  margin-left: 2.5%;
  font-size: 14px;
  .shop {
    height: 200px;
    width: 150px;
    flex: 1 1 auto;
    margin: 10px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    .img {
      background-image: url("~@/static/img/cloth.jpg");
      background-size: cover;
      width: 100%;
      height: 100%;
      background-position: center;
      position: relative;
      .shopName {
        font-size: 14px;
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 0;
        color: white;
        background: rgba($PrimaryBlack, 0.5);
        @include shenglue;
      }
    }
  }
}
.hotSale {
  margin-top: 10px;
  border-top: 1px solid rgba($SecondaryGray, 0.5);
  font-size: 18px;
  padding: 10px 10px 0 10px;
  font-weight: 600;
  color: $PrimaryBlack;
  display: flex;
  flex-direction: row;

  img {
    height: 24px;
    margin-right: 10px;
  }
}
</style>
