<template>
    <div id="app">
      <div class="weiLogin" v-if="!user.id||!isLogin">
        <div class="welcome">Welcome</div>
        <div class="notLogintext">您当前未登录</div>
        <div @click="togo('/login')" class="btn">登录</div>
        <div @click="togo('/register')" class="btn">注册</div>
      </div>
      <div v-else>
<!--        <div class="jianbianBG"></div>-->
        <div class="kuang">
          <div v-if="user.img" :style="{backgroundImage:`url(http://snacks.jiawei1311.cn:7001${user.img})`}" class="touxiang" @click="goSet"/>
          <div v-else class="touxiang" @click="goSet"/>

          <div class="username">
            {{user.realName || user.username}}
          </div>
          <div class="fenlei">
            <div @click="togo('/MyOrder')" class="content">
              <i class="iconfont icon-dingdan"/>
              <div>订单</div>
            </div>
            <div @click="togo('/MyRXB')" class="content">
              <i class="iconfont icon-paixing"/>
              <div>热销榜</div>
            </div>
            <div @click="togo('/MyCoupon')" class="content">
              <i class="iconfont icon-youhuiquan"/>
              <div>优惠券</div>
            </div>
          </div>
        </div>
        <div class="setting">
          <mu-list @click="goSet">
            <mu-list-item class="z-item" button :ripple="false">
              <mu-list-item-action>
                <mu-icon value="用户姓名"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{user.realName}}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item class="z-item" button :ripple="false">
              <mu-list-item-action>
                <mu-icon value="联系方式"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{user.phone}}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item class="z-item" button :ripple="false">
              <mu-list-item-action>
                <mu-icon value="家庭地址"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{user.address}}</mu-list-item-title>
            </mu-list-item>
<!--            <mu-list-item button :ripple="false">
              <mu-list-item-action>
                <mu-icon value="联系方式"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>13123898958</mu-list-item-title>
            </mu-list-item>-->
          </mu-list>

        </div>
        <div class="btn btnP" @click="exit">
          退出
        </div>
      </div>


    </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "user",
        layout:"withBar",
        computed:{
            ...mapGetters({
                user: 'user/user',
                isLogin:'user/isLogin'
            })
        },
        methods:{
            ...mapActions({
                setIsLogin: 'user/setIsLogin',
                setUser:'user/setUser'
            }),
            exit(){
                this.setUser([]);
                this.setIsLogin(false);
            },
            togo(path){
                this.$router.push(path)
            },
            goSet(){
                this.$router.push('/setInfo')
            }

        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  #app{
    background-image: url("../static/img/userlogin.jpg");
    background-position: center;
    background-size: cover;
    min-height: calc( 100vh - 55px );
    .btn{
      margin: 0 auto;
      margin-top: 20px;
      color: white;
      font-size: 16px;
    }

  }

  .weiLogin{
    width: 80%;
    margin: 0 auto;
    font-size: 18px;
    margin-top: 200px;
    .welcome{
      font-size: 36px;
      color: white;
      margin-left: 20px;
    }
    .notLogintext{
      margin-left: 20px;
    }
  }


  .jianbianBG{
    background: $PrimaryColorLG;
    width: 100%;
    height: 170px;
  }
  .z-item{
    border-bottom: 1px solid rgba($SecondaryGray,.2);
  }
  .mu-item-action{
    margin-right: 20px;
  }
  .kuang{
    width: 90%;
    z-index: 100;
    margin: 0 auto;
    border-radius: 5px;
    background: white ;
    height: 200px;
    position: absolute;
    top: 100px;
    left: 5%;
    right: 5%;
    .touxiang{
      background-image: url("~@/static/img/paidaxing2.png");
      background-position: center;
      background-size: cover;
      border: 5px solid skyblue;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translate(-50%,0);
    }
    .username{
      width: 100%;
      position: absolute;
      top: 60px;
      text-align: center;
      font-size: 24px;
    }
    .fenlei{
      border-top: 1px solid rgba($SecondaryGray,.3) ;
      position: absolute;
      bottom: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      text-align: center;
      padding-top: 5px;
      i{
        font-size: 32px;
      }
    }
  }

  .setting{

    background: white;
    position: absolute;
    width: 90%;
    left: 5%;
    top: 320px;
    border-radius: 10px;
    *{
      color: black;
    }
  }

  .btnP{
    position: absolute;
    top: 480px;
    width: 90%;
    left: 5%;
    color: white;
  }

</style>
