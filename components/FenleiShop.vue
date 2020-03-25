<template>
  <div class="main">
    <div class="topScroll" :style="{width:scrollTopValue+'%',opacity:scrollTopValue*1.75+'%'}"></div>
    <div class="leftOne">
      <div
        name="lists"
        class="left-list"
        v-for="(item,index) in withIcon"
        :key="index"
        :class="scrollIndex===index? 'srcollActive':''"
        @click="setIndex(index)"
      >
        <img v-if="item.icon" class="icon" :src="require(`../static/icon/${item.icon}`)" />
        <img v-else class="icon" src="../static/icon/latiao.png" />
        {{item.title}}
      </div>
    </div>
    <div class="rightOne" id="rightScroll">
      <div :id="'to'+index" class="shopLists" v-for="(items,index) in fenleiShopList" :key="index">
        <h2>{{items.title}}</h2>
        <div class="shopList">
          <div class="shopOne" v-for="item in items.shopList" :key="item.id" @click="goto(item.id)">
            <div
              :style="{backgroundImage:'url(http://snacks.jiawei1311.cn:7001/public/img/'+item.img+')'}"
              class="img"
            />
            <div class="content">
              {{item.name}}
              <p class="price">{{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FenleiShop",
  data() {
    return {
      scroll: "",
      withIcon: [],
      scrollIndex: 0,
      scrollTopValue: 0
    };
  },
  mounted() {
    let a = setInterval(() => {
      if (this.fenleiShopList.length > 0) {
        this.setIcon();
        window.clearInterval(a);
      }
    }, 100);
    let rightScroll = document.getElementById("rightScroll");
    rightScroll.addEventListener("scroll", this.menu);
  },
  destroyed: function() {
    console.log("移除滚动监听");
    rightScroll.removeEventListener("scroll", this.menu);
  },
  computed: {
    ...mapGetters({
      fenleiShopList: "shop/fenleiShopList"
    })
  },
  watch: {},
  methods: {
    menu() {
      // this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = document.getElementById("rightScroll");
      this.scroll = scroll.scrollTop;
      let shopLists = document.querySelectorAll(".shopLists");
      let a = [];
      shopLists.forEach(item => {
        a.push(item.offsetTop);
      });
      for (let i = 0; i < shopLists.length - 1; i++) {
        if (this.scroll >= a[i] - 20 && this.scroll < a[i + 1] - 20) {
          this.scrollTopValue = Math.floor(
            (scroll.scrollTop * 100) /
              (scroll.scrollHeight - window.screen.height)
          );
          if (this.scroll + scroll.offsetHeight + 1 > scroll.scrollHeight) {
            return null;
          } else {
            this.scrollIndex = i;
          }
        }
      }

      // console.log(scroll.offsetHeight ) //611
      // console.log(this.scroll) //当前高度
      // console.log(scroll.scrollHeight) // 总高度
    },
    setIndex(index) {
      this.scrollIndex = index;
      let shopLists = document.querySelectorAll(".shopLists");
      document.getElementById("rightScroll").scrollTop =
        shopLists[index].offsetTop - 10;
    },
    goto(id) {
      this.$router.push({
        path: "/shop",
        query: {
          id: id
        }
      });
    },
    setIcon() {
      const fenlei = [
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
      ];
      let arr = this.fenleiShopList;
      arr.forEach(item => {
        for (let i = 0; i < fenlei.length; i++) {
          if (item.title === fenlei[i].name) {
            item.icon = fenlei[i].img;
          }
        }
      });
      this.withIcon = arr;
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-wrap: row;
  height: calc(100vh - 56px);

  .topScroll {
    height: 5px;
    // background: #ffcc00;
    background-color: skyblue;
    border-radius: 10px;
    width: 100%;
    top: 0;
    position: fixed;
    z-index: 1000;
  }

  .leftOne {
    background: #f5f5f5;
    min-width: 125px;
    min-height: calc(100vh - 56px);
    overflow-y: auto;

    .left-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;

      height: 60px;
      display: block;
      //    box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
      line-height: 60px;
      padding-left: 20px;
      list-style: none;
      text-decoration: none;
      color: #999;
      .icon {
        height: 20px;
        width: 20px;
      }
    }
    .srcollActive {
      animation: clickIcon 2s;
      background: white;
      color: #333;
      @keyframes clickIcon {
        from {
          color: #f5f5f5;
          transform: scale(1.1);
        }
        to {
          color: #333;
          transform: scale(1);
        }
      }
    }
  }

  .rightOne {
    flex: 1 1 auto;
    overflow-y: auto;
    background-color: white;

    .shopList {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .shopOne {
        display: flex;
        flex-direction: row;
        margin: 10px 20px;
        flex: 1;
        max-width: 300px;
        .img {
          background-position: center;
          background-size: cover;
          height: 100px;
          min-width: 100px;
        }
        .content {
          margin: 10px;
        }
        .price {
          font-size: 1.5rem;
          color: orangered;
          text-align: right;
          position: relative;
          &:before {
            content: "￥";
            font-size: 1rem;
          }
        }
      }
    }
  }

  h2 {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    margin: 10px 0;
    color: #969799;
    font-size: 1.1rem;
    line-height: 24px;
    font-weight: normal;
    border-color: #ebedf0;
    border-style: solid;
    border-width: 0;
    &:before,
    &:after {
      content: "";
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      box-sizing: border-box;
      height: 1px;
      border-color: inherit;
      border-style: inherit;
      border-width: 1px 0 0;
      background: #969799;
      margin: 0 20px;
    }
    // &:after {
    //   content: "";
    //   height: 1px;
    //   width: 50px;
    //   background-color: #ccc;
    //   position: absolute;
    //   top: 50%;
    //   left: calc(50% + 25px);
    // }
  }
}
</style>
