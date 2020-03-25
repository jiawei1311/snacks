<template>
    <div id="app">
      <z-top title="登录"/>

      <div class="login">
        <h1>登录</h1>
        <mu-container>
          <mu-text-field full-width class="input" color="black" underline-color="black" v-model="username" label="请输入账号" label-float  icon=":iconfont icon-yonghuming"></mu-text-field><br/>
          <mu-text-field full-width type="password" underline-color="black" color="black" v-model="password" label="请输入密码" label-float  icon=":iconfont icon-mima"></mu-text-field><br/>
        </mu-container>
        <div class="btn" @click="login">
          登录
        </div>
        <div class="btn" @click="register">
          注册
        </div>
       <!-- <div class="register">
          <div>忘记密码</div>
          <div @click="register">注册新号</div>
        </div>-->
      </div>
    </div>
</template>

<script>
  import zTop from '../components/top'
  import axios from 'axios'
  import {mapMutations} from 'vuex'
  import { login } from "../api/user";
    export default {
        name: "login",
        components:{
            zTop
        },
        data () {
            return {
                username:'',
                password:''
            }
        },
        methods:{
            ...mapMutations({
                setIsLogin: 'user/setIsLogin',
                setUser:'user/setUser'
            }),
            register(){
                this.$router.push('/register')
            },
            async login(){
                // const {data} =await axios.post(this.$api+'/user/login',{
                //     username:this.username,
                //     password:this.password
                // })
                const {data} = await login({
                   username:this.username,
                    password:this.password
                })
                if(data.data[0]){
                    this.setUser(data.data[0]);
                    this.setIsLogin(true);
                    this.$dialog.toast({
                        mes: '登录成功',
                        timeout: 1500,
                        icon: 'success'
                    });
                    setTimeout(res=>{
                        this.$router.push('/user')
                    },1500)
                }else{
                    this.$dialog.toast({
                        mes: '登录失败',
                        timeout: 1500,
                        icon: 'error'
                    });
                }


            }
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  * {
    color: $PrimaryBlack;
  }
  h1{
    font-size: 24px;
  }
  #app{
    background-image: url("../static/img/userlogin.jpg");
    background-position: center;
    background-size: cover;
    min-height: 100vh;
  }
  .login{
    margin: 0 auto;
    width: 70%;
    margin-top: 100px;
    i{
      color: black;
    }
  }
  .mu-input-line{
    background: black;
  }
  .btn{
    margin: 0 auto;
    margin-top: 20px;
    color: $SecondaryWhite;
    font-size: 16px;
  }
  .register{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    text-shadow: 0 0 5px white;
  }

</style>
